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
          this.refresh_moves();
        });

        // Event listener for drag
        piece.on('drag', function (pointer, dragX, dragY) {
          this.x = dragX; // Update the image's x-coordinate
          this.y = dragY; // Update the image's y-coordinate
        });

        // Event listener for drag end
        piece.on('dragend', function (pointer) {
          console.log(2)
          console.log(this.scene.selected_piece)
          if (this.scene.selected_piece === this) {
            this.scene.click(pointer);
          }

          else {
            let x_diff = Math.abs(pointer.x - this.pos[0])
            let y_diff = Math.abs(pointer.y - this.pos[1])
            this.scene.selected_piece = this;

            if (x_diff < 50 && y_diff < 50) {
              this.reset()
              this.show_moves()
            }
            else {this.scene.click(pointer)}
          }
          //
        });

        //unclick
        // piece.on('pointerup', function (pointer) {
          
          
          
        // });

        //click
        // piece.on('pointerdown', function (pointer) {
        //   this.refresh_moves();
        // });

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

    deselect() {
      this.scene.selected_piece = false;
    }

    reset() {
      this.x = this.pos[0];
      this.y = this.pos[1];
      this.clearTint();
    }

    get_square() {
      let squares = this.scene.squares;
      let i = 0;
      while (i < squares.length) {
        if (squares[i].contains(this.x, this.y)) {
          return squares[i];
        }
        i++;
      }
      return null
    }

    move(square) {
      this.x = square.centerX;
      this.y = square.centerY;
      this.pos = [this.x, this.y];
      this.legal_moves = [];
    }

    refresh_moves() {
      let scene = this.scene;
      let squares = this.scene.squares;
      let legal_moves = [];
      let type = this.type;
      
      
      let curr = this.get_square();

      
      function get_index(row, col) {
        return (8 * row) + col
      }

      function validate(moves) {
        let j = 0;
        while (j < moves.length) {
          let m = moves[j];

          if ((m[0] < 0 || m[0] > 7) || (m[1] < 0 || m[1] > 7)) {
            j++;
            continue
          }

          console.log(m)
          let i = get_index(m[0], m[1]);
          let sq = squares[i];

          let pc = sq.get_piece(scene);
          if (pc !== false) {

            if (pc.type[0] !== type[0]) {
              legal_moves.push([sq, true]);
            }
            break;
          }
          legal_moves.push([sq, false]);
          j++;
        }
      }
      
    
      if (curr !== null) {
        let row = curr.row;
        let col = curr.col;
        let moves = [];

        console.log(`Piece: ${this.type} | Current Square: ${curr.i} | RowCol: ${[row, col]}`)

        
        if (this.type.includes('p')) {
          
          let diff = 1;
          let start_row = 1;

          if (this.type.includes('w')) {
            diff = -1;
            start_row = 6;
          }

          moves.push([row + diff, col]);

          if (row == start_row) {
            moves.push([row + (diff * 2), col]);
          }

          validate(moves);
        }

        if (this.type.includes('r') || this.type.includes('q')) {
          
          for (let i = 0; i < 2; i++) {

            let rowCol = [row, col];
            let start = rowCol[i];

            moves = [];

            rowCol[i] = start - 1;

            while (rowCol[i] > -1) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[i] = rowCol[i] - 1;
            }

            validate(moves);

            moves = [];
            rowCol[i] = start + 1;

            while (rowCol[i] < 8) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[i]++;
            }
            validate(moves);
          }
        }
        
        if (this.type.includes('k')) {
          moves = [[row + 1, col], [row - 1, col], [row, col + 1], [row, col - 1], [row + 1, col + 1], [row - 1, col + 1], [row - 1, col - 1], [row + 1, col - 1]];

          moves.forEach((m) => {
            validate([m]);
          });
        }

        if (this.type[1] == 'b' || this.type.includes('q')) {
          [-1, 1].forEach(j => {
            let rowCol = [row, col];
            let start = [row, col];

            moves = [];

            rowCol[1]--;
            rowCol[0]+=j;

            while (rowCol[1] > -1 && (rowCol[0] > -1 && rowCol[0] < 8)) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[1]--;
              rowCol[0]+=j;
            }

            validate(moves);

            moves = [];
            rowCol = start;

            rowCol[1]++;
            rowCol[0]+=j;

            while (rowCol[1] < 8 && (rowCol[0] > -1 && rowCol[0] < 8)) {
              moves.push([rowCol[0], rowCol[1]])
              rowCol[1]++;
              rowCol[0]+=j;
            }
            validate(moves);
          });
        }

        if (this.type.includes('n')) {
          moves = [[row + 2, col + 1], [row + 2, col - 1], [row - 2, col + 1], [row - 2, col - 1], [row + 1, col + 2], [row - 1, col + 2], [row + 1, col - 2], [row - 1, col - 2]]
          moves.forEach(m => validate([m]))
        }

        console.log(legal_moves);
        this.legal_moves = legal_moves;




      // ---------- Below is all a waste but I worked so long on it I don't wanna delete yet :'(

      //   let validated_moves = [];
      //   let occupied_squares = [];
  
      //   legal_moves.forEach(sq => {
      //     // console.log(sq)
      //     let pc = sq.get_piece(this.scene);
      //     if (pc === false) {
      //       validated_moves.push([sq, false]);
      //     }
  
      //     else {
      //       occupied_squares.push([sq, pc.type]);
  
      //       if (pc.type[0] !== this.type[0]) {
      //         validated_moves.push([sq, true]);
      //       }
      //     }
      //   });
  
      //   //NEXT STEP: for queens rooks and bishops, if the abs val of the difference in rows cols is greater than a square with a piece on it, no validation. Also, the final legal_moves arr might need to have value pairs for the nice highlights: [index, collision true or false]
  
      //  // console.log('Legal Moves:')
      //  // console.log(legal_moves.map(sq => [sq.row, sq.col]));
      //  // console.log('Occupied Squares:')
      //  // console.log(occupied_squares.map(arr => [arr[0].row, arr[0].col, arr[1]]));
  
  
      //   if (this.type[1] !== 'n') {
  
      //     occupied_squares.forEach((arr) => {
      //       let sq = arr[0];
      //       let type = arr[1];
      //       console.log('blocked square ' + [sq.row, sq.col])
      //       //Horizontal blocked moves
      //       if (sq.col == curr.col || sq.row == curr.row) {

      //         let anchor = curr.row;
      //         let anchor_type = 'row';
      //         let line1 = curr.col;
      //         let line2 = sq.col
              

      //         if (sq.col == curr.col) {
      //           anchor = curr.col;
      //           anchor_type = 'col'
      //           line1 = curr.row;
      //           line2 = sq.row;
      //         }

      //         console.log(`anchor: ${anchor} line1: ${line1} line2: ${line2}`)
      //         let diff = line1 - line2

      //         if (diff > 1) {
      //           for (let i = line2 - 1; i > -1; i--) {
      //             let x = anchor;
      //             let y = i;

      //             if (anchor_type == 'col') {
      //               x = i;
      //               y = anchor;
      //             }
      //             console.log(x, y)
      //             let blocked_index = this.get_index(x, y);
      //             this.drop_move(validated_moves, blocked_index)
      //           }
      //         }
      //         else {
      //           for (let i = line2 + 1; i < 8; i++) {
      //             let blocked_index = this.get_index(i, line1);
      //             this.drop_move(validated_moves, blocked_index)
      //           }
      //         }

      //       }

      //     });
        
  
      //      // console.log(`removing at index ${i}`);
      //      // this.drop_move(validated_moves, sq.i);
      //   }
    
      //   console.log('Validated Moves:')
      //   console.log(validated_moves.map(arr => [arr[0].row, arr[0].col, arr[1]]));
      //   this.legal_moves = validated_moves;  

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

    
  }

