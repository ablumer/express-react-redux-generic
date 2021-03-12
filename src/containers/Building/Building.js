import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

@connect(
    state => ({roombookings: state.roombookings.data}))
export default class Building extends Component {
  // static propTypes = {
  //   match: PropTypes.shape({
  //     params: PropTypes.shape({
  //       buildingId: PropTypes.number.isRequired
  //     })
  //   })
  // }

  static propTypes = {
    params: PropTypes.object.isRequired,
    roombookings: PropTypes.object,
  }

  componentDidMount() {
    console.log('buildingId: ' + this.props.params.buildingId);
    console.log('STATE IN BUILDING: ' + this.props.roombookings.AREAS[0].ROOMS[0].ROOMNAME);
  }

  render() {
    const buildingNormalizedName = this.props.params.buildingNormalizedName;
    console.log('buildingNormalizedName: ' + buildingNormalizedName);

    const roombookings = this.props.roombookings;
    const areas = roombookings.AREAS;
    // const buildingId = 1;
    let area = {};

    for (let idx = 0; idx < areas.length; idx++) {
      const areaItem = areas[idx];
      // if (areaItem.ID === buildingId) {
      if (areaItem.NORMALIZED === buildingNormalizedName) {
        area = areaItem;
        break;
      }
    }

    const buildingName = area.AREANAME;
    const rooms = area.ROOMS;

    console.log('AREA: ' + area);
    console.log('ROOMS: ' + rooms);

    return (
      <div>
        <h1 className="page-title">{buildingName}</h1>

        <div className="row column max-medium">
          <ul>
            {rooms.map((value, index) => {
              return <li key={index}><Link to={`/roombookings/${buildingNormalizedName}/${value.NORMALIZED}`}>{value.ROOMNAME}</Link></li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}
