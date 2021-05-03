import React, { Component } from "react";
import { connect } from "react-redux";
import { handleAddQuestion } from "../actions/questions";
import { Redirect } from "react-router-dom";
class NewQuestion extends Component {
  state = {
    questionOne: "",
    questionTwo: "",
    redirect: false,
  };

  handleChange = (e) => {
    e.preventDefault();
    const element = e.target;
    this.setState({ [element.id]: element.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { questionOne, questionTwo } = this.state;
    if (questionOne.trim() === "" || questionTwo.trim() === "") {
      alert("One or more questions are empty, please make sure both fields are filled.");
    } else {
      dispatch(handleAddQuestion(questionOne, questionTwo));
      this.setState({ redirect: true });
    }
  };
  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <div className="card col-6 offset-3">

        <div className="card-header">
          <h3>Create New Question</h3>
        </div>
        <div className="card-body">
          <div className="text-center mb-1">
            <img className="img-fluid img" src={`/images/wyrImage.gif`} alt="logo" width="100px" />
          </div>
          <form  onSubmit={this.handleSubmit}>
            <div className="mb-3">
              <input type="text" className="form-control" id="questionOne" name="question1" placeholder="First question" maxLength="70" onChange={this.handleChange} />
            </div>
            <p className="text-center">OR</p>
            <div className="mb-3">
              <input type="text" className="form-control"  id="questionTwo" name="question2" placeholder="Second question" maxLength="70" onChange={this.handleChange} />
            </div>
            <div className="d-grid gap-2">
            <input type="submit" className="btn btn-primary btn-sm btn-block" value="Submit" id="submit" />
            </div>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

export default connect()(NewQuestion);
