import React, { Component } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.css';
/*import Mindfulness from "./../components/Mindfulness";*/


export default class ForumSubmission extends Component {
    // Set up a blank title and description input field
    constructor(props) {
        super(props);
        this.state = {
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", ""],
            tags: "",
            isPublic: true,
        };

        this.routeChange = this.routeChange.bind(this);;
    }


    routeChange(type) {
        let path = ""
        if (type === "dispose") {
            path = "/ex_dispose";
        } else {
            path = "/ep_result";
        }
        this.props.history.push(path);
    }

    componentDidMount() {
        setTimeout(function () { //Start the timer
            document.getElementById("main-ex").className = "container visible-t"
        }, 100)


        document.getElementById("exercise").addEventListener('scroll', this.handleScroll);
    }

    handleChecked() {
        let checkbox = document.getElementById("dsc-check");
        checkbox.addEventListener('change', function () {
            if (checkbox.checked) {
                checkbox.checked = false;
                let desc = document.getElementsByClassName("q-desc visible");
                Array.from(desc).forEach(function (d) {
                    d.style.display = "none";
                    d.className = "q-desc hidden-t";
                });
            } else {
                checkbox.checked = true;
                let desc = document.getElementsByClassName("q-desc hidden-t");
                Array.from(desc).forEach(function (d) {
                    d.style.display = "block";
                    d.className = "q-desc visible";
                });

            }
        });
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
        //console.log(field, value);
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    handleQuestion(event) {
        let index = event.target.name;
        let value = event.target.value;
        //console.log(index, value);
        let change = this.state.body;
        change[index] = value;
        this.setState({ body: change }, () => {
            //console.log("body", this.state.body);
        });
    }

    /*I have no idea why .scrollRight += 300 doesn't work*/
    scrollLeft = (e, clsName) => {
        e.preventDefault();
        document.getElementById("exercise").scrollLeft -= 600;
    }

    scrollRight = (e, id) => {
        e.preventDefault();
        if (id === "s3") {
            document.getElementById("s2.5").style.display = "none";
        } else {
            document.getElementById("exercise").scrollLeft += 600;
        }

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
        query = query.replace(/,,/g, ",");
        query = query.replace(/  /g, " "); //double spaces
        query = query.trim();

        return query;
    }

    addBottle = (e) => {
        e.preventDefault();
        let cleanedTags = this.cleanTags(this.state.tags);
        fetch("https://api.kychiu.me/v1/ocean/ocean", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    emotion: "-1",
                    exercise: 1,
                    body: this.state.body,
                    tags: cleanedTags,
                    isPublic: true //this.state.isPublic
                })
        }).then(res => {
            return res.json();
        }).then((data) => {
            //console.log("bottle", data);
            this.clearState();
            this.routeChange("post");
        }).catch((err, data) => {
            console.log(err);
        });
    }

    clearState() {
        this.setState({
            emotion: "",
            exercise: "",
            body: ["", "", "", "", "", ""],
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



            <div id="main-ex" className="container hidden">
                <div className="holder">
                    <div className="description-checkbox">
                        <label><input type="checkbox" id="dsc-check" value="show" checked onChange={() => this.handleChecked()} />Show Guides</label>
                    </div>

                    <form id="exercise" className="container">


                        <section className="child visible" id="s0" >
                            <div className="intro">


                                <h3>Reflection Bottle</h3>
                                <i>Navigate Through Stressful Thoughts</i>
                                <div className="prompt">
                                    <div className="description">
                                        <br />
                                        <br />
                                        <p>If you’re going through some stormy waters, let’s walkthrough the following exercise<br />We’ll find a way to pass this storm.</p>
                                        <br />
                                        <p>Feel free to go at your own pace, and skip any questions you want</p>
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
                                    <label htmlFor="exampleFormControlTextarea1">1/6 - What's on your mind?</label>
                                    <div className="q-desc visible">Write a bit about the current situation that got you feeling down<br />While it can be difficult to share, getting it off your chest can help</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="0"
                                    value={this.state.body[0]}
                                    onChange={(event) => { this.handleQuestion(event) }}

                                    rows="3"
                                    placeholder="Example: I failed my midterm..."
                                    aria-label="some description texts">
                                </textarea>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s0")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s2")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s2">
                            <div className="form-group">
                                <div className="prompt">
                                    <label htmlFor="exampleFormControlTextarea1">2/6 - What do you fear could be worst outcome from your situation?</label>
                                    <div className="q-desc visible">While what you’re going through is already tough, identifying your worst fear can help put things into perspective<br />And remember, it's unlikely for your worst fears to happen</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="1"
                                    value={this.state.body[1]}
                                    onChange={(event) => { this.handleQuestion(event) }}

                                    rows="3"
                                    placeholder="Example: I could fail the whole class"
                                    aria-label="some description texts">
                                </textarea>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s1")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s2.5")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s2.5">
                            <div className="form-group">
                                <div className="prompt">
                                    <div className="description">
                                        <label>Although you’re trekking through rough waters,<br />Storms don’t last forever</label>
                                        <br />
                                        <br />
                                    </div>

                                </div>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s2")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s3")}>
                                    →
                                 </button>
                            </div>
                        </section>


                        <section className="child hidden" id="s3">
                            <div className="form-group">
                                <div className="prompt">
                                    <label htmlFor="exampleFormControlTextarea1"> 3/6 - What contributed to your situation? Please list a few factors:</label>
                                    <div className="q-desc visible">When things get stormy, it can be hard to see the big picture<br />Take some time to think about what else was involved</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="2"
                                    value={this.state.body[2]}
                                    onChange={(event) => { this.handleQuestion(event) }}

                                    rows="3"
                                    placeholder="Example: The professor was sick that week, I haven’t been getting enough sleep, I’m having a hard time understanding the class..."
                                    aria-label="some description texts">

                                </textarea>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s2")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s4")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s4">
                            <div className="form-group">
                                <div className="prompt">
                                    <label htmlFor="exampleFormControlTextarea1"> 4/6 - What factors in the situation are in your control?</label>
                                    <div className="q-desc visible">While there may be many factors involved, not all of the factors have a direct relationship to you<br />Take some time to remember what factors you’re able to control</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="3"
                                    value={this.state.body[3]}
                                    onChange={(event) => { this.handleQuestion(event) }}

                                    rows="3"
                                    placeholder="Example: Time spent on other class project, Bed time, Difficulty understanding class material"
                                    aria-label="some description texts">
                                </textarea>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s3")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s5")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s5">
                            <div className="form-group">
                                <div className="prompt">
                                    <label htmlFor="exampleFormControlTextarea1"> 5/6 - Let’s brainstorm some solutions!</label>
                                    <div className="q-desc visible">Now that we narrowed down to what factors are in your control,<br />Let’s think of some ways to help address your situation</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="4"
                                    value={this.state.body[4]}
                                    onChange={(event) => { this.handleQuestion(event) }}

                                    rows="3"
                                    placeholder="Examples: I can set a stricter bedtime, I can join a study group"
                                    aria-label="some description texts">
                                </textarea>
                            </div>

                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s4")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s6")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s6">
                            <p> Take some time to complete this mindfulness exercise</p>

                            <h1>Work in progress...</h1>
                            {/*<Mindfulness />*/}


                            <div id="buttons">
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s5")}>
                                    ←
                                </button>
                                <button id="right-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollRight(e, "s7")}>
                                    →
                                 </button>
                            </div>
                        </section>

                        <section className="child hidden" id="s7">
                            <div className="form-group">
                                <div className="prompt">
                                    <label htmlFor="exampleFormControlTextarea1"> 6/6 - How do you feel about your situation now?</label>
                                    <div className="q-desc visible">By completing this exercise, we hope that you’re able to think about your situation through a different perspective <br />Feel free to jot down some reminders to yourself about how you want to address you situation from now on</div>
                                </div>
                                <textarea className="form-control box-input"
                                    name="5"
                                    value={this.state.body[5]}
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
                                <button id="left-button" className="btn btn-primary mr-2" onClick={(e) => this.scrollLeft(e, "s6")}>
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
                    </form>

                    <div className="progress-container">
                        <div className="progress-bar" id="myBar"></div>
                    </div>
                </div>
            </div>



        );
    }
}