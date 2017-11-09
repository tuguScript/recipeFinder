import React, { Component } from "react";
import "./App.scss.css";
import Card1 from "./components/Card";
import Masonry from "react-masonry-component";

const masonryOptions = {
  transitionDuration: 0
};

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      tags: []
    };
  }
  componentDidMount() {
    window.onscroll = function(ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("bottom");
        this.props.loadMore();
      }
    }.bind(this);
  }
  render() {
    let recipes =
      this.props.recipes.length > 1 ? (
        this.props.recipes.map((recipe, i) => {
          return <Card1 data={recipe} key={i} />;
        })
      ) : (
        <h1> Enter what you have. </h1>
      );
    return (
      <div id="app">
        <Masonry className="app" options={masonryOptions}>
          {recipes}
        </Masonry>
        {this.props.requestSent ? <div>Loading</div> : <div>Load More</div>}
      </div>
    );
  }
}
