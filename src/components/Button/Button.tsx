import React from "react";
import "./Button.css";
declare interface ButtonProps {
	onClickHandler: () => void;
	buttonTitle: string;
}
const Button = ({ onClickHandler, buttonTitle }: ButtonProps) => {
	return (
		<button className='button' onClick={onClickHandler}>
			{buttonTitle}
		</button>
	);
};

export default Button;
