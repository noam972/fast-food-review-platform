import React, {useEffect} from "react";
import "./Users.scss";
import { connect } from "react-redux";
import UsersActions from "./actions";



class User extends React.Component {
    state =  {
        userRouter: this.props.userRouter,
        editName: '',
        editPassword: '',
        editLocation: '',
        editPicture: '',
    };

    componentDidMount() {
    }

    render() {
        let userSession = '';
        let userReviews = '';
        let isChanged = '';
        if(!this.props.user.length){
            this.props.checkUserNameAvailableEventHandler(this.state.userRouter);
            this.props.userReviewsEventHandler(this.state.userRouter);
        }
        if(this.props.userSession) {
            userSession = this.props.userSession.map(rest => rest[1]);
            userSession = userSession[0];
        }
        if(this.props.isChanged) {
            isChanged = this.props.isChanged.map(rest => rest[1]);
            isChanged = isChanged[1];
            console.log("isChanged= ", isChanged);
        }
        if(this.props.userReviews) {
            userReviews = this.props.userReviews.map(rest => rest.valueSeq().toArray());
            userReviews = this.props.userReviews.map((rest, id) => makeCardOfReviews(makeImages(rest.get('picture')), rest.get('restaurantname'), rest.get('bathroomquality'), rest.get('staffkindness'), rest.get('cleanliness'), rest.get('drivethru'), rest.get('deliveryspeed'), rest.get('foodquality'), rest.get('creationdate'), id));
        }
        let formData = '';
        let binaryImg = '';
        let nameOfUser = '';
        let locationOfUser = '';
        if(this.props.user){ //<div key={'user'+ind}>
            formData = this.props.user.map(x => x.valueSeq().toArray());
            console.log(formData);
            formData = formData[0];
            if(formData) {
                if(formData[0]) {
                    binaryImg = formData[0].entries();
                    binaryImg = binaryImg.next().value;
                    binaryImg = binaryImg[1];
                    binaryImg = binaryImg.entries();
                    binaryImg.next();
                    binaryImg = binaryImg.next().value[1];
                    binaryImg = btoa(
                        new Uint8Array(binaryImg)
                            .reduce((data, byte) => data + String.fromCharCode(byte), '')
                    );
                }
                nameOfUser = formData[2];
                locationOfUser = formData[4];
            }
        }
        return (
            <div className="users-root">
                <br/>
                <br/>
                {nameOfUser === userSession?
                    <div className="login-button">
                        <ul className="list-group">
                            <li key={1} className="list-group-item list-group-item-primary">UserName: {nameOfUser} </li>
                            <li key={2} className="list-group-item list-group-item-secondary">
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.editName}
                                           onChange= {e => this.setState({editName: e.target.value})}/>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.props.changeUserEventHandler(userSession, "username", this.state.editName)}>
                                    Edit Name
                                </button>
                                <text>{isChanged && isChanged.includes("username")? "Changed Successfully": ""}</text>
                            </li>
                            <li key={3} className="list-group-item list-group-item-primary">Location: {locationOfUser}</li>
                            <li key={4} className="list-group-item list-group-item-secondary">
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.editLocation}
                                           onChange= {e => this.setState({editLocation: e.target.value})}/>
                                </div>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.props.changeUserEventHandler(userSession, "location", this.state.editLocation)}>
                                    Edit Location
                                </button>
                                <text>{isChanged && isChanged.includes("location")? "Changed Successfully": ""}</text>
                            </li>
                            <li key={6} className="list-group-item list-group-item-primary">{binaryImg? <img className="center-cropped" src={`data:image/jpeg;base64,${binaryImg}`}/> : <div/>}</li>
                        </ul>
                    </div> :
                    <div className="login-button">
                        <ul className="list-group">
                            <li key={1} className="list-group-item list-group-item-primary">UserName: {nameOfUser} </li>
                            <li key={2} className="list-group-item list-group-item-primary">Location: {locationOfUser}</li>
                            <li key={3} className="list-group-item list-group-item-primary">{binaryImg? <img className="center-cropped" src={`data:image/jpeg;base64,${binaryImg}`}/> : <div/>}</li>
                        </ul>
                    </div>}
                <br/>
                <br/>
                <div className="cards-reviews">
                    {userReviews}
                </div>
                <br/>
                <br/>
                <br/>
            </div>
        );
    }
}

function makeCardOfReviews(picture, restaurantname, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, creationdate, key) {
    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={`data:image/jpeg;base64,${picture}`} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Review for {restaurantname}</h5>
                <p className="card-text">Date Added {creationdate}</p>
            </div>
            <ul className="list-group list-group-flush">
                <li className="list-group-item" key={key+1}>Bathroom Quality {bathroomquality}</li>
                <li className="list-group-item" key={key+2}>Staff Kindness {staffkindness}</li>
                <li className="list-group-item" key={key+3}>Cleanliness {cleanliness}</li>
                <li className="list-group-item" key={key+4}>Drivethru {drivethru}</li>
                <li className="list-group-item" key={key+5}>Delivery Speed {deliveryspeed}</li>
                <li className="list-group-item" key={key+6}>Food Quality {foodquality}</li>
            </ul>
        </div>
    );
}


function makeImages(formData){
    let binaryImg = '';
    if(formData) {
        binaryImg = formData.entries();
        binaryImg = binaryImg.next().value;
        binaryImg = binaryImg[1];
        binaryImg = binaryImg.entries();
        binaryImg.next();
        binaryImg = binaryImg.next().value[1];
        binaryImg = btoa(
            new Uint8Array(binaryImg)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
    }
    return binaryImg;
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState User= ",globalState['Users'].get('user'));
    console.log("GlobalState userReviews= ",globalState['Users'].get('userReviews'));
    console.log("GlobalState userSession= ",globalState['Users'].get('userSession'));
    console.log("GlobalState isChanged= ",globalState['Users'].get('isChanged'));

    return {
        user: globalState['Users'].get('user').valueSeq().toArray() && globalState['Users'].get('user').valueSeq().toArray(),
        userReviews: globalState['Users'].get('userReviews').valueSeq().toArray() && globalState['Users'].get('userReviews').valueSeq().toArray(),
        userSession: globalState['Users'].get('userSession').valueSeq().toArray() && globalState['Users'].get('userSession').valueSeq().toArray(),
        isChanged: globalState['Users'].get('isChanged').valueSeq().toArray() && globalState['Users'].get('isChanged').valueSeq().toArray()

    };
};

const mapDispatchToProps = dispatch => {
    return {
        checkUserNameAvailableEventHandler: prefix => {
            dispatch(UsersActions.checkUserNameAvailableAction(prefix));
        },

        userReviewsEventHandler: prefix => {
            dispatch(UsersActions.userReviewsAction(prefix));
        },

        changeUserEventHandler: (username, parameter, changeParameter) => {
            dispatch(UsersActions.changeUserAction(username, parameter, changeParameter));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(User);