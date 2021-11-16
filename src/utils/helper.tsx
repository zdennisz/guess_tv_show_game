import axios from "axios";
import { REACT_APP_MOVIE_API_KEY } from "./keys";
export const getMovies = async (pagenumber: number) => {
	try {
		const movies = await axios.get(
			`https://api.themoviedb.org/3/tv/top_rated?api_key=${REACT_APP_MOVIE_API_KEY}&page=${pagenumber}`
		);
		return movies.data.results;
	} catch (err) {
		console.error(err);
	}
};

export const scrambleTvShowName = (name: string) => {
	const scrambledWord = name.split("");
	const newWord = scrambledWord.map((char, index) => {
		if (index % 4 === 0) {
			return "_";
		} else {
			return char;
		}
	});

	return newWord.join(" ");
};
