import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Header from '../src/shared/Header';
import QuoteCard from './components/quote/quote-card';
import QuoteList from './components/quote-list';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <div className="container" style={{marginTop: "25px"}}>
          <Switch>
            {/* TODO should maybe be loaded inside component through service - will save headache here as wel */}
            <Route exact path="/" component={QuoteList} />
            <Route exact path="/quote/random" component={QuoteCard} />
            <Route exact path="/quote/:id" component={QuoteCard} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
