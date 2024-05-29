import { EventBus } from '../EventBus';
import { Scene } from 'phaser';
import {Geom} from 'phaser';
import {board} from '../components/board'
import {pieces} from '../components/pieces'

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
        console.log(screen_h, screen_w)
    

        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');

        this.graphics = this.add.graphics();
        this.squares = board(this);
        this.pieces = pieces(this);

        //refresh selections on click
        this.input.on('pointerdown', function (pointer) {
            this.scene.reset_selections()
        });


        EventBus.emit('current-scene-ready', this);
    }

        

    changeScene ()
    {
        this.scene.start('GameOver');
    }


    reset_selections() {
        this.squares.forEach(sq => {sq.reset() 
        });

        this.pieces.forEach(pc => {
            pc.clearTint()
        });
    }


}
