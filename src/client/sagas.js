import { all } from "redux-saga/effects";
import RestaurantsSaga from "./components/Restaurants/saga";
import UsersSaga from "./components/Users/saga";

export default function* Sagas() {
  yield all([RestaurantsSaga(),UsersSaga()]);
}
