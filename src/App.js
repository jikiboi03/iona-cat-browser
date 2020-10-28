import React from "react";
import "./App.css";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Breeds from "./Components/Breeds";
import BreedDetails from "./Components/BreedDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Breeds} />
        <Route path="/:id" component={BreedDetails} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
