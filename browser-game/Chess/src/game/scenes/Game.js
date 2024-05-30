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

        this.selected_piece = false;
        this.legal_moves = [];

        //refresh selections on click
        this.input.on('pointerdown', function (pointer) {
            this.scene.click(pointer)
        });


        EventBus.emit('current-scene-ready', this);
    }

        

    changeScene ()
    {
        this.scene.start('GameOver');
    }


    click(pointer) {
        if (this.selected_piece !== false) {
            this.squares.forEach(sq => {
                if (sq.contains(pointer.x, pointer.y)) {
                    let clicked_square = sq.i;
                    this.selected_piece.legal_moves.forEach(arr => {
                        let sq = arr[0];
                        if (sq.i == clicked_square) {
                            console.log(`Moved to ${sq.i}!`)
                            this.selected_piece.move(sq)
                        }
                    })
                }
            });
            this.selected_piece.reset();
            this.selected_piece.deselect();
        }
        

        this.squares.forEach(sq => {sq.reset() 
        });

        this.pieces.forEach(pc => {
            pc.clearTint()
        });
    }
}
