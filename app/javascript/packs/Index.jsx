// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import App from "./App/App.jsx";
import axios from "axios";
import { Button, SVGIcon } from "react-md";
import "./index.scss.css";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import { Link as RouterLink } from "react-router-dom";
import { FontIcon, ListItem } from "react-md";
import WebFontLoader from "webfontloader";

WebFontLoader.load({
  google: {
    families: ["Roboto:300,400,500,700", "Material Icons"]
  }
});

const navItems = [
  {
    exact: true,
    label: "Home",
    to: "/",
    icon: "home"
  },
  {
    label: "Saved",
    to: "/saved",
    icon: "bookmark"
  },
  {
    label: "About",
    to: "/about",
    icon: "info_outline"
  }
];

const params =
  "?mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW&limitLicense=true&number=10";
const apiUrl =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random" +
  params;

const Account = () => (
  <div>
    <h2>Account</h2>
  </div>
);

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

const About = () => (
  <div>
    <h2>About</h2>
  </div>
);

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      tags: []
    };
  }
  componentDidMount() {
    axios
      .get(apiUrl)
      .then(response => {
        console.log(response);
        this.setState({ recipes: response.data.recipes });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  fetchSearchTerm = searchTerm => {
    let api = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${searchTerm}&limitLicense=false&number=10&ranking=1&mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW`;
    axios
      .get(api)
      .then(response => {
        console.log(response);
        this.setState({ recipes: response.data, session: "searchedRecipe" });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  render() {
    return (
      <Router>
        <Route
          render={({ location }) => (
            <NavigationDrawer
              drawerTitle="Me Chef"
              toolbarTitle={
                this.state.session ? "Possible Recipes" : "Random recipes"
              }
              navItems={navItems.map(props => (
                <NavLink {...props} key={props.to} />
              ))}
            >
              <Switch key={location.key}>
                <Route
                  exact
                  path="/"
                  location={location}
                  render={() => {
                    return (
                      <App
                        recipes={this.state.recipes}
                        fetchSearchTerm={tags => this.fetchSearchTerm(tags)}
                      />
                    );
                  }}
                />
                <Route
                  path="/account"
                  location={location}
                  component={Account}
                />
                <Route path="/about" location={location} component={About} />
              </Switch>
            </NavigationDrawer>
          )}
        />
      </Router>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement("div"))
  );
});

const NavLink = ({ label, to, exact, icon }) => (
  <Route path={to} exact={exact}>
    {({ match }) => {
      let leftIcon;
      if (icon) {
        leftIcon = <FontIcon>{icon}</FontIcon>;
      }

      return (
        <ListItem
          component={RouterLink}
          active={!!match}
          to={to}
          primaryText={label}
          leftIcon={leftIcon}
        />
      );
    }}
  </Route>
);
