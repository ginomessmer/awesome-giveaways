import React, { useState, useEffect } from 'react';
import { Submission } from '../submissions/models';
import { getJson } from '../submissions/http-service';

const WinnerPage = () => {

	const [winner, setWinner] = useState<Submission>({
		email: '', name: ''
	});

	useEffect(() => {
		let data = getJson<Submission>('/api/submissions/random').then(data => {
			if (data === undefined) {
				return;
			}

			let remoteWinner = data as Submission;
			setWinner(remoteWinner);
		});
	}, []);

	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container has-text-centered">
					{winner &&
						<div>
							<h2 className="subtitle">And the winner is...</h2>
							<h1 className="title">{winner.name}</h1>
						</div>
					}
				</div>
			</div>
		</section>
	)
}

export {
	WinnerPage
}