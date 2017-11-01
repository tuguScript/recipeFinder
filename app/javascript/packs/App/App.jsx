import React, { Component } from "react";
import "./App.scss.css";
import TagsInput from "react-tagsinput";

const Card = props => {
  return <div>{props.data.title}</div>;
};

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
  getSearchResults = e => {
    if (value.length < 3) return;
    this.fetchSearchTerm(value);
  };
  // Get a new function that is debounced when called
  // debouncedSearch = debounce(this.fetchSearchTerm, 700);
  
  handleChange(tags) {
    this.setState({ tags }, () => {
      this.props.fetchSearchTerm(
        this.state.tags.map(tag => {
          return tag.split(" ").join(",");
        })
      );
    });
  }
  render() {
    let recipes =
      this.props.recipes.length > 1 ? (
        this.props.recipes.map((recipe, i) => {
          return <Card data={recipe} key={i} />;
        })
      ) : (
        <h1> Loading </h1>
      );
    return (
      <div className="app">
        <TagsInput
          value={this.state.tags}
          onChange={this.handleChange.bind(this)}
        />
        Random recipe
        {recipes}
      </div>
    );
  }
}
