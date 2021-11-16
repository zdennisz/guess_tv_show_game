import React, { useState, useEffect } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
import Statistics from "./components/Statistics/Statistics";
import CardInput from "./components/CardInput/CardInput";
import { getMovies, scrambleTvShowName } from "./utils/helper";
import GameOver from "./components/GameOver/GameOver";
import Button from "./components/Button/Button";
import { ResponseTvShowInfo, SingleTvShow } from "./utils/types";

function App() {
	const keyPress = useKeyPress();
	const [lifePoints, setLifePoints] = useState(3);
	const [rightGuesses, setRightGuesses] = useState(0);
	const [wrongGuesses, setWrongGuesses] = useState(0);
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
			setWrongGuesses((state) => state + 1);
		} else if (isEqualToFullWord) {
			setRightGuesses((state) => state + 1);
		}
	};

	const restartGameHandler = () => {
		setGameOver(false);
		setLifePoints(3);
		setRightGuesses(0);
		removeShowFromList(movieList);
		setUserWord("");
	};
	const removeShowFromList = (movies: never[]) => {
		const show = movies.shift();
		if (show) {
			const { name, overview } = show as SingleTvShow;
			setSelectedShow({ name, overview });
		}
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
		if (keyPress.key !== "") {
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
					const filterData = data.map((movieInfo: ResponseTvShowInfo) => ({
						overview: movieInfo.overview,
						name: movieInfo.name,
					}));
					setMovieList(filterData);
				})
				.catch((failed) => {
					console.error("fail", failed);
				});
			// Increment page number
			setPageNumber((state) => state + 1);
		}
	}, [pageNumber, movieList]);

	useEffect(() => {
		if (movieList.length > 0) {
			removeShowFromList(movieList);
		}
	}, [movieList]);

	return (
		<div className='App'>
			{gameOver ? (
				<GameOver restartGameHandler={restartGameHandler} />
			) : (
				<>
					<div>You have {lifePoints} life points left</div>
					<TvShowName tvShowName={scrambleTvShowName(selectedShow.name)} />
					<div className='user_input_containers'>
						<CardInput selectedLetter={keyPress.key === "" ? "" : userWord} />
						<div className='button_container'>
							<Button
								onClickHandler={checkGuessHandler}
								buttonTitle='Check the guess'
							/>
							<Button onClickHandler={showHintHandler} buttonTitle='Hint' />
							<Button
								onClickHandler={showStatisticsHandler}
								buttonTitle='Stats'
							/>
						</div>
						{showHint && <Hint hint={selectedShow.overview} />}
						{showModal && (
							<Statistics
								amountOfRightGusses={rightGuesses}
								amountOfWrongGusses={wrongGuesses}
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
