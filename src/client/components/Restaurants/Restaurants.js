import React from "react";
import "./Restaurants.scss";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import RestaurantsActions from "../Restaurants/actions";


class Restaurants extends React.Component {
  state =  {
    restInput: ''
  };

  componentDidMount() {
    this.props.loadRestaurantsEventHandler("");
  }

  render() {
    let rests = '';
    if(this.props.restaurants){
      rests = this.props.restaurants.map(rest => rest.valueSeq().toArray());
      rests = this.props.restaurants.map((rest, id) => <tr><th scope="row" key={id}>{id}</th><td><a href={"/restaurants/"+rest.get('_id')}>{rest.get('name')}</a></td><td>{rest.get('location')}</td></tr>);
    }
    return (
        <div>
          <br/>
          <div className="search-button">
            <InputGroup className="mb-4">
              <FormControl
                  placeholder="Search a restaurant"
                  aria-label="Recipient's restaurant"
                  aria-describedby="basic-addon2"
                  value={this.state.restInput}
                  onChange= {e => this.setState({restInput: e.target.value})}
              />
              <InputGroup.Append>
                <Button variant="outline-secondary" onClick={() => this.props.loadRestaurantsEventHandler(this.state.restInput)}>Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </div>
          <a className="nav-link" href="/makerest">Make a restaurant</a>
          <table className="table table-hover">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Location</th>
            </tr>
            </thead>
            <tbody>
            {rests}
            </tbody>
          </table>

          <br/><br/>
        </div>
    );
  }
}

const mapStateToProps = (globalState, props) => {
  console.log("GlobalState Restaurants= ",globalState['Restaurants'].get('restaurants'));

  return {
    restaurants: globalState['Restaurants'].get('restaurants') && globalState['Restaurants'].get('restaurants').valueSeq().toArray()
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadRestaurantsEventHandler: prefix => {
      dispatch(RestaurantsActions.loadRestaurantsAction(prefix));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);