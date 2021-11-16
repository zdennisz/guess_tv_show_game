import React, { useState, useEffect } from "react";
import "./TvShowName.css";
declare interface TvShowNameProps {
	tvShowName: string;
}

const TvShowName = ({ tvShowName }: TvShowNameProps) => {
	const [showName, setShowName] = useState<string>();

	useEffect(() => {
		if (tvShowName) {
			setShowName(tvShowName);
		}
	}, [tvShowName]);

	return <div className='tv_show'>{showName}</div>;
};

export default TvShowName;
