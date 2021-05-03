import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import {NavLink} from 'react-router-dom';
class QuestionsListItem extends Component {
    render() {
        const question = this.props.question;
        const user = this.props.user;
        return (
            <Card>
                <Card.Header>{user.name} Asks</Card.Header>
                <Card.Body>
                    <div className="row">
                        <div className="col-4">
                            <Image
                                src={`/images/avatars/${user.avatarURL}.png`}
                                roundedCircle
                            />
                        </div>
                        <div className="col-8">
                            <div className="d-grid gap-2 mx-auto">
                                <h4>Would You Rather</h4>
                                <p>{question.optionOne.text}</p>
                                <NavLink to={`/questions/${question.id}`}>
                                    <button className="btn btn-primary btn-sm">
                                        {question.type === "unanswered"
                                            ? "View And Vote"
                                            : "View Answer"}
                                    </button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default QuestionsListItem;
