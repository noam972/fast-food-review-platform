const { List, Map } = require("immutable");

export default {
  Restaurants: Map({
    input: '',
    isMaid: List(),
    isReviewed: List(),
    restaurants: List(),
    restaurant: List(),
    reviews: List()
  }),
  Users: Map({
    input: '',
    user: List(),
    users: List(),
    isRegistered: List(),
    isLoggedIn: List(),
    isChanged: List(),
    userSession: List(),
    formData: List(),
    userReviews: List()
  })
}