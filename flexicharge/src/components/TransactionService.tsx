import axios from "axios";

const API_URL_Transactions = "http://54.220.194.65:8080/transactions/";
const API_URL_ChargerPointID = "http://54.220.194.65:8080/chargePoints/";
const API_URL_Chargers = "http://54.220.194.65:8080/chargers/";

export interface IAuthServiceResponse {
	result?: any;
	error?: any;
}

class AuthService {
	getChargingSessions(userID: string): Promise<IAuthServiceResponse> {
		return axios
			.get(API_URL_Transactions + `userTransactions/${userID}`)
			.then((response) => {
				return { result: response.data };
			})
			.catch((error) => {
				return { error: error };
			});
	}
	getCharger(chargerID: string): Promise<IAuthServiceResponse> {
		return axios
			.get(API_URL_Chargers + `/${chargerID}`)
			.then((response) => {
				return { result: response.data };
			})
			.catch((error) => {
				return { error: error };
			});
	}


	getChargerLocation(chargePointID: string): Promise<IAuthServiceResponse> {
		return axios
			.get(API_URL_ChargerPointID + `/${chargePointID}`)
			.then((response) => {
				return { result: response.data };
			})
			.catch((error) => {
				return { error: error };
			});
	}




}

export default new AuthService();
