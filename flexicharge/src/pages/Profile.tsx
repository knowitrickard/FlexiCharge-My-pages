import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
	Button,
	TextField,
	FormControlLabel,
	Checkbox,
	IconButton,
	Grid,
	Box,
} from "@material-ui/core";
import Alert from "@mui/material/Alert";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../components/AuthService";
import EditIcon from "@mui/icons-material/Edit";
import BottomNavigationBar from "../components/BottomNavigation";
import Mobile from "../components/Mobile";
import Navbar from "../components/Navbar";
import { ValidationForm } from "../components/validation";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		grid: {
			alignItems: "center",
			justifyContent: "center",
			maxWidth: "80%",
			minWidth: "40vh",
			marginTop: "1rem",
			margin: "auto",
			height: "34rem",

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
		textfield: {
			"&:disabled": {
				backgroundColor: "red",
			},
		},
		inputRoot: {
			"&$disabled": {
				color: "red",
			},
		},
		disabled: {
			color: "#222222",
			fontSize: "1.25rem",
			fontWeight: "bold",
		},
		button: {
			backgroundColor: theme.flexiCharge.accent.primary,
			"&:hover": {
				background: theme.flexiCharge.accent.primary,
				boxShadow: theme.flexiCharge.boxShadow.button,
				transform: "translateY(-5px)",
			},
			maxWidth: "50%",
			maxHeight: "10vh",
			marginTop: theme.spacing(2),
			fontWeight: "bold",
			fontSize: ".7rem",
			color: theme.flexiCharge.primary.white,
		},
	})
);

const inputFieldValues = [
	{
		name: "firstName",
		label: "First Name",
		id: "user-first-name",
	},

	{
		name: "lastName",
		label: "Last Name",
		id: "user-Last-name",
	},
	{
		name: "username",
		label: "Username",
		id: "username",
	},
	{
		name: "email",
		label: "Email",
		id: "user-email",
	},
	{
		name: "newPassword",
		type: "password",
		label: "Password",
		id: "user-password",
	},
];

const Profile = () => {
	const classes = useStyles();
	const [disabled, setDisabled] = useState(true);
	const [firstName, setFirstName] = useState("");
	const [familyName, setFamilytName] = useState("");
	const [email, setEmail] = useState("");
	const [userName, setUserName] = useState("");
	const history = useHistory();

	const {
		handleInputValue,
		EditProfileFormSubmit,
		handleClose,
		open,
		errors,
		msg,
	} = ValidationForm();

	useEffect(() => {
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) {
			history.push("/sign-in");
		} else {
			setFirstName(currentUser.name);
			setFamilytName(currentUser.family_name);
			setEmail(currentUser.email);
			setUserName(currentUser.username);
		}
	}, []);

	const handleButtonClick = () => {
		!disabled ? setDisabled(true) : setDisabled(false);
	};

	return (
		<>
			{Mobile() ? <Navbar /> : <BottomNavigationBar />}
			<Grid container direction="column" className={classes.grid}>
				<Modal open={open} onClose={handleClose}>
					<Box className="backdrop">
						<div className="loader"></div>
					</Box>
				</Modal>
				<Grid container direction="column" className={classes.container}>
					<form autoComplete="off" onSubmit={EditProfileFormSubmit}>
						<IconButton
							aria-label="edit"
							style={{ float: "right", color: "#f0c200" }}
							onClick={handleButtonClick}
						>
							<EditIcon />
						</IconButton>
						<Grid item xs={12}>
							<h1>Profile</h1>
							<Grid container spacing={3}>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										{...(errors["firstName"] && {
											error: true,
										})}
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										id="firstName"
										name="firstName"
										helperText={
											errors["firstName"]
												? "This field is required!"
												: "First name"
										}
										placeholder={firstName}
										variant="standard"
										disabled={disabled}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										{...(errors["lastName"] && {
											error: true,
										})}
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										id="lastName"
										name="lastName"
										helperText={
											errors["lastName"]
												? "This field is required!"
												: "Last name"
										}
										placeholder={familyName}
										variant="standard"
										disabled={disabled}
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										{...(errors["adress"] && {
											error: true,
											helperText: "This field is required!",
										})}
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										placeholder="Gjuterigatan 5"
										id="adress"
										name="adress"
										helperText="Adress"
										variant="standard"
										disabled
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										{...(errors["phoneNumber"] && {
											error: true,
											helperText: "This field is required!",
										})}
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										placeholder="0701234567"
										id="phoneNumber"
										name="phoneNumber"
										type="number"
										helperText="Phone Number"
										variant="standard"
										disabled
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										{...(errors["email"] && {
											error: true,
											helperText: "Please enter valid email adress!",
										})}
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										id="email"
										name="email"
										helperText="Email"
										placeholder={email}
										variant="standard"
										disabled
									/>
								</Grid>
								<Grid item xs={12} sm={6}>
									<TextField
										onChange={handleInputValue}
										autoComplete="none"
										InputProps={{
											classes: {
												root: classes.inputRoot,
												disabled: classes.disabled,
											},
										}}
										fullWidth
										id="username"
										name="userName"
										helperText="Username"
										placeholder={userName}
										variant="standard"
										disabled
									/>
								</Grid>
							</Grid>
							<Grid item xs={12}>
								<Button
									variant="contained"
									type="submit"
									className={classes.button}
									disabled={disabled}
								>
									Save changes
								</Button>
							</Grid>

							{msg ? <Alert severity="error">{msg}</Alert> : ""}
						</Grid>
					</form>
				</Grid>
			</Grid>
		</>
	);
};

export default Profile;
