const LOAD = 'redux-example/rooms/LOAD';
const LOAD_SUCCESS = 'redux-example/rooms/LOAD_SUCCESS';
const LOAD_FAIL = 'redux-example/rooms/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function rooms(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.rooms && globalState.rooms.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadRooms')
  };
}
