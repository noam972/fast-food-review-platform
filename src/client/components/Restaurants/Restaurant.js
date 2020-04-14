import React, {useEffect} from "react";
import "./Restaurants.scss";
import { connect } from "react-redux";
import RestaurantsActions from "./actions";
import WriteReview from "./WriteReview";



class Restaurant extends React.Component {
    state =  {
        restRouter: this.props.restRouter,
    };

    componentDidMount() {

    }

    render() {
        let restReviews = '';
        if(this.props.reviews) {
            restReviews = this.props.reviews.map(rest => rest.valueSeq().toArray());
            restReviews = this.props.reviews.map((rest, id) => makeCardOfReviews(makeImages(rest.get('picture')), rest.get('username'), rest.get('bathroomquality'), rest.get('staffkindness'), rest.get('cleanliness'), rest.get('drivethru'), rest.get('deliveryspeed'), rest.get('foodquality'), rest.get('creationdate'), id));
        }
        let formData = '';
        let binaryImg = '';
        let nameOfRest = '';
        let locationOfRest = '';
        if(!this.props.restaurant.length){
            this.props.findRestaurantEventHandler(this.state.restRouter);
            this.props.loadReviewsRestaurantEventHandler(this.state.restRouter);
        }

        if(this.props.restaurant){
            formData = this.props.restaurant.map(x => x.valueSeq().toArray());
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
                nameOfRest = formData[3];
                locationOfRest = formData[4];
            }
        }
        return (
            <div className="restaurants-root">
                <br/>
                <br/>
                <div className="makerest-button">
                    <br/>
                    <br/>
                    <ul className="list-group">
                        <li className="list-group-item list-group-item-primary" key={1}>Name: {nameOfRest}</li>
                        <li className="list-group-item list-group-item-primary" key={2}>Location: {locationOfRest}</li>
                        <li className="list-group-item list-group-item-primary" key={3}>{binaryImg? <img className="center-cropped" src={`data:image/jpeg;base64,${binaryImg}`}/> : <div/>}</li>

                    </ul>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <div className="cards-reviews">
                    {restReviews}
                </div>
                <WriteReview restId = {this.state.restRouter}/>
                <br/>
            </div>
        );
    }
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

function makeCardOfReviews(picture, username, bathroomquality, staffkindness, cleanliness, drivethru, deliveryspeed, foodquality, creationdate, key) {
    return (
        <div className="card" style={{width: "18rem"}}>
            <img className="card-img-top" src={`data:image/jpeg;base64,${picture}`} alt="Card image cap"/>
            <div className="card-body">
                <h5 className="card-title">Review By {username}</h5>
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




const mapStateToProps = (globalState, props) => {
    console.log("GlobalState restaurant= ",globalState['Restaurants'].get('restaurant'));
    console.log("GlobalState reviews= ",globalState['Restaurants'].get('reviews'));

    return {
        restaurant: globalState['Restaurants'].get('restaurant').valueSeq().toArray() && globalState['Restaurants'].get('restaurant').valueSeq().toArray(),
        reviews: globalState['Restaurants'].get('reviews').valueSeq().toArray() && globalState['Restaurants'].get('reviews').valueSeq().toArray(),

    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadReviewsRestaurantEventHandler: prefix => {
            dispatch(RestaurantsActions.loadReviewsRestaurantAction(prefix));
        },

        findRestaurantEventHandler: prefix => {
            dispatch(RestaurantsActions.findRestaurantAction(prefix));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurant);