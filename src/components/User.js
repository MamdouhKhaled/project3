import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
class User extends Component {
    render() {
        const { user } = this.props;
        console.log(user);
        return (
            <Card>
                <Card.Body>
                    <div className="row gab-3">
                        <div className="col col-3">
                            <Image
                                src={`/images/avatars/${user.avatarURL}.png`}
                                roundedCircle
                            />
                        </div>
                        <div className="col col-6">
                            <h5> {user.name}</h5>
                            <p>Number Of Questions: {user.questions.length}</p>
                            <p>Number Of Answers: {Object.values(user.answers).length}</p>
                        </div>
                        <div className="col col-3">
                            <h6>Score</h6>
                            <p>{user.score}</p>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        );
    }
}

export default User;
