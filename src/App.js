import React, { Fragment, Suspense, lazy } from "react";
import { MuiThemeProvider, CssBaseline } from "@material-ui/core";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import * as serviceWorker from "./serviceWorker";
import Pace from "./shared/components/Pace";

const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

class App extends React.Component {

  constructor(props) {
    super(props);
    // this.state = {loggedInUser: {username: 'testuser', dtype: 'Admin', firstName: "test", lastName: "user"}};
    this.state = {loggedInUser: null};
  }

  setLoggedInUser = loggedInUser => {
    this.setState({ loggedInUser });
  };

  render() {
    return (
        <BrowserRouter>
          <MuiThemeProvider theme={theme}>
            <CssBaseline/>
            <GlobalStyles/>
            <Pace color={theme.palette.primary.light}/>
            <Suspense fallback={<Fragment/>}>
              <Switch>
                {this.state.loggedInUser != null ? (
                  <Route path="/c"
                         render={(props) =>
                             <LoggedInComponent {...props}
                                                loggedInUser={this.state.loggedInUser}
                                                setLoggedInUser ={this.setLoggedInUser}
                             />}
                  />
                ) : (
                  <Route render={(props) =>
                             <LoggedOutComponent {...props}
                                                loggedInUser={this.state.loggedInUser}
                                                setLoggedInUser ={this.setLoggedInUser}
                             />}
                  />
                )}
              </Switch>
            </Suspense>
          </MuiThemeProvider>
        </BrowserRouter>
    );
  }
}

serviceWorker.register();

export default App;
