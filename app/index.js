import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Battle from "./components/Battle";
import Results from "./components/Results";
import Popular from "./components/Popular";
import { ThemeProvider } from "./contexts/theme";
import Nav from "./components/Nav";
// Component
// State
// Lifecycle
// UI

class App extends React.Component {
  state = {
    theme: "light",
    toggleTheme: () => {
      this.setState(({ theme }) => ({
        theme: theme === "light" ? "dark" : "light",
      }));
    },
  };

  render() {
    const { theme } = this.state;
    return (
      <Router>
        <ThemeProvider value={this.state}>
          <div className={theme}>
            <div className="container">
              <Nav />
              <Switch>
                <Route exact path="/" component={Popular} />
                <Route exact path="/battle" component={Battle} />
                <Route path="/battle/results" component={Results} />
                <Route render={() => <h1>404</h1>} />
              </Switch>
            </div>
          </div>
        </ThemeProvider>
      </Router>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));
