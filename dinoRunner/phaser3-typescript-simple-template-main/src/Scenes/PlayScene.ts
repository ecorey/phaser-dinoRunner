import Phaser from "phaser";
import { Player } from "../entities/Player";    
import GameScene from "./GameScene";
import { PRELOAD_CONFIG } from "..";



class PlayScene extends GameScene {


    player: Player;
    ground: Phaser.GameObjects.TileSprite;
    startTrigger: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

    spawnInterval: number = 1500;
    spawnTime: number = 0;
    obstacles: Phaser.Physics.Arcade.Group;
    obstacleSpeed: number = 5; 
    

    constructor() {
        super('PlayScene');
    }


    

    create() {
        
        this.createEnvironment();
        this.createPlayer();

        this.obstacles = this.physics.add.group();

        this.startTrigger = this.physics.add.sprite(0, 10, null)
        .setAlpha(0)
        .setOrigin(0, 1);

       


        this.physics.add.overlap(this.startTrigger, this.player, () => {
            
            if (this.startTrigger.y === 10 ) {

                this.startTrigger.body.reset(0, this.gameHeight);

                return;
            }

            this.startTrigger.body.reset(9999, 9999);


            const rollOutEvent = this.time.addEvent({
                delay: 1000 / 60,
                loop: true,
                callback: () => {
                    this.player.playRunAnimation();
                    this.player.setVelocityX(80);
                    this.ground.width += (17 * 2);

                    if(this.ground.width >= this.gameWidth) {
                        rollOutEvent.remove();
                        this.ground.width = this.gameWidth;
                        this.player.setVelocityX(0);
                        this.gameIsNotRunning = true;
                    }
            
                }
            });

            

            
        })


    }


    createEnvironment() {

        this.ground = this.add.tileSprite(0, this.gameHeight, 88, 26, 'ground').setOrigin(0, 1);


    }


    update(time: number, delta: number) : void {

        if(!this.gameIsNotRunning){
            return;
        }

        this.spawnTime += delta;

        if(this.spawnTime >= this.spawnInterval){
            this.spawnObstacle();
            this.spawnTime = 0;
        }

        Phaser.Actions.IncX(this.obstacles.getChildren(), -this.obstacleSpeed);




        // console.log(this.obstacles.getChildren().length);



        this.obstacles.getChildren().forEach((obstacle: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody ) => {
            if(obstacle.getBounds().right < 0) {
                this.obstacles.remove(obstacle);
            }
        } );
    }
      




    createPlayer() {

        this.player = new Player(this, 0, this.gameHeight);

    }



    spawnObstacle() {

        // random num between 1 and 6
        const obstacleNumber = Math.floor(Math.random() * PRELOAD_CONFIG.cactusesCount ) + 1;
        const distance = Phaser.Math.Between(600, 900);

        this.obstacles
            .create(distance, this.gameHeight, `obstacle-${obstacleNumber}`)
            .setOrigin(0, 1);


    }




   

}


export default PlayScene;