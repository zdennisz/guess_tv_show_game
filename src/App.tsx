import React, { useState } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
import Statistics from "./components/Statistics/Statistics";
import LettersInput from "./components/LettersInput/LettersInput";
function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);
	const [score, setScore] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const fullWord = "Henry";
	const gussedWord = "Henry";
	const [showHint, setShowHint] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [hintPressedAmount, setHintPressedAmount] = useState(0);

	const checkGuessHandler = () => {
		const isIncludes = fullWord.includes(keyPress.key);
		if (!isIncludes && lifePoints === 1) {
			setGameOver(true);
		} else if (!isIncludes && lifePoints > 1) {
			setLifePoints((state) => state - 1);
		}
	};
	const restartGameHandler = () => {
		setGameOver(false);
		setLifePoints(3);
		setScore(0);
	};

	const showHintHandler = () => {
		if (!showHint) {
			setHintPressedAmount((state) => state + 1);
		}
		setShowHint((state) => !state);
	};

	const showStatisticsHandler = () => {
		setShowModal((state) => !state);
	};

	console.log("keyPress.key", keyPress);
	return (
		<div className='App'>
			{gameOver ? (
				<>
					<div>You have lost</div>
					<button onClick={restartGameHandler}>Restart Game</button>
				</>
			) : (
				<>
					<TvShowName tvShowName={"Henry"} />
					<div>
						<LettersInput
							selectedLetter={keyPress.key === " " ? " " : keyPress.key}
						/>
						<div className='button_container'>
							<button onClick={checkGuessHandler}>Check the guess</button>
							<button onClick={showHintHandler}>Hint</button>
							<button onClick={showStatisticsHandler}>Statistics</button>
						</div>
						{showHint && <Hint hint={"bla bla some hint"} />}
						{showModal && (
							<Statistics
								amountOfRightGusses={score}
								amountOfWrongGusses={lifePoints}
								amountOftimesPressedHint={hintPressedAmount}
								onClose={showStatisticsHandler}
							/>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default App;
