import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import { ProvideAuth } from "./components/auth/AuthManager";
import Login from "./components/auth/Login";
import AddBook from "./components/book/AddBook";
import AllBooksAdmin from './components/book/AllBooksAdmin';
import Checkout from "./components/checkout/Checkout";
import Home from "./components/home/Home";
import Navbar from "./components/navbar/Navbar";
import NoMatch from "./components/nomatch/NoMatch";
import Orders from "./components/order/Order";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
function App() {
  // const auth = useAuth();
  return (
    <ProvideAuth>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route path="/login">
            <Login />
          </Route>
          <PrivateRoute path="/admin">
            <AllBooksAdmin />
          </PrivateRoute>
          <Route path="/manage-product">
            <AllBooksAdmin />
          </Route>

          <PrivateRoute path="/book/:bookId">
            <Checkout />
          </PrivateRoute>

          <PrivateRoute path="/orders">
            <Orders />
          </PrivateRoute>

          <PrivateRoute path="/addBook">
            <AddBook /> 
          </PrivateRoute>

          <Route path="*">
            <NoMatch /> 
          </Route>
          
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

export default App;
