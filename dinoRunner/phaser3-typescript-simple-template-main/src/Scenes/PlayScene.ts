import Phaser from "phaser";



class PlayScene extends Phaser.Scene {



    constructor() {
        super('PlayScene');
    }


    

    create() {
        alert('PlayScene loaded');
    }


}


export default PlayScene;