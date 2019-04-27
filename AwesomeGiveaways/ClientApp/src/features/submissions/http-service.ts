import { Submission } from "./models";

export const sendSubmission = async (submission: Submission): Promise<boolean> => {
	return postJson('/api/submissions', submission);
}

export const postJson = async (url: string, object: any): Promise<boolean> => {
	try {
		await fetch(url, {
			method: 'POST',
			body: JSON.stringify(object),
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

export const getJson = async <T>(url: string): Promise<T | undefined> => {
	try {
		let result = await fetch(url, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			},
			cache: 'no-cache'
		});

		let json = await result.json();
		return Promise.resolve(json as T);
	} catch (exception) {
		return Promise.resolve(undefined);
	}
}
