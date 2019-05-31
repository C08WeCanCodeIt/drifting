import React, { Component } from 'react';
import { CardList } from './CardList.js';
import {
    InputGroup,
    InputGroupAddon,
    //InputGroupButtonDropdown,
    //InputGroupDropdown,
    Input,
    Button,
    //Dropdown,
    //DropdownToggle,
    //DropdownMenu,
    //DropdownItem
} from 'reactstrap';

export class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            bottles: [],
            url: "https://api.kychiu.me/v1/ocean/ocean"
        }
    }

    componentDidMount() {
        fetch(this.state.url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.json();
        }).then((data) => {
            this.setState({
                //allBottles: data.bottles,
                bottles: data.bottles
            });
            console.log(data);
        }).catch((err, data) => {
            console.log(err);
        });
    }

    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;
        //console.log(field, value);
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    filterBottles() {
        let bottles = this.bottles.filter((d) => {
            //console.log("allb1", allBottles);
            //console.log("d", d);
            //console.log("this", this.state);
            return d.tags.includes(this.state.filter);
        });

        this.setState({
            bottles: bottles,
            filter: ""
        })
    }

    render() {
        //console.log("gallery", "fantastic");
        //console.log("allb", allBottles);
        //console.log("gallery", this.state.bottles);
        return (
            <div>
                <div className="gallery-header">
                    <div className="intro">
                        <h3>Explore Others' Bottles</h3>
                    </div>
                    <InputGroup>
                        <Input type="text" className="form-control"
                            name="filter"
                            value={this.state.filter}
                            onChange={(event) => { this.handleChange(event) }}
                            id="formGroupExampleInput"
                            placeholder="What are you looking for?"
                            aria-label="tags for filter" />
                        <InputGroupAddon addonType="append"><Button onClick={this.filterBottles}>Filter</Button></InputGroupAddon>
                    </InputGroup>
                </div>
                <br />
                <div className="forum">
                    <div className="cardList">
                        <CardList bottles={this.state.bottles} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Gallery;