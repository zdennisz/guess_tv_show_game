import React, { useEffect } from "react";
import "./Header.css";
declare interface HeaderProps {
	lifePoints: number;
}

const Header = ({ lifePoints }: HeaderProps) => {
	let shakeEffect = "shake-horizontal";

	useEffect(() => {
		shakeEffect = "";
	}, [lifePoints]);

	return (
		<div className='header_container'>
			<div className='header_content'>
				You have <span className={shakeEffect}> {lifePoints} </span> life points
				left
			</div>
		</div>
	);
};

export default Header;
