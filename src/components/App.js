import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import { Route, Switch } from "react-router-dom";
import LoadingBar from "react-redux-loading";
/**
 * load component
 */
import AppNav from "./AppNav";
import Home from "./Home";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
// import NotFound from "./NotFound";
import Login from "./Login";
class App extends Component {
    componentDidMount() {
        this.props.handleInitialData();
    }
    render() {
        return (
            <Fragment>
                <LoadingBar />
                {this.props.authedUser === null || <AppNav />}
                <div className="container">
                    {this.props.authedUser === null ? (
                        <Login />
                    ) : (
                        <Switch>
                            <Route exact path="/">
                                <Home />
                            </Route>
                            <Route path="/questions/:questiondID">
                                <Question />
                            </Route>
                            <Route path="/leaderboard">
                                <Leaderboard />
                            </Route>
                            <Route path="/add">
                                <NewQuestion />
                            </Route>
                        </Switch>
                    )}
                </div>
            </Fragment>
        );
    }
}
function mapDispatchToProps(dispatch) {
    return {
        handleInitialData: () => dispatch(handleInitialData()),
    };
}
function mapStateToProps(state) {
    const { authedUser } = state;
    return {
        authedUser: authedUser,
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
