import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidenav from "../components/Sidenav";
import Dashboard from "./dashboard/Dashboard";
import Products from "./dashboard/Products";
import ProductDetails from "./dashboard/ProductDetails";
function Home() {
  return (
    <Router>
      <div className="wrapper">
        <Sidenav />
        <main className="main-content">
          <Switch>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Route exact path="/products">
              <Products />
            </Route>
            <Route exact path="/products/:productId">
              <ProductDetails />
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}

export default Home;
