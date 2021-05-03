import React, { Component } from "react";
import { connect } from "react-redux";
import User from "./User";

class Leaderboard extends Component {
    render() {
        const { users } = this.props;
        return (
            <div>
                {users.map((user) => (
                    <User key={user.id} user={user} />
                ))}
            </div>
        );
    }
}
function mapStateToProps({ users }) {
    const players = Object.values(users)
        .map(
            (player) =>
                Object.assign({}, player, {
                    score:
                        Object.keys(player.answers).length +
                        player.questions.length,
                }) // I create a new attribute, call it score and assign it the sum of the points
        )
        .sort((a, b) => b.score - a.score);
    return {
        users: players,
    };
}
export default connect(mapStateToProps)(Leaderboard);
