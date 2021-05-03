import React, { Component } from "react";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";

class Login extends Component {
    state = {
        user_id: null,
    };
    handleLogin = (e) => {
        e.preventDefault();
        const { dispatch } = this.props;
        dispatch(setAuthedUser(this.state.user_id));
    };
    handleInputChange = (e) => {
        e.preventDefault();
        this.setState({ user_id: e.target.value });
    };
    render() {
        // object.value to Convert Object to Array
        const users = Object.values(this.props.users);
        return (
            <div className="login">
                <h3>Welcome To (Would You Rather) Game</h3>
                <div className="login-header">
                    <h4>Sign In</h4>
                </div>
                <div className="row g-2">
                    <div className="col-11">
                        <select
                            className="form-select"
                            onChange={this.handleInputChange}
                        >
                            <option value="" defaultValue>
                                None
                            </option>
                            {users.map((user) => {
                                return (
                                    <option value={user.id} key={user.id}>
                                        {user.name}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="col-1">
                        <button
                            className="btn btn-primary"
                            onClick={this.handleLogin}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users } = state;
    return {
        users,
    };
}
export default connect(mapStateToProps)(Login);
