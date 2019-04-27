import React, { useState, useEffect } from 'react';
import { getJson } from '../submissions/http-service';
import { Submission } from '../submissions/models';

export const DashboardPage = () => {

	const [counter, setCounter] = useState<number>(0);

	useEffect(() => {
		getJson<Submission[]>('/api/submissions').then(data => {
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
