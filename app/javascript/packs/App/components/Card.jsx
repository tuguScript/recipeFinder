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
          <div className="wrapper" style={{textAlign: 'center'}}>
          <img src={recipe.image} alt=""/>
          <div className="extendedIngredients">
            <DataTable plain>
              <TableHeader>
                <TableRow>
                  <TableColumn>name</TableColumn>
                  <TableColumn>Image</TableColumn>
                  <TableColumn>Description</TableColumn>
                </TableRow>
              </TableHeader>
              <TableBody>
                {this.state.informationBulk.length >= 1 ? (
                  this.state.informationBulk[0].extendedIngredients.map(
                    (data, i) => (
                      <TableRow key={i}>
                        <TableColumn>{data.name}</TableColumn>
                        <TableColumn>
                          <img src={data.image} alt="" />
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

// {this.state.informationBulk.length >= 1
//   ? this.state.informationBulk[0].extendedIngredients.map(
//       (data, i) => {
//         <TableRow key={i}>
//           <TableColumn>data.name</TableColumn>
//           <TableColumn>i</TableColumn>
//           <TableColumn>d</TableColumn>
//         </TableRow>;
//       }
//     )
//   : null}
