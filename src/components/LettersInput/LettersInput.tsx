import React from "react";
import "./LettersInput.css";
declare interface LettersInputProps {
	selectedLetter: string;
}

const LettersInput = ({ selectedLetter }: LettersInputProps) => {
	return (
		<div className='letter_input_container'>
			<div className='letter_input'>{selectedLetter}</div>
		</div>
	);
};

export default LettersInput;
