import requests
from dataclasses import dataclass
from dataclasses_json import dataclass_json
from constants import BASE_URL, USER_SESSION_COOKIE_NAME

@dataclass
@dataclass_json
class GetGuessesResponse:
    guesses: list[str]

def get_guesses(user_session_cookie: str | None = None) -> requests.Response :
    cookies = {}
    if user_session_cookie:
        cookies = { USER_SESSION_COOKIE_NAME : user_session_cookie }

    return requests.get(
        f"{BASE_URL}/guess",
        cookies=cookies
    )

def post_guess(guess: str, user_session_cookie: str | None = None) -> requests.Response:
    cookies = {}
    if user_session_cookie:
        cookies = { USER_SESSION_COOKIE_NAME : user_session_cookie }

    return requests.post(
        f"{BASE_URL}/guess",
        json={ "guess": guess },
        cookies=cookies
    )