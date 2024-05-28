import { EventBus } from '../EventBus';
import { Scene } from 'phaser';

export class MainMenu extends Scene
{
    logoTween;

    constructor ()
    {
        super('MainMenu');
    }

    create ()
    {
        this.cameras.main.setBackgroundColor('rgba(25, 25, 25, 1)');

        this.logo = this.add.text(512, 300, 'Chess', {
            fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);
        

        const new_game = this.add.text(512, 460, 'New Game', {
            fontFamily: 'Arial Black', fontSize: 38, color: 'rgba(220,220,220,1)',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setDepth(100).setOrigin(0.5);


        // Mouseover event
        new_game.on('pointerover', function () {
            new_game.setFill('rgba(255,255,255,1)'); // Lighter color
        });

        // Mouseout event
        new_game.on('pointerout', function () {
            new_game.setFill('rgba(220,220,220,1)'); // Original color
        });

        // Click event
        new_game.setInteractive();
        new_game.on('pointerdown', function () {
            console.log(this.scene.changeScene())
            ;
        });


        
        EventBus.emit('current-scene-ready', this);
    }

    changeScene ()
    {
        if (this.logoTween)
        {
            this.logoTween.stop();
            this.logoTween = null;
        }

        this.scene.start('Game');
    }

    moveLogo (reactCallback)
    {
        if (this.logoTween)
        {
            if (this.logoTween.isPlaying())
            {
                this.logoTween.pause();
            }
            else
            {
                this.logoTween.play();
            }
        }
        else
        {
            this.logoTween = this.tweens.add({
                targets: this.logo,
                x: { value: 750, duration: 3000, ease: 'Back.easeInOut' },
                y: { value: 80, duration: 1500, ease: 'Sine.easeOut' },
                yoyo: true,
                repeat: -1,
                onUpdate: () => {
                    if (reactCallback)
                    {
                        reactCallback({
                            x: Math.floor(this.logo.x),
                            y: Math.floor(this.logo.y)
                        });
                    }
                }
            });
        }
    }
}
