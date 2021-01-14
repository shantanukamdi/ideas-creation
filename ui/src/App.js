import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Register/Register";
import AddIdea from "./Pages/AddIdea/AddIdea";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home" exact>
          <Home />
        </Route>

        <Route path="/register" exact>
          <Register />
        </Route>

        <Route path="/add-idea" exact>
          <AddIdea />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
