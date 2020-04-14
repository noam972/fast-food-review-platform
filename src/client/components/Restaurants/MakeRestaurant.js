import "./Restaurants.scss";
import { connect } from "react-redux";
import RestaurantsActions from "../Restaurants/actions";
import Button from "react-bootstrap/Button";
import React, {createRef} from 'react'
import Dropzone from 'react-dropzone'


class MakeRestaurant extends React.Component {
    state =  {
        restInput: '',
        restLocation: '',
        restPicture: '',
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
        let rest = '';
        let isMaid = '';
        if(this.props.isMaid) {
            isMaid = this.props.isMaid.map(x => x[1]);
            isMaid = isMaid[1];
            console.log("isMaid= ", isMaid);
        }

        return (
            <div className="restaurants-root">
                <br/>
                <div className="makerest-button">
                    <div className="form-group ">
                        <label>Name</label>
                        <input type="text" className="form-control" id="restInputName" value={this.state.restInput}
                               onChange= {e => this.setState({restInput: e.target.value})}/>
                    </div>

                    <div className="form-group">
                        <label>Location</label>
                        <input type="text" className="form-control" value={this.state.restLocation}
                               onChange= {e => this.setState({restLocation: e.target.value})}/>
                    </div>

                    <Dropzone ref={this.dropzoneRef} noClick noKeyboard accept={'image/*'}
                              onDrop={acceptedFiles => this.setState({restPicture: acceptedFiles[0]})}>
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
                        onClick={() => this.props.makeRestaurantHandler(this.state.restInput, this.state.restLocation, this.state.restPicture)}>
                        Make Restaurant
                    </button>
                </div>
                <br/>
                {isMaid === "successfully signed in"? <h3>successfully Maid!</h3>: <h3>{isMaid}</h3>}
            </div>
        );
    }
}

const mapStateToProps = (globalState, props) => {
    console.log("GlobalState isMaid= ",globalState['Restaurants'].get('isMaid'));

    return {
        isMaid: globalState['Restaurants'].get('isMaid') && globalState['Restaurants'].get('isMaid').toArray()
    };
};

const mapDispatchToProps = dispatch => {
    return {
        makeRestaurantHandler: (name, location, picture) => {
            dispatch(RestaurantsActions.makeRestaurantAction(name, location, picture));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MakeRestaurant);