import React, { Component } from 'react';
import Counter from './Counter';
import Home from './Home';
import { Route, Link } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div>
                <div>
                    <Link to="/counter">counter</Link>
                    <Link to="/">Home</Link>
                </div>
                <Route path="/counter" component={Counter}/>
                <Route path="/" component={Home}/>
            </div>
        );
    }
}

export default App;
