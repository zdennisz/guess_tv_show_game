import React from "react";
import "./Header.css";
declare interface HeaderProps {
	lifePoints: number;
}

const Header = ({ lifePoints }: HeaderProps) => {
	return (
		<div className='header_container'>
			<div className='header_content'>
				You have <span>{lifePoints} </span>
				life points left
			</div>
		</div>
	);
};

export default Header;
