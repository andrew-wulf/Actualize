

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
  }


  past_moves() {
    this.moves.forEach(m => {
      console.log(`${m[0].type} ${[m[1].row, m[1].col]}`)
    })
  }




mate() {
  
  const mate = this.scene.add.text(400, 340, 'Checkmate!', {
    fontFamily: 'Arial Black', fontSize: 60, color: '#ffffff',
    stroke: '#000000', strokeThickness: 8,
    align: 'center'
}).setDepth(100).setOrigin(0.5);

const rematch = this.scene.add.text(410, 480, 'Rematch', {
    fontFamily: 'Arial Black', fontSize: 38, color: 'rgba(240,240,240,1)',
    stroke: '#000000', strokeThickness: 8,
    align: 'center'
}).setDepth(100).setOrigin(0.5);

rematch.setInteractive();
mate.setInteractive();


// Mouseover event
  rematch.on('pointerover', function () {
  rematch.setFill('rgba(210,210,210,1)'); // Lighter color
});

// Mouseout event
  rematch.on('pointerout', function () {
  rematch.setFill('rgba(220,220,220,1)'); // Original color
});

// Click event
  rematch.setInteractive();
  rematch.on('pointerdown', function () {

  this.scene.changeScene();
});
}
}