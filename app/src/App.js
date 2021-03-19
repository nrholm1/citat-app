import React from 'react';
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from '../src/shared/Header';
import QuoteCard from './components/quote/quote-card';
import QuoteList from './components/quote-list';
import LoginUser from './components/login-user';
import CreateEditQuote from './components/create-edit-quote';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container" style={{marginTop: "25px"}}>
          <Switch>
            <Route exact path="/" component={QuoteList} />
            <Route exact path="/quote/random" component={QuoteCard} />
            <Route exact path="/quote/:id" component={QuoteCard} />
            <Route exact path="/search" component={QuoteList} />
            <Route exact path="/login" component={LoginUser} />
            <Route exact path="/create-edit" component={CreateEditQuote} />
            <Route exact path="/create-edit/:id" component={CreateEditQuote} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
