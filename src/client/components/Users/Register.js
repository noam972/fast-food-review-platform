import "./Users.scss";
import InputText from 'react-bootstrap/InputGroup';
import { connect } from "react-redux";
import UsersActions from "./actions";
import Button from "react-bootstrap/Button";
import React, {createRef} from 'react'
import Dropzone from 'react-dropzone'
import {Route, Router, Switch, Redirect} from "react-router";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import {Link} from "react-router-dom";

class Register extends React.Component {
    state =  {
        userInput: '',
        userPassword: '',
        userLocation: '',
        userGeoLocation: '',
        userPicture: '',
    };

    componentDidMount() {
        this.props.checkUserNameAvailableEventHandler("");
    };

    dropzoneRef = createRef();

    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    };


    render() {
        let user = '';
        let isRegistered = '';
        if(this.props.isRegistered) {
            isRegistered = this.props.isRegistered.map(x => x[1]);
            isRegistered = isRegistered[1];
            console.log("IsRegistered= ", isRegistered);
        }
        if(this.props.user) {
            user = this.props.user.map((rest, ind) => rest);
            console.log("User= ", user);
            console.log("length of user ", user.length);
        }
        return (
            <div className="users-root">
                <br/>
                <div className="register-button">
                    <div className="form-group ">
                        <label>UserName</label>
                        <input type="text" className="form-control" id="InputUserName" value={this.state.userInput}
                               onChange= {e => {this.setState({userInput: e.target.value}); this.props.checkUserNameAvailableEventHandler(e.target.value);}}/>
                            <small className="form-text text-muted">{user.length? " User name already exist!" : ""}</small>
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className="form-control" value={this.state.userPassword}
                        onChange= {e => this.setState({userPassword: e.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" value={this.state.userLocation}
                               onChange= {e => this.setState({userLocation: e.target.value})}/>
                        {/*<input type="text" className="form-control" value={this.state.userLocation} onChange= {e => this.setState({userLocation: e.target.value})}/>*/}
                    </div>

                    <Dropzone ref={this.dropzoneRef} noClick noKeyboard accept={'image/*'}
                              onDrop={acceptedFiles => this.setState({userPicture: acceptedFiles[0]})}>
                        {({getRootProps, getInputProps, acceptedFiles}) =>
                            (
                                <div className="container">
                                    <div {...getRootProps({className: 'dropzone'})}>
                                        <input {...getInputProps()}/>
                                        <p>Drag 'n' drop some files here</p>
                                        <Button variant="link"
                                                type="button"
                                                onClick={this.openDialog}
                                        >
                                            Open File Dialog
                                        </Button>
                                    </div>
                                    <form className="text-muted">
                                        {acceptedFiles.map(file => (
                                            <li key={file.path}>
                                                {file.path} - {file.size} bytes
                                            </li>
                                        ))}
                                    </form>
                                </div>
                            )
                        }
                    </Dropzone>

                    <button
                            className="btn btn-primary"
                            onClick={() => this.props.registerUserHandler(this.state.userInput, this.state.userPassword, this.state.userLocation, this.state.userPicture)}>
                        Register
                    </button>
                </div>
                <br/>
                    {isRegistered === "successfully Registered!"? <h3>successfully Registered!  <a href="/login">go to login</a></h3>: <h3>{isRegistered}</h3>}
                    {/*{isRegistered === "successfully Registered!"? : <Redirect to="/login" />}*/}
            </div>
        );
    }
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState User= ",globalState['Users'].get('user'));
    console.log("GlobalState Users= ",globalState['Users'].get('users'));
    console.log("GlobalState isRegistered= ",globalState['Users'].get('isRegistered'));

    return {
        user: globalState['Users'].get('user') && globalState['Users'].get('user').toArray(),
        users: globalState['Users'].get('users') && globalState['Users'].get('users').toArray(),
        isRegistered: globalState['Users'].get('isRegistered') && globalState['Users'].get('isRegistered').toArray()
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
        registerUserHandler: (userName, password, location, picture) => {
            dispatch(UsersActions.registerUserAction(userName, password, location, picture));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);