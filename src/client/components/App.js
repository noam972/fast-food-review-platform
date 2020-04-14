import React from "react";
import "./App.scss";
import { connect } from "react-redux";
import Restaurants from "./Restaurants";
import RestaurantsActions from "./Restaurants/actions";
import Users from "./Users/Users";
import UsersActions from "./Users/actions";
import Login from "./Users/Login";
import Register from "./Users/Register";
import SearchUser from "./Users/SearchUser";
import {Route, Router, Switch, Redirect, useParams} from "react-router";
import { createBrowserHistory } from "history";
import User from "./Users/User";
import MakeRestaurant from "./Restaurants/MakeRestaurant";
import Restaurant from "./Restaurants/Restaurant";

class App extends React.Component {
  state =  {
    isSession: '',
    homeClicked: '',
    usersClicked: '',
    restClicked: '',

  };

  componentDidMount() {
    console.log("User Router= ", this.props.userRouter);
    this.props.checkSessionEventHandler();
  }

  render() {
      let userSession = '';
      let navBarLogged = '';
      if(!this.props.userSession.length){
          this.props.checkSessionEventHandler();
      }
      if(this.props.userSession) {
        userSession = this.props.userSession.map(rest => rest[1]);
        userSession = userSession[0];
      }
      if(userSession){
        navBarLogged = <div><span className="navbar-text">Hello, {userSession}&nbsp;</span><button className="btn btn-outline-danger" onClick={()=> {let x = this.props.logoutUserEventHandler(); }
        }>Logout</button></div>;
      }
      else {
        navBarLogged = <div><button className="btn btn-outline-success" onClick={(e) => {e.preventDefault();window.location.href='/login';}}>Login</button></div>;
      }

    return (
      <div className="app-root">
        <div className="app-header">
          <h2>The Restaurant</h2>
        </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav mr-auto">
                  <li key= {1} className={"nav-item"+this.state.homeClicked}>
                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li key= {2} className={"nav-item"+this.state.restClicked}>
                    <a className="nav-link" href="/searchrestaurants">Restaurants</a>
                  </li>
                  <li key= {3} className={"nav-item"+this.state.usersClicked}>
                    <a className="nav-link" href="/searchusers">Users</a>
                  </li>
                </ul>
                {navBarLogged}
              </div>
            </nav>
        <Router history={createBrowserHistory()}>
          <Switch>
            <Route path="/login" component= {Login }/>
            <Route path="/makerest" component= {MakeRestaurant }/>
            <Route path="/searchrestaurants" component= {Restaurants }/>
            <Route path="/register" component= {Register}/>
            <Route path="/searchusers" component= {SearchUser}/>
            <Route path="/users/:userNameRoute" exact component = {(routerProps) => <User userRouter={routerProps.match.params.userNameRoute}/>}/>
            <Route path="/restaurants/:restNameRoute" exact component = {(routerProps) => <Restaurant restRouter={routerProps.match.params.restNameRoute}/>}/>
          </Switch>
        </Router>
      {/*<Register/>*/}
      </div>
    );
  }
}



const mapStateToProps = (globalState, props) => {
  console.log("GlobalState userSession= ",globalState['Users'].get('userSession'));
  console.log("GlobalState User= ",globalState['Users'].get('user'));
  return {
      user: globalState['Users'].get('user').valueSeq().toArray() && globalState['Users'].get('user').valueSeq().toArray(),
      userSession: globalState['Users'].get('userSession') && globalState['Users'].get('userSession').valueSeq().toArray(),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkSessionEventHandler: () => {
      dispatch(UsersActions.checkSessionAction());
    },
    logoutUserEventHandler: () => {
      dispatch(UsersActions.logoutUserAction());
    },
    checkUserNameAvailableEventHandler: prefix => {
      dispatch(UsersActions.checkUserNameAvailableAction(prefix));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
