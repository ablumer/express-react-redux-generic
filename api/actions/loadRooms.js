import rfile from './rooms.json';

const areas = rfile.AREAS;

export default function loadRooms() {
  return new Promise((resolve) => {
    resolve(rfile);
  });
}
