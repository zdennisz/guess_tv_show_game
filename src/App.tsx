import React, { useState } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";

function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);

	return (
		<div className='App'>
			{lifePoints}
			<TvShowName tvShowName={"Henry"} />
			<div className=''>
				<button>Check the guess</button>
				<button>Hint</button>
				<button>Statistics</button>
			</div>
		</div>
	);
}

export default App;
