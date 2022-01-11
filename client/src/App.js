
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Components/Home";
import React from "react";
import Register from './Components/Register';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import NoMatch from './Components/NoMatch';
import Sessions from './Components/Sessions';
import AllClients from './Components/AllClients';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/register" component={Register} />
          <Route path="/register/:accountType" component={Register} />
          <Route exact path="/dashboard/:accountType" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route path="/login/:accountType" component={Login} />
          <Route exact path="/sessions" component={Sessions} />
          <Route exact path="/trainer/clients" component={AllClients} />
          <Route path="*" component={NoMatch} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
