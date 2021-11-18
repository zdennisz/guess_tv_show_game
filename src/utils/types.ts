export declare interface ResponseTvShowInfo {
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

export declare interface SingleTvShow {
	name: string;
	overview: string;
}

export declare interface SessionData {
	hint: number;
	right: number;
	wrong: number;
}
