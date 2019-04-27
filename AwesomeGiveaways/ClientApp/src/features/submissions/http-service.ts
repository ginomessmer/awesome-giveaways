import { Submission } from "./models";

export const sendSubmission = async (submission: Submission): Promise<boolean> => {
	try {
		await fetch('/api/submissions', {
			method: 'POST',
			body: JSON.stringify(submission),
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'no-cache'
		});
		return Promise.resolve(true);
	} catch (exception) {
		return Promise.resolve(false);
	}
}
