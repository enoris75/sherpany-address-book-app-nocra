import React from "react";
import { Provider } from "react-redux";
import { store } from "./redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.scss";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "./components/UsersGrid";
import { Header, pages } from "./components/PageHeader";
import { Settings } from "./components/SettingsPage";
import { loadNextBatch } from "./services/UserService";

// Load the first batch of users as the app starts
loadNextBatch();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <div className="App">
              <div className="app-header">
                <Header page={pages.usersGrid} />
              </div>
              <div className="app-content">
                <Grid />
              </div>
            </div>
          </Route>
          <Route exact path="/settings">
            <div className="app-header">
              <Header page={pages.settings} />
            </div>
            <div className="app-content">
              <Settings />
            </div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
