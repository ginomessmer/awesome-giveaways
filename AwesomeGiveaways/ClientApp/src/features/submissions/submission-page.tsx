import React, { useState } from 'react'
import { Submission } from './models';

import { Formik, FormikActions, FormikProps, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const SubmissionPage = () => {
	return (
		<div>
			<h1 className="title">Take part</h1>
			<SubmissionForm />
		</div>
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
					<ErrorMessage name="name" />
				</div>
			</div>

			<div className="field">
				<label htmlFor="email" className="label">Your Email Address</label>
				<div className="control">
					<Field className="input" type="email" name="email" />
					<ErrorMessage name="email" />
				</div>
			</div>

			<button className="button is-link" onClick={bag.submitForm}>Submit</button>
		</Form>
	);

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} render={formContent} onSubmit={handleSubmission} />
	)
}

export {
	SubmissionPage
}
