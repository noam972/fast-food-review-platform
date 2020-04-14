import { usersActionsConstants } from "./constants";
import initialState from "../../initialState";
import { List } from "immutable";

const UsersReducer = (state = initialState.Users, action) => {
  console.log("UsersReducerState=", state);
  switch (action.type) {
    case usersActionsConstants.LOAD_USERS_SUCCESS_ACTION:
      console.log(
        "usersActionsConstants.LOAD_USERS_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
        "users",
        new List(action.payload.users) //need to handle initialState First
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.CHECK_USERNAME_AVAILABLE_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.CHECK_USERNAME_AVAILABLE_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "user",
          new List(action.payload.user) //need to handle initialState First
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.REGISTER_USER_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.REGISTER_USER_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "isRegistered",
          new List(action.payload.isRegistered)
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.LOGIN_USER_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.LOGIN_USER_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "isLoggedIn",
          new List(action.payload.isLoggedIn)
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.CHECK_SESSION_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.CHECK_SESSION_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "userSession",
          new List(action.payload.userSession)
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.LOGOUT_USER_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.LOGOUT_USER_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "userSession",
          new List(action.payload.userSession)
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.GET_USER_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.GET_USER_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "formData",
          new List(action.payload.formData) //need to handle initialState First
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.USER_REVIEWS_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.USER_REVIEWS_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "userReviews",
          new List(action.payload.userReviews) //need to handle initialState First
      );
      console.log("NEW STATE=", state);
      return state;
    case usersActionsConstants.CHANGE_USER_SUCCESS_ACTION:
      console.log(
          "usersActionsConstants.CHANGE_USER_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "isChanged",
          new List(action.payload.isChanged) //need to handle initialState First
      );
      console.log("NEW STATE=", state);
      return state;
    default:
      //otherwise state is lost!
      return state;

  }
};

export default UsersReducer;
