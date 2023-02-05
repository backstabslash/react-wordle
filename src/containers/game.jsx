import React, { Component } from "react";
import Header from '../components/header/header';
import Grid from '../components/mainarea/grid';
import Board from '../components/keyboard/board'
import { ALLOWED_KEYS, KEY_INDEX, WORD_POOL, WORD_POOL_LENGTH, MAX_ROWS, MAX_TILES } from './consts'

class Game extends Component {
    constructor(props) {
        super(props);
        this.keyDown = this.keyDown.bind(this);
        this.onChangeMode = this.onChangeMode.bind(this);
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
        curWord: WORD_POOL[Math.floor(Math.random() * WORD_POOL_LENGTH)],
        hardMode: false,
    };

    componentDidMount() {
        document.addEventListener("keydown", this.keyDown, false);
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
        if (value === '⏎' || value === 'Enter') { // handling enter key
            const guess = letters[curRow].join('').toLocaleLowerCase(), { hardMode } = this.state;
            if (!hardMode || curRow === 0) { // default
                if (WORD_POOL.includes(guess)) {
                    this.setActiveTile(curRow, (letters[0].length - 1), '');
                    this.setColorsAccordingToGuess(guess);
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
                    keycolors[KEY_INDEX.get(guess[i])] = 'rightKey';
                    colors[curRow][i] = 'rightTile';
                    rightGuess = this.replaceAt(rightGuess, rightGuess.indexOf(guess[i]), '1');
                }
                else {
                    keycolors[KEY_INDEX.get(guess[i])] = 'almostKey';
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
        ], colors = [
            ['activeTile', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', '']
        ], keycolors = [
            '', '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', '', '', '',
            '', '', '', '', '', '', ''
        ], curRow = 0, curWord = WORD_POOL[Math.floor(Math.random() * WORD_POOL_LENGTH)];
        console.log(curWord);
        this.setState({ letters: letters, curRow: curRow, colors: colors, curWord: curWord, keycolors: keycolors });
    }

    replaceAt(string, index, replacement) {
        return string.substring(0, index) + replacement + string.substring(index + replacement.length);
    }

    onChangeMode(hardmode) {
        this.setState({ hardMode: hardmode });
    }

    render() {
        const { letters, colors, keycolors, invalidRowShake } = this.state;
        return (
            <div className="wrapper">
                <Header onChangeMode={this.onChangeMode} />
                <Grid letters={letters} colors={colors} rows={invalidRowShake} />
                <Board onClick={this.onKeyClick} keycolors={keycolors} />
            </div>
        );
    };
}

export default Game;