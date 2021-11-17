import React, { useEffect } from "react";
import Button from "../Button/Button";
import "./Statistics.css";
declare interface StatisticsProps {
	amountOfRightGusses: number;
	amountOfWrongGusses: number;
	amountOftimesPressedHint: number;
	onClose: () => void;
}

const Statistics = ({
	amountOfRightGusses,
	amountOfWrongGusses,
	amountOftimesPressedHint,
	onClose,
}: StatisticsProps) => {
	useEffect(() => {
		const closeOnEscapeKeyDown = (e: any) => {
			if ((e.charCode || e.keyCode) === 27) {
				onClose();
			}
		};
		window.addEventListener("keydown", closeOnEscapeKeyDown);
		return () => {
			window.removeEventListener("keydown", closeOnEscapeKeyDown);
		};
	}, [onClose]);

	return (
		<div className='modal'>
			<div className='modal_content'>
				<div className='modal_header'>Statistics</div>
				<div className='modal_body'>
					{`  The amount of right guesses is ${amountOfRightGusses} 
                    	The amount of wrong guesses is ${amountOfWrongGusses} 
                    	The amount of hint button presses ${amountOftimesPressedHint}`}
				</div>
				<div className='modal_footer'>
					<Button buttonTitle='Close' onClickHandler={onClose} />
				</div>
			</div>
		</div>
	);
};

export default Statistics;
