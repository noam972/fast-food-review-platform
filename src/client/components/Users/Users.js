import React from "react";
// import { Lightbox } from "react-modal-image";
import "./Users.scss";
import {InputText} from 'primereact/inputtext';
import { connect } from "react-redux";
import UsersActions from "./actions";
import {Button} from "primereact/button";

class Users extends React.Component {
  state =  {
    userInput: '',
    userPassword: '',
    userLocation: '',
    userPicture: '',
  };

  componentDidMount() {
    this.props.loadUsersEventHandler("");
    this.props.checkUserNameAvailableEventHandler("");
  }

  render() {
    console.log("Render= ",this.props.users);
    let users = '';
    let user = '';
    if(this.props.users)
      users = this.props.users.map((rest,ind) => <div key={'user'+ind}>{rest}</div> );
    if(this.props.user) {
      user = this.props.user.map((rest, ind) => rest);
      console.log("User= ", user);
      console.log("length of user ", user.length);
    }
    return (
        <div className="users-root">
          <br/>
          <label>Username: </label>
            <InputText
                id="userName"
                type="text"
                value={this.state.userInput}
                onChange= {e => {this.setState({userInput: e.target.value}); this.props.checkUserNameAvailableEventHandler(e.target.value);}} />
          <label>{user.length? " User name already exist!" : ""}</label>
        <br/><br/>
          <label>Password: </label>
          <InputText
              id="password"
              type="password"
              value={this.state.userPassword}
              onChange= {e => this.setState({userPassword: e.target.value})} />
          {console.log("Password= ", this.state.userPassword)}
          <br/><br/>
        <Button
            label="Login"
            className="p-button-raised p-button"
            onClick={() => this.props.loadUsersEventHandler(this.state.userInput)}
        />
      {/*<div>{users}</div>*/}
    </div>
  );
  }
}

const mapStateToProps = (globalState, props) => {
  console.log("GlobalState User= ",globalState['Users'].get('user'));
  console.log("GlobalState Users= ",globalState['Users'].get('users'));

  return {
    user: globalState['Users'].get('user') && globalState['Users'].get('user').toArray(),
    users: globalState['Users'].get('users') && globalState['Users'].get('users').toArray()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    checkUserNameAvailableEventHandler: prefix => {
      dispatch(UsersActions.checkUserNameAvailableAction(prefix));
    },
    loadUsersEventHandler: prefix => {
      dispatch(UsersActions.loadUsersAction(prefix));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
