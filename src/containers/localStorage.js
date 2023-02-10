const poorlocalletters = localStorage.getItem("letters")?.split(',') ?? null,
    row = localStorage.getItem("curRow"), word = localStorage.getItem("notCurWord");
let localletters = [
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' '],
    [' ', ' ', ' ', ' ', ' ']
];
if (poorlocalletters !== null) {
    let lettersRows;
    for (let i = 0; i < poorlocalletters.length; i++) {
        lettersRows = parseInt(i / 5);
        localletters[lettersRows][i % 5] = poorlocalletters[i];
    }
}

const poorlocalcolors = localStorage.getItem("colors")?.split(',') ?? null;
let localcolors;
if (poorlocalcolors !== null) {
    localcolors = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
    let colorsRows;
    for (let i = 0; i < poorlocalcolors.length; i++) {
        colorsRows = parseInt(i / 5);
        localcolors[colorsRows][i % 5] = poorlocalcolors[i];
    }
}
else {
    localcolors = [
        ['activeTile', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
    ];
}

let localkeyColors = localStorage.getItem("keyColors")?.split(',') ?? null;
if (localkeyColors === null) {
    localkeyColors = [
        '', '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', '', '', '',
        '', '', '', '', '', '', ''
    ];
}

export {
    localletters, row, localcolors, word, localkeyColors
};  