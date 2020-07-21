import {
  addToCache,
  addFromCache,
  setIsLoadingOn,
  setIsLoadingOff,
  setLatestError,
  setFilter,
  setNationalityFilter,
} from "./war";
import {
  ADD_BATCH_TO_CACHE,
  MOVE_USERS_FROM_CACHE,
  SET_IS_LOADING_ON,
  SET_IS_LOADING_OFF,
  SET_LATEST_ERROR,
  SET_FILTER,
  SET_NATIONALITY_FILTER,
} from "./war";
import { rootReducer } from "./war";
import { BATCH_SIZE } from "../shared/Constants";

describe("Test reducer", () => {
  it("should return the initial state", () => {
    const actualResults = rootReducer(undefined, {});
    const expectedResults = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
      nationalityFilter: ["CH", "ES", "FR", "GB"],
    };
    expect(actualResults).toEqual(expectedResults);
  });

  it("should add users to the cache", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: ADD_BATCH_TO_CACHE,
      payload: [{ name: "testUser" }],
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [{ name: "testUser" }],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should move users from cache and increment the usersLoaded count", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [{ name: "testUser" }],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: MOVE_USERS_FROM_CACHE,
    });
    const expectedState = {
      users: [{ name: "testUser" }],
      usersLoaded: BATCH_SIZE,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set is loading on", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_IS_LOADING_ON,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: true,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set is loading off", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: true,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_IS_LOADING_OFF,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should leave is loading to off", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_IS_LOADING_OFF,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should leave is loading to on", () => {
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: true,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_IS_LOADING_ON,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: true,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set the latest error", () => {
    const errorMessage = "I am an error message";
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_LATEST_ERROR,
      payload: errorMessage,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: errorMessage,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set the latest error to null", () => {
    const errorMessage = "I am an error message";
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: errorMessage,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_LATEST_ERROR,
      payload: null,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set the filter", () => {
    const filter = "I am a filter";
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_FILTER,
      payload: filter,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: filter,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set the filter to null", () => {
    const filter = "I am a filter";
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    const actualResults = rootReducer(preState, {
      type: SET_FILTER,
      payload: null,
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
    };
    expect(actualResults).toEqual(expectedState);
  });

  it("should set the nationalities to CH", () => {
    const filter = "I am a filter";
    const preState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
      nationalityFilter: ["CH", "ES", "FR", "GB"],
    };
    const actualResults = rootReducer(preState, {
      type: SET_NATIONALITY_FILTER,
      payload: ["CH"],
    });
    const expectedState = {
      users: [],
      usersLoaded: 0,
      cachedUsers: [],
      isLoading: false,
      latestError: null,
      filter: null,
      nationalityFilter: ["CH"],
    };
    expect(actualResults).toEqual(expectedState);
  });
});

describe("Test actions", () => {
  it("should create an action to add to the cache", () => {
    const expectedAction = {
      type: ADD_BATCH_TO_CACHE,
      payload: [{ name: "test" }],
    };

    const actualAction = addToCache([{ name: "test" }]);
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to move users from the cache to the users list", () => {
    const expectedAction = {
      type: MOVE_USERS_FROM_CACHE,
    };

    const actualAction = addFromCache();
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to set the IsLoading flag to on", () => {
    const expectedAction = {
      type: SET_IS_LOADING_ON,
    };

    const actualAction = setIsLoadingOn();
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to set the IsLoading flag to off", () => {
    const expectedAction = {
      type: SET_IS_LOADING_OFF,
    };

    const actualAction = setIsLoadingOff();
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to set latest Error message in the global state", () => {
    const message = "I am an error message";
    const expectedAction = {
      type: SET_LATEST_ERROR,
      payload: message,
    };

    const actualAction = setLatestError(message);
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to set filter", () => {
    const filter = "I am a filter";
    const expectedAction = {
      type: SET_FILTER,
      payload: filter,
    };

    const actualAction = setFilter(filter);
    expect(actualAction).toEqual(expectedAction);
  });

  it("should create an action to set nationality filter", () => {
    const nationalities = ["CH", "FR"];
    const expectedAction = {
      type: SET_NATIONALITY_FILTER,
      payload: nationalities,
    };

    const actualAction = setNationalityFilter(nationalities);
    expect(actualAction).toEqual(expectedAction);
  });
});
