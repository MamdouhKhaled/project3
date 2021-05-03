import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {handleAnswerQuestion} from "../actions/questions";

class Question extends Component {
    state = {
        option: "optionOne",
    };

    votesCalculate = (votes, total) => {
        return Math.round((votes / total) * 100);
    };

    handleChange = (e) => {
        const element = e.target;
        this.setState({option: element.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch, question} = this.props;
        dispatch(handleAnswerQuestion(question.id, this.state.option));
        this.props.history.goBack()
    };

    render() {
        const {user, answered, authedUser, question} = this.props;
        const {optionOne, optionTwo} = question;
        const totalVotes = optionOne.votes.length + optionTwo.votes.length;
        const optionOneP = this.votesCalculate(
            optionOne.votes.length,
            totalVotes
        )
        const optionTwoP = this.votesCalculate(
            optionTwo.votes.length,
            totalVotes
        )
        console.log(this.props);
        return (

            <div className="card col-8 offset-2">
                <div className="card-header">
                    <Link to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-arrow-return-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                  d="M14.5 1.5a.5.5 0 0 1 .5.5v4.8a2.5 2.5 0 0 1-2.5 2.5H2.707l3.347 3.346a.5.5 0 0 1-.708.708l-4.2-4.2a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 8.3H12.5A1.5 1.5 0 0 0 14 6.8V2a.5.5 0 0 1 .5-.5z"/>
                        </svg>
                    </Link>
                    {answered
                        ? "  Asked by " + user.name
                        : "  " + user.name + " Asks"}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-4">
                            <img
                                alt="avatar"
                                src={`/images/avatars/${user.avatarURL}.png`}
                            />
                        </div>
                        <div className="col-8">
                            <h4>{answered ? "Results" : "Would You Rather"}</h4>
                            {answered ? (
                                <form>
                                    <div>
                                        <label>{optionOne.text}</label>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar" aria-valuenow="0"
                                                 style={{width: optionOneP + "%"}}
                                                 aria-valuemin={optionOneP} aria-valuemax="100">
                                            </div>
                                        </div>
                                        <label
                                            className="choice-percentage">{`${optionOne.votes.length} Out Of ${totalVotes}`}</label>
                                    </div>
                                    <div>
                                        <label>{optionTwo.text}</label>
                                        <div className="progress">
                                            <div className="progress-bar" role="progressbar"
                                                 style={{width: optionTwoP + "%"}} aria-valuenow={optionTwoP}
                                                 aria-valuemin="0" aria-valuemax="100">
                                            </div>
                                        </div>

                                        <label
                                            className="choice-percentage">{`${optionTwo.votes.length} Out Of ${totalVotes}`}</label>
                                    </div>
                                </form>
                            ) : (
                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="option"
                                               id="optionOne" value="optionOne" onChange={this.handleChange}
                                               defaultChecked/>
                                        <label className="form-check-label" htmlFor="optionOne">
                                            {optionOne.text}
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="option"
                                               id="optionTwo" value="optionTwo" onChange={this.handleChange}/>
                                        <label className="form-check-label" htmlFor="optionTwo">
                                            {optionTwo.text}
                                        </label>
                                    </div>
                                    <div className="d-grid gap-2 mt-3">
                                        <input type="submit" className="btn btn-primary btn-sm btn-block"
                                               value="Submit Vote" id="submit"/>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

function mapStateToProps({questions, users, authedUser}, {match}) {
    const id = match.params.questiondID;
    const question = questions[id];
    let answered = false;
    if (
        question.optionOne.votes.includes(authedUser) ||
        question.optionTwo.votes.includes(authedUser)
    ) {
        answered = true;
    }
    const user = users[question.author];
    return {
        question,
        user,
        answered,
        authedUser,
    };
}

export default withRouter(connect(mapStateToProps)(Question));