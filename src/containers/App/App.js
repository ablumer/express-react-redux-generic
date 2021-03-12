import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import config from '../../config';
import { asyncConnect } from 'redux-async-connect';
import { isLoaded as isProgrammesLoaded, load as loadProgrammes } from 'redux/modules/programmes';
import { isLoaded as isRoomBookingsLoaded, load as loadRoomBookings } from 'redux/modules/roombookings';
import { isLoaded as isPagesLoaded, load as loadPages } from 'redux/modules/pages';
import { isLoaded as isRatesLoaded, load as loadRates } from 'redux/modules/rates';
import { isLoaded as isRatesoptionsLoaded, load as loadRatesoptions } from 'redux/modules/ratesoptions';
import { PathBar } from 'components';

@asyncConnect([{
  promise: ({store: {dispatch, getState}}) => {
    const promises = [];

    if (!isProgrammesLoaded(getState())) {
      promises.push(dispatch(loadProgrammes()));
    }
    if (!isRoomBookingsLoaded(getState())) {
      promises.push(dispatch(loadRoomBookings()));
    }
    if (!isPagesLoaded(getState())) {
      promises.push(dispatch(loadPages()));
    }
    if (!isRatesLoaded(getState())) {
      promises.push(dispatch(loadRates()));
    }
    if (!isRatesoptionsLoaded(getState())) {
      promises.push(dispatch(loadRatesoptions()));
    }

    return Promise.all(promises);
  }
}])

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
  };

  render() {
    const styles = require('./App.scss');

    return (
      <div className={styles.app}>
        <Helmet {...config.app.head}/>

        <a href="#main-content" className="show-on-focus button button--white">Skip to main content</a>
        <header id="site-header" className="site-header" data-sticky-container>
          <div className="sticky" data-sticky data-options="marginTop: 0; stickyOn: small;">
            <div className="title-bar">
              <div className="row">
                <div className="title-bar-left site-header__logo">
                  <a className="site-header__logo-link" href="http://abc.xyz.com" title="Homepage">
                    HOME
                    <span className="show-for-sr">
                      Home
                    </span>
                  </a>
                </div>

                <div className="title-bar-right site-header__links">
                  <ul className="menu js-addReciteMe">
                    <li><a href="http://abc.xyz.com/abc">Page 1</a></li>
                    <li><a href="http://abc.xyz.com/abc">Page 2</a></li>
                    <li><a href="http://abc.xyz.com/abc">Page 3</a></li>
                    <li><a href="http://abc.xyz.com/abc">Page 4</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="site-controls">
              <div className="top-bar">
                <a className="logo--owl" href="http://abc.xyz.com" title="Homepage" aria-hidden="true">
                  ICON
                  <span className="show-for-sr">
                    Home
                  </span>
                </a>

                <button id="site-search-toggle" className="button button--search button--ghost" data-toggler="is-active" data-toggle="site-search site-search-toggle">
                  <svg className="icon icon--search">
                    <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#search"/>
                  </svg>&#32;<span className="button__text">Search</span>
                </button>

                <button className="button button--menu button--ghost icon--animated__wrapper" data-toggle="off-canvas-nav">
                  <span className="icon icon--menu"></span>&#32;<span className="button__text">Menu</span>
                </button>
              </div>
            </div>

            <div id="site-search" className="site-search" data-toggler="show">
              <div className="row">
                <form action="//search.abc.xyz.com/search/">
                  <div>
                    <label htmlFor="site-q" className="show-for-sr">Search keywords</label>
                    <input
                      type="text"
                      className="input--site-search js-autocomplete"
                      data-listbox-label="Keyword suggestions"
                      placeholder="Search"
                      id="site-q"
                      name="q"
                      autoComplete="off" />
                    <button className="button" title="search">
                        <span className="show-for-sr">Search</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </header>

        <div className="off-canvas-wrapper">
          <div className="off-canvas-absolute position-right" id="off-canvas-nav" data-off-canvas data-options="transition: overlap" data-content-overlay="false">
<ul className="vertical menu menu--site-nav js-addReciteMe dropdown" data-responsive-menu="drilldown medium-dropdown" role="menubar" data-dropdown-menu="qm3wsv-dropdown-menu" data-mutate="51eywz-responsive-menu" data-events="mutate"><li role="menuitem">
        <a href="http://abc.xyz.com">Home</a>
    </li><li role="menuitem">
        <a href="http://abc.xyz.com/study">Page Example</a>
    </li><li className="is-dropdown-submenu-parent opens-right" role="menuitem" aria-haspopup="true" aria-label="Study" data-is-click="false">
      <a href="http://abc.xyz.com/prospective">
        Page 1
      </a>

      <ul className="nested vertical menu menu--main-nav__nested submenu is-dropdown-submenu first-sub" data-submenu="" role="menu"><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/prospective">Page 1</a>
        </li><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/prospective/undergraduate">Page 2</a>
        </li><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/prospective/postgraduate">Page 3</a>
        </li><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/prospective/research">Page 4</a>
        </li></ul>
    </li><li role="menuitem">
      <a href="http://abc.xyz.com/international">Page 2</a>
    </li><li role="menuitem">
      <a href="http://abc.xyz.com/student-services">Page 3</a>
    </li><li role="menuitem">
      <a href="http://abc.xyz.com/business-services">Page 4</a>
    </li><li className="opens-left is-dropdown-submenu-parent opens-right" role="menuitem" aria-haspopup="true" aria-label="About">
      <a href="http://abc.xyz.com/about-us">
        <svg className="icon icon--angle-right">
          <use xmlnsXlink="http://www.w3.org/1999/xlink" xlinkHref="#angle-right"></use>
        </svg>
        About
      </a>

      <ul className="nested vertical menu menu--main-nav__nested submenu is-dropdown-submenu first-sub" data-submenu="" role="menu"><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/about-us">About us</a>
        </li><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/maps">Find us</a>
        </li><li role="menuitem" className="is-submenu-item is-dropdown-submenu-item">
          <a href="http://abc.xyz.com/contact-us">Contact us</a>
        </li></ul>
    </li></ul>
          </div>

          <div className="off-canvas-content" data-off-canvas-content>
            <main className="page-main" id="main-content">

              <PathBar/>

              <div className="page-topper"></div>

              <div className={styles.appContent}>
                {this.props.children}
              </div>
            </main>

            <footer className="site-footer">
                <div className="row large-flex">
                  FOOTER
                </div>
            </footer>

          </div>
        </div>

        {/*
        <Programmes/>
        */}
      </div>
    );
  }
}
