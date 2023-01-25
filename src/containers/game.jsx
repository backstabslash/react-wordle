import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'

const allowedKeys = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "Backspace",
    "Enter",
];

class Game extends Component {
    constructor(props) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
    }

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

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown, false);
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown, false);
    };

    keyDown(event) {
        let value = event.key;
        if (allowedKeys.includes(value))
            this.onKeyClick({ value });
    };

    onKeyClick = ({ value }) => {
        console.log(value);
        const { letters } = this.state;
        let { curRow } = this.state;
        if (value === '⏎' || value === 'Enter') {
            if (!letters[curRow].includes(' ') && curRow < 5) curRow++;
        }
        else if (value === '⌫' || value === 'Backspace') {
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