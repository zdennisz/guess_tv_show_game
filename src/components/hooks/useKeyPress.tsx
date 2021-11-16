import { useState, useEffect } from "react";

declare interface useKeyPressProps {
	key: String;
}

const useKeyPress = (): useKeyPressProps => {
	const [keyPressed, setKeyPressed] = useState({ key: "" });

	useEffect(() => {
		const upHandler = (e: any) => {
			if (e.keyCode >= 65 && e.keyCode <= 90) {
				setKeyPressed({ key: e.key });
			}
		};

		window.addEventListener("keyup", upHandler);

		return () => {
			window.removeEventListener("keyup", upHandler);
		};
	}, []);

	return keyPressed;
};

export default useKeyPress;
