import React, { Component } from "react";
import "./HomeContainer.scss.css";
import Item from "../../Components/Item";
import Masonry from "react-masonry-component";
import axios from 'axios';
import {
  Snackbar
} from "react-md";
const masonryOptions = {
  transitionDuration: 0
};

export default class HomeContainer extends Component {
  constructor() {
    super();
    this.state = {
      tags: [],
      snackBar: []
    };
  }
  componentDidMount() {
    window.onscroll = function (ev) {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("bottom");
        this.props.loadMore();
      }
    }.bind(this);
  }
  bookMark(obj) {
    let user = JSON.parse(sessionStorage.getItem('user'))
    console.log(user);
    if (user === null) {
      this.setState((prevState) => {
        return { snackBar: [{ text: 'Please Sign in', action: 'Dismiss' }] }
      })
    } else {
      let recipe = obj
      let data = { recipe, user }
      console.log(data);
      axios.post('/save_recipe', data).then((res) => {
        console.log(res);
      })
    }

  }
  render() {
    let recipes =
      this.props.recipes.length > 1 ? (
        this.props.recipes.map((recipe, i) => {
          return <Item data={recipe} key={i} bookMark={(obj) => this.bookMark(obj)} />;
        })
      ) : (
          <h1> Enter what you have. </h1>
        );
    return (
      <div id="app">
        <Snackbar
          id="example-snackbar"
          toasts={this.state.snackBar}
          autohide={false}
          autohideTimeout={3000}
          onDismiss={() => {
            this.setState((prevState) => {
              return { snackBar: [] }
            })
          }}
        />
        <Masonry className="app" options={masonryOptions}>
          {recipes}
        </Masonry>
        {this.props.requestSent ? <div>Loading</div> : <div>Load More</div>}
      </div>
    );
  }
}
