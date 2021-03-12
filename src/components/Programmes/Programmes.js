import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {load} from 'redux/modules/programmes';

@connect(
    state => ({programmes: state.programmes.data}),
    dispatch => bindActionCreators({load}, dispatch))
export default class Programmes extends Component {
  static propTypes = {
    programmes: PropTypes.object,
    load: PropTypes.func.isRequired
  }

  render() {
    const {programmes, load} = this.props; // eslint-disable-line no-shadow
    const styles = require('./Programmes.scss');

    return (
      <div className={styles.programmes + ' well'}>
        <div className="container">
          <h2>PROGRAMMES</h2>
          <ul>
            {programmes.programme_list.map((value, index) => {
              return <li key={index}>{value.prg_name}</li>;
            })}
          </ul>
          <button className="btn btn-primary" onClick={load}>Reload from server</button>
        </div>
      </div>
    );
  }
}
