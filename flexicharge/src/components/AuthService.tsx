import axios from "axios";

const API_URL = "http://54.220.194.65:8080/auth/";

class AuthService {
	login(username: string, password: string) {
		return axios
			.post(API_URL + "sign-in", {
				username: username,
				password: password,
			})
			.then((response) => {
				if (response.data) {
					localStorage.setItem("user", JSON.stringify(response.data));
				}

				return response.data;
			});
	}

	forgotPassword(username: string) {
		return axios.post(API_URL + `forgot-password/${username}`, {
			username: username,
		});
	}

	confirmForgotPassword(
		username: string,
		password: string,
		confirmationCode: string
	) {
		return axios.post(API_URL + "confirm-forgot-password", {
			username: username,
			password: password,
			confirmationCode: confirmationCode,
		});
	}

	changePassword(token: string, password: string, newPassword: string) {
		return axios.post(API_URL + "change-password", {
			accessToken: token,
			previousPassword: password,
			newPassword: newPassword,
		});
	}

	changeName(token: string, firstName: string, lastName: string) {

		return axios.put(API_URL + "update-user", {
			accessToken: token,
			name: firstName,
			family_name: lastName,
		}).then((response)=>{
			const localstore = JSON.parse(localStorage.getItem("user")!)
			localstore.name = firstName
			localstore.family_name = lastName
			localStorage.setItem("user", JSON.stringify(localstore));
		})
	}

	logout() {
		localStorage.removeItem("user");
	}

	register(
		firstName: string,
		familyName: string,
		email: string,
		username: string,
		password: string
	) {
		return axios.post(API_URL + "sign-up", {
			name: firstName,
			family_name: familyName,
			email: email,
			username: username,
			password: password,
		});
	}

	verify(username: string, code: string) {
		return axios.post(API_URL + "verify", {
			code: code,
			username: username,
		});
	}

	getCurrentUser() {
		const userStr = localStorage.getItem("user");
		if (userStr) return JSON.parse(userStr);

		return null;
	}
}

export default new AuthService();
