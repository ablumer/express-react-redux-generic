import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

@connect(
    state => ({rates: state.rates.data,
               ratesoptions: state.ratesoptions.data}))
export default class SearchFilter extends Component {
  static propTypes = {
    rates: PropTypes.object,
    ratesoptions: PropTypes.object
  }

  // componentDidMount() {
  // }

  render() {
    const handleChange = (event) => {
      const el = event.target;
      console.log('OPTION VALUE: ' + el.value);
      return '';
    };
    const rates = this.props.rates;
    const ratesoptions = this.props.ratesoptions;
    console.log('RATES: ' + rates);
    console.log('RATESOPTIONS' + ratesoptions);

    return (
      <div>
        <div>SEARCH FILTER</div>
        <select onChange={handleChange}>
          <option>option 1</option>
          <option>option 2</option>
          <option>option 3</option>
        </select>
      </div>
    );
  }
}
