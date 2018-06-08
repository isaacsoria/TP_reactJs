import React from 'react';
import City from './City.jsx';

class App extends React.Component {

    constructor() {
        super();

        this.state = {
            states: [],
            stateId: ""
        }

        fetch('http://localhost:8082/states',
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
                this.state.states = data;
                this.forceUpdate();
            })

        this.change = this.change.bind(this);

    }

    change(val) {
        this.state.stateId = val.target.id;
        this.forceUpdate();
    }

    render() {
        return (
            <div>

                <div class="col-md-4">
                    <h2>States</h2>
                    <ul>
                        {this.state.states.map(x => <a onClick={this.click} id={x.id}>{x.name}</a>)}

                    </ul>
                </div>

                <City stateId={this.state.stateId}/>


            </div>
        );
    }
}

export default App;