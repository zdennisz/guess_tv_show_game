import React from "react";
import "./Hint.css";
declare interface HintProps {
	hint: String;
}

const Hint = ({ hint }: HintProps) => {
	return (
		<div className='hint_container'>
			<div>{hint}</div>
		</div>
	);
};

export default Hint;
