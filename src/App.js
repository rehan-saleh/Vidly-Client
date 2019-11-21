import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Movies from "./components/movies";
import MovieForm from "./components/movieForm";
import Rentals from "./components/rentals";
import Customers from "./components/customer";
import NotFound from "./components/notFound";
import Navbar from "./components/navbar";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import LogOut from "./components/common/logout";
import ProtectedRoute from "./components/common/protectedRoute";
import auth from "./services/authService";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {
    user: {}
  };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <Navbar user={user} />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/logout" component={LogOut}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route
              path="/movies"
              render={props => <Movies {...props} user={user} />}
            ></Route>
            <ProtectedRoute path="/movie/:id" component={MovieForm} />
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/customers" component={Customers}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Redirect from="/" to="/movies" exact />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
