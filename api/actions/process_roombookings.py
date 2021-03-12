import json
from slugify import slugify
import os.path

AREAS_FILE = './roombookings_files/roombookings_areas.json'
AREA_FILE_PREFIX = './roombookings_files/roombookings_area_'
ROOM_FILE_PREFIX = './roombookings_files/roombookings_room_'
PAGES_FILE = 'roombookings_pages.json'
RATES_FILE = 'rates.json'
RATES_OPTIONS_FILE = 'rates_options.json'

# Dictionary to hold id/title mapping for all pages in the site
pages = {}

print('Processing {}...'.format(AREAS_FILE))
with open(AREAS_FILE, 'r') as roombookings_areas:
    new_data = {}

    areas = json.load(roombookings_areas)

    new_areas = []

    # Rates data
    rates = {}
    rates_options = {}

    for area_item in areas['AREAS']:
        new_area = {}
        area_item_id = area_item['ID']
        new_area['ID'] = area_item_id
        area_name = area_item['AREANAME']
        new_area['AREANAME'] = area_name
        area_name_normalized = slugify(area_name)
        new_area['NORMALIZED'] = area_name_normalized

        # Build up an id/title mapping for all pages in the site
        if area_name_normalized not in pages:
            pages[area_name_normalized] = area_name

        new_area['ROOMS'] = []
        rooms_file = '{}{}.json'.format(AREA_FILE_PREFIX, area_item_id)
        print('Processing {} ...'.format(rooms_file))
        rooms_json_file = open(rooms_file, 'r')
        rooms_json = rooms_json_file.read()
        rooms = json.loads(rooms_json)

        for room_item in rooms['ROOMS']:
            new_room = {}
            room_item_id = room_item['ID']
            new_room['ID'] = room_item_id
            room_name = room_item['ROOMNAME']
            new_room['ROOMNAME'] = room_name
            room_name_normalized = slugify(room_name)
            new_room['NORMALIZED'] = room_name_normalized

            # Build up an id/title mapping for all pages in the site
            if room_name_normalized not in pages:
                pages[room_name_normalized] = room_name

            new_room['ROOM'] = []
            room_file = '{}{}.json'.format(ROOM_FILE_PREFIX, room_item_id)
            # print('Processing {} ...'.format(room_file))
            room_json_file = open(room_file, 'r')
            room_json = room_json_file.read()
            room = json.loads(room_json)

            # Rates data
            rates_normalization = {'fullday': ['ful', 'fd'], 'halfday': ['half', 'hlf', 'hd'], 'perhour': ['hour']}
            rates_filter_options = {'fullday': 'Full day', 'halfday': 'Half day', 'perhour': 'Per hour'}

            get_rates = room['RATES']
            if get_rates:
                rates_dict = {}
                for rate in get_rates:
                    rate_type = rate['RATETYPE']

                    normalized_rate = slugify(rate_type)
                    rate_amount = rate['RATEAMOUNT']

                    # Dictionary to hold rates for this room
                    normalized_rate_type = ''
                    for key in rates_normalization.keys():
                        for variant in rates_normalization[key]:
                            if variant in normalized_rate:
                                normalized_rate_type = key

                    rates_dict[normalized_rate_type] = rate_amount

                    # Dictionary to hold options for rates filter
                    rates_options[normalized_rate_type] = rates_filter_options[normalized_rate_type]

                rates[room_item_id] = rates_dict

            new_room['ROOM'].append(room)
            new_area['ROOMS'].append(new_room)
            room_json_file.close()

        new_areas.append(new_area)
        rooms_json_file.close()

    new_data["AREAS"] = new_areas

print('Writing roombookings.json')
with open('roombookings.json', 'w') as outfile:
    json.dump(new_data, outfile)

# Build up an id/title mapping for all roombookings pages in the site
print('Writing %s' % PAGES_FILE)
with open(PAGES_FILE, 'w') as outfile:
    json.dump(pages, outfile)

print('Writing %s' % RATES_FILE)
with open(RATES_FILE, 'w') as outfile:
    json.dump(rates, outfile)

print('Writing %s' % RATES_OPTIONS_FILE)
with open(RATES_OPTIONS_FILE, 'w') as outfile:
    json.dump(rates_options, outfile)

