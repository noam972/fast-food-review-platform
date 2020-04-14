import React from "react";
import "./Users.scss";
import { connect } from "react-redux";
import UsersActions from "./actions";
import {Redirect} from "react-router";


class Login extends React.Component {
    state =  {
        userInput: '',
        userPassword: '',
    };

    componentDidMount() {
        this.props.loginUserEventHandler("");
    }

    render() {
        console.log("Render= ",this.props.users);
        let isLoggedIn= '';
        if(this.props.isLoggedIn) {
            isLoggedIn = this.props.isLoggedIn.map(rest => rest[1]);
            isLoggedIn = isLoggedIn[0];
            if(isLoggedIn){
                isLoggedIn = false;
                return (<Redirect to={"/"}/>);
            }
        }
        return (
            <div className="users-root">
                <br/>
                <div className="login-button">
                    <div className="form-group ">
                        <label>UserName</label>
                        <input type="text" className="form-control" id="InputUserName" value={this.state.userInput}
                               onChange= {e => this.setState({userInput: e.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.userPassword}
                               onChange= {e => this.setState({userPassword: e.target.value})}/>
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={() => {this.props.loginUserEventHandler(this.state.userInput, this.state.userPassword); this.props.checkSessionEventHandler();}}>
                        Login
                    </button>
                    <br/>
                    <label><a href="/register">Not registered? click here</a></label>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState isLoggedIn= ",globalState['Users'].get('isLoggedIn'));


    return {
        isLoggedIn: globalState['Users'].get('isLoggedIn') && globalState['Users'].get('isLoggedIn').valueSeq().toArray()
    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserNameAvailableEventHandler: prefix => {
            dispatch(UsersActions.checkUserNameAvailableAction(prefix));
        },
        loadUsersEventHandler: prefix => {
            dispatch(UsersActions.loadUsersAction(prefix));
        },
        loginUserEventHandler: (username, password) => {
            dispatch(UsersActions.loginUserAction(username, password));
        },
        checkSessionEventHandler: () => {
            dispatch(UsersActions.checkSessionAction());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);