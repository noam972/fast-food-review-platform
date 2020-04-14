import { restaurantsActionsConstants } from "./constants";

function loadRestaurantsAction(prefix) {
  return {
    type: restaurantsActionsConstants.LOAD_RESTAURANTS_ACTION,
    uri: "/api/restaurants/search?name=",
    payload: {
      prefix
    }
  };
}

function loadRestaurantsSuccessAction(json) {
  return {
    type: restaurantsActionsConstants.LOAD_RESTAURANTS_SUCCESS_ACTION,
    payload: {
      restaurants: json
    }
  };
}

function loadRestaurantsFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function makeRestaurantAction(name, location, picture) {
  return {
    type: restaurantsActionsConstants.MAKE_RESTAURANT_ACTION,
    uri: "/api/restaurants/makerestaurant",
    payload: {
      name,
      location,
      picture
    }
  };
}

function makeRestaurantSuccessAction(json) {
  return {
    type: restaurantsActionsConstants.MAKE_RESTAURANT_SUCCESS_ACTION,
    payload: {
      isMaid: json
    }
  };
}

function makeRestaurantFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function writeReviewAction(username, restaurantid, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, picture) {
  return {
    type: restaurantsActionsConstants.WRITE_REVIEW_ACTION,
    uri: "/api/reviews/writereview",
    payload: {
      username,
      restaurantid,
      bathroomquality,
      staffkindness,
      cleanliness,
      drivethru,
      deliveryspeed,
      foodquality,
      picture
    }
  };
}

function writeReviewSuccessAction(json) {
  return {
    type: restaurantsActionsConstants.WRITE_REVIEW_SUCCESS_ACTION,
    payload: {
      isReviewed: json
    }
  };
}

function writeReviewFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function findRestaurantAction(prefix) {
  return {
    type: restaurantsActionsConstants.FIND_RESTAURANT_ACTION,
    uri: "/api/restaurants/id?id=",
    payload: {
      prefix
    }
  };
}

function findRestaurantSuccessAction(json) {
  return {
    type: restaurantsActionsConstants.FIND_RESTAURANT_SUCCESS_ACTION,
    payload: {
      restaurant: json
    }
  };
}

function findRestaurantFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

function loadReviewsRestaurantAction(prefix) {
  return {
    type: restaurantsActionsConstants.LOAD_REVIEWS_RESTAURANT_ACTION,
    uri: "/api/restaurantreviews/id?id=",
    payload: {
      prefix
    }
  };
}

function loadReviewsRestaurantSuccessAction(json) {
  return {
    type: restaurantsActionsConstants.LOAD_REVIEWS_RESTAURANT_SUCCESS_ACTION,
    payload: {
      reviews: json
    }
  };
}

function loadReviewsRestaurantFailureAction() {
  return {
    type: "failure",
    payload: {}
  };
}

let RestaurantsActions = {
  loadRestaurantsAction,
  loadRestaurantsSuccessAction,
  loadRestaurantsFailureAction,
  makeRestaurantAction,
  makeRestaurantSuccessAction,
  makeRestaurantFailureAction,
  writeReviewAction,
  writeReviewSuccessAction,
  writeReviewFailureAction,
  findRestaurantAction,
  findRestaurantSuccessAction,
  findRestaurantFailureAction,
  loadReviewsRestaurantAction,
  loadReviewsRestaurantSuccessAction,
  loadReviewsRestaurantFailureAction
};

export default RestaurantsActions;
