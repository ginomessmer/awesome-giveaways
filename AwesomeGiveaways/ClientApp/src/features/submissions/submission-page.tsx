import React from 'react'

const SubmissionPage = () => {
	return (
		<div>
			<h1 className="title">Take part</h1>
			<SubmissionForm />
		</div>
	)
}

const SubmissionForm = () => {
	return (
		<form>
			<div className="field">
				<label className="label">Your Name</label>
				<div className="control">
					<input className="input" type="text" />
				</div>
			</div>
			<div className="field">
				<label className="label">Your Email Address</label>
				<div className="control">
					<input className="input" type="email" />
				</div>
			</div>
			<div>
				<p><small>By submitting this form, you agree to our privacy policy.</small></p>

				<button className="button is-link">Submit</button>
			</div>
		</form>
	)
}

export {
	SubmissionPage
}
