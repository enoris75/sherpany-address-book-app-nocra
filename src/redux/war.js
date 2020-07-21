// Where All Redux is
// Note: outside the limited scope of this code challenge it might be not such a brillant idea
// of putting everything in a single file. In this very case I'm mostly doing as an excuse for
// making that Doom reference (ich war ein iddqd Kind....).
import { createStore } from "redux";
import { BATCH_SIZE } from "../shared/Constants";

/**
 * Identifier for the action which adds the a batch of users to the global state cache.
 */
export const ADD_BATCH_TO_CACHE = "ADD_BATCH_TO_CACHE";
/**
 * Identifier for the action which takes users from the cache and puts them into the
 * global state user list.
 */
export const MOVE_USERS_FROM_CACHE = "MOVE_USERS_FROM_CACHE";
/**
 * Identifier for the action which sets the IsLoading flag to true.
 */
export const SET_IS_LOADING_ON = "SET_IS_LOADING_ON";
/**
 * Identifier for the action which sets the IsLoading flag to false.
 */
export const SET_IS_LOADING_OFF = "SET_IS_LOADING_OFF";
/**
 * Identifier for the action which sets the latest error.
 */
export const SET_LATEST_ERROR = "SET_LATEST_ERROR";
/**
 * Identifier for the action which sets the filter.
 */
export const SET_FILTER = "SET_FILTER";
/**
 * Identifier for the action which sets the nationality filter.
 */
export const SET_NATIONALITY_FILTER = "SET_NATIONALITY_FILTER";

/**
 * Initial state of the global state.
 */
const initialState = {
  /**
   * Storage of the users, empty in the initial state
   */
  users: [],
  /**
   * Numbers of users loaded, empty in the initial state
   */
  usersLoaded: 0,
  /**
   * Users which are ready to be shown if a new batch of users gets loaded.
   */
  cachedUsers: [],
  /**
   * Is a batch of users being loaded
   */
  isLoading: false,
  /**
   * Most recent error message. If the latest request was successful it will be null.
   */
  latestError: null,
  /**
   * Filter applied to first + last name of the users.
   */
  filter: null,
  /**
   * Filter selecting the nationalities the users are from.
   */
  nationalityFilter: ["CH", "ES", "FR", "GB"],
};

/**
 * Action which adds the given batch of users to the global state cache.
 * Note: this action overwrites anything already existing in the cache.
 * @param {any[]} batchOfUsers
 */
export function addToCache(batchOfUsers) {
  return { type: ADD_BATCH_TO_CACHE, payload: batchOfUsers };
}
/**
 * Action which adds the users in the cache into the global state users list.
 * @param {*} batchOfUsers
 */
export function addFromCache() {
  return { type: MOVE_USERS_FROM_CACHE };
}
/**
 * Action which sets the IsLoading flag to on.
 */
export function setIsLoadingOn() {
  return { type: SET_IS_LOADING_ON };
}
/**
 * Action which sets the IsLoading flag to off.
 */
export function setIsLoadingOff() {
  return { type: SET_IS_LOADING_OFF };
}
/**
 * Action which sets latest error message in the global state.
 * @param {string} errorMessage
 */
export function setLatestError(errorMessage) {
  return { type: SET_LATEST_ERROR, payload: errorMessage };
}
/**
 * Action which sets the filter for users first + last name.
 * @param {string} filter
 */
export function setFilter(filter) {
  return { type: SET_FILTER, payload: filter };
}
/**
 * Action which sets the nationality filter.
 * @param {string[]} nationalities
 */
export function setNationalityFilter(nationalities) {
  return { type: SET_NATIONALITY_FILTER, payload: nationalities };
}

export function rootReducer(state = initialState, action) {
  if (action.type === ADD_BATCH_TO_CACHE) {
    return Object.assign({}, state, {
      cachedUsers: action.payload,
    });
  }
  if (action.type === MOVE_USERS_FROM_CACHE) {
    return Object.assign({}, state, {
      users: state.users.concat(state.cachedUsers),
      usersLoaded: state.usersLoaded + BATCH_SIZE,
      cachedUsers: [],
      latestError: null,
    });
  }
  if (action.type === SET_IS_LOADING_ON) {
    return Object.assign({}, state, {
      isLoading: true,
    });
  }
  if (action.type === SET_IS_LOADING_OFF) {
    return Object.assign({}, state, {
      isLoading: false,
    });
  }
  if (action.type === SET_LATEST_ERROR) {
    return Object.assign({}, state, {
      latestError: action.payload,
    });
  }
  if (action.type === SET_FILTER) {
    return Object.assign({}, state, {
      filter: action.payload,
    });
  }
  if (action.type === SET_NATIONALITY_FILTER) {
    return Object.assign({}, state, {
      nationalityFilter: action.payload,
    });
  }

  return state;
}

export const store = createStore(rootReducer);
