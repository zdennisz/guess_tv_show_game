import React from "react";

declare interface GameOverProps {
	restartGameHandler: () => void;
}
const GameOver = ({ restartGameHandler }: GameOverProps) => {
	return (
		<div>
			<div>You have lost</div>
			<button onClick={restartGameHandler}>Restart Game</button>
		</div>
	);
};

export default GameOver;
