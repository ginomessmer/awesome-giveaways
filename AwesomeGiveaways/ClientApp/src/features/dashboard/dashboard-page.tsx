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
	}, []);

	const pickLuckyWinner = async () => {
		let data = await getJson<Submission>('/api/submissions/random');
		if (data === undefined) {
			return;
		}

		let winner = data as Submission;
		Swal.fire({
			html: '<div><h2 class="subtitle">And the winner is...</h2><h1 class="title">' + winner.name + '</h1></div>',
			confirmButtonText: 'Congrats!'
		});
	};

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">

					<div className="columns is-vcentered">
						<div className="column">
							<h1 className="title is-size-1" onClick={pickLuckyWinner}>{counter}</h1>
							<h2 className="subtitle">People signed up</h2>
						</div>
						<div className="column divider-left">
							<QRCode size={200} value={window.location.origin} />
							<p>
								Join us here
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
