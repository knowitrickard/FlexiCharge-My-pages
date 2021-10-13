import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// <>
// 	{Mobile() ? <Navbar /> : <BottomNavigationBar />}
// 	{/* <h1 style={{ color: "whitesmoke" }}>Profile</h1>
// 	<div className={classes.profile}>
// 		<div className="card mb-3">
// 			<div className={classes.container}>
// 				<IconButton
// 					aria-label="edit"
// 					color="warning"
// 					style={{ float: "right" }}
// 					onClick={handleButtonClick}
// 				>
// 					<EditIcon />
// 				</IconButton>
// 				<div className="card-body">
// 					<div className="row">
// 						<div className="col-sm-3">
// 							<h6 className="mb-0">First Name</h6>
// 						</div>
// 						<div className="col-sm-9 text-secondary">
// 							<TextField
// 								variant="standard"
// 								value={firstName}
// 								disabled={disabled}
// 								fullWidth
// 							/>
// 						</div>
// 					</div>
// 					<hr />
// 					<div className="row">
// 						<div className="col-sm-3">
// 							<h6 className="mb-0">Family Name</h6>
// 						</div>
// 						<div className="col-sm-9 text-secondary">
// 							<TextField
// 								variant="standard"
// 								value={familyName}
// 								disabled={disabled}
// 								fullWidth
// 							/>
// 						</div>
// 					</div>
// 					<hr />
// 					<div className="row">
// 						<div className="col-sm-3">
// 							<h6 className="mb-0">Username</h6>
// 						</div>
// 						<div className="col-sm-9 text-secondary">
// 							<TextField
// 								variant="standard"
// 								value={userName}
// 								disabled={disabled}
// 								fullWidth
// 							/>
// 						</div>
// 					</div>
// 					<hr />
// 					<div className="row">
// 						<div className="col-sm-3">
// 							<h6 className="mb-0">Email</h6>
// 						</div>
// 						<div className="col-sm-9 text-secondary">
// 							<TextField
// 								variant="standard"
// 								value={email}
// 								disabled={disabled}
// 								fullWidth
// 							/>
// 						</div>
// 					</div>
// 					<hr />
// 					<button
// 						type="button"
// 						className="btn btn-success"
// 						onClick={(e) => {
// 							e.preventDefault();
// 							history.push("/change-password");
// 						}}
// 					>
// 						Change Password
// 					</button>
// 					<button
// 						type="button"
// 						className="btn btn-success"
// 						disabled={disabled}
// 					>
// 						Save Changes
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	</div> */}
// </>
