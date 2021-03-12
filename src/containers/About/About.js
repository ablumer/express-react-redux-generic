import React, {Component} from 'react';
import Helmet from 'react-helmet';

export default class About extends Component {

  state = {
    showKitten: false
  }

  handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});

  render() {
    const {showKitten} = this.state;
    const kitten = require('./kitten.jpg');
    return (
      <div className="container">
        <h1 className="page-title">About Us</h1>
        <Helmet title="About Us"/>

        <div className="row column max-medium v-space-1">
          <h3>Images</h3>

          <p>
            Psst! Would you like to see a kitten?

            <button className="button"
                    style={{marginLeft: 50}}
                    onClick={this.handleToggleKitten}>
              {showKitten ? 'No! Take it away!' : 'Yes! Please!'}</button>
          </p>

          {showKitten && <div><img src={kitten}/></div>}
        </div>
      </div>
    );
  }
}
