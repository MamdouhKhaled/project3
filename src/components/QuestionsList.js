import React, { Component } from "react";
import { connect } from "react-redux";

import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import QuestionsListItem from "./QuestionsListItem";
class QuestionsList extends Component {
    render() {
        const { answeredQuestions, unAnsweredQuestions, users } = this.props;
        return (
            <div className="col-6 offset-3 mt-5">
                <Tabs
                    defaultActiveKey="unanswered"
                    id="uncontrolled-tab-example"
                >
                    <Tab eventKey="unanswered" title="Unanswered">
                        <div className="d-grid gap-2 mx-auto">
                            {unAnsweredQuestions.length > 0 ? (
                                unAnsweredQuestions.map((question) => (
                                    <QuestionsListItem
                                        key={question.id}
                                        user={users[question.author]}
                                        question={question}
                                    />
                                ))
                            ) : (
                                <p id="no-questions">
                                    No Questions Here, Check The Other Tab
                                </p>
                            )}
                        </div>
                    </Tab>
                    <Tab eventKey="answered" title="Answered">
                        <div className="d-grid gap-2 mx-auto">
                            {answeredQuestions.length > 0 ? (
                                answeredQuestions.map((question) => (
                                    <QuestionsListItem
                                        key={question.id}
                                        user={users[question.author]}
                                        question={question}
                                    />
                                ))
                            ) : (
                                <p id="no-questions">
                                    No Questions Here, Check The Other Tab
                                </p>
                            )}
                        </div>
                    </Tab>
                </Tabs>
            </div>
        );
    }
}
function mapStateToProps({ authedUser, users, questions }) {
    const userAnswers = Object.keys(users[authedUser].answers);
    const answeredQuestions = Object.values(questions)
        //Verify if the questionID exists in the userAnswers
        .filter((question) => userAnswers.includes(question.id))
        //Attach the type to the object
        .map((question) => Object.assign({}, question, { type: "answered" }))
        //Sort by newest to oldest
        .sort((a, b) => b.timestamp - a.timestamp);

    const unAnsweredQuestions = Object.values(questions)
        .filter((question) => !userAnswers.includes(question.id))
        .map((question) => Object.assign({}, question, { type: "unanswered" }))
        .sort((a, b) => b.timestamp - a.timestamp);
    return {
        answeredQuestions,
        unAnsweredQuestions,
        authedUser,
        users
    };
}

export default connect(mapStateToProps)(QuestionsList);
