import React, { Component } from 'react';
import './Gratitude.css';

class Gratitude extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emotion: "+1",
            exercise: "",
            body: [""],
            tags: "",
            isPublic: true,
        };
        this.routeChange = this.routeChange.bind(this);
    }

    routeChange(type) {
        let path = ""
        if (type === "dispose") {
            path = "/ex_dispose";
        } else {
            path = "/en_result";
        }
        this.props.history.push(path);
    }

    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("exercise").className = "container visible-t";
        }, 10);
        document.getElementById("exercise").addEventListener('scroll', this.handleScroll);
    }

    handleScroll() {
        let winScroll = document.getElementById("exercise").scrollLeft;
        let height = document.getElementById("exercise").scrollWidth - document.getElementById("exercise").clientWidth;
        let scrolled = (winScroll / height) * 100;
        document.getElementById("myBar").style.width = scrolled + "%";
    }



    // Add a method to handle changes to any input element
    handleChange(event) {
        let field = event.target.name;
        let value = event.target.value;
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    handleQuestion(event) {
        let index = event.target.name;
        let value = event.target.value;
        let change = this.state.body;
        change[index] = value;
        this.setState({ body: change }, () => {
            //console.log("body", this.state.body);
        });
    }

    scrollLeft = (e, clsName) => {
        e.preventDefault();
        document.getElementById("exercise").scrollLeft -= (window.innerWidth / 2);
    }

    scrollRight = (e, id) => {
        e.preventDefault();
        document.getElementById("exercise").scrollLeft += (window.innerWidth / 2);
        let currEl = document.getElementById(id);
        currEl.className = "child visible";
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

    addBottle = (e) => {
        e.preventDefault();
        console.log(this.state.body, this.state.body[0]);
        if (this.state.body[0].length === 0) {
            alert("Cannot post an empty encouragement");
        } else {

            let cleanedTags = this.cleanTags(this.state.tags);

            fetch("https://api.kychiu.me/v1/ocean/ocean", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        emotion: "+1",
                        exercise: 2,
                        body: this.state.body,
                        tags: cleanedTags,
                        isPublic: this.state.isPublic
                    })
            }).then(res => {
                return res.json();
            }).then((data) => {
                this.clearState();
                this.routeChange("post");
            }).catch((err, data) => {
                console.log(err);
            });
        }
    }

    clearState() {
        this.setState({
            emotion: "",
            exercise: "",
            body: [""],
            tags: "",
            isPublic: ""
        });
    }

    disposeBottle() {
        this.clearState();
        this.routeChange("dispose");
    }

    render() {
        return (
            <div className="container">
                <div className="container hidden" id="exercise">


                    <section className="child visible" id="s0">
                        <div className="intro">


                            <h1>Gratitude Bottle</h1>
                            <p><i>“Let us rise up and be thankful, for if we didn’t learn a lot today,<br />
                                at least we learned a little, and if we didn’t learn a little,<br />
                                at least we didn’t get sick, and if we got sick, at least we didn’t die<br />
                                so, let us all be thankful.” – Buddha<br /></i></p>
                            <div className="prompt">
                                <div className="description">
                                    <br />
                                    <br />
                                    Take some time to write down what you're grateful for<br/>
                                    A small expression of gratitude can make a big difference<br />
                                    <br />
                                </div>
                            </div>

                            <div id="buttons">
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s1")}>
                                    Continue →
                             </button>
                            </div>
                        </div>
                    </section>

                    <section className="child hidden" id="s1">
                        <div className="form-group">
                            <div className="prompt">
                                <label htmlFor="exampleFormControlTextarea1"> What's something you're grateful for?</label>
                                <div className="q-desc visible">We go through a lot each day, and it can be easy to get bogged down by worries, regrets, or guilt<br/>
                                Take some time to remind yourself of something you're grateful for, or what guides you forward in life<br /></div>
                            </div>
                            <textarea className="form-control box-input"
                                name="5"
                                value={this.state.body[0]}
                                onChange={(event) => { this.handleQuestion(event) }}

                                rows="3"
                                aria-label="some description texts">
                            </textarea>
                        </div>

                        <div className="form-group">
                        <div className="prompt"><label htmlFor="formGroupExampleInput">Tags</label></div>
                            <input type="text" className="form-control box-input"
                                name="tags"
                                value={this.state.tags}
                                onChange={(event) => { this.handleChange(event) }}

                                placeholder="Tag your bottle (Seperate each tag by a comma)"
                                aria-label="Tags for your bottle"
                            />
                        </div>

                        <div id="buttons">
                            <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s0")}>
                                ←
                            </button>
                            <button className="btn btn-primary mr-2" data-toggle="tooltip" data-placement="top" title="Post your bottle publically" onClick={(e) => { this.addBottle(e) }}>
                                Share
                         </button>
                            <button className="btn btn-primary mr-2" data-toggle="tooltip" data-placement="top" title="Set your bottle free" onClick={() => this.disposeBottle()}>
                                Release
                        </button>
                        </div>
                    </section>
                </div>



                <div className="progress-container">
                    <div className="progress-bar" id="myBar"></div>
                </div>
            </div>
        );
    }
}

export default Gratitude;
