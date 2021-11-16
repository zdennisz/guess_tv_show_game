import React from "react";

declare interface HintProps {
	hint: String;
}

const Hint = ({ hint }: HintProps) => {
	return <div>{hint}</div>;
};

export default Hint;
