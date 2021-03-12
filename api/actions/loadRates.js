import rfile from './rates.json';

export default function loadRates() {
  return new Promise((resolve) => {
    resolve(rfile);
  });
}
