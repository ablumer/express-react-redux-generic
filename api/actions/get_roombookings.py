import os
import json

AREAS_URL = 'https://abc.xyz.com/abc/xyz/events/rb/area'
AREAS_FILE = './roombookings_files/roombookings_areas.json'
AREAS_WGET = 'wget -O {} {}'.format(AREAS_FILE, AREAS_URL)
AREA_URL_PREFIX = 'https://abc.xyz.com/abc/xyz/events/rb/list/'
AREA_FILE_PREFIX = './roombookings_files/roombookings_area_'
ROOM_URL_PREFIX = 'https://abc.xyz.com/abc/xyz/events/rb/room/'
ROOM_FILE_PREFIX = './roombookings_files/roombookings_room_'

print('Getting roombooking areas...')
os.system(AREAS_WGET)

print('Processing {}...'.format(AREAS_FILE))
with open(AREAS_FILE) as roombookings_area:
    areas = json.load(roombookings_area)

    for area_item in areas['AREAS']:
        area_id = area_item['ID']
        area_file = '{}{}.json'.format(AREA_FILE_PREFIX, area_id)
        area_url = '{}{}'.format(AREA_URL_PREFIX, area_id)
        area_wget = 'wget -O {} {}'.format(area_file, area_url)
        print('Getting area {}...'.format(area_id))
        os.system(area_wget)
        with open(area_file) as area:
            rooms = json.load(area)
            for room_item in rooms['ROOMS']:
                room_id = room_item['ID']
                room_file = '{}{}.json'.format(ROOM_FILE_PREFIX, room_id)
                room_url = '{}{}'.format(ROOM_URL_PREFIX, room_id)
                room_wget = 'wget -O {} {}'.format(room_file, room_url)
                print('Getting room {}...'.format(room_id))
                os.system(room_wget)
