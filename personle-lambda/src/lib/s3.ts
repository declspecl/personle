import { ALL_PERSONA_NAMES, DAILY_PERSONAS_BUCKET_NAME } from "../constants.js";
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({});

export const getDailyPersona = async (): Promise<string> => {
	const todayKey = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

	try {
		const getObjectCommand = new GetObjectCommand({
			Bucket: DAILY_PERSONAS_BUCKET_NAME,
			Key: todayKey
		});

		const response = await s3Client.send(getObjectCommand);
		const body = await response.Body!.transformToString();
		return body;
	} catch (error) {
		if (error instanceof Error && error.name === "NoSuchKey") {
			const newPersona = ALL_PERSONA_NAMES[Math.floor(Math.random() * ALL_PERSONA_NAMES.length)];
			console.log(`Creating object for today's key "${todayKey.toString()}", persona: "${newPersona}"`);

			await s3Client.send(
				new PutObjectCommand({
					Bucket: DAILY_PERSONAS_BUCKET_NAME,
					Key: todayKey,
					Body: newPersona
				})
			);
			return newPersona;
		}

		console.error("S3 error:", error);
		throw error;
	}
};
