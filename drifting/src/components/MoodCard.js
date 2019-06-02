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

        /*         console.log("emotion", this.props.bottle.emotion, this.props.bottle.emotion = "0") */
        if (this.props.bottle.exercise === "1") {
            mood = "Worse than Usual"
            exercise = "Emotional Processing"
            body =

                <div>
                    <h4 className="card-title">{this.state.questions[0]}</h4>
                    <p className="card-text">{this.props.bottle.body[0]}</p>
                    <br />

                    <h4 className="card-title">{this.state.questions[1]}</h4>
                    <p className="card-text">{this.props.bottle.body[1]}</p>
                    <br />
                    <h4 className="card-title">{this.state.questions[2]}</h4>
                    <p className="card-text">{this.props.bottle.body[2]}</p>
                    <br />
                    <h4 className="card-title">{this.state.questions[3]}</h4>
                    <p className="card-text">{this.props.bottle.body[3]}</p>
                    <br />
                    <h4 className="card-title">{this.state.questions[4]}</h4>
                    <p className="card-text">{this.props.bottle.body[4]}</p>
                    <br />
                    <h4 className="card-title">{this.state.questions[5]}</h4>
                    <p className="card-text">{this.props.bottle.body[5]}</p>
                    <br />
                </div>
        } else {
            mood = "Great";
            exercise = "Encouragement"
            body = <div>
                <h4 className="card-title">{this.props.bottle.body[0]}</h4>
            </div>
        }


        return (
            <div className="col-md-6 col-lg-3 d-flex justify-content-between">
                <div className="card w-100 text-center mb-4">
                    <div className="card-body">
                        {/* <h4 className="card-title">{this.props.bottle.tags}</h4> */}
                        <TagList tags={this.props.bottle.tags} />
                        <h4 className="card-mood">{mood}</h4>
                        <p className="card-text">{exercise}</p>
                        <div className="row align-items-center">
                            <div className="col">
                                <Button color="danger" onClick={this.toggle}>Open Bottle</Button>
                            </div>
                            <div>
                                <Modal centered={true} size={"lg"} isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                                    <ModalHeader toggle={this.toggle}>{mood + " / " + exercise}</ModalHeader>
                                    <ModalBody>
                                        {body}
                                    </ModalBody>
                                    <ModalFooter>
                                        <h4 className="card-title">{this.props.bottle.tags}</h4>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>


                    </div>
                    <div className="card-footer text-muted">
                        {this.props.bottle.createdAt}
                    </div>
                    <Collapse isOpen={this.state.collapse}>
                        <Comments card={key} user={this.props.user} />
                    </Collapse>
                </div>
            </div>
        )
    }
}

export class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = { comments: [], text: "" };
    }

    componentDidMount() {
        //this.commentsRef = firebase.database().ref('comments');
        //this.commentsRef.on('value', (snapshot) => {
        //    let comments = snapshot.val();
        //    this.setState({comments:comments});
        //})
    }

    // Add a method to handle changes to any input element
    handleChange(event) {
        let value = event.target.value;
        let field = event.target.name;
        let change = {};
        change[field] = value;
        this.setState(change);
    }

    addComment() {
        let comment = {
            card: this.props.card,
            user: this.props.user,
            text: this.state.text,
            date: new Date().toLocaleString(),
            //timestamp: firebase.database.ServerValue.TIMESTAMP,
        }
        this.commentsRef.push(comment);
        this.setState({
            text: "",
        });
    }

    render() {
        let comments = Object.keys(this.state.comments).map((d) => {
            let comment = this.state.comments[d];
            comment.key = d;
            return comment;
        })
        return (
            <Card>
                <CardBody>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control"
                            name="text"
                            value={this.state.text}
                            onChange={(event) => { this.handleChange(event) }}
                            id="formGroupExampleInput"
                            placeholder="Leave your Comment..."
                            aria-label="Input your comment"
                        />
                        <div className="input-group-append">
                            <button className="btn btn-outline-secondary" onClick={() => this.addComment()} type="button">Add</button>
                        </div>
                    </div>
                    <CommentList comments={comments} card={this.props.card} />
                </CardBody>
            </Card>
        )
    }
}

export class CommentList extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        let comments = this.props.comments;
        comments = comments.filter((d) => {
            return d.card === this.props.card
        });
        return (
            <div>
                {comments.map((d, i) => {
                    return <Comment key={"comment-" + i} info={d} />
                })}
            </div>
        )
    }
}

export class Comment extends Component {
    //constructor(props) {
    //    super(props);
    //}

    render() {
        return (
            <div>
                <p>{this.props.info.text}</p>
                <small>{"From: " + this.props.info.user}</small>
                <hr />
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
                    if (d.length != 0) {
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
            <Button size="sm" color="outline-info">{this.props.tag}</Button>
        )
    }
}