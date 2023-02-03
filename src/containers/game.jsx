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
            '', '', '', '', '', '', ''
        ],
        invalidRowShake: [
            '', '', '', '', '', ''
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
        this.setTilesLetters(value);
    }

    setTilesLetters(value) {
        let { letters, curRow } = this.state, posChange = letters[curRow].indexOf(' ');

        this.setInvalidRowAnimation('') // clear shake animation if it was present

        if (value === '⏎' || value === 'Enter') { // handling enter key
            const guess = letters[curRow].join('').toLocaleLowerCase();
            if (wordPool.includes(guess)) {
                this.setActiveTile(curRow, (letters[0].length - 1), '');
                this.setColorsAccordingToGuess(guess);
                if (++curRow < 6)
                    this.setActiveTile(curRow, 0, 'activeTile');
            }
            else this.setInvalidRowAnimation('rowShake'); // shake cause not in word pool
        }
        else if ((value === '⌫' || value === 'Backspace')) { // handling backspace key
            if (letters[curRow][0] !== ' ') {
                if (letters[curRow].includes(' '))
                    posChange = letters[curRow].indexOf(' ') - 1;
                else
                    posChange = letters[0].length - 1;
                this.setActiveTile(curRow, posChange, 'activeTile');
                this.setActiveTile(curRow, posChange + 1, '');
                letters[curRow][posChange] = ' ';
            }
        }
        else { // handling any key thats allowed except for enter and backspace
            if (posChange !== 4 && posChange !== -1) {
                this.setActiveTile(curRow, posChange + 1, 'activeTile');
                this.setActiveTile(curRow, posChange, '');
            }
            letters[curRow][posChange] = value;
        }
        this.setState({ letters: letters, curRow: curRow })
        if (curRow >= 6)
            setTimeout(() => this.refresh(), 500); // lose reset
    }

    setActiveTile(curRow, posChange, value) { // setting and removing glow on current tile
        let { colors } = this.state;
        colors[curRow][posChange] = value;
        this.setState({ colors: colors });
    }

    setInvalidRowAnimation(value) { // setting and removing shake animation
        let { invalidRowShake, curRow } = this.state;
        invalidRowShake[curRow] = value;
        this.setState({ invalidRowShake: invalidRowShake });
    }

    setColorsAccordingToGuess(guess) {
        let { colors, keycolors, curWord, curRow } = this.state, rightGuess = curWord, win = true;
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
        this.setState({ colors: colors, keycolors: keycolors });
        if (win)
            setTimeout(() => this.refresh(), 500); // win reset
    }

    refresh() {
        let letters = [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ],
            colors = [
                ['activeTile', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', ''],
                ['', '', '', '', '']
            ],
            keycolors = [
                '', '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', '', '', '',
                '', '', '', '', '', '', ''
            ],
            curRow = 0,
            curWord = wordPool[Math.floor(Math.random() * wordPool.length)];
        console.log(curWord);
        this.setState({ letters: letters, curRow: curRow, colors: colors, curWord: curWord, keycolors: keycolors });
    }

    replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    render() {
        const { letters, colors, keycolors, invalidRowShake } = this.state;
        return (
            <div className="wrapper">
                <Header />
                <Grid letters={letters} colors={colors} rows={invalidRowShake} />
                <Board onClick={this.onKeyClick} keycolors={keycolors} />
            </div>
        );
    };
}

export default Game;