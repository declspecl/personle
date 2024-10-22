import { useEffect, useState } from "react";

type WindowDimensions = {
	width: number;
	height: number;
};

export function useWindowDimensions() {
	const [windowSize, setWindowSize] = useState<WindowDimensions>({
		width: window.innerWidth,
		height: window.innerHeight
	});

	useEffect(() => {
		const resizeHandler = () => {
			setWindowSize({
				width: window.innerWidth,
				height: window.innerHeight
			});
		};

		window.addEventListener("resize", resizeHandler);

		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, []);

	return windowSize;
}
