import React from "react";
import "./GameOver.css";
declare interface GameOverProps {
	restartGameHandler: () => void;
}
const GameOver = ({ restartGameHandler }: GameOverProps) => {
	return (
		<div className='game_over_container'>
			<div className='game_over_text'>
				Opps, Game is over. But dont worry you can try again :)
			</div>
			<button className='game_over_btn' onClick={restartGameHandler}>
				Restart Game
			</button>
		</div>
	);
};

export default GameOver;
