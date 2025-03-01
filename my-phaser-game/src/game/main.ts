import { Boot } from "./scenes/Boot";
import { GameOver } from "./scenes/GameOver";
import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { AUTO, Game } from "phaser";
import { Preloader } from "./scenes/Preloader";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: AUTO,
    width: 800,
    height: 600,
    parent: "game-container",
    dom: {
        createContainer: true,
    },
    backgroundColor: "#028af8",
    scene: [Boot, Preloader, MainMenu, MainGame, GameOver],
    scale: {
        parent: "game-container",
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        min: {
            width: 400,
            height: 300,
        },
        max: {
            width: 1600,
            height: 1200,
        },
    },
    zoom: 1,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 300,
                x: 0,
            },
            //debug: true,
        },
    },
};

const StartGame = (parent: string) => {
    return new Game({ ...config, parent });
};

export default StartGame;

