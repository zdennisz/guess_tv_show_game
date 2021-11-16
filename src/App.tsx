import React, { useState } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);
	const isPartOfWord = "Henry";
	const [showHint, setShowHint] = useState(false);
	const checkGuessHandler = () => {
		if (lifePoints > 0 && !isPartOfWord.includes(keyPress.key)) {
			setLifePoints((state) => state - 1);
		} else {
			// Game over
		}
	};

	const showHintHandler = () => {
		setShowHint((state) => !state);
	};
	return (
		<div className='App'>
			{lifePoints}
			<TvShowName tvShowName={"Henry"} />
			<div className=''>
				<button onClick={checkGuessHandler}>Check the guess</button>
				<button onClick={showHintHandler}>Hint</button>
				{showHint && <Hint hint={"bla bla some hint"} />}
				<button>Statistics</button>
			</div>
		</div>
	);
}

export default App;
