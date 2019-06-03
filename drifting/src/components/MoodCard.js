import React, { Component } from 'react';
//import 'bootstrap/dist/css/bootstrap.css';
//import firebase from 'firebase';
import { Collapse, Button, ButtonToolbar, CardBody, Card, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export class MoodCard extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            modal: false,
            questions: [
                "What's on your mind?",
                "Could the situation be worse than it is? And how so?",
                "What are some factors that contributed to the situation?",
                "What factors in the situation are in your control?",
                "Can you brainstorm solutions you can do to address your situation?",
                "How do you feel now?"
            ]
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    getBody() {
        let body = "<div>";

        for (let i = 0; i < this.state.questions.length; i++) {
            if (this.props.bottle.body[i].length !== 0) {
                body += "<h4 className=\"card-title\">" + this.state.questions[i] + "</h4><br/>";
                body += "<p className=\"card-text\">" + this.props.bottle.body[i] + "</p>";
                body += "<br/>"
            }
        }
        return body + "</div>";
    }

    render() {
        let key = this.props.key;
        let mood;
        let exercise;
        let body;
        let preview;

        /*         console.log("emotion", this.props.bottle.emotion, this.props.bottle.emotion = "0") */
        /* reference: https://www.robinwieruch.de/conditional-rendering-react/ */
        if (this.props.bottle.exercise === "1") {
            mood = "Worse than Usual";
            exercise = "Emotional Processing";
            preview = this.props.bottle.body[0].substring(0, 30);
            body =

                <div>
                    {
                        this.props.bottle.body[0] && this.props.bottle.body[0].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[0]}</h4>
                                <p className="card-answer">{this.props.bottle.body[0]}</p>
                                <br />
                            </div>
                            : null
                    }

                    {
                        this.props.bottle.body[1] && this.props.bottle.body[1].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[1]}</h4>
                                <p className="card-answer">{this.props.bottle.body[1]}</p>
                                <br />
                            </div>
                            : null
                    }

                    {
                        this.props.bottle.body[2] && this.props.bottle.body[2].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[2]}</h4>
                                <p className="card-answer">{this.props.bottle.body[2]}</p>
                                <br />
                            </div>
                            : null
                    }


                    {
                        this.props.bottle.body[3] && this.props.bottle.body[3].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[3]}</h4>
                                <p className="card-answer">{this.props.bottle.body[3]}</p>
                                <br />
                            </div>
                            : null
                    }

                    {
                        this.props.bottle.body[4] && this.props.bottle.body[4].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[4]}</h4>
                                <p className="card-answer">{this.props.bottle.body[4]}</p>
                                <br />
                            </div>
                            : null
                    }

                    {
                        this.props.bottle.body[5] && this.props.bottle.body[5].length > 0
                            ? <div>
                                <h4 className="card-title">{this.state.questions[5]}</h4>
                                <p className="card-answer">{this.props.bottle.body[5]}</p>
                                <br />
                            </div>
                            : null
                    }
                </div >
        } else if (this.props.bottle.exercise === "2") {
            mood = "Great";
            exercise = "Encouragement"
            preview = this.props.bottle.body[0].substring(0, 30);
            body = <div>
                <h4 className="card-message">{this.props.bottle.body[0]}</h4>
            </div>
        } else if (this.props.bottle.exercise === "3") {
            mood = "Worse Than Usual";
            exercise = "Gratitude";
            preview = this.props.bottle.body[0].substring(0, 30);
            body = <div>
                <h4 className="card-message">{this.props.bottle.body[0]}</h4>
            </div>
        }


        return (
            <div className="col-md-6 col-lg-4 d-flex justify-content-between">
                <div className="card w-100 text-center mb-4">
                    <div className="card-body">
                        {/* <h4 className="card-title">{this.props.bottle.tags}</h4> */}
                        <TagList tags={this.props.bottle.tags} />
                        <h4 className="card-mood">{exercise}</h4>
                        <p className="card-text">{preview}</p>



                    </div>

                    <div className="card-footer text-muted">
                        <div className="row align-items-center">
                            <div className="col">
                                <Button className="openb align-self-end" color="danger" onClick={this.toggle}><p>Open Bottle</p></Button>
                            </div>
                            <div>
                                <Modal centered={true} size={"lg"} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}><TagList tags={this.props.bottle.tags} /></ModalHeader>
                                    <ModalBody>
                                        {body}
                                    </ModalBody>
                                    <ModalFooter>
                                        <h4 className="card-info">{mood + " / " + exercise}</h4>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}



export class TagList extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        let tags = this.props.tags;
        //comments = comments.filter((d) => {
        //    return d.card == this.props.card
        //});
        return (
            <ButtonToolbar>
                {tags.map((d, i) => {
                    if (d.length !== 0) {
                        return <Tag key={"tag-" + i} tag={d} />
                    }
                })}
            </ButtonToolbar>
        )


    }
}

export class Tag extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            /*<Button size="sm" color="outline-info">{this.props.tag}</Button>*/
            <div class="tag-item"><p className="t">{"#" + this.props.tag}</p></div>
        )
    }
}