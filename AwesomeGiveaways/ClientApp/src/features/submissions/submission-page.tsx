import React, { useState } from 'react'
import { Submission } from './models';

import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SubmissionPage = () => {
	return (
		<section className="hero is-fullheight">
			<div className="hero-body">
				<div className="container">
					<h1 className="title">Global Azure Bootcamp Giveaway</h1>
					<SubmissionForm />
				</div>
			</div>
		</section>
	)
}

const SubmissionForm = () => {

	let initialValues: Submission = {
		name: '',
		email: ''
	}

	let validationSchema = Yup.object().shape<Submission>({
		name: Yup.string()
			.max(30, 'Too long')
			.required('Required'),

		email: Yup.string()
			.email()
			.required('Required')
	})

	const handleSubmission = (values: Submission, actions: FormikActions<Submission>) => {
		actions.resetForm();
		actions.setSubmitting(false);
	}

	const formContent = (bag: FormikProps<Submission>) => (
		<Form>
			<div className="field">
				<label htmlFor="name" className="label">Your Name</label>
				<div className="control">
					<Field className="input" type="text" name="name" />
					<ErrorMessage className="help is-danger" name="name" component="p" />
				</div>
			</div>

			<div className="field">
				<label htmlFor="email" className="label">Your Email Address</label>
				<div className="control">
					<Field className="input" type="email" name="email" />
					<ErrorMessage className="help is-danger" name="email" component="p" />
				</div>
			</div>

			<p>By submitting this form you accept our privacy policy.</p>
			<br />
			<button className="button is-link" disabled={!bag.isValid} onClick={bag.submitForm}>Submit</button>
		</Form>
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} render={formContent} onSubmit={handleSubmission} />
	)
}

export {
	SubmissionPage
}
