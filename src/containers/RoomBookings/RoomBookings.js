import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/roombookings';
import { SearchFilter } from 'components';

@connect(
    state => ({roombookings: state.roombookings.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class RoomBookings extends Component {
  static propTypes = {
    roombookings: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  slugify = (string) => {
    const aaa = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;';
    const bbb = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------';
    const ppp = new RegExp(aaa.split('').join('|'), 'g');

    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(ppp, ccc => bbb.charAt(aaa.indexOf(ccc))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }

  displayLists = (list, columns) => {
    const display = [];
    const listLength = list.length;

    let row = [];
    for (let idx = 0; idx < listLength; idx++) {
      const item = list[idx];
      if (row.length < columns) {
        row.push(item);
      }
      if (row.length === columns || idx === listLength - 1) {
        display.push(row);
        row = [];
      }
    }

    return display;
  }

  areaTile = (areaId, areaNameNormalized, areaName) => {
    const link = '/roombookings/' + areaNameNormalized;
    const image = this.areaImage(areaId);
    return <div className="tile tile-default"><Link to={link} className="card"><img className="card__media" src={image}/><div className="card-section"><h3>{areaName}</h3></div></Link></div>;
  }

  areaImage = (areaId) => {
    const image = require('./' + areaId + '.jpg');
    return image;
  }

  areaColumns = (grid = 2, columns = 2, value) => {
    let columnFraction = 6;
    switch (grid) {
      case 2:
        columnFraction = 6;
        break;
      case 3:
        columnFraction = 4;
        break;
      case 4:
        columnFraction = 3;
        break;
      default:
        columnFraction = 6;
    }
    const columnList = [];
    for (let idx = 0; idx < columns; idx++) {
      let columnClass = 'column medium-' + columnFraction;
      if (columns < grid && idx === columns - 1) {
        columnClass += ' end';
      }
      const areaId = value[idx].ID;
      const areaName = value[idx].AREANAME;
      // const areaNameNormalized = areaName.replace(/\s+/g, '-').toLowerCase();
      const areaNameNormalized = this.slugify(areaName);
      columnList.push(<div className={columnClass}>{this.areaTile(areaId, areaNameNormalized, areaName)}</div>);
    }
    return columnList;
  }

  render() {
    const {roombookings, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./RoomBookings.scss');
    const areas = roombookings.AREAS;

    const columns = 3;
    const displayAreas = this.displayLists(areas, columns);
    // const displayAreasTest = this.displayGrid(displayAreas);
    // console.log('displayAreasTest: ' + displayAreasTest);

    return (
      <div className={styles.roombookings + ' well'}>
        <div className="container">
          <h1 className="page-title">Room Bookings</h1>
          <Helmet title="Room Bookings"/>

          {/*
          <div className="row column max-medium">
            <ul>
              {roombookings.AREAS.map((value, index) => {
                return <li key={index}><Link to={`/roombookings/${value.ID}`}>{value.AREANAME}</Link></li>;
              })}
            </ul>
          </div>
          */}

          <SearchFilter/>

          <div className="row">
            {/*
            {displayAreas.map((value) => {
              let areaRow = null;
              if (value.length === columns) {
                areaRow = (<div className="row"><div className="column medium-6">{this.areaTile(value[0].ID, value[0].AREANAME)}</div><div className="column medium-6">{this.areaTile(value[1].ID, value[1].AREANAME)}</div></div>);
              } else {
                areaRow = (<div className="row"><div className="column medium-6">{this.areaTile(value[0].ID, value[0].AREANAME)}</div></div>);
              }
              return areaRow;
            })}
            */}
            {displayAreas.map((value) => {
              let row = null;
              if (value.length === columns) {
                row = (<div className="row">{this.areaColumns(columns, columns, value)}</div>);
              } else {
                row = (<div className="row">{this.areaColumns(columns, columns - 1, value)}</div>);
              }
              return row;
            })}

            <button className="btn btn-primary" onClick={load}>Reload from server</button>
          </div>
        </div>
      </div>
    );
  }
}
