import { RootLayout } from "@layouts/RootLayout";
import { SubPageLayout } from "@layouts/SubPageLayout";
import { NewspaperText } from "@components/typography/NewspaperText";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorStatus() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<div className="flex flex-col items-center">
				<NewspaperText
					text={"Error: " + error.status.toString() + "!"}
					palette="whiteOnTransparent"
					redLetters={["E", "4", "5"]}
					className="text-[min(12.5vw,5rem)]"
				/>
			</div>
		);
	}

	return <p className="text-center">Something went wrong. Please try again.</p>
}

export function ErrorPage() {
	return (
		<RootLayout>
			<SubPageLayout>
				<ErrorStatus />
			</SubPageLayout>
		</RootLayout>
	);
}