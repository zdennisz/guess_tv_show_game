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
			<i className={`${icon} nav_icon`} />
			<label className='nav_btn_label'>{title}</label>
		</button>
	);
};

export default NavButton;
