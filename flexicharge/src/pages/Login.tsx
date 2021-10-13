import { Button, TextField, Grid, Box } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import { Redirect, Link, useHistory } from "react-router-dom";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import LockIcon from "@material-ui/icons/Lock";
import InputAdornment from "@material-ui/core/InputAdornment";
import { ValidationForm } from "../components/validation";
import loginB from "../assets/loginB.svg";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { useEffect } from "react";
import AuthService from "../components/AuthService";


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grid: {
			alignItems: "center",
			justifyContent: "center",
			maxWidth: "40%",
			minWidth: "40vh",
			minHeight: "100vh",
			height: "0",
			margin: "auto",
		},
		container: {
			backgroundColor: theme.flexiCharge.primary.white,
			borderRadius: "0.5rem",
			justifyContent: "center",
			padding: "1rem",
		},
		gridItem: {
			margin: "auto",
		},
		textFields: {
			maxWidth: "80%",
		},
		button: {
			backgroundImage: `url(${loginB})`,
			backgroundPosition: "center",
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			"&:hover": {
				boxShadow: theme.flexiCharge.boxShadow.button,
				transform: "translateY(-5px)",
			},
			width: "50%",
			minHeight: "3rem",
			marginTop: theme.spacing(2),
		},
		links: {
			marginTop: theme.spacing(2),
			fontWeight: 500,
		},
		backdrop: {
			position: "absolute" as "absolute",
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			width: 400,
			bgcolor: "background.paper",
			p: 4,
		},
	})
);

const inputFieldValues = [
	{
		name: "username",
		label: "Username",
		id: "username",
		icon: <AccountCircle />,
	},
	{
		name: "password",
		type: "password",
		label: "Password",
		id: "user-password",
		icon: <LockIcon />,
	},
];

const Login = () => {
	const classes = useStyles();
	const history = useHistory();

	const {
		LogInhandleFormSubmit,
		handleInputValue,
		redirect,
		errors,
		msg,
		open,
		handleClose,
	} = ValidationForm();

	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();
		if (!currentUser) {
			console.log("there is no user");
		} else {
			console.log("there is  user");
			history.push("/profile");
		}
	}, []);


	if (redirect) {
		return <Redirect to="/profile" />;
	}

	return (
		<Grid container direction="column" className={classes.grid}>
			<Modal open={open} onClose={handleClose}>
				<Box className="backdrop">
					<div className="loader"></div>
				</Box>
			</Modal>
			<Grid container direction="column" className={classes.container}>
				<form autoComplete="off" onSubmit={LogInhandleFormSubmit}>
					<h1 className="formTitle">Log in</h1>
					{inputFieldValues.map((inputFieldValue, index) => {
						return (
							<Grid item key={index} xs={12} className={classes.gridItem}>
								<TextField
									key={index}
									onChange={handleInputValue}
									onBlur={handleInputValue}
									InputProps={{
										startAdornment: (
											<InputAdornment position="start">
												{inputFieldValue.icon}
											</InputAdornment>
										),
									}}
									fullWidth
									style={{ marginTop: "1rem" }}
									className={classes.textFields}
									name={inputFieldValue.name}
									label={inputFieldValue.label}
									type={inputFieldValue.type}
									autoComplete="none"
									{...(errors[inputFieldValue.name] && {
										error: true,
										helperText: errors[inputFieldValue.name],
									})}
								/>
							</Grid>
						);
					})}
					<Grid item xs={12}>
						<Button
							variant="contained"
							type="submit"
							className={classes.button}
						/>
					</Grid>
					<Grid container className={classes.links}>
						<Grid item xs={6}>
							<Link to="/forgot-password">Forgot password?</Link>
						</Grid>
						<Grid item xs={6}>
							<Link to="/sign-up">No account? Sign Up</Link>
						</Grid>
					</Grid>
				</form>
				{msg ? <Alert severity="error">{msg}</Alert> : ""}{" "}
			</Grid>
		</Grid>
	);
};

export default Login;