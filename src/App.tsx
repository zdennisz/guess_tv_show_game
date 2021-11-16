import React, { useState, useEffect } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
import Statistics from "./components/Statistics/Statistics";
import LettersInput from "./components/LettersInput/LettersInput";
function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);
	const [rightGuesses, setRightGuesses] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [userWord, setUserWord] = useState("");
	const fullWord = "Henry";

	const [showHint, setShowHint] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [hintPressedAmount, setHintPressedAmount] = useState(0);

	const checkGuessHandler = () => {
		const isEqualToFullWord = fullWord === userWord;
		if (!isEqualToFullWord && lifePoints === 1) {
			setGameOver(true);
		} else if (!isEqualToFullWord && lifePoints > 1) {
			setLifePoints((state) => state - 1);
		} else if (isEqualToFullWord) {
			setRightGuesses((state) => state + 1);
		}
	};

	const restartGameHandler = () => {
		setGameOver(false);
		setLifePoints(3);
		setRightGuesses(0);
		setUserWord("");
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
	useEffect(() => {
		if (keyPress.key !== " ") {
			if (keyPress.key === "Backspace") {
				setUserWord((state) => state.substring(0, state.length - 1));
			} else {
				setUserWord((state) => state + keyPress.key);
			}
		}
	}, [keyPress]);

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
							selectedLetter={keyPress.key === " " ? " " : userWord}
						/>
						<div className='button_container'>
							<button onClick={checkGuessHandler}>Check the guess</button>
							<button onClick={showHintHandler}>Hint</button>
							<button onClick={showStatisticsHandler}>Statistics</button>
						</div>
						{showHint && <Hint hint={"bla bla some hint"} />}
						{showModal && (
							<Statistics
								amountOfRightGusses={rightGuesses}
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
