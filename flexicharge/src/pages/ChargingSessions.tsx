import {
	DataGrid,
	GridToolbarContainer,
	GridToolbarFilterButton,
	GridToolbarDensitySelector,
	GridCellParams,
} from "@mui/x-data-grid";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AuthService from "../components/AuthService";
import BottomNavigationBar from "../components/BottomNavigation";
import Mobile from "../components/Mobile";
import TransactionService from "../components/TransactionService";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& .long": {
				fontSize: "12px",
			},
			"& .short": {
				fontSize: "15px",
			},
		},
		grid: {
			spacing: 0,
			alignItems: "center",
			justifyContent: "center",
			maxWidth: "60%",
			minWidth: "10vh",
			height: "50rem",
			margin: "auto",
		},
		container: {
			backgroundColor: theme.flexiCharge.primary.white,
			borderRadius: "0.5rem",
			justifyContent: "center",
			padding: "1rem",
		},
	})
);

const columns = [
	{
		field: "date",
		headerName: "Date",
		minWidth: 100,
		flex: 0.1,
		fontSize: "5px",
		type: "date",
	},
	{
		field: "electricityTransferred",
		headerName: "Electricity transferred (kWh)",
		minWidth: 125,
		flex: 0.25,
		filterable: false,
	},
	{
		field: "priceKwh",
		headerName: "Price (SEK/kWh)",
		minWidth: 130,
		flex: 0.25,
		filterable: false,
	},
	{
		field: "location",
		headerName: "Location",
		width: 150,
		type: "string",
		sortable: false,
	},
	{
		field: "totalCost",
		headerName: "Total Cost (SEK)",
		minWidth: 130,
		flex: 0.25,
		filterable: false,
	},
];

interface IRow {
	id: number;
	date: String;
	electricityTransferred: any;
	priceKwh: any;
	totalCost: number;
	location: any;
}

const toolbar = () => {
	return (
		<GridToolbarContainer>
			<GridToolbarFilterButton />
			<GridToolbarDensitySelector />
		</GridToolbarContainer>
	);
};

const ChargingSessions = () => {
	const classes = useStyles();
	const history = useHistory();
	const currentUser = AuthService.getCurrentUser();
	const userName = currentUser.username
	var rowTest: any = [];
	const [loading, setLoading] =useState(false)

	const [rows, setFinalRows] = useState<IRow[]>([

	])


	useEffect(() => {
		if (!currentUser) {
			history.push("/sign-up");
		}
	}, []);
	useEffect(() => {
		data();
	}, []);


	const data = async () => {
		setLoading(true)


		const chargingSessionResponse = await TransactionService.getChargingSessions(userName);
		if (chargingSessionResponse.error) {
			//handle error, visa att det blev fel
			return;
		}

		let charginSessionRows: IRow[] = [];
		for (const chargingSession of chargingSessionResponse.result) {
			let { kwhTransfered, pricePerKwh, timestamp, chargerID, transactionID } = chargingSession;
			if (!kwhTransfered) kwhTransfered = 0

			if (!chargerID)
				return;

			pricePerKwh = pricePerKwh / 100

			const totalCost = kwhTransfered * pricePerKwh
			const date = new Date(timestamp * 1000).toLocaleDateString("sv");

			const getChargerResponse = await TransactionService.getCharger(chargerID);
			if (getChargerResponse.error) {
				//handle error, failed to fetch certain charger
				return;
			}

			let { chargePointID } = getChargerResponse.result;
			if (!chargePointID) {
				//handle error, no chargePointID Found
				return;
			}

			const getChargerLocationResponse = await TransactionService.getChargerLocation(chargePointID);
			const row: IRow =
			{
				id: transactionID,
				date: date,
				electricityTransferred: kwhTransfered,
				priceKwh: pricePerKwh,
				totalCost: totalCost,
				location: getChargerLocationResponse.result.name,
			}

			charginSessionRows.push(row);


		}

		setFinalRows(rows.concat(charginSessionRows));
		setLoading(false)

	}

	return (
		<>
			{Mobile() ? <Navbar /> : <BottomNavigationBar />}
			<div
				style={{ height: "500px", width: "80%", margin: "auto" }}
				className={classes.root}
			>
				<div style={{ display: "flex", height: "100%" }}>
					<div style={{ flexGrow: 1 }}>
						<h1 style={{ color: "whitesmoke" }}>Transactions</h1>
						<DataGrid
							rows={rows}
							columns={columns}
							// rowHeight={60}
							getCellClassName={(params: GridCellParams) => {
								const value = params.value as string;
								if (params.field === "location") {
									return value.length > 28 ? "long" : "short";
								}
								return "";
							}}
							loading={loading}
							pageSize={10}
							disableColumnMenu
							disableSelectionOnClick
							components={{ Toolbar: toolbar }}
							rowsPerPageOptions={[10]}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default ChargingSessions;
