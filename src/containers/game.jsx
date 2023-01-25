import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'

class Game extends Component {
    state = {
        letters: [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ]
    };

    onKeyClick = ({ value }) => {
        const { letters } = this.state;
        const posChange = letters[0].indexOf(' ');
        letters[0][posChange] = value;

        this.setState({ letters: letters });
    }

    render() {
        const { letters } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <Grid array={letters} />
                <Board onClick={this.onKeyClick} />
            </div>
        );
    };
}

export default Game;