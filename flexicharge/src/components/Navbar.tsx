import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
// import { ReactComponent as Title } from '../../assets/title.svg';
import { Icon } from "@material-ui/core";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptIcon from "@mui/icons-material/Receipt";
import HistoryIcon from "@mui/icons-material/History";
import LogoutIcon from "@mui/icons-material/Logout";
import { useHistory } from "react-router-dom";
import AuthService from "./AuthService";
import Logout from "@mui/icons-material/Logout";

// import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const categories = [
	{
		id: "",
		children: [
			{
				id: "Profile",
				icon: <AccountBoxIcon />,
				location: "/profile",
				active: false,
			},
			{
				id: "Charging History",
				icon: <HistoryIcon />,
				location: "/charging-sessions",
			},
			{ id: "Invoices", icon: <ReceiptIcon />, location: "/invoices" },
		],
	},
];

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		hide: {
			display: "none",
		},
		drawer: {
			[theme.breakpoints.up("sm")]: {
				width: drawerWidth,
				flexShrink: 0,
				whiteSpace: "nowrap",
				color: theme.flexiCharge.primary.white,
			},
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: "hidden",
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9) + 1,
			},
		},
		content: {
			flexGrow: 1,
		},
		openDrawButton: {
			float: "right",
			display: "flex",
			justifyContent: "flex-end",
		},
		navBotSection: {
			bottom: 0,
			marginTop: "auto",
			paddingLeft: theme.spacing(1),
		},
		categoryHeader: {
			paddingTop: theme.spacing(3),
			paddingLeft: theme.spacing(3),
			display: "flex",
		},
		listPosition: {
			paddingLeft: theme.spacing(1),
		},
		headerPosition: {
			width: "100px",
		},
		item: {
			paddingTop: theme.spacing(2),
			paddingLeft: theme.spacing(3),
			paddingBottom: theme.spacing(2),
			color: "rgba(255, 255, 255, 0.7)",
			"&:hover,&:focus": {
				backgroundColor: theme.flexiCharge.primary.lightGrey,
			},
		},
		itemIcon: {
			minWidth: "auto",
			marginRight: theme.spacing(1),
			color: theme.flexiCharge.primary.darkGrey,
			paddingTop: theme.spacing(0),
		},
		itemText: {
			fontSize: "inherit",
			paddingLeft: theme.spacing(2),
			color: theme.flexiCharge.primary.darkGrey,
		},
		logoutText: {
			fontSize: "inherit",
			paddingLeft: theme.spacing(3),
			color: theme.flexiCharge.primary.darkGrey,
		},
		MenuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up("sm")]: {
				display: "none",
			},
		},
	})
);

export default function MiniDrawer() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [mobileOpen, setMobileOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const handleDrawerToogle = () => {
		setMobileOpen(!mobileOpen);
	};

	const history = useHistory();

	return (
		<Drawer
			variant="permanent"
			open={mobileOpen}
			onClose={handleDrawerToogle}
			className={clsx(classes.drawer, {
				[classes.drawerOpen]: open,
				[classes.drawerClose]: !open,
			})}
			classes={{
				paper: clsx({
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open,
				}),
			}}
		>
			{categories.map(({ id, children }) => (
				<React.Fragment key={id}>
					<ListItem className={classes.categoryHeader}>
						<ListItemText
							classes={{
								primary: classes.itemText,
							}}
						>
							{id}
						</ListItemText>
					</ListItem>
					{children.map(({ id: childId, icon, location: pathLocation }) => (
						<ListItem
							key={childId}
							button
							color="primary"
							className={clsx(classes.item)}
							onClick={() => {
								history.push(pathLocation);
							}}
						>
							<ListItemIcon color="primary" className={classes.itemIcon}>
								{icon}
							</ListItemIcon>
							<ListItemText classes={{ primary: classes.itemText }}>
								{childId}
							</ListItemText>
						</ListItem>
					))}
				</React.Fragment>
			))}

			<Divider />

			<List className={classes.navBotSection}>
				<ListItem
					button
					onClick={() => {
						AuthService.logout();
						history.push("/sign-in");
					}}
				>
					<LogoutIcon></LogoutIcon>
					<ListItemText classes={{ primary: classes.logoutText }}>
						Sign out
					</ListItemText>
				</ListItem>
				<Divider />
				<ListItem
					button
					onClick={() => {
						!open ? handleDrawerOpen() : handleDrawerClose();
					}}
					className={classes.openDrawButton}
				>
					{!open ? <ChevronRightIcon color="inherit" /> : <ChevronLeftIcon />}
				</ListItem>
			</List>
		</Drawer>
	);
}