import pfile from './roombookings_pages.json';

export default function loadPages() {
  return new Promise((resolve) => {
    resolve(pfile);
  });
}
