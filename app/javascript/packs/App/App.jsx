import React, { Component } from "react";
import "./App.scss.css";
import Card1 from "./components/Card";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
  }
  componentDidMount() {
    console.log(this.props);
  }

  // Get a new function that is debounced when called
  // debouncedSearch = debounce(this.fetchSearchTerm, 700);

  render() {
    let recipes =
      this.props.recipes.length > 1 ? (
        this.props.recipes.map((recipe, i) => {
          return <Card1 data={recipe} key={i} />;
        })
      ) : (
        <h1> Enter what you have. </h1>
      );
    return <div className="app">{recipes}</div>;
  }
}
