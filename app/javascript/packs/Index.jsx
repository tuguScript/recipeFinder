// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import HomeContainer from "./Containers/HomeContainer";
import SavedContainer from './Containers/SavedContainer'
import axios from "axios";
import { Button, SVGIcon } from "react-md";
import "./index.scss.css";
import NavigationDrawer from "react-md/lib/NavigationDrawers";
import { Link as RouterLink } from "react-router-dom";
import { FontIcon, ListItem } from "react-md";
import { DropdownMenu, TextField } from "react-md";
import WebFontLoader from "webfontloader";
import Post from './Components/Post'
import {
  Avatar,
  AccessibleFakeButton,
  IconSeparator,
  MenuButton
} from "react-md";
import TagsInput from "react-tagsinput";
import { DialogContainer } from "react-md";


const recipes = []

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
  "?mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW&limitLicense=true&number=15";
const apiUrl =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random" +
  params;

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      recipes: recipes,
      tags: [],
      showLoginForm: false,
      showSignupForm: false,
      loginEmail: "",
      loginPassword: "",
      requestSent: false
    };
  }
  componentDidMount() {
    axios
      .get(apiUrl)
      .then(response => {
        console.log(response);
        this.setState({ recipes: response.data.recipes });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  fetchSearchTerm = searchTerm => {
    let api = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${searchTerm}&limitLicense=false&number=10&ranking=1&mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW`;
    axios
      .get(api)
      .then(response => {
        this.setState({ recipes: response.data, session: "searchedRecipe" });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  openLoginForm() {
    this.setState({ showLoginForm: true });
  }
  showSignupForm() {
    this.setState({ showLoginForm: false, showSignupForm: true });
  }
  loginPostRequest() {
    let loginForm = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };
    axios
      .post("/access/attempt_login", loginForm)
      .then(res => {
        sessionStorage.setItem("user", JSON.stringify(res.data));
        this.setState({ showLoginForm: false });
      })
      .catch(e => {
        console.log("error", e);
      });
  }
  signupPostRequest() {
    let signupForm = {
      email: this.state.loginEmail,
      password: this.state.loginPassword
    };
    axios
      .post("/access/attempt_signup", signupForm)
      .then(res => {
        // sessionStorage.setItem("user", JSON.stringify(res.data));
        this.setState({ showLoginForm: false });
      })
      .catch(e => {
        console.log("error", e);
      });
  }
  logOutUser() {
    sessionStorage.removeItem("user");
    this.forceUpdate();
  }
  handleChange(tags) {
    this.setState({ tags }, () => {
      this.fetchSearchTerm(
        this.state.tags.map(tag => {
          return tag.split(" ").join(",");
        })
      );
    });
  }
  getSearchResults = e => {
    if (value.length < 3) return;
    this.fetchSearchTerm(value);
  };
  loadMore() {
    if (!this.state.requestSent) {
      this.setState({ requestSent: true }, () => {
        if (this.state.tags.length > 0) {
          let searchTerm = this.state.tags;
          let api = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${searchTerm}&limitLicense=false&number=10&ranking=1&mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW`;
          axios
            .get(api)
            .then(response => {
              let loadedMore = response.data.recipes;
              this.setState({
                recipes: [...this.state.recipes, ...loadedMore]
              });
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios
            .get(apiUrl)
            .then(response => {
              console.log(response);
              let loadedMore = response.data.recipes;
              this.setState({
                recipes: [...this.state.recipes, ...loadedMore],
                requestSent: false
              });
              // this.setState({ requestSent: false });
            })
            .catch(function (error) {
              console.log(error);
            });
        }
      });
    }
  }

  render() {
    // login form iin 2 button
    const actions = [
      <Button flat primary onClick={() => this.showSignupForm()}>
        Sign Up
      </Button>,
      {
        secondary: true,
        children: "Cancel",
        onClick: () => {
          this.setState({ showLoginForm: false });
        }
      },
      <Button flat primary onClick={() => this.loginPostRequest()}>
        Login
      </Button>
    ];
    return (
      <Router>
        <Route
          render={({ location }) => (
            <NavigationDrawer
              drawerTitle="Me Chef"
              desktopDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              mobileDrawerType={NavigationDrawer.DrawerTypes.TEMPORARY_MINI}
              tabletDrawerType={NavigationDrawer.DrawerTypes.PERSISTENT_MINI}
              toolbarActions={
                <AccountMenu
                  openLoginForm={() => this.openLoginForm()}
                  logOutUser={() => this.logOutUser()}
                  showSignupForm={() => this.showSignupForm()}
                />
              }
              toolbarChildren={
                <TagsInput
                  className="tags-input"
                  value={this.state.tags}
                  onChange={this.handleChange.bind(this)}
                />
              }
              toolbarTitle={
                this.state.session ? "Possible Recipes" : "Random recipes"
              }
              navItems={navItems.map(props => (
                <NavLink {...props} key={props.to} />
              ))}
            >
              {/* signupForm */}
              <DialogContainer
                id="simple-list-dialog"
                visible={this.state.showSignupForm}
                title="Sign up"
                onHide={() => this.setState({ showLoginForm: false })}
                focusOnMount={true}
                actions={[
                  {
                    secondary: true,
                    children: "Cancel",
                    onClick: () => {
                      this.setState({ showSignupForm: false });
                    }
                  },
                  <Button flat primary onClick={() => this.signupPostRequest()}>
                    Sign Up
                  </Button>
                ]}
              >
                <TextField
                  name="email"
                  id="field-1"
                  label="E-mail"
                  // placeholder="E-mail"
                  className="md-cell md-cell--12"
                  onChange={e => {
                    this.setState(prevState => {
                      return {
                        loginEmail: e
                      };
                    });
                  }}
                />
                <TextField
                  type="password"
                  name="password"
                  id="field-2"
                  // label="Password"
                  placeholder="Password"
                  className="md-cell md-cell--12"
                  onChange={e => {
                    this.setState(prevState => {
                      return {
                        loginPassword: e
                      };
                    });
                  }}
                />
              </DialogContainer>
              {/* loginForm dialog */}
              <DialogContainer
                id="simple-list-dialog"
                visible={this.state.showLoginForm}
                title="Login"
                onHide={() => this.setState({ showLoginForm: false })}
                focusOnMount={true}
                actions={actions}
              >
                <TextField
                  name="email"
                  id="field-1"
                  label="E-mail"
                  // placeholder="E-mail"
                  className="md-cell md-cell--12"
                  onChange={e => {
                    this.setState(prevState => {
                      return {
                        loginEmail: e
                      };
                    });
                  }}
                />
                <TextField
                  type="password"
                  name="password"
                  id="field-2"
                  // label="Password"
                  placeholder="Password"
                  className="md-cell md-cell--12"
                  onChange={e => {
                    this.setState(prevState => {
                      return {
                        loginPassword: e
                      };
                    });
                  }}
                />
              </DialogContainer>
              <Switch key={location.key}>
                <Route
                  exact
                  path="/"
                  location={location}
                  render={() => {
                    return (
                      <HomeContainer
                        loadMore={() => {
                          this.loadMore();
                        }}
                        requestSent={this.state.requestSent}
                        recipes={this.state.recipes}
                        fetchSearchTerm={tags => this.fetchSearchTerm(tags)}
                      />
                    );
                  }}
                />
                <Route
                  path="/saved"
                  location={location}
                  component={SavedContainer}
                />
                <Route path="/about" location={location} render={() => {
                  return (
                    <Post />
                  )
                }} />
              </Switch>
            </NavigationDrawer>
          )}
        />
      </Router>
    );
  }
}

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

const AccountMenu = ({ simplifiedMenu, openLoginForm, logOutUser }) =>
  sessionStorage.getItem("user") ? (
    <DropdownMenu
      style={{ marginTop: "5%" }}
      id={`${!simplifiedMenu ? "smart-" : ""}avatar-dropdown-menu`}
      menuItems={[
        "Saved",
        { divider: true },
        <ListItem key={"qwe"} primaryText="Log out" onClick={logOutUser} />
      ]}
      anchor={{
        x: DropdownMenu.HorizontalAnchors.CENTER,
        y: DropdownMenu.VerticalAnchors.OVERLAP
      }}
      position={DropdownMenu.Positions.TOP_LEFT}
      animationPosition="below"
      sameWidth
      simplifiedMenu={simplifiedMenu}
    >
      <AccessibleFakeButton
        component={IconSeparator}
        iconBefore
        label={
          <IconSeparator label={JSON.parse(sessionStorage.user).user.email}>
            <FontIcon>arrow_drop_down</FontIcon>
          </IconSeparator>
        }
      >
        <Avatar suffix="pink">
          {JSON.parse(sessionStorage.user)
            .user.email.charAt(0)
            .toUpperCase()}
        </Avatar>
      </AccessibleFakeButton>
    </DropdownMenu>
  ) : (
      <Button
        id="menu-button-1"
        raised
        primary
        iconChildren="chat"
        onClick={() => openLoginForm()}
      >
        Login
    </Button>
    );





document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement("div"))
  );
});