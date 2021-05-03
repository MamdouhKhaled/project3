import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Dropdown from "react-bootstrap/Dropdown";
import { setAuthedUser } from "../actions/authedUser";

class AppNav extends Component {
    handleLogout = (e)=>{
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(setAuthedUser(null));
    }
    render() {
        return (
            <div className="container">
                <div className="navbar">
                    <div className="logo">WRW</div>
                    <div className="tabs">
                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <NavLink className="nav-link" exact to="/">
                                    Home
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/add">
                                    NewQuestion
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/leaderboard">
                                    Leaderboard
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className="info">
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-custom-components">
                                {this.props.username}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps({ authedUser, users }) {
    let username = users[authedUser].name;
    return {
        username,
    };
}
export default connect(mapStateToProps)(AppNav);