import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {Geom} from 'phaser';


export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    create ()
    {
        const screen_w = this.game.config.width;
        const screen_h = this.game.config.height;
        console.log(screen_h / 8, screen_w / 8)
    

        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');


        this.light = this.add.graphics();
        this.light.fillStyle(0xEBECD1);

        this.dark = this.add.graphics();
        this.dark.fillStyle(0x789656);


        this.rect = new Geom.Rectangle(0, 0, 200, 128);
        console.log(this.rect)
        this.light.fillRect(this.rect.left, this.rect.top, this.rect.width, this.rect.height)
    
        
        EventBus.emit('current-scene-ready', this);
    }

        

    changeScene ()
    {
        this.scene.start('GameOver');
    }
}
