import { usersActionsConstants } from "./constants";

function checkUserNameAvailableAction(prefix) {
  return {
    type: usersActionsConstants.CHECK_USERNAME_AVAILABLE_ACTION,
    uri: "/api/accounts/username?username=",
    payload: {
      prefix
    }
  };
}

function getUserAction(prefix) {
  return {
    type: usersActionsConstants.GET_USER_ACTION,
    uri: "/api/accounts/getuser?username=",
    payload: {
      prefix
    }
  };
}

function registerUserAction(userName, password, location, picture) {
  return {
    type: usersActionsConstants.REGISTER_USER_ACTION,
    uri: "/api/accounts/register",
    payload: {
      userName,
      password,
      location,
      picture
    }
  };
}

function loadUsersAction(prefix) {
  return {
    type: usersActionsConstants.LOAD_USERS_ACTION,
    uri: "/api/accounts/allusers?username=",
    payload: {
      prefix
    }
  };
}

function loginUserAction(userName, password) {
  return {
    type: usersActionsConstants.LOGIN_USER_ACTION,
    uri: "/api/accounts/login",
    payload: {
      userName,
      password
    }
  };
}

function checkSessionAction() {
  return {
    type: usersActionsConstants.CHECK_SESSION_ACTION,
    uri: "/api/accounts/checksession",
    payload: {
    }
  };
}

function logoutUserAction() {
  return {
    type: usersActionsConstants.LOGOUT_USER_ACTION,
    uri: "/api/accounts/logout",
    payload: {
    }
  };
}

function getUserSuccessAction(json) {
  return {
    type: usersActionsConstants.GET_USER_SUCCESS_ACTION,
    payload: {
      formData: json
    }
  };
}

function checkUserNameAvailableSuccessAction(json) {
  return {
    type: usersActionsConstants.CHECK_USERNAME_AVAILABLE_SUCCESS_ACTION,
    payload: {
      user: json
    }
  };
}

function loadUsersSuccessAction(json) {
  return {
    type: usersActionsConstants.LOAD_USERS_SUCCESS_ACTION,
    payload: {
      users: json
    }
  };
}

function registerUserSuccessAction(json) {
  return {
    type: usersActionsConstants.REGISTER_USER_SUCCESS_ACTION,
    payload: {
      isRegistered: json
    }
  };
}

function loginUserSuccessAction(json) {
  return {
    type: usersActionsConstants.LOGIN_USER_SUCCESS_ACTION,
    payload: {
      isLoggedIn: json
    }
  };
}

function checkSessionSuccessAction(json) {
  return {
    type: usersActionsConstants.CHECK_SESSION_SUCCESS_ACTION,
    payload: {
      userSession: json
    }
  };
}

function logoutUserSuccessAction(json) {
  return {
    type: usersActionsConstants.LOGOUT_USER_SUCCESS_ACTION,
    payload: {
      userSession: json
    }
  };
}

function getUserFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function checkUserNameAvailableFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function loadUsersFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function registerUserFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function loginUserFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function checkSessionFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function logoutUserFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function userReviewsAction(prefix) {
  return {
    type: usersActionsConstants.USER_REVIEWS_ACTION,
    uri: "/api/accounts/id?username=",
    payload: {
      prefix
    }
  };
}

function userReviewsSuccessAction(json) {
  return {
    type: usersActionsConstants.USER_REVIEWS_SUCCESS_ACTION,
    payload: {
      userReviews: json
    }
  };
}

function userReviewsFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function changeUserAction(username, parameter, changeParameter) {
  return {
    type: usersActionsConstants.CHANGE_USER_ACTION,
    uri: "/api/accounts/changeuser",
    payload: {
      username,
      parameter,
      changeParameter
    }
  };
}

function changeUserSuccessAction(json) {
  return {
    type: usersActionsConstants.CHANGE_USER_SUCCESS_ACTION,
    payload: {
      isChanged: json
    }
  };
}

function changeUserFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

let UsersActions = {
  getUserAction,
  getUserSuccessAction,
  getUserFailureAction,
  checkUserNameAvailableAction,
  checkUserNameAvailableSuccessAction,
  checkUserNameAvailableFailureAction,
  loadUsersAction,
  loadUsersSuccessAction,
  loadUsersFailureAction,
  registerUserAction,
  registerUserSuccessAction,
  registerUserFailureAction,
  loginUserAction,
  loginUserSuccessAction,
  loginUserFailureAction,
  checkSessionAction,
  checkSessionSuccessAction,
  checkSessionFailureAction,
  logoutUserAction,
  logoutUserSuccessAction,
  logoutUserFailureAction,
  userReviewsAction,
  userReviewsSuccessAction,
  userReviewsFailureAction,
  changeUserAction,
  changeUserSuccessAction,
  changeUserFailureAction
};

export default UsersActions;
