import React, { useState, useEffect } from 'react';
import { getJson } from '../submissions/http-service';
import { Submission } from '../submissions/models';

import * as SignalR from '@aspnet/signalr';

export const DashboardPage = () => {

	const [counter, setCounter] = useState<number>(0);

	const connection = new SignalR.HubConnectionBuilder()
		.withUrl('/hub')
		.build();

	connection.start().catch(reason => alert(reason));

	// Set up SignalR
	connection.on('counterReceived', (count: number) => {
		console.log('counterReceived', count);
		setCounter(count);
	});

	useEffect(() => {
		getJson<Submission[]>('/api/submissions').then(data => {
			// Fetch initial counter
			if (data === undefined) {
				alert('An error occured while retrieving all submissions.');
				return;
			}

			let submissions = data as Submission[];
			setCounter(submissions.length);
		});
	}, [])

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">
					<h1 className="title is-size-1">{counter}</h1>
					<h2 className="subtitle">People signed up</h2>
				</div>
			</div>
		</section>
	)
}
