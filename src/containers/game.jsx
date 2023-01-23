import React, { Component } from "react";
import Header from '../components/header/header';
import Tiles from '../components/tiles/tiles';

class Game extends Component {
    state = {
    };

    render() {
        return (
            <div className="wrapper">
                <Header />
                <Tiles />
            </div>
        );
    };
}

export default Game;