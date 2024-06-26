
import Phaser from "phaser";
import PreloadScene from "./Scenes/PreloadScene";
import PlayScene from "./Scenes/PlayScene";


export const PRELOAD_CONFIG = {
  cactusesCount: 6
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 310,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade : {
      debug: true,
    },
  },
  scene: [PreloadScene, PlayScene]
};



new Phaser.Game(config);




