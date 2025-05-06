import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { USER_GAME_DATA_TABLE_NAME } from "../constants.js";
import { GetCommand, PutCommand } from "@aws-sdk/lib-dynamodb";

const dynamoDbClient = new DynamoDBClient({});

export const getUserGuesses = async (userId: string): Promise<string[]> => {
	try {
		const response = await dynamoDbClient.send(
			new GetCommand({
				TableName: USER_GAME_DATA_TABLE_NAME,
				Key: {
					pk: userId,
					sk: new Date().toISOString().slice(0, 10) //YYYY-MM-DD
				}
			})
		);
		const item = response.Item;

		if (item) {
			return JSON.parse(item.guesses || "[]");
		} else {
			return [];
		}
	} catch (error) {
		console.error("DynamoDB error:", error);
		return [];
	}
};

export const saveUserGuess = async (userId: string, guess: string): Promise<void> => {
	try {
		const existingGuesses = await getUserGuesses(userId);
		const guesses = [...existingGuesses, guess];

		await dynamoDbClient.send(
			new PutCommand({
				TableName: USER_GAME_DATA_TABLE_NAME,
				Item: {
					pk: userId,
					sk: new Date().toISOString().slice(0, 10), //YYYY-MM-DD
					guesses: JSON.stringify(guesses)
				}
			})
		);
	} catch (error) {
		console.error("DynamoDB error:", error);
	}
};
