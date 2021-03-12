import React from 'react';
import {IndexRoute, Route} from 'react-router';
import {
    App,
    Home,
    About,
    NotFound,
    RoomBookings,
    Building,
    Room
  } from 'containers';

export default () => {
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home} />

      { /* Routes */ }
      <Route name="About" path="about" component={About} />
      <Route name="Room Bookings" path="roombookings" component={RoomBookings} />
      <Route name="Building" path="roombookings/:buildingNormalizedName" component={Building} />
      <Route name="Room" path="roombookings/:buildingNormalizedName/:roomNormalizedName" component={Room} />

      {/*
      <Route name="Room Bookings" path="roombookings" component={RoomBookings}>
        <Route name="Building" path="roombookings/:buildingNormalizedName" component={Building}>
          <Route name="Room" path="roombookings/:buildingNormalizedName/:roomNormalizedName" component={Room} />
        </Route>
      </Route>
      */}

      { /* Catch all route */ }
      <Route name="404: No Match for route" path="*" component={NotFound} status={404} />
    </Route>
  );
};
