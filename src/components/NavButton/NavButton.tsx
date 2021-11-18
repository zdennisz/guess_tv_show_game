import React from "react";
import "./NavButton.css";

declare interface NavButtonProps {
	title: string;
	icon: string;
	onClickHandler: () => void;
}

const NavButton = ({ title, icon, onClickHandler }: NavButtonProps) => {
	return (
		<button className='nav_btn' onClick={onClickHandler}>
			<label className='nav_btn_label' onClick={onClickHandler}>
				{title}
			</label>
			<i className={icon} onClick={onClickHandler} />
		</button>
	);
};

export default NavButton;
