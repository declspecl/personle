import { useLayoutEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
	const getMatches = (query: string): boolean => {
		return window.matchMedia(query).matches;
	};

	const [matches, setMatches] = useState<boolean>(() => getMatches(query));

	useLayoutEffect(() => {
		const handleChange = () => setMatches(getMatches(query));

		const matchMedia = window.matchMedia(query);

		handleChange();

		// Use deprecated `addListener` and `removeListener` to support Safari < 14 (#135)
		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener("change", handleChange);
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener("change", handleChange);
			}
		};
	}, [query]);

	return matches;
}
