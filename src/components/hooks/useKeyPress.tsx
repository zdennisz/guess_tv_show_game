import { useState, useEffect } from "react";

declare interface useKeyPressProps {
	key: string;
}

const useKeyPress = (): useKeyPressProps => {
	const [keyPressed, setKeyPressed] = useState({ key: " " });

	useEffect(() => {
		const upHandler = (e: any) => {
			console.log("e", e);
			if (
				(e.keyCode >= 65 && e.keyCode <= 90) ||
				e.keyCode === 8 ||
				e.keyCode === 186 ||
				e.keyCode === 188 ||
				e.keyCode === 189 ||
				e.keyCode === 190 ||
				e.keyCode === 222 ||
				e.keyCode === 32 ||
				(e.keyCode >= 48 && e.keyCode <= 57) ||
				(e.keyCode >= 96 && e.keyCode <= 105)
			) {
				setKeyPressed({ key: e.key });
			}
		};
		const downHandler = (e: any) => {
			if (e.keyCode === 32 && e.target === document.body) {
				e.preventDefault();
			}
		};

		window.addEventListener("keyup", upHandler);
		window.addEventListener("keydown", downHandler);
		return () => {
			window.removeEventListener("keyup", upHandler);
			window.removeEventListener("keydown", downHandler);
		};
	}, []);

	return keyPressed;
};

export default useKeyPress;
