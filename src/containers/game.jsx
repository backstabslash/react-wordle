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

const wordPool = [
    "death", "clown", "slash"
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
        colors: [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        curRow: 0,
        curWord: wordPool[Math.floor(Math.random() * wordPool.length)],
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
        let win = false;
        const posChange = letters[curRow].indexOf(' ');
        if (value === '⏎' || value === 'Enter') {
            const word = letters[curRow].join('').toLocaleLowerCase();
            if (posChange === -1 && wordPool.includes(word)) colors[curRow][letters[0].length - 1] = '';
            if (!letters[curRow].includes(' ')) {
                if (wordPool.includes(word)) {
                    win = this.colorsAccordingToGuess(word, curWord, curRow, colors);
                    if (curRow < 5) {
                        curRow++;
                        colors[curRow][0] = 'activeTile';
                    }
                }
                else { alert("try again"); }
            }
        }
        else if ((value === '⌫' || value === 'Backspace')) {
            if (letters[curRow][0] !== ' ') {
                let posChange;
                if (letters[curRow].includes(' ')) posChange = letters[curRow].indexOf(' ') - 1;
                else posChange = letters[0].length - 1;
                colors[curRow][posChange] = 'activeTile';
                colors[curRow][posChange + 1] = '';
                letters[curRow][posChange] = ' ';
            }
        }
        else {
            if (posChange !== 4 && posChange !== -1) {
                colors[curRow][posChange + 1] = 'activeTile';
                colors[curRow][posChange] = '';
            }
            letters[curRow][posChange] = value;
        }
        if (win) setTimeout(() => this.onWin(), 100);
        this.setState({ letters: letters, curRow: curRow, colors: colors });
    }

    colorsAccordingToGuess(guess, curWord, curRow, colors) {
        let rightGuess = curWord, win = true;
        for (let i = 0; i < guess.length; i++) {
            if (rightGuess.includes(guess[i])) {
                if (rightGuess[i] === guess[i]) {
                    colors[curRow][i] = 'rightTile';
                    rightGuess = this.replaceAt(rightGuess, rightGuess.indexOf(guess[i]), '1');
                }
                else {
                    colors[curRow][i] = 'almostTile';
                    rightGuess = this.replaceAt(rightGuess, rightGuess.indexOf(guess[i]), '1');
                    win = false;
                }
            }
            else {
                colors[curRow][i] = 'wrongTile';
                win = false;
            }
        }
        return win;
    }

    onWin() {
        let { letters, curWord, curRow, colors } = this.state;
        letters = [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ];
        colors = [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ];
        curRow = 0;
        curWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        this.setState({ letters: letters, curRow: curRow, colors: colors, curWord: curWord });
    }

    replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
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