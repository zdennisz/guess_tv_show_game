import React from "react";
import NavButton from "../NavButton/NavButton";
import "./Header.css";
declare interface HeaderProps {
	lifePoints: number;
	hintOnClickHandler: () => void;
	statsOnClickHandler: () => void;
}

const Header = ({
	lifePoints,
	hintOnClickHandler,
	statsOnClickHandler,
}: HeaderProps) => {
	return (
		<div className='header_container'>
			<div className='header_content'>
				<div>
					You have <span>{lifePoints} </span>
					life points left
				</div>
				<div className='header_content_btn_container'>
					<NavButton
						title='Hint'
						icon='fas fa-question-circle'
						onClickHandler={hintOnClickHandler}
					/>
					<NavButton
						title='Stats'
						icon='fas fa-chart-area'
						onClickHandler={statsOnClickHandler}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
