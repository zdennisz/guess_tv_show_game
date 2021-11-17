import React from "react";
import "./TvShowName.css";
declare interface TvShowNameProps {
	tvShowName: string;
}

const TvShowName = ({ tvShowName }: TvShowNameProps) => {
	return <div className='tv_show'>{tvShowName}</div>;
};

export default TvShowName;
