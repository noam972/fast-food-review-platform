import React from "react";
import "./Users.scss";
import { connect } from "react-redux";
import UsersActions from "./actions";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";


class SearchUser extends React.Component {
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
        let users = '';
        let user = '';
        if(this.props.users){ //<div key={'user'+ind}>
            users = this.props.users.map(rest => rest.valueSeq().toArray());
            users = this.props.users.map((rest, id) => <tr><th scope="row" key={id}>{id}</th><td><a href={"/users/"+rest.get('username')}>{rest.get('username')}</a></td><td>{rest.get('location')}</td></tr>);
        }
        return (
            <div>
                <br/>
                <div className="search-button">
                    <InputGroup className="mb-4">
                        <FormControl
                            placeholder="Search a user"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={this.state.userInput}
                            onChange= {e => this.setState({userInput: e.target.value})}
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary" onClick={() => this.props.loadUsersEventHandler(this.state.userInput)}>Search</Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>

                <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Location</th>
                    </tr>
                    </thead>
                    <tbody>
                        {users}
                    </tbody>
                </table>

                {/*<div className="ui-g-12 ui-md-4">*/}
                {/*    <div className="ui-inputgroup">*/}
                {/*        <inputText placeHolder="Keyboard" value={this.state.userInput} onChange= {e => this.setState({userInput: e.target.value})}/>*/}
                {/*        <commandButton icon="pi pi-search" styleClass="white-button" onClick={() => this.props.loadUsersEventHandler(this.state.userInput)}/>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*{users}*/}
                <br/><br/>
                {/*<div>{users}</div>*/}
            </div>
        );
    }
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState User= ",globalState['Users'].get('user'));
    console.log("GlobalState Users= ",globalState['Users'].get('users'));

    return {
        user: globalState['Users'].get('user') && globalState['Users'].get('user').valueSeq().toArray(),
        users: globalState['Users'].get('users') && globalState['Users'].get('users').valueSeq().toArray()
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchUser);