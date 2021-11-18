import React from "react";
import "./Hint.css";
declare interface HintProps {
	hint: String;
}

const Hint = ({ hint }: HintProps) => {
	return (
		<div className='hint_container'>
			<i className='fas fa-question-circle hint_icon' />
			<div>{hint}</div>
		</div>
	);
};

export default Hint;
