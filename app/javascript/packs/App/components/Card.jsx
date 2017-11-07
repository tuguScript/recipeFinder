import React, { Component } from "react";
import {
  Button,
  Card,
  CardTitle,
  CardText,
  Media,
  MediaOverlay,
  DialogContainer,
  TextField,
  Paper,
  DataTable,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn
} from "react-md";
import axios from "axios";

export default class Card1 extends Component {
  constructor() {
    super();
    this.state = {
      dialogVisible: false,
      informationBulk: []
    };
  }
  hideDialog() {
    this.setState({
      dialogVisible: false
    });
  }
  openCardDialog(id) {
    axios
      .get(
        "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/informationBulk" +
          "?ids=" +
          id +
          "&includeNutrition=true" +
          "&mashape-key=3a6VknyIDEmshjDcEAPkhNr8FHxXp19URzajsnlWwvn2WYHTaW"
      )
      .then(res => {
        this.setState({ informationBulk: res.data });
        console.log(this.state);
      })
      .catch(e => console.log(e));
    this.setState({ dialogVisible: true });
  }
  render() {
    let recipe = this.props.data;
    let info = this.state.informationBulk;
    return (
      <div>
        <DialogContainer
          id="scrolling-content-dialog"
          aria-describedby="scrolling-content-dialog-content"
          title={recipe.title}
          visible={this.state.dialogVisible}
          onHide={() =>
            this.setState({
              dialogVisible: false
            })}
          height={null}
          width={900}
        >
          <TextField id="none" style={{ display: "none" }} />
          <div className="wrapper" style={{ textAlign: "center" }}>
            <img src={recipe.image} alt="" />
            <div className="extendedIngredients">
              <DataTable plain>
                <TableHeader>
                  <TableRow>
                    <TableColumn>Image</TableColumn>
                    <TableColumn>name</TableColumn>
                    <TableColumn>Description</TableColumn>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {this.state.informationBulk.length >= 1 ? (
                    this.state.informationBulk[0].extendedIngredients.map(
                      (data, i) => (
                        <TableRow key={i}>
                          <TableColumn>
                            <img src={data.image} alt="" />
                          </TableColumn>
                          <TableColumn className="md-text-capitalize">
                            {data.name}
                          </TableColumn>
                          <TableColumn>{data.originalString}</TableColumn>
                        </TableRow>
                      )
                    )
                  ) : (
                    <TableRow key={1}>
                      <TableColumn>loading</TableColumn>
                      <TableColumn>loading</TableColumn>
                      <TableColumn>loading</TableColumn>
                    </TableRow>
                  )}
                </TableBody>
              </DataTable>
              <hr />
              <div className="section-preperation">
                <h1>Preperation</h1>
                <div
                  className="md-body-1 md-text-left"
                  dangerouslySetInnerHTML={{ __html: recipe.instructions }}
                />
                <div
                  className="md-body-1 md-text-left"
                  dangerouslySetInnerHTML={{ __html: this.state.informationBulk.length >= 1
                      ? this.state.informationBulk[0].instructions
                      : "null" }}
                />
              </div>
              <div>
                <a
                  target="_blank"
                  href={
                    this.state.informationBulk.length >= 1
                      ? this.state.informationBulk[0].sourceUrl
                      : "null"
                  }
                >
                  Source:{" "}
                  {this.state.informationBulk.length >= 1
                    ? this.state.informationBulk[0].sourceName
                    : "null"}
                </a>
              </div>
            </div>
          </div>
        </DialogContainer>

        <Card
          onClick={id => {
            this.openCardDialog(recipe.id);
          }}
        >
          <Media>
            <img src={recipe.image} alt="Nature from lorempixel" />
            <MediaOverlay>
              <CardTitle title={recipe.title} subtitle="">
                <Button
                  className="md-cell--right"
                  icon
                  onClick={() => alert("hi")}
                >
                  {false ? "bookmark" : "bookmark_border"}
                </Button>
              </CardTitle>
            </MediaOverlay>
          </Media>
        </Card>
      </div>
    );
  }
}
