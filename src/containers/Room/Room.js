import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({roombookings: state.roombookings.data}))
export default class Building extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    roombookings: PropTypes.object
  }

  componentDidMount() {
    console.log('room normalized name: ' + this.props.params.roomNormalizedName);
    console.log('STATE IN ROOM: ' + this.props.roombookings.AREAS[0].ROOMS[0].ROOMNAME);
  }

  render() {
    const buildingNormalizedName = this.props.params.buildingNormalizedName;
    const roomNormalizedName = this.props.params.roomNormalizedName;
    const roombookings = this.props.roombookings;

    const areas = roombookings.AREAS;
    let area = {};

    for (let idx = 0; idx < areas.length; idx++) {
      const areaItem = areas[idx];
      if (areaItem.NORMALIZED === buildingNormalizedName) {
        area = areaItem;
        break;
      }
    }

    const rooms = area.ROOMS;
    let room = {};

    for (let idx = 0; idx < rooms.length; idx++) {
      const roomItem = rooms[idx];
      if (roomItem.NORMALIZED === roomNormalizedName) {
        room = roomItem;
        break;
      }
    }

    const roomDetail = room.ROOM[0];
    const facilities = roomDetail.FACILITIES;

    let facilitiesString = '';
    for (let idx = 0; idx < facilities.length - 1; idx++) {
      facilitiesString += facilities[idx] + ', ';
    }
    facilitiesString += facilities[facilities.length - 1];

    let roomImage = require('./default.jpg');
    try {
      roomImage = require('./' + roomNormalizedName + '.jpg');
    } catch (error) {
      console.error(error);
    }

    return (
      <div>
        <h1 className="page-title">{roomDetail.ROOMNAME}</h1><br />

        <div className="row column max-medium v-space-1">
          <div className="column medium-6">
            <img src={roomImage}/>
          </div>

          <div className="column medium-6">
            <h4>Room details</h4>
            <ul>
              <li>{facilitiesString}</li>
              <li><a href={roomDetail.ACCESSABLE}>Accessibility Information</a></li>
            </ul>

            <h4>Room pricing</h4>
            <ul>
              {roomDetail.RATES.map((value) => {
                return <li>{value.RATETYPE}: {value.RATEAMOUNT}</li>;
              })}
            </ul>
          </div>
        </div>

        <div className="row column max-medium v-space-1">
<table>
<thead>
<tr>
<th>Layout</th>
<th>Capacity</th>
</tr>
</thead>
<tbody>
{roomDetail.CAPACITIES.map((value) => {
  return <tr><td>{value.LAYOUT}</td><td>{value.CAPACITY}</td></tr>;
})}
</tbody>
</table>
        </div>
      </div>
    );
  }
}
