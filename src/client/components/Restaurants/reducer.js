import { restaurantsActionsConstants } from "./constants";
import initialState from "../../initialState";
import { List } from "immutable";

const RestaurantsReducer = (state = initialState.Restaurants, action) => {
  console.log("RestaurantsReducerState=", state);
  switch (action.type) {
    case restaurantsActionsConstants.LOAD_RESTAURANTS_SUCCESS_ACTION:
      console.log(
        "restaurantsActionsConstants.LOAD_RESTAURANTS_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
        "restaurants",
        new List(action.payload.restaurants)
      );
      console.log("NEW STATE=", state);
      return state;
    case restaurantsActionsConstants.MAKE_RESTAURANT_SUCCESS_ACTION:
      console.log(
          "restaurantsActionsConstants.MAKE_RESTAURANT_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "isMaid",
          new List(action.payload.isMaid)
      );
      console.log("NEW STATE=", state);
      return state;
    case restaurantsActionsConstants.WRITE_REVIEW_SUCCESS_ACTION:
      console.log(
          "restaurantsActionsConstants.WRITE_REVIEW_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "isReviewed",
          new List(action.payload.isReviewed)
      );
      console.log("NEW STATE=", state);
      return state;
    case restaurantsActionsConstants.FIND_RESTAURANT_SUCCESS_ACTION:
      console.log(
          "restaurantsActionsConstants.FIND_RESTAURANT_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "restaurant",
          new List(action.payload.restaurant)
      );
      console.log("NEW STATE=", state);
      return state;
    case restaurantsActionsConstants.LOAD_REVIEWS_RESTAURANT_SUCCESS_ACTION:
      console.log(
          "restaurantsActionsConstants.LOAD_REVIEWS_RESTAURANT_SUCCESS_ACTION"
      );
      console.log("ACTION:", action);
      state = state.set(
          "reviews",
          new List(action.payload.reviews)
      );
      console.log("NEW STATE=", state);
      return state;
    default:
      //otherwise state is lost!
      return state;
  }
};

export default RestaurantsReducer;
