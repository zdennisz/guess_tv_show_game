import React from "react";
import "./CardInput.css";
declare interface CardInputProps {
	selectedWord: string;
}

const CardInput = ({ selectedWord }: CardInputProps) => {
	return (
		<div className='card_input_container'>
			<div className='card_input'>{selectedWord}</div>
		</div>
	);
};

export default CardInput;
