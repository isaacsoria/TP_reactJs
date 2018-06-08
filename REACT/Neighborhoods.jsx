import React from 'react';

class Neighborhoods extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            neighborhoods: []
        }

        this.getNeighborhoods(this.props.cityId);
        this.change = this.change.bind(this);

    };

    getNeighborhoods(id) {
        if (id.length > 0) {
            fetch('http://localhost:8082/neighborhoods/' + id,
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
                    this.state.neighborhoods = data;
                    this.forceUpdate();
                })
        } else {
            this.state.neighborhoods = [];
            this.forceUpdate();
        }
    }

    click(val) {
        console.log(val.target.id);
    }

    shouldComponentUpdate(newProps, newState) {
        this.getNeighborhoods(newProps.cityId);
        return true;
    }

    render() {
        return (
            <div>
                <h3>Barrio</h3>
                <div className="col-md-4">
                    <h2>States</h2>
                    <ul>
                        {this.state.neighborhoods.map(x => <a onClick={this.click} id={x.id}>{x.name}</a>)}

                    </ul>
                </div>
            </div>
        );
    }
}


export default Neighborhoods;