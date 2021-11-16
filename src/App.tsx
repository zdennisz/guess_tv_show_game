import React, { useState, useEffect } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
import Statistics from "./components/Statistics/Statistics";
import LettersInput from "./components/LettersInput/LettersInput";
import { getMovies, scrambleTvShowName } from "./utils/helper";
import GameOver from "./components/GameOver/GameOver";

declare interface MovieInfo {
	poster_path: string;
	popularity: number;
	id: number;
	backdrop_path: string;
	vote_average: number;
	overview: string;
	first_air_date: string;
	origin_country: [];
	genre_ids: [];
	original_language: string;
	vote_count: number;
	name: string;
	original_name: string;
}

declare interface TvShowInfo {
	name: string;
	overview: string;
}

function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);
	const [rightGuesses, setRightGuesses] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [selectedShow, setSelectedShow] = useState({ name: "", overview: "" });
	const [pageNumber, setPageNumber] = useState(1);
	const [userWord, setUserWord] = useState("");
	const [movieList, setMovieList] = useState([]);
	const [showHint, setShowHint] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const [hintPressedAmount, setHintPressedAmount] = useState(0);

	const checkGuessHandler = () => {
		const isEqualToFullWord = userWord === selectedShow.name;
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
		setSelectedShow({ name: "", overview: "" });
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
				// Remove the last char
				setUserWord((state) => state.substring(0, state.length - 1));
			} else {
				// Add a char
				setUserWord((state) => state + keyPress.key);
			}
		}
	}, [keyPress]);

	useEffect(() => {
		if (movieList.length === 0) {
			getMovies(pageNumber)
				.then((data) => {
					const filterData = data.map((movieInfo: MovieInfo) => ({
						overview: movieInfo.overview,
						name: movieInfo.name,
					}));
					setMovieList(filterData);
				})
				.catch((failed) => {
					console.log("fail", failed);
				});
			// Increment page number
			setPageNumber((state) => state + 1);
		}
	}, [pageNumber, movieList]);

	useEffect(() => {
		if (movieList.length > 0) {
			const show = movieList.shift();
			if (show) {
				const { name, overview } = show as TvShowInfo;
				setSelectedShow({ name, overview });
			}
		}
	}, [movieList]);

	return (
		<div className='App'>
			{gameOver ? (
				<GameOver restartGameHandler={restartGameHandler} />
			) : (
				<>
					<TvShowName tvShowName={scrambleTvShowName(selectedShow.name)} />
					<div>
						<LettersInput
							selectedLetter={keyPress.key === " " ? " " : userWord}
						/>
						<div className='button_container'>
							<button onClick={checkGuessHandler}>Check the guess</button>
							<button onClick={showHintHandler}>Hint</button>
							<button onClick={showStatisticsHandler}>Statistics</button>
						</div>
						{showHint && <Hint hint={selectedShow.overview} />}
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
