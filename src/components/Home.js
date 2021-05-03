import React, { Component } from "react";
import QuestionsList from "./QuestionsList";
class Home extends Component {
    render() {
        return (
            <div className="poll">
                <QuestionsList />
            </div>
        );
    }
}

export default Home;
