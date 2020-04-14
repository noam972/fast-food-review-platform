import "./Restaurants.scss";
import { connect } from "react-redux";
import RestaurantsActions from "../Restaurants/actions";
import Button from "react-bootstrap/Button";
import React, {createRef} from 'react'
import Dropzone from 'react-dropzone'


class WriteReview extends React.Component {
    state =  {
        restaurantid: this.props.restId,
        bathroomquality: '',
        staffkindness: '',
        cleanliness: '',
        drivethru: '',
        deliveryspeed: '',
        foodquality: '',
        picture: ''
    };

    componentDidMount() {
    };

    dropzoneRef = createRef();

    openDialog = () => {
        if (this.dropzoneRef.current) {
            this.dropzoneRef.current.open()
        }
    };


    render() {
        let userSession = '';
        if(this.props.userSession) {
            userSession = this.props.userSession.map(rest => rest[1]);
            userSession = userSession[0];
        }
        let rest = '';
        let isReviewed = '';
        if(this.props.isReviewed) {
            isReviewed = this.props.isReviewed.map(x => x[1]);
            isReviewed = isReviewed[1];
            console.log("isReviewed= ", isReviewed);
        }

        return (
            <div className="restaurants-root">
                <br/>
                <div className="makerest-button">
                    <div className="form-group">
                        <label>Bathroom quality</label>
                        <input type="text" className="form-control" value={this.state.bathroomquality}
                               onChange= {e => this.setState({bathroomquality: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Staff Kindness</label>
                        <input type="text" className="form-control" value={this.state.staffkindness}
                               onChange= {e => this.setState({staffkindness: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Cleanliness</label>
                        <input type="text" className="form-control" value={this.state.cleanliness}
                               onChange= {e => this.setState({cleanliness: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Drivethru</label>
                        <input type="text" className="form-control" value={this.state.drivethru}
                               onChange= {e => this.setState({drivethru: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Delivery Speed</label>
                        <input type="text" className="form-control" value={this.state.deliveryspeed}
                               onChange= {e => this.setState({deliveryspeed: e.target.value})}/>
                    </div>
                    <div className="form-group">
                        <label>Food Quality</label>
                        <input type="text" className="form-control" value={this.state.foodquality}
                               onChange= {e => this.setState({foodquality: e.target.value})}/>
                    </div>

                    <Dropzone ref={this.dropzoneRef} noClick noKeyboard accept={'image/*'}
                              onDrop={acceptedFiles => this.setState({picture: acceptedFiles[0]})}>
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
                        onClick={() => this.props.writeReviewEventHandler(userSession, this.state.restaurantid, this.state.bathroomquality, this.state.staffkindness, this.state.cleanliness, this.state.drivethru, this.state.deliveryspeed, this.state.foodquality, this.state.picture)}>
                        Review The Restaurant
                    </button>
                </div>
                <br/>
                {isReviewed === "successfully written review"? <h3>successfully Reviewed!</h3>: <h3>{isReviewed}</h3>}
            </div>
        );
    }
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState isReviewed= ",globalState['Restaurants'].get('isReviewed'));
    console.log("GlobalState userSession= ",globalState['Users'].get('userSession'));

    return {
        isReviewed: globalState['Restaurants'].get('isReviewed') && globalState['Restaurants'].get('isReviewed').toArray(),
        userSession: globalState['Users'].get('userSession') && globalState['Users'].get('userSession').toArray()
    };
};

const mapDispatchToProps = dispatch => {
    return {
        writeReviewEventHandler: (username, restaurantid, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, picture) => {
            dispatch(RestaurantsActions.writeReviewAction(username, restaurantid, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, picture));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WriteReview);