// import React, {Component, PropTypes} from 'react';
import React from 'react';
import Route from 'react-router-dom';
import Breadcrumb from 'react-breadcrumbs';

// export default class CrumbRoute extends Component {
//   static propTypes = {
//     title: PropTypes.string
//   }
//   render() {
//     return (
//       <Route { ...this.props } render={ routeProps => (
//         <Breadcrumb data={{title: this.props.title, pathname: routeProps.match.url, }}>
//         	{ Component ? <Component { ...routeProps } /> : render(routeProps) }
//         </Breadcrumb>
//       )} />
//     );
//   }
// }

export default ({
	component: Component,
	render,
	...props
}) => (
  <Route { ...props } render={ routeProps => (
    <Breadcrumb data={{title: props.title, pathname: routeProps.match.url}}>
    	{ Component ? <Component { ...routeProps } /> : render(routeProps) }
    </Breadcrumb>
  )} />
);
