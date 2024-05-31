

export class Match {
  constructor(scene) {
    this.scene = scene;
    this.moves = [];
    this.current_player = 'w';
  }
  

  record_move(m) {
    // console.log(m[0].type, m[1].rowCol);
    this.moves.push(m);

    if (this.current_player == 'w') {
      this.current_player = 'b';
    }
    else {
      this.current_player = 'w';
    }
    console.log(this.scene.game.props)
    
  }


  past_moves() {
    this.moves.forEach(m => {
      console.log(`${m[0].type} ${[m[1].row, m[1].col]}`)
    })
  }
}