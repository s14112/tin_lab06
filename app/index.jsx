import React from 'react';
import ReactDOM from 'react-dom';
import Form from './component/form.jsx';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom'

class App extends React.Component {
    render() {
        <Router>
            <div className="container">
                <ul>
                    <li>
                        <Link to="/">Form</Link>
                    </li>
                </ul>
                <Route exact path="/" component={Form} />
            </div>
        </Router>
    }
}

export default App;