import unittest
from constants import USER_SESSION_COOKIE_NAME
from api.guesses import *

class PersonleApiTests(unittest.TestCase):
    def test_gets_new_session(self):
        response = get_guesses()

        user_session_cookie = response.cookies.get(USER_SESSION_COOKIE_NAME)

        self.assertIsNotNone(user_session_cookie)

    def test_saves_new_guesses(self):
        post_guess_response = post_guess("someTestGuess")
        user_session_cookie = post_guess_response.cookies.get(USER_SESSION_COOKIE_NAME)
        self.assertIsNotNone(user_session_cookie)

        get_guesses_response = get_guesses(user_session_cookie)
        json_response = get_guesses_response.json()
        self.assertEqual(json_response["guesses"], ["someTestGuess"])

if __name__ == "__main__":
    unittest.main()