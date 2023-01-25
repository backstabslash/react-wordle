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
        ],
        curRow: 0,
    };

    onKeyClick = ({ value }) => {
        const { letters } = this.state;
        let { curRow } = this.state;
        if (value === '⏎') {
            if (!letters[curRow].includes(' ') && curRow < 5) curRow++;
        }
        else if (value === '⌫') {
            let posChange;
            if (letters[curRow].includes(' ')) posChange = letters[curRow].indexOf(' ') - 1;
            else posChange = 4;
            letters[curRow][posChange] = ' ';
        }
        else {
            const posChange = letters[curRow].indexOf(' ');
            letters[curRow][posChange] = value;
        }
        this.setState({ letters: letters, curRow: curRow });
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