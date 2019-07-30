class ContactUs_Page {
	get firstName() { return $("[name='first_name']");}
	get lastName() { return $("[name='last_name']");}
	get comments() { return $("textarea");}
	get emailAddress() { return $("[name='email']");}
	get submitButton() { return $("[type='submit']");}
	get successfullSubmissionHeader() { return $("#contact_reply h1");}
	get unsuccessfullSubmissionHeader() { return $("body");}
	get successfullSubmissionHeaderText() {
		return this.successfullSubmissionHeader.getText();
	}
	get unsuccessfullSubmissionHeaderText() {
		return this.unsuccessfullSubmissionHeader.getText();
	}

	setFirstName(firstName) {
		return this.firstName.setValue(firstName);
	}

	setLastName(lastName) {
		return this.lastName.setValue(lastName);
	}

	setEmailAddress(emailAddress) {
		return this.emailAddress.setValue(emailAddress);
	}

	setComments(comments) {
		return this.comments.setValue(comments);
	}

	clickSubmitButton() {
		return this.submitButton.click();
	}

	submitAllInformationViaContactUsForm(firstName, lastName, emailAddress, comments) {
		if(firstName) {
			this.firstName.setValue(firstName);
		}
		if(lastName) {
			this.lastName.setValue(lastName);
		}
		if(emailAddress) {
			this.emailAddress.setValue(emailAddress);
		}
		if(comments) {
			this.comments.setValue(comments);
		}
		this.submitButton.click();
	}
}

module.exports = new ContactUs_Page();