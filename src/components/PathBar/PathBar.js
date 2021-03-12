import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router';

@connect(
    state => ({roombookings: state.roombookings.data,
               pathname: state.routing.locationBeforeTransitions.pathname,
               pages: state.pages.data}))
export default class PathBar extends Component {
  static propTypes = {
    roombookings: PropTypes.object,
    pathname: PropTypes.string,
    pages: PropTypes.object
  }

  // componentDidMount() {
  //   console.log('LOCATION in PathBar component: ' + window.location.pathname);
  // }

  getBreadCrumbs = (path) => {
    const breadcrumbs = path.split('/').slice(1);
    const bsMap = {};
    for (let idx = 0; idx < breadcrumbs.length; idx++) {
      const name = breadcrumbs[idx];
      const url = breadcrumbs.slice(0, idx + 1).join('/');
      bsMap[url] = name;
    }
    return bsMap;
  }

  render() {
    const roombookings = this.props.roombookings;
    // const path = window.location.pathname;
    // const path = this.props.path;
    const path = this.props.pathname;
    console.log('PATH in PathBar: ' + path);
    // const breadcrumbs = path.split('/').slice(1);

    const breadcrumbsMap = this.getBreadCrumbs(path);
    console.log('breadcrumbsMap: ' + breadcrumbsMap);

    // console.log('BREADCRUMBS: ' + breadcrumbs);
    console.log(roombookings);

    const pages = this.props.pages;

    return (
              <nav className="breadcrumbs"><p id="breadcrumb-label" className="show-for-sr">
    You are here:
  </p>

  <ol className="menu menu--breadcrumbs row" aria-labelledby="breadcrumb-label"><li>
      <a href="http://abc.xyz.com">Home</a>
    </li>
              {Object.keys(breadcrumbsMap).map((key) => {
                const url = '/' + key;
                return <li className="menu-text"><Link to={url}>{pages[breadcrumbsMap[key]]}</Link></li>;
              })}
</ol></nav>
    );
  }
}
