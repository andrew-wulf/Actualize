import {GameObjects} from 'phaser';


export function pieces(scene) {
  let pieces = []
  scene.rectangles.forEach((rect, i) => {
    let pos = scene.rect_center(rect)
    let piece = null;
    let types = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    let origin_y = 0.55;

    console.log(i, pos)
    if (i < 16) {
        let type = 'bp';
        
        if (i < 8) {
            type = 'b' + types[i];
        }
        console.log(type)
        let pos = rect_center(rect);
        piece = new Piece(scene, pos[0], pos[1], type);
    }

    else {
        if (i > 47) {
            let type = 'wp';

            if (i > 55) {
                type = 'w' + types[7 - (63 - i)];
            }
            let pos = rect_center(rect);
            piece = new Piece(scene, pos[0], pos[1], type);
        }
    }

    if (piece !== null) {
        pieces.push(piece)


        // Click event
        piece.setInteractive();
        scene.input.setDraggable(piece);
         // Event listener for drag start
        piece.on('dragstart', function (pointer) {
          this.setTint(0xa3a3a2); // Change color when dragging starts
        });

        // Event listener for drag
        piece.on('drag', function (pointer, dragX, dragY) {
          this.x = dragX; // Update the image's x-coordinate
          this.y = dragY; // Update the image's y-coordinate
        });

        // Event listener for drag end
        piece.on('dragend', function (pointer) {
          this.clearTint(); // Remove tint when dragging ends
          this.x = this.pos[0];
          this.y = this.pos[1];
        });

    }
  })
  return pieces
}


export class Piece extends GameObjects.Image {
    constructor (scene, x, y, type) {
      super(scene, x, y, type);

      this.type = type;
      this.pos = [x, y]
      scene.add.existing(this).setScale(0.7)

      this.origin_y = 0.5

      if (this.type.includes('p')) {
        this.origin_y = 0.55;
      }

      this.setOrigin(0.5, this.origin_y)
    }
  }


function rect_center(rect) {
  let x = rect.left + ((rect.width - rect.left) / 2);
  let y = rect.top + ((rect.height - rect.top) / 2);
  return [x, y]
}