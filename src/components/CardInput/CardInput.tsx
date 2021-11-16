import React from "react";
import "./CardInput.css";
declare interface CardInputProps {
	selectedLetter: string;
}

const CardInput = ({ selectedLetter }: CardInputProps) => {
	return (
		<div className='card_input_container'>
			<div className='card_input'>{selectedLetter}</div>
		</div>
	);
};

export default CardInput;
