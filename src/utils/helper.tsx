import axios from "axios";
import { SAVED_KEY } from "./constants";
import { SessionData } from "./types";
export const getMovies = async (pagenumber: number) => {
	try {
		const movies = await axios.get(
			`https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&page=${pagenumber}`
		);
		return movies.data.results;
	} catch (err) {
		console.error(err);
	}
};

export const scrambleTvShowName = (name: string) => {
	const scrambledWord = name.split("");
	const newWord = scrambledWord.map((char, index) => {
		if (index % 4 === 0 && char !== " ") {
			return "_";
		} else {
			return char;
		}
	});

	return newWord.join("");
};

export const saveDataToStorage = (
	right: number,
	wrong: number,
	hint: number
) => {
	sessionStorage.setItem(
		SAVED_KEY,
		JSON.stringify({ hint: hint, right: right, wrong: wrong })
	);
};

export const loadDataFromStorage = (): SessionData => {
	const sessionData = sessionStorage.getItem(SAVED_KEY);
	if (sessionData) {
		const parsedData: SessionData = JSON.parse(sessionData);
		return {
			hint: parsedData.hint,
			right: parsedData.right,
			wrong: parsedData.wrong,
		};
	} else {
		return { hint: 0, right: 0, wrong: 0 };
	}
};
