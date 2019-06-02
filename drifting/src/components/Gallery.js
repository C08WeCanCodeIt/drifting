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

const api = "https://api.kychiu.me/v1/ocean/ocean?tags=";

export class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            bottles: [],
            url: api
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
            this.getTags(data.tags, "allTags");
            console.log(data.tags);
        }).catch((err, data) => {
            console.log(err);
        });

        //document.getElementById("searchBar").addEventListener('submit', function (event) {
            if (this.state.url !== api) {
                document.getElementById("filtered").style.opacity = 1;
                document.getElementById("clearFilterTags").style.opacity = 1;
            } else {
                document.getElementById("filtered").style.opacity = 0;
                document.getElementById("clearFilterTags").style.opacity = 0;
            }
        //});

        document.getElementById("clearFilterTags").addEventListener("submit", function(event) {
            event.preventDefault();
            document.getElementById("filteredTags").innerHTML="";
            document.getElementById("filted").style.opacity = 0;

        })
    }

    getTags(tags, id) {
        console.log(tags);
        let currTags="";
        let tagslength = tags.length;
        if (tagslength > 10) {
            tagslength = 10;
        }
        for (let i = 0; i < tagslength; i++) {
            //currTags += "<button class=\"btn btn-outline-info btn-sm\">" + tags[i].name + "</button>"
            if (tags[i].name) {
                currTags += "<div class=\"tag-item\">" + tags[i].name + "</div>"
            } else {
                currTags += "<div class=\"tag-item\">" + tags[i] + "</div>"
            }
            
        }

        document.getElementById(id).innerHTML = currTags;

    }

    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    cleanTags(query) {
        query = query.replace(/, #/g, ", ");
        query = query.replace(/ #/g, ", ");
        query = query.replace(/#/g, ", ");

        if (query.indexOf(",") === 0) {
            query = query.substring(1, query.length);
        }

        if (query.indexOf(", ") === 0) {
            query = query.substring(2, query.length);
        }
        if (query.substring(query.length - 1, query.length) === ",") {
            query = query.substring(0, query.length - 1);
        }

        query = query.replace(/,,/g, ",");
        query = query.replace(/  /g, " "); //double spaces
        query = query.trim();

        return query;
    }

    filterBottles(event) {
        event.preventDefault();

        let query = document.getElementById("searchBar");
        if (query) {
            let tags = this.cleanTags(query.value);

            this.setState({ filter: tags, url: api + tags });

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
                if (this.state.filter.length > 0) {
                    document.getElementById("filtered").style.opacity = 1;
                    document.getElementById("clearFilterTags").style.opacity = 1;
                }
                this.getTags(tags.split(","), "filteredTags");
            }).catch((err, data) => {
                console.log(err);
            });
        }
    }

    render() {
        return (
            <div>
                <div className="gallery-header">
                    <div className="intro">
                        <h4>Explore Others' Bottles</h4>
                    </div>
                    <InputGroup>
                        <Input type="text" className="form-control"
                            name="filter"
                            value={this.state.filter}
                            onChange={(event) => { this.handleChange(event) }}
                            id="searchBar"
                            placeholder="What are you looking for?"
                            aria-label="tags for filter" />
                        <InputGroupAddon addonType="append"><Button onClick={(e) => this.filterBottles(e)}>Filter</Button></InputGroupAddon>
                    </InputGroup>
                    <div id="clear-button">
                        <button type="submit" id="clearFilterTags" className="btn btn-outline-info btn-sm float-right">Clear Filters</button>
                    </div>

                    <div id="tag-holder">
                        <div id="tags"><span><b>Recent Tags  </b>  </span><span id="allTags"></span></div>
                        <div id="filtered"><span><b>Filtered By</b> </span><span id="filteredTags"></span></div>
                    </div>
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