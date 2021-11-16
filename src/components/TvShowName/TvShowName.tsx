import React, { useState, useEffect } from "react";

declare interface TvShowNameProps {
	tvShowName: String;
}

const TvShowName = ({ tvShowName }: TvShowNameProps) => {
	const [showName, setShowName] = useState<String>();

	useEffect(() => {
		if (tvShowName) {
			setShowName(tvShowName);
		}
	}, [tvShowName]);

	return <div>{showName}</div>;
};

export default TvShowName;
