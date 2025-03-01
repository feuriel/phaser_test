import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameOverText: Phaser.GameObjects.Text;

    constructor() {
        super("GameOver");
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(400, 300, "sky");
        this.background.setAlpha(0.5);
        const restartButton = document.createElement("button");
        restartButton.innerText = "Restart";
        this.add.text(40, 40, "score: 0", {
            fontFamily: "Arial Black",
            fontSize: 32,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        });
        this.add
            .dom(400, 384, restartButton)
            .addListener("click")
            .once("click", () => {
                this.changeScene();
                console.log("restarting Main Scene");
            });

        this.gameOverText = this.add
            .text(400, 200, "Game Over", {
                fontFamily: "Arial Black",
                fontSize: 64,
                color: "#ffffff",
                stroke: "#000000",
                strokeThickness: 8,
                align: "center",
            })
            .setOrigin(0.5)
            .setDepth(100);

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("MainMenu");
    }
}

