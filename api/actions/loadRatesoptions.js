import rfile from './rates_options.json';

export default function loadRatesoptions() {
  return new Promise((resolve) => {
    resolve(rfile);
  });
}
