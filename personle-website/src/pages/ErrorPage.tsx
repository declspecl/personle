import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export function ErrorPage() {
    const error = useRouteError();

    console.error(error);

    if (isRouteErrorResponse(error)) {
        switch (error.status) {
            case 404:
                return <h1>This page does not exist</h1>;
            case 500:
                return <h1>Internal server error</h1>;
            case 503:
                return <h1>Service unavailable</h1>;
            default:
                return <h1>Something went wrong</h1>;
        }
    }

    return <div>Something went wrong. Please try again.</div>
}