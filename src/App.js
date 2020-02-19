import React from 'react';
import './App.css';
import StudiesList from './components/studies/list/StudiesList';
import StudyDetails from './components/studies/details/StudyDetails';
import SpinnerItem from './components/spinner/SpinnerItem';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='App col-md-12'>
            <Router>
              <Switch>
                <Route
                    component={StudiesList}
                    exact
                    path='/'
                />
                <Route
                    component={StudyDetails}
                    path='/:id'
                />
              </Switch>
            </Router>
          </div>
        </div>
        <SpinnerItem />
      </div>
    </div>
  );
}

export default App;
