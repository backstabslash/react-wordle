import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'

const allowedKeys = [
    "A", 'a',
    "B", 'b',
    "C", 'c',
    "D", 'd',
    "E", 'e',
    "F", 'f',
    "G", 'g',
    "H", 'h',
    "I", 'i',
    "J", 'j',
    "K", 'k',
    "L", 'l',
    "M", 'm',
    "N", 'n',
    "O", 'o',
    "P", 'p',
    "Q", 'q',
    "R", 'r',
    "S", 's',
    "T", 't',
    "U", 'u',
    "V", 'v',
    "W", 'w',
    "X", 'x',
    "Y", 'y',
    "Z", 'z',
    "Backspace", "Enter",
];

// const wordPool = [
//     "death", "clown", "slash"
// ];

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
        colors: [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        curRow: 0,
        curWord: "death",
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
        const { letters, curWord } = this.state;
        let { curRow, colors } = this.state;
        const posChange = letters[curRow].indexOf(' ');
        if (value !== '⏎' && value !== 'Enter' && value !== '⌫' && value !== 'Backspace' && letters[curRow].includes(' ')) {
            colors[curRow][posChange + 1] = 'activeTile';
            colors[curRow][posChange] = '';
        }
        if (value === '⏎' || value === 'Enter') {
            const word = letters[curRow].join('');
            if (word.toLocaleLowerCase() === curWord) for (let i = 0; i < 5; i++) colors[curRow][i] = 'rightTile';
            if (!letters[curRow].includes(' ') && curRow < 5) { curRow++; colors[curRow][0] = 'activeTile'; }
        }
        else if ((value === '⌫' || value === 'Backspace')) {
            if (letters[curRow][0] !== ' ') {
                let posChange;
                if (letters[curRow].includes(' ')) posChange = letters[curRow].indexOf(' ') - 1;
                else posChange = 4;
                colors[curRow][posChange] = 'activeTile';
                colors[curRow][posChange + 1] = '';
                letters[curRow][posChange] = ' ';
            }
        }
        else {
            letters[curRow][posChange] = value;
        }
        this.setState({ letters: letters, curRow: curRow, colors: colors });
    }

    render() {
        const { letters, colors } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <Grid letters={letters} colors={colors} />
                <Board onClick={this.onKeyClick} />
            </div>
        );
    };
}

export default Game;