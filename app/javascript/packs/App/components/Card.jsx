import React, { Component } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay
} from "react-md";

export default class Card1 extends Component {
  render() {
    let recipe = this.props.data;
    return (
      <Card>
        <Media>
          <img src={recipe.image} alt="Nature from lorempixel" />
          <MediaOverlay>
            <CardTitle title={recipe.title} subtitle="">
              <Button className="md-cell--right" icon>
                {false ? 'bookmark' : 'bookmark_border'}
              </Button>
            </CardTitle>
          </MediaOverlay>
        </Media>
      </Card>
    );
  }
}
