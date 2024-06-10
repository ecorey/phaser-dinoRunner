


export class Player extends Phaser.Physics.Arcade.Sprite {


    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y, 'dino-idle');


        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.init();



        // calls update method every frame
        this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);

    }





    init() {

        // creates the cursor keys
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this
            .setOrigin(0, 1)
            .setGravityY(5000)
            .setCollideWorldBounds(true)
            .setBodySize(44, 92);

        this.registerAnimations();

    }




    update() {


        const { space } = this.cursors;

        // pressing space bar makes the dino jump once
        const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);

        // checks if the dino is on the floor to jump
        const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor()
        
        
        if(isSpaceJustDown && onFloor){
            this.setVelocityY(-1500);
        }

        console.log(this.body.y);

        // freezes the dino when jumping
        if(this.body.deltaAbsY() > 0){
            this.anims.stop();
        } else {
            this.playRunAnimation();
        }

    }   



    registerAnimations() {
        this.anims.create({
            key: 'dino-run',
            frames: this.anims.generateFrameNumbers('dino-run', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    }



    playRunAnimation() {
        this.play('dino-run', true);
    }



    



}