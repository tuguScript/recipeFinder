import React, { Component } from "react";
import "./App.scss.css";
import axios from "axios";

const Card = props => {
  return <div>{props.data.title}</div>;
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [1, 2, 3, 4, 5]
    };
  }
  componentDidMount() {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" }
    };
    axios
      .get(
        "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW&fillIngredients=false&ingredients=carrot"
      )
      .then(response => {
        console.log(response.data);
        this.setState({ recipes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="app">
        App-ssssssss
        {this.state.recipes.map((recipe, i) => {
          return <Card data={recipe} key={i} />;
        })}
      </div>
    );
  }
}
