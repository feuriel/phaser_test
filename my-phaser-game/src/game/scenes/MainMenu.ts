/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import { GameObjects, Scene } from "phaser";

import { EventBus } from "../EventBus";

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    logoTween: Phaser.Tweens.Tween | null;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    stars: Phaser.Physics.Arcade.Group;
    bombs: Phaser.Physics.Arcade.Group;
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys | undefined;
    score: number;
    scoreText: GameObjects.Text;

    constructor() {
        super("MainMenu");
    }

    create() {
        this.score = 0;

        this.cursors = this.input.keyboard?.createCursorKeys();
        this.add.image(400, 300, "sky");
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 568, "ground").setScale(2).refreshBody();
        this.platforms.create(600, 400, "ground");
        this.platforms.create(50, 250, "ground");
        this.platforms.create(750, 220, "ground");

        this.player = this.physics.add.sprite(100, 450, "dude");
        //this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
        this.player.body.setGravityY(300);

        this.bombs = this.physics.add.group();
        this.physics.add.collider(this.bombs, this.platforms);
        const hitBomb = (player: any, bomb) => {
            this.physics.pause();

            player.setTint(0xff0000);

            player.anims.play("turn");

            this.scene.start("GameOver");
        };
        this.physics.add.collider(
            this.player,
            this.bombs,
            hitBomb,
            undefined,
            this
        );

        this.scoreText = this.add.text(40, 40, "score: 0", {
            fontFamily: "Arial Black",
            fontSize: 32,
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 8,
            align: "center",
        });

        this.anims.create({
            key: "left",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 0,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", {
                start: 5,
                end: 8,
            }),
            frameRate: 10,
            repeat: -1,
        });
        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 },
        });

        this.stars.children.iterate(function (child) {
            // @ts-ignore
            return child.setBounceY(Phaser.Math.FloatBetween(0.1, 0.3));
        });
        this.physics.add.collider(this.stars, this.platforms);
        //this.logo = this.add.image(512, 300, "logo").setDepth(500);
        const collectStar = (_player: any, star: any) => {
            star.disableBody(true, true);
            this.score += 10;
            this.scoreText.setText("score: " + this.score);
            if (this.stars.countActive(true) === 0) {
                this.stars.children.iterate(function (child) {
                    // @ts-ignore
                    return child.enableBody(true, child.x, 0, true, true);
                });
                // @ts-ignore
                const x =
                    this.player.x < 400
                        ? Phaser.Math.Between(400, 800)
                        : Phaser.Math.Between(0, 400);

                const bomb = this.bombs.create(x, 16, "bomb");
                bomb.setBounce(1);
                bomb.setCollideWorldBounds(true);
                bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            }
        };
        this.physics.add.overlap(
            this.player,
            this.stars,
            collectStar,
            undefined,
            this
        );

        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("Game");
    }

    update() {
        if (this.cursors?.left.isDown) {
            this.player.setVelocityX(-160);

            this.player.anims.play("left", true);
        } else if (this.cursors?.right.isDown) {
            this.player.setVelocityX(160);

            this.player.anims.play("right", true);
        } else {
            this.player.setVelocityX(0);

            this.player.anims.play("turn");
        }

        if (this.cursors?.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-470);
        }
    }
}

