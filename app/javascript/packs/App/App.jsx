import React, { Component } from "react";
import "./App.scss.css";
import axios from "axios";
import TagsInput from "react-tagsinput";

const params =
  "?mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW&limitLicense=true&number=10";
const apiUrl =
  "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/random" +
  params;

const Card = props => {
  return <div>{props.data.title}</div>;
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      tags: []
    };
    // this.getSearchResults = this.getSearchResults.bind(this);
  }
  componentDidMount() {
    const config = {
      headers: { "Access-Control-Allow-Origin": "*" }
    };
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
  getSearchResults = e => {
    // let { value } = e.target;
    if (value.length < 3) return;
    this.fetchSearchTerm(value);
  };
  // Get a new function that is debounced when called
  // debouncedSearch = debounce(this.fetchSearchTerm, 700);
  fetchSearchTerm = searchTerm => {
    let api = `https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/findByIngredients?fillIngredients=false&ingredients=${searchTerm}&limitLicense=false&number=10&ranking=1&mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW`;
    // %2Csugar
    // let searchparams = `?fillIngredients=false&ingredients=apple%2Csugar&limitLicense=false&number=5&ranking=1`;
    // let api = apiUrl + searchparams;
    axios
      .get(api)
      .then(response => {
        console.log(response);
        this.setState({ recipes: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  };
  handleChange(tags) {
    console.log(
      this.state.tags.map(tag => {
        return tag;
      })
    );
    this.setState({ tags }, () => {
      this.fetchSearchTerm(
        this.state.tags.map(tag => {
          return tag.split(" ").join(",");
        })
      );
    });
  }
  render() {
    return (
      <div className="app">
        <TagsInput
          value={this.state.tags}
          onChange={this.handleChange.bind(this)}
        />
        Random recipe
        {this.state.recipes.map((recipe, i) => {
          return <Card data={recipe} key={i} />;
        })}
      </div>
    );
  }
}
