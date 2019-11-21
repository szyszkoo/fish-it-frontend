import React from 'react';
import './App.css';
import MainPage from './components/MainPage';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const App: React.FC = () => {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <Router history={history}>
        <MainPage />
      </Router>
    </div>
  );
}

export default App;
