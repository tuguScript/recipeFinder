import React, { Component } from "react";
import axios from 'axios'
import Item from '../../Components/Item'
import Masonry from "react-masonry-component";

const masonryOptions = {
    transitionDuration: 0
};

export default class SavedContainer extends Component {
    constructor() {
        super()
        this.state = {
            savedRecipes: []
        }
    }
    componentDidMount() {
        let user = JSON.parse(sessionStorage.getItem('user'))
        let token = user.token
        let data = { token }
        axios.post('/saved_recipes', data).then((res) => {
            this.setState(() => {
                return {
                    savedRecipes: res.data
                };
            });
        })
    }
    render() {
        let recipes = this.state.savedRecipes.map((item, i) => {
            return (
                <Item data={item} key={i} />
            )
        })
        return (
            <div>
                <Masonry className="app" options={masonryOptions}>
                    {recipes}
                </Masonry>
            </div>
        )
    }
}
