import { useRef, useState } from 'react';

import Phaser from 'phaser';
import { PhaserGame } from './game/PhaserGame';




function App ()
{   

    // haven't figured this out yet
    const [currentPlayer, setCurrentPlayer] = useState("White");    





    
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef();


    const changeScene = () => {

        const scene = phaserRef.current.scene;

        if (scene)
        {
            scene.changeScene();
        }
    }


    

    return (
        <div id="page">
            <h1>Chess Game</h1>
            <div id="app">
                
                <PhaserGame ref={phaserRef} currentActiveScene={""}/>

                <div>
                    <div className='header'>Current Player: {currentPlayer}</div>

                    <div>
                        <button className='button'> Last Move </button>
                    </div>
                    <div>
                        <button className="button" onClick={changeScene}>Restart</button>
                    </div>
                </div>     
            </div>
        </div>
    )
}

export default App
