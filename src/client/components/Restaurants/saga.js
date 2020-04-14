import { restaurantsActionsConstants } from "./constants";
import { call, put, takeEvery } from "redux-saga/effects";
import RestaurantsActions from "./actions";
import {fromJS} from "immutable";

function* loadRestaurants(action) {
  const { prefix } = action.payload;
  console.log("RestaurantsSaga=", action);
  try {
    console.log("im here");
    const res = yield call(fetch, action.uri+prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(RestaurantsActions.loadRestaurantsSuccessAction(fromJS(json.restaurantExists)));
  } catch (e) {
    console.log("error",e);
    yield put(RestaurantsActions.loadRestaurantsFailureAction(e.message));
  }
}

function* makeRestaurant(action) {
  const {name, location, picture } = action.payload;
  console.log("RestaurantsSaga=", action);
  try {
    const formData = new FormData();
    formData.append('name', action.payload.name);
    formData.append('location', action.payload.location);
    formData.append('picture', action.payload.picture);

    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: formData
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(RestaurantsActions.makeRestaurantSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(RestaurantsActions.makeRestaurantFailureAction(e.message));
  }
}

function* writeReview(action) {
  const {username, restaurantid, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, picture} = action.payload;
  console.log("RestaurantsSaga=", action);
  try {
    const formData = new FormData();
    formData.append('username', action.payload.username);
    formData.append('restaurantid', action.payload.restaurantid);
    formData.append('bathroomquality', action.payload.bathroomquality);
    formData.append('staffkindness', action.payload.staffkindness);
    formData.append('cleanliness', action.payload.cleanliness);
    formData.append('drivethru', action.payload.drivethru);
    formData.append('deliveryspeed', action.payload.deliveryspeed);
    formData.append('foodquality', action.payload.foodquality);
    formData.append('picture', action.payload.picture);

    const res = yield call(fetch, action.uri, {
      method: "POST",
      body: formData
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(RestaurantsActions.writeReviewSuccessAction(fromJS(json)));
  } catch (e) {
    console.log("error",e);
    yield put(RestaurantsActions.writeReviewFailureAction(e.message));
  }
}

function* findRestaurant(action) {
  const { prefix } = action.payload;
  console.log("RestaurantsSaga=", action);
  try {
    const res = yield call(fetch, action.uri+prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(RestaurantsActions.findRestaurantSuccessAction(fromJS(json.restaurantExists)));
  } catch (e) {
    console.log("error",e);
    yield put(RestaurantsActions.findRestaurantFailureAction(e.message));
  }
}

function* loadReviewsRestaurant(action) {
  const { prefix } = action.payload;
  console.log("RestaurantsSaga=", action);
  try {
    const res = yield call(fetch, action.uri+prefix, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const json = yield call([res, "json"]); //retrieve body of response
    console.log(json);
    yield put(RestaurantsActions.loadReviewsRestaurantSuccessAction(fromJS(json.existReview)));
  } catch (e) {
    console.log("error",e);
    yield put(RestaurantsActions.loadReviewsRestaurantFailureAction(e.message));
  }
}

function* RestaurantsSaga() {
  //using takeEvery, you take the action away from reducer to saga
  yield takeEvery(
    restaurantsActionsConstants.LOAD_RESTAURANTS_ACTION,
    loadRestaurants
  );
  yield takeEvery(
      restaurantsActionsConstants.MAKE_RESTAURANT_ACTION,
      makeRestaurant
  );
  yield takeEvery(
      restaurantsActionsConstants.WRITE_REVIEW_ACTION,
      writeReview
  );
  yield takeEvery(
      restaurantsActionsConstants.FIND_RESTAURANT_ACTION,
      findRestaurant
  );
  yield takeEvery(
      restaurantsActionsConstants.LOAD_REVIEWS_RESTAURANT_ACTION,
      loadReviewsRestaurant
  );
}

export default RestaurantsSaga;
