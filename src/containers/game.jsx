import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'
import { ALLOWED_KEYS, KEY_INDEX, WORD_POOL, WORD_POOL_LENGTH, MAX_ROWS, MAX_TILES } from './consts'
import { localletters, row, localcolors, word, localkeyColors } from './localStorage'

class Game extends Component {
    constructor(props) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
    }

    state = {
        letters: localletters || [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ],
        colors: localcolors || [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ],
        keyColors: localkeyColors || [
            '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', ''
        ],
        rowAnimations: [
            '', '', '', '', '', ''
        ],
        curRow: parseInt(row) || 0,
        curWord: word || WORD_POOL[Math.floor(Math.random() * WORD_POOL_LENGTH)],
    };

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown, false);
        if (!(localStorage.getItem("goodGames"))) localStorage.setItem("goodGames", 0);
        if (!(localStorage.getItem("totalGames"))) localStorage.setItem("totalGames", 0);
        if (!(localStorage.getItem("totalGuesses"))) localStorage.setItem("totalGuesses", 0);
    };

    componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown, false);
    };

    keyDown(event) {
        let value = event.key;
        if (ALLOWED_KEYS.includes(value))
            this.onKeyClick({ value });
    };

    onKeyClick = ({ value }) => {
        this.setTilesLetters(value);
    }

    setTilesLetters(value) {
        let { letters, curRow } = this.state, posChange = letters[curRow].indexOf(' ');
        this.setInvalidRowAnimation('') // clear shake animation if it was present
        this.setBounceRowAnimation('');// clear bounce animation if it was present
        if (value === '⏎' || value === 'Enter') { // handling enter key
            const guess = letters[curRow].join('').toLocaleLowerCase(), hardMode = localStorage.getItem("hardmode") || false;
            if (hardMode === 'false' || curRow === 0) { // default
                if (WORD_POOL.includes(guess)) {
                    this.setActiveTile(curRow, (letters[0].length - 1), '');
                    this.setColorsAccordingToGuess(guess);
                    this.setBounceRowAnimation('bounceAnimation');
                    if (++curRow < MAX_ROWS)
                        this.setActiveTile(curRow, 0, 'activeTile');
                }
                else this.setInvalidRowAnimation('rowShake'); // shake cause not in word pool
            }
            else { // hardmode on
                const { colors } = this.state;
                let meetsReqs = true, chGuess = guess;
                for (let i = 0; i < colors[curRow - 1].length; i++) {
                    if (colors[curRow - 1][i] === 'rightTile') {
                        if (chGuess[i] !== letters[curRow - 1][i]) {
                            meetsReqs = false;
                            break;
                        }
                        else chGuess = this.replaceAt(chGuess, i, '1');
                    }
                    else if (colors[curRow - 1][i] === 'almostTile') {
                        if (!chGuess.includes(letters[curRow - 1][i])) {
                            meetsReqs = false;
                            break;
                        }
                        else chGuess = this.replaceAt(chGuess, chGuess.indexOf(letters[curRow - 1][i]), '1');
                    }
                }
                if (WORD_POOL.includes(guess) && meetsReqs) {
                    this.setActiveTile(curRow, (letters[0].length - 1), '');
                    this.setColorsAccordingToGuess(guess);
                    this.setBounceRowAnimation('bounceAnimation');
                    if (++curRow < MAX_ROWS)
                        this.setActiveTile(curRow, 0, 'activeTile');
                }
                else this.setInvalidRowAnimation('rowShake'); // shake cause guess doesnt meet the reqs
            }
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
            if (posChange >= 0 && posChange < MAX_TILES) {
                this.setActiveTile(curRow, posChange + 1, 'activeTile');
                this.setActiveTile(curRow, posChange, '');
            }
            letters[curRow][posChange] = value;
        }
        this.setState({ letters: letters, curRow: curRow })
        if (curRow >= MAX_ROWS)
            setTimeout(() => this.refresh(), 700); // lose reset
    }

    setActiveTile(curRow, posChange, value) { // setting and removing glow on current tile
        let { colors } = this.state;
        if (posChange < 5) colors[curRow][posChange] = value;
        this.setState({ colors: colors });
    }

    setInvalidRowAnimation(value) { // setting and removing shake animation
        let { rowAnimations, curRow } = this.state;
        rowAnimations[curRow] = value;
        this.setState({ rowAnimations: rowAnimations });
    }

    setBounceRowAnimation(value) { // setting and removing bounce animation
        let { rowAnimations, curRow } = this.state;
        rowAnimations[curRow] = value;
        this.setState({ rowAnimations: rowAnimations });
    }

    setColorsAccordingToGuess(guess) {
        let { colors, keyColors, curWord, curRow } = this.state, rightGuess = curWord, win = true;
        for (let i = 0; i < guess.length; i++) {
            if (rightGuess.includes(guess[i])) {
                if (rightGuess[i] === guess[i]) {
                    keyColors[KEY_INDEX.get(guess[i])] = 'rightKey';
                    colors[curRow][i] = 'rightTile';
                    rightGuess = this.replaceAt(rightGuess, rightGuess.indexOf(guess[i]), '1');
                }
                else {
                    keyColors[KEY_INDEX.get(guess[i])] = 'almostKey';
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
        this.setState({ colors: colors, keyColors: keyColors });
        if (win) {
            setTimeout(() => this.refresh(), 700); // win reset
            localStorage.setItem("goodGames", parseInt(localStorage.getItem("goodGames")) + 1);
        }
    }

    refresh() {
        localStorage.setItem("totalGames", parseInt(localStorage.getItem("totalGames")) + 1);
        let { curRow } = this.state;
        localStorage.setItem("totalGuesses", parseInt(localStorage.getItem("totalGuesses")) + curRow);
        let letters = [
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' '],
            [' ', ' ', ' ', ' ', ' ']
        ], colors = [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ], keyColors = [
            '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', ''
        ], curWord = WORD_POOL[Math.floor(Math.random() * WORD_POOL_LENGTH)]; curRow = 0;
        this.setState({ letters: letters, curRow: curRow, colors: colors, curWord: curWord, keyColors: keyColors });
    }

    replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    onChangeMode(hardmode) {
        const { curRow } = this.state;
        if (curRow === 0) localStorage.setItem("hardmode", hardmode);
    }

    render() {
        const { letters, colors, keyColors, rowAnimations, curWord, curRow } = this.state;
        localStorage.setItem("letters", letters);
        localStorage.setItem("colors", colors);
        localStorage.setItem("keyColors", keyColors);
        localStorage.setItem("curRow", curRow);
        localStorage.setItem("notCurWord", curWord);
        return (
            <div className="wrapper">
                <Header onChangeMode={this.onChangeMode} />
                <Grid letters={letters} colors={colors} rows={rowAnimations} />
                <Board onClick={this.onKeyClick} keycolors={keyColors} />
            </div>
        );
    };
}

export default Game;