import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'
import { allowedKeys, wordPool, keyindex } from './consts'

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
        keycolors: [
            '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
        ],
        rowsInvalid: [
            '', '', '', '', '', '',
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
        let { curRow, colors, keycolors, rowsInvalid } = this.state;
        let win = false;
        const posChange = letters[curRow].indexOf(' ');
        if (rowsInvalid[curRow] !== '') rowsInvalid[curRow] = '';
        if (value === '⏎' || value === 'Enter') {
            const word = letters[curRow].join('').toLocaleLowerCase();
            if (posChange === -1 && wordPool.includes(word)) colors[curRow][letters[0].length - 1] = '';
            if (!letters[curRow].includes(' ')) {
                if (wordPool.includes(word)) {
                    win = this.colorsAccordingToGuess(word, curWord, curRow, colors, keycolors);
                    curRow++;
                    if (curRow < 6) colors[curRow][0] = 'activeTile';
                }
                else rowsInvalid[curRow] = 'rowShake';
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
        if (curRow === 6 && !win) setTimeout(() => this.onWin(), 100);
        this.setState({ letters: letters, curRow: curRow, colors: colors, rowsInvalid: rowsInvalid });
    }

    colorsAccordingToGuess(guess, curWord, curRow, colors, keycolors) {
        let rightGuess = curWord, win = true;
        for (let i = 0; i < guess.length; i++) {
            if (rightGuess.includes(guess[i])) {
                if (rightGuess[i] === guess[i]) {
                    keycolors[keyindex.get(guess[i])] = 'rightKey';
                    colors[curRow][i] = 'rightTile';
                    rightGuess = this.replaceAt(rightGuess, rightGuess.indexOf(guess[i]), '1');
                }
                else {
                    keycolors[keyindex.get(guess[i])] = 'almostKey';
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
        let { letters, curWord, curRow, colors, keycolors } = this.state;
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
        keycolors = [
            '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '',
        ];
        curRow = 0;
        curWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        this.setState({ letters: letters, curRow: curRow, colors: colors, curWord: curWord, keycolors: keycolors });
    }

    replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    render() {
        const { letters, colors, keycolors, rowsInvalid } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <Grid letters={letters} colors={colors} rows={rowsInvalid} />
                <Board onClick={this.onKeyClick} keycolors={keycolors} />
            </div>
        );
    };
}

export default Game;