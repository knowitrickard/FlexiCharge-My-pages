import { useState } from "react";
import AuthService from "./AuthService";

const initialFormValues = {
	firstName: "",
	lastName: "",
	username: "",
	adress: "",
	phoneNumber: "",
	email: "",
	password: "",
	oldPassword: "",
	newPassword: "",
	verifyCode: "",
	formSubmitted: false,
};

export const ValidationForm = () => {
	const [values, setValues] = useState(initialFormValues);
	const [errors, setErrors] = useState({} as any);
	const [msg, setMsg] = useState("");
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);
	const [redirect, setRedirect] = useState(false);

	const validate: any = (fieldValues = values) => {
		// this function will check if the form values are valid
		const temp: any = { ...errors };

		if ("firstName" in fieldValues)
			temp.firstName = fieldValues.firstName ? "" : "This field is required.";

		if ("lastName" in fieldValues)
			temp.lastName = fieldValues.lastName ? "" : "This field is required.";

		if ("username" in fieldValues)
			temp.username = fieldValues.username ? "" : "This field is required.";

		if ("adress" in fieldValues)
			temp.adress = fieldValues.adress ? "" : "This field is required.";

		if ("phoneNumber" in fieldValues)
			temp.phoneNumber = fieldValues.phoneNumber
				? ""
				: "This field is required.";

		if ("email" in fieldValues) {
			temp.email = fieldValues.email ? "" : "This field is required.";
			if (fieldValues.email) {
				temp.email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
					? ""
					: "Email is not valid.";
			}
		}

		if ("oldPassword" in fieldValues) {
			temp.oldPassword = fieldValues.oldPassword
				? ""
				: "This field is required.";
			if (fieldValues.oldPassword) {
				temp.oldPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(
					fieldValues.oldPassword
				)
					? ""
					: "Password must at least have 8 characters including a number and both lowercase and uppercase letter.";
			}
		}

		if ("newPassword" in fieldValues) {
			temp.newPassword = fieldValues.newPassword
				? ""
				: "This field is required.";
			if (fieldValues.newPassword) {
				temp.newPassword = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(
					fieldValues.newPassword
				)
					? ""
					: "Password must at least have 8 characters including a number and both lowercase and uppercase letter.";
			}
		}

		if ("password" in fieldValues)
			temp.password = fieldValues.password ? "" : "This field is required.";

		if ("verifyCode" in fieldValues) {
			temp.verifyCode = fieldValues.verifyCode
				? ""
				: "Code is a 6 digit number that was sent to your email.";
		}

		setErrors({
			...temp,
		});
	};

	const handleInputValue = (e: any) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
		validate({ [name]: value });
	};

	const isEmpty = (initialValues: Object) => {
		var missingValues = [];
		for (const [key, value] of Object.entries(initialValues)) {
			if (value.length < 1) {
				missingValues.push("missing");
			}
		}
		return missingValues.length ? true : false;
	};

	const RegisterhandleFormSubmit = async (e: any) => {
		e.preventDefault();
		const { firstName, lastName, email, username, newPassword } =
			e.target.elements;

		const initialValues = {
			firstName: firstName.value,
			lastName: lastName.value,
			email: email.value,
			username: username.value,
			newPassword: newPassword.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");
		if (!isEmpty(initialValues)) {
			if (isValid) {
				setOpen(true);
				const { firstName, lastName, email, username, newPassword } = values;
				AuthService.register(
					firstName,
					lastName,
					email,
					username,
					newPassword
				).then(
					() => {
						handleClose;
						setOpen(false);
						setRedirect(true);
					},
					(error) => {
						handleClose;
						setOpen(false);
						setMsg(error.response.data.message);
					}
				);
			}
		} else {
			setMsg("Please fill in the fields!");
		}
	};

	const verifyHandleFormSubmit = async (e: any) => {
		e.preventDefault();

		const { username, verifyCode } = e.target.elements;
		const initialValues = {
			username: username.value,
			verifyCode: verifyCode.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");

		if (isValid && !isEmpty(initialValues)) {
			setOpen(true);
			const { username, verifyCode } = values;
			AuthService.verify(username, verifyCode).then(
				() => {
					handleClose;
					setOpen(false);
					setRedirect(true);
				},
				(error) => {
					handleClose;
					setOpen(false);
					setMsg(error.response.data.message);
				}
			);
		} else setMsg("Please fill in the fields!");
	};

	const LogInhandleFormSubmit = async (e: any) => {
		e.preventDefault();

		const { username, password } = e.target.elements;
		const initialValues = {
			username: username.value,
			password: password.value,
		};
		const isValid = Object.values(errors).every((x) => x === "");

		if (isValid && !isEmpty(initialValues)) {
			setOpen(true);
			const { username, password } = values;
			AuthService.login(username, password).then(
				() => {
					handleClose;
					setOpen(false);
					setRedirect(true);
				},
				(error) => {
					setOpen(false);
					handleClose;
					setMsg(error.response.data.message);
				}
			);
		} else setMsg("Please fill in the fields!");
	};

	const ForgotPasswordHandleFormSubmit = async (e: any) => {
		e.preventDefault();

		const { username } = e.target.elements;
		const initialValues = {
			username: username.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");

		if (isValid && !isEmpty(initialValues)) {
			setOpen(true);
			const { username } = values;
			AuthService.forgotPassword(username).then(() => {
				handleClose;
				setOpen(false);
				setRedirect(true);
			});
		} else setMsg("Please fill in the fields!");
	};

	const ConfirmForgotPasswordHandleFormSubmit = async (e: any) => {
		e.preventDefault();

		const { username, newPassword, verifyCode } = e.target.elements;
		const initialValues = {
			username: username.value,
			newPassword: newPassword.value,
			verifyCode: verifyCode.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");

		if (!isEmpty(initialValues)) {
			if (isValid) {
				setOpen(true);
				const { username, newPassword, verifyCode } = values;
				AuthService.confirmForgotPassword(
					username,
					newPassword,
					verifyCode
				).then(
					() => {
						handleClose;
						setOpen(false);
						setRedirect(true);
					},
					(error) => {
						handleClose;
						setOpen(false);
						setMsg(error.response.data.message);
					}
				);
			}
		} else {
			setMsg("Please fill in the fields!");
		}
	};

	const ChangePassword = async (e: any) => {
		e.preventDefault();

		const { oldPassword, newPassword } = e.target.elements;
		const initialValues = {
			oldPassword: oldPassword.value,
			newPassword: newPassword.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");
		const user = AuthService.getCurrentUser();
		const token = user.accessToken;
		if (!isEmpty(initialValues)) {
			if (isValid) {
				setOpen(true);
				const { oldPassword, newPassword } = values;
				AuthService.changePassword(token, oldPassword, newPassword).then(
					() => {
						handleClose;
						setOpen(false);
						setTimeout(() => {
							setRedirect(true);
						}, 2000);
					},
					(error) => {
						handleClose;
						setOpen(false);
						setMsg(error.response.data.message);
					}
				);
			}
		} else {
			setMsg("Please fill in the fields!");
		}
	};
	
	const EditProfileFormSubmit = async (e: any) => {
		e.preventDefault();

		const { firstName, lastName } = e.target.elements;
		const initialValues = {
			firstName: firstName.value,
			lastName: lastName.value,
		};

		const isValid = Object.values(errors).every((x) => x === "");
		const user = AuthService.getCurrentUser();
		const token = user.accessToken;
		if (!isEmpty(initialValues)) {
			if (isValid) {
				setOpen(true);
				const { firstName, lastName } = values;
				AuthService.changeName(token, firstName, lastName).then(
					() => {
						handleClose;
						setOpen(false);
						setTimeout(() => {
							setRedirect(true);
						}, 2000);
					},
					(error) => {

						handleClose;
						setOpen(false);
						setMsg(error.response.data.message);
					}
				);
			}
		} else {
			setMsg("Please fill in the fields!");
		}
	};

	return {
		values,
		errors,
		msg,
		open,
		redirect,
		handleClose,
		handleOpen,
		handleInputValue,
		RegisterhandleFormSubmit,
		verifyHandleFormSubmit,
		LogInhandleFormSubmit,
		ForgotPasswordHandleFormSubmit,
		ConfirmForgotPasswordHandleFormSubmit,
		ChangePassword,
		EditProfileFormSubmit,
	};
};
