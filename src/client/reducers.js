import { combineReducers } from "redux";
import RestaurantsReducer from "./components/Restaurants/reducer";
import UsersReducer from "./components/Users/reducer";

export default combineReducers({
  Restaurants: RestaurantsReducer,
  Users: UsersReducer
});
