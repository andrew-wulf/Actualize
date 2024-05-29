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
      
      
      

      if (curr_square !== null) {
        let curr = squares[curr_square];
        console.log(`Piece: ${this.type} | Current Square: ${curr_square} | RowCol: ${[curr.row, curr.col]}`)

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
                legal_moves.push(sq)
              }
            }
          }



          if (this.type.includes('r')) {
            if (sq.col == curr.col || sq.row == curr.row) {
              legal_moves.push(sq)
            }
          }

          
          if (this.type.includes('k')) {
            if (Math.abs(sq.col - curr.col) < 2 && Math.abs(sq.row - curr.row) < 2) {
              legal_moves.push(sq)
            }
          }

          if (this.type[1] == 'b') {
            if (Math.abs(sq.col - curr.col) == Math.abs(sq.row - curr.row)) {
              legal_moves.push(sq)
            }
          }

          if (this.type.includes('q')) {
            if ((sq.col == curr.col || sq.row == curr.row) || (Math.abs(sq.col - curr.col) == Math.abs(sq.row - curr.row))) {
              legal_moves.push(sq)
            }
          }

          if (this.type.includes('n')) {
            if ((Math.abs(sq.col - curr.col) == 2 && Math.abs(sq.row - curr.row) == 1) || (Math.abs(sq.row - curr.row) == 2 && Math.abs(sq.col - curr.col) == 1)) {
              legal_moves.push(sq)
            }
          }


        });

        let validated_moves = [];
        let occupied_squares = [];
  
        legal_moves.forEach(sq => {
          // console.log(sq)
          let pc = sq.get_piece(this.scene);
          if (pc === false) {
            validated_moves.push([sq, false]);
          }
  
          else {
            occupied_squares.push([sq, pc.type]);
  
            if (pc.type[0] !== this.type[0]) {
              validated_moves.push([sq, true]);
            }
          }
        });
  
        //NEXT STEP: for queens rooks and bishops, if the abs val of the difference in rows cols is greater than a square with a piece on it, no validation. Also, the final legal_moves arr might need to have value pairs for the nice highlights: [index, collision true or false]
  
       // console.log('Legal Moves:')
       // console.log(legal_moves.map(sq => [sq.row, sq.col]));
       // console.log('Occupied Squares:')
       // console.log(occupied_squares.map(arr => [arr[0].row, arr[0].col, arr[1]]));
  
  
        if (this.type[1] !== 'n') {
  
          occupied_squares.forEach((arr) => {
            let sq = arr[0];
            let type = arr[1];
            console.log('blocked square ' + [sq.row, sq.col])
            //Horizontal blocked moves
            if (sq.col == curr.col || sq.row == curr.row) {

              let anchor = curr.row;
              let anchor_type = 'row';
              let line1 = curr.col;
              let line2 = sq.col
              

              if (sq.col == curr.col) {
                anchor = curr.col;
                anchor_type = 'col'
                line1 = curr.row;
                line2 = sq.row;
              }

              console.log(`anchor: ${anchor} line1: ${line1} line2: ${line2}`)
              let diff = line1 - line2

              if (diff > 1) {
                for (let i = line2 - 1; i > -1; i--) {
                  let x = anchor;
                  let y = i;

                  if (anchor_type == 'col') {
                    x = i;
                    y = anchor;
                  }
                  console.log(x, y)
                  let blocked_index = this.get_index(x, y);
                  this.drop_move(validated_moves, blocked_index)
                }
              }
              else {
                for (let i = line2 + 1; i < 8; i++) {
                  let blocked_index = this.get_index(i, line1);
                  this.drop_move(validated_moves, blocked_index)
                }
              }

            }

          });
        
  
           // console.log(`removing at index ${i}`);
           // this.drop_move(validated_moves, sq.i);
        }
    
        console.log('Validated Moves:')
        console.log(validated_moves.map(arr => [arr[0].row, arr[0].col, arr[1]]));
        this.legal_moves = validated_moves;  

      }
    }
  


    show_moves() {
      this.setTint(0x1228b5);
      // console.log(this.legal_moves)
      this.legal_moves.forEach(arr => {
        let sq = arr[0];
        let occupied = arr[1];
        //let hex = '0x1228b5';
        let hex = 0x2b39cf;

        if (occupied === true) {
          hex = '0xc93232';
        }

        sq.set_color(hex, hex, this.scene.graphics)
      });
    }

    drop_move(moves, i) {
      moves.forEach((move, index) => {
        if (move.i == i) {
          moves.splice(index, 1);
          return
        }
      })
    }

    get_index(row, col) {
      return (8 * row) + col
    }
  }

