import React, { useState, useEffect } from 'react';
import { getJson } from '../submissions/http-service';
import { Submission } from '../submissions/models';

import * as SignalR from '@aspnet/signalr';

import QRCode from 'qrcode.react';
import Swal from 'sweetalert2';


export const DashboardPage = () => {

	const [counter, setCounter] = useState<number>(0);

	const connection = new SignalR.HubConnectionBuilder()
		.withUrl('/hub')
		.build();

	connection.start().catch(reason => console.log(reason));

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
	}, []);

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">

					<div className="columns is-vcentered">
						<div className="column">
							<h1 className="title is-size-1">{counter}</h1>
							<h2 className="subtitle">People signed up</h2>
						</div>
						<div className="column divider-left">
							<QRCode size={200} value={window.location.origin} />
							<p>
								Join us here
							</p>
                            <p>https://gab-giveaway.azurewebsites.net</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
