import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const SubmissionPage = () => {
	return (
		<div>
			<h2>Sign up below</h2>
			<SubmissionForm />
		</div>
	)
}

const SubmissionForm = () => {
	return (
		<Form>
			<FormGroup>
				<Label for="name">Your name</Label>
				<Input name="name" />
			</FormGroup>
			<FormGroup>
				<Label for="email">Your email address</Label>
				<Input type="email "name="email" />
			</FormGroup>

			<Button>Submit</Button>
		</Form>
	)
}

export {
	SubmissionPage
};