import React from 'react';
import { Calendar } from './components/index';
import './App.css';
import { calendarConnector } from './connector';
import 'bootstrap/dist/css/bootstrap.css';

const CalendarConnected = calendarConnector(Calendar);

/**
 * core App component
 */
class App extends React.Component {

    render() {
        return (
            <div className="App">
                <CalendarConnected/>
            </div>
        );
    }
}

export default App;
