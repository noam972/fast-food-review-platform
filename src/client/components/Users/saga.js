import { usersActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import UsersActions from "./actions";
import {fromJS} from "immutable";

function* loadUsers(action) {
  const { prefix } = action.payload;
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri+prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.loadUsersSuccessAction(fromJS(json.userExists)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.loadUsersFailureAction(e.message));
  }
}

function* checkUserNameAvailable(action) {
  const { prefix } = action.payload;
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri+prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.checkUserNameAvailableSuccessAction(fromJS(json.userExists)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.checkUserNameAvailableFailureAction(e.message));
  }
}

function* getUser(action) {
  const {prefix} = action.payload;
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri + prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    yield put(UsersActions.getUserSuccessAction(fromJS(json.userExists)));
  } catch (e) {
    console.log("error", e);
    yield put(UsersActions.getUserFailureAction(e.message));
  }
}


function* registerUser(action) {
  const {userName, password, location, picture } = action.payload;
  console.log("UsersSaga=", action);
  try {
    const formData = new FormData();
    formData.append('username', action.payload.userName);
    formData.append('password', action.payload.password);
    formData.append('location', action.payload.location);
    formData.append('picture', action.payload.picture);

    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: formData
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.registerUserSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.registerUserFailureAction(e.message));
  }
}

function* loginUser(action) {
  const {userName, password} = action.payload;
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName,
        password: password
      })
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.loginUserSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.loginUserFailureAction(e.message));
  }
}

function* checkSession(action) {
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.checkSessionSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.checkSessionFailureAction(e.message));
  }
}

function* logoutUser(action) {
  console.log("UsersSaga=", action);
  try {
    yield call(fetch, action.uri, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    yield put(UsersActions.logoutUserSuccessAction(''));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.logoutUserFailureAction(e.message));
  }
}

function* userReviews(action) {
  const {prefix} = action.payload;
  console.log("UsersSaga=", action);
  try {
    const res = yield call(fetch, action.uri + prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    yield put(UsersActions.userReviewsSuccessAction(fromJS(json.existReview)));
  } catch (e) {
    console.log("error", e);
    yield put(UsersActions.userReviewsFailureAction(e.message));
  }
}

function* changeUser(action) {
  const {username, parameter, changeParameter } = action.payload;
  console.log("UsersSaga=", action);
  try {
    const formData = new FormData();
    formData.append('username', action.payload.username);
    formData.append('parameter', action.payload.parameter);
    formData.append('changeParameter', action.payload.changeParameter);

    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: formData
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(UsersActions.changeUserSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(UsersActions.changeUserFailureAction(e.message));
  }
}

function* UsersSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(
    usersActionsConstants.LOAD_USERS_ACTION,
    loadUsers
  );
  yield takeEvery(
      usersActionsConstants.CHECK_USERNAME_AVAILABLE_ACTION,
      checkUserNameAvailable
  );

  yield takeEvery(
      usersActionsConstants.GET_USER_ACTION,
      getUser
  );

  yield takeEvery(
      usersActionsConstants.REGISTER_USER_ACTION,
      registerUser
  );

  yield takeEvery(
      usersActionsConstants.LOGIN_USER_ACTION,
      loginUser
  );

  yield takeEvery(
      usersActionsConstants.CHECK_SESSION_ACTION,
      checkSession
  );

  yield takeEvery(
      usersActionsConstants.LOGOUT_USER_ACTION,
      logoutUser
  );

  yield takeEvery(
      usersActionsConstants.USER_REVIEWS_ACTION,
      userReviews
  );

  yield takeEvery(
      usersActionsConstants.CHANGE_USER_ACTION,
      changeUser
  );
}

export default UsersSaga;
