import json
import pprint

with open('roombookings.json') as roombookings:
    roombookings = json.load(roombookings)
    pp = pprint.PrettyPrinter()
    pp.pprint(roombookings)

