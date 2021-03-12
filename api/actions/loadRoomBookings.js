import rfile from './roombookings.json';

const areas = rfile.AREAS;

export default function loadRoomBookings() {
  return new Promise((resolve) => {
    resolve(rfile);
  });
}
