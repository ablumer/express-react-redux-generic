import pfile from './programmes.json';

export default function loadProgrammes() {
  return new Promise((resolve) => {
    resolve(pfile);
  });
}
