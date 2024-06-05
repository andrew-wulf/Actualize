import axios from 'axios'

export class Stockfish {
  constructor(scene) {
    this.scene = scene;
    this.depth = 1;
  }


  get_FEN() {

    // TODO LATER: special notation for castling rights, en passant, 50 move rule, setting a hard default for now.

    let board_state = "";
    let squares = this.scene.squares;
    let empty_squares = 0;

    // field 1
    for (let i=0; i < squares.length; i++) {
      if (i != 0 && i % 8 == 0) {
        if (empty_squares > 0) {
          board_state += empty_squares;
          empty_squares = 0;
        }
        board_state += "/"
      }

      let sq = squares[i];
      let pc = sq.piece;

      if (pc === false) {
        empty_squares +=1;
      }
      else {

        if (empty_squares > 0) {
          board_state += empty_squares;
          empty_squares = 0;
        }

        let str = pc.type[1];
        if (pc.type[0] == 'w') {
          str = str.toUpperCase();
        }
        board_state += str
      }
    }
    if (empty_squares > 0) {
      board_state += empty_squares;
    }

    // field 2
    let player = this.scene.match.current_player;

    // field 3
    let castles = 'QKqk';

    // field 4
    let passant = '-';

    // field 5
    let halfmove = 0;

    // field 6
    let moves = this.scene.match.moves;
    let full_moves = Math.floor(moves.length / 2);

    // OUTPUT
    let output = `${board_state} ${player} ${castles} ${passant} ${halfmove} ${full_moves}`

    console.log('FEN: ' + output);
    return output
  }


  request() {
    let fen = this.get_FEN();
    let params = {fen: fen, depth: this.depth, mode: 'bestmove'};

    axios.get('https://stockfish.online/api/s/v2.php', {params: params})
    .then(response => {
      console.log(response);
      console.log(response.data.bestmove.substring(9, 13))
      return response.data.bestmove.substring(9, 13)
    })
    .catch(error => {
      console.log(error);
      return false
    })
  }
}