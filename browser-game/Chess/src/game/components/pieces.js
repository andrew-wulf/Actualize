import {GameObjects} from 'phaser';


export function pieces(scene) {
  let pieces = []
  scene.squares.forEach((rect, i) => {
    let pos = [rect.centerX, rect.centerY]
    let piece = null;
    let types = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    let origin_y = 0.55;

    console.log(i, pos, [rect.row, rect.col])
    if (i < 16) {
        let type = 'bp';
        
        if (i < 8) {
            type = 'b' + types[i];
        }
        console.log(type)
        let pos = [rect.centerX, rect.centerY];
        piece = new Piece(scene, pos[0], pos[1], type);
    }

    else {
        if (i > 47) {
            let type = 'wp';

            if (i > 55) {
                type = 'w' + types[7 - (63 - i)];
            }
            let pos = [rect.centerX, rect.centerY];
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

        //unclick
        piece.on('pointerup', function (pointer) {
          let x_diff = Math.abs(pointer.x - this.pos[0])
          let y_diff = Math.abs(pointer.y - this.pos[1])

          if (x_diff < 50 && y_diff < 50) {
            this.show_moves()
          }
        });

        //click
        piece.on('pointerdown', function (pointer) {
          this.refresh_moves();
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
      this.scene = scene

      scene.add.existing(this).setScale(0.7)

      this.origin_y = 0.5

      if (this.type.includes('p')) {
        this.origin_y = 0.55;
      }

      this.setOrigin(0.5, this.origin_y);


      this.selected = false;
      this.legal_moves = [];
    }


    refresh_moves() {
      let squares = this.scene.squares;
      let curr_square = null;
      let legal_moves = [];
      let types = ['r', 'n', 'b', 'q', 'k'];
      
      let i = 0;
      while (i < squares.length) {
        if (squares[i].contains(this.x, this.y)) {
          curr_square = i;
          break;
        }
        i++;
      }
      
      console.log(`Piece: ${this.type} | Current Square: ${curr_square}`)
      

      if (curr_square !== null) {
        let curr = squares[curr_square];
        console.log(curr.row, curr.col);

        squares.forEach((sq, i) => {
          if (this.type.includes('p')) {

            let diff = 1;
            let start_row = 1;

            if (this.type.includes('w')) {
              diff = -1;
              start_row = 6;
            }

            if (sq.col == curr.col) {
              if (sq.row == curr.row + diff || (sq.row == curr.row + (diff * 2) && curr.row == start_row)) {
                legal_moves.push(i)
              }
            }
          }



          if (this.type.includes('r')) {
            if (sq.col == curr.col || sq.row == curr.row) {
              legal_moves.push(i)
            }
          }

          
          if (this.type.includes('k')) {
            if (Math.abs(sq.col - curr.col) < 2 && Math.abs(sq.row - curr.row) < 2) {
              legal_moves.push(i)
            }
          }

          if (this.type[1] == 'b') {
            if (Math.abs(sq.col - curr.col) == Math.abs(sq.row - curr.row)) {
              legal_moves.push(i)
            }
          }

          if (this.type.includes('q')) {
            if ((sq.col == curr.col || sq.row == curr.row) || (Math.abs(sq.col - curr.col) == Math.abs(sq.row - curr.row))) {
              legal_moves.push(i)
            }
          }

          if (this.type.includes('n')) {
            if ((Math.abs(sq.col - curr.col) == 2 && Math.abs(sq.row - curr.row) == 1) || (Math.abs(sq.row - curr.row) == 2 && Math.abs(sq.col - curr.col) == 1)) {
              legal_moves.push(i)
            }
          }


        });
      }


      let validated_moves = [];
      legal_moves.forEach(i => {
        let sq = squares[i];
        let pc = sq.get_piece(this.scene);
        if (pc === false) {
          validated_moves.push(i);
        }
        else {
          console.log(sq.row, sq.col, pc.type)

          if (pc.type[0] != this.type[0]) {
            validated_moves.push(i)
          }
        }
      });
  
      //NEXT STEP: for queens rooks and bishops, if the abs val of the difference in rows cols is greater than a square with a piece on it, no validation. Also, the final legal_moves arr might need to have value pairs for the nice highlights: [index, collision true or false]

      console.log(legal_moves)
      this.legal_moves = validated_moves;
    }
  

    show_moves() {
      this.setTint(0x1228b5);
      this.legal_moves.forEach((i) => {
        let hex = '0x1228b5'
        this.scene.squares[i].set_color(hex, hex, this.scene.graphics)
      });
    }
  }

