import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import TvShowName from "./components/TvShowName/TvShowName";
import useKeyPress from "./components/hooks/useKeyPress";
import Hint from "./components/Hint/Hint";
import Statistics from "./components/Statistics/Statistics";
import CardInput from "./components/CardInput/CardInput";
import {
	getMovies,
	scrambleTvShowName,
	saveDataToStorage,
	loadDataFromStorage,
	wordEqualityChecker,
} from "./utils/helper";
import GameOver from "./components/GameOver/GameOver";
import Button from "./components/Button/Button";
import { ResponseTvShowInfo, SingleTvShow } from "./utils/types";
import Header from "./components/Header/Header";

function App() {
	const keyPress = useKeyPress();
	const firstInit = useRef(true);
	const [lifePoints, setLifePoints] = useState(3);
	const [rightGuesses, setRightGuesses] = useState(0);
	const [wrongGuesses, setWrongGuesses] = useState(0);
	const [hintPressedAmount, setHintPressedAmount] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [selectedShow, setSelectedShow] = useState({ name: "", overview: "" });
	const [pageNumber, setPageNumber] = useState(1);
	const [userWord, setUserWord] = useState("");
	const [movieList, setMovieList] = useState<SingleTvShow[]>([]);
	const [showHint, setShowHint] = useState(false);
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		if (firstInit.current === true) {
			const loadedData = loadDataFromStorage();

			setHintPressedAmount(loadedData.hint);
			setRightGuesses(loadedData.right);
			setWrongGuesses(loadedData.wrong);
			firstInit.current = false;
		}
	}, [rightGuesses, wrongGuesses, hintPressedAmount, firstInit]);

	const checkGuessHandler = () => {
		const isEqualToFullWord = wordEqualityChecker(userWord, selectedShow.name);
		if (!isEqualToFullWord && lifePoints === 1) {
			setGameOver(true);
		} else if (!isEqualToFullWord && lifePoints > 1) {
			setLifePoints((state) => state - 1);
			setWrongGuesses((state) => {
				saveDataToStorage(rightGuesses, state + 1, hintPressedAmount);
				return state + 1;
			});
		} else if (isEqualToFullWord) {
			setRightGuesses((state) => {
				saveDataToStorage(state + 1, wrongGuesses, hintPressedAmount);
				return state + 1;
			});
			// Get a life point
			setLifePoints((state) => state + 1);

			// Move to next word
			removeFirstShow(movieList);
			setUserWord("");
		}
	};

	const restartGameHandler = () => {
		setGameOver(false);
		setLifePoints(3);
		removeFirstShow(movieList);
		setUserWord("");
	};

	const removeFirstShow = (shows: SingleTvShow[]) => {
		const allShows: SingleTvShow[] = [...shows];
		const newShows = allShows.filter((show) => show.name !== allShows[0].name);
		setSelectedShow({ name: allShows[0].name, overview: allShows[0].overview });
		setMovieList(newShows);
	};

	const showHintHandler = () => {
		if (!showHint) {
			setHintPressedAmount((state) => {
				saveDataToStorage(rightGuesses, wrongGuesses, state + 1);
				return state + 1;
			});
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
					removeFirstShow(filterData);

					// Increment page number
					setPageNumber((state) => state + 1);
				})
				.catch((failed) => {
					console.error("fail", failed);
				});
		}
	}, [pageNumber, movieList]);

	return (
		<div className='App'>
			{gameOver ? (
				<GameOver restartGameHandler={restartGameHandler} />
			) : (
				<>
					<Header
						lifePoints={lifePoints}
						hintOnClickHandler={showHintHandler}
						statsOnClickHandler={showStatisticsHandler}
					/>
					<TvShowName tvShowName={scrambleTvShowName(selectedShow.name)} />
					<div className='user_input_containers'>
						<CardInput selectedWord={userWord} />
						<div className='button_container'>
							<Button
								onClickHandler={checkGuessHandler}
								buttonTitle='Check the guess'
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
