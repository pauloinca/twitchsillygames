import React from "react";
// import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Home from "./components/Home";
import GameChoose from "./components/GameChoose";
import ImagemAcao from "./components/ImagemAcao";
// import PopOut from "./components/PopOutWindow";

function App() {
  return (
    <Router>
      <div className="App">
        <Route
          render={({ location }) => (
            <TransitionGroup className="App">
              <CSSTransition key={location.key} timeout={1000} classNames="page">
                <div>
                  <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/:canal" component={GameChoose} />
                    <Route exact path="/:canal/:jogo" component={ImagemAcao} />
                    {/* <Route
                      exact
                      path="/:canal/:jogo/popout"
                      component={PopOut}
                    /> */}
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    </Router>
  );
}

export default App;
