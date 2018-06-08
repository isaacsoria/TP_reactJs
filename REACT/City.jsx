import React from 'react';
import Neighborhoods from './Neighborhoods.jsx'

class City extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cities: [],
            cityId: ""
        }

        this.getCities(this.props.stateId);
        this.change = this.change.bind(this);

    };

    getCities(id) {
        if (id.length > 0) {
            fetch('http://localhost:8082/cities/' + id,
                {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                .then(result => {
                    return result.json();
                })
                .then(data => {
                    this.state.cities = data;
                    this.state.cityId = "";
                    this.forceUpdate();
                })
        }
    }

    click(val) {
        this.state.cityId = val.target.id;
        this.forceUpdate();
    }

    shouldComponentUpdate(newProps, newState) {
        this.getCities(newProps.stateId);
        return true;
    }

    render() {
        return (
            <div>
                <h3>Ciudades</h3>
                <div className="col-md-4">
                    <h2>States</h2>
                    <ul>
                        {this.state.cities.map(x => <a onClick={this.click} id={x.id}>{x.name}</a>)}

                    </ul>
                </div>
                <Neighborhoods cityId={this.state.cityId}/>
            </div>
        );
    }
}


export default City;