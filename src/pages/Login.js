import React, { useState } from "react";
import { TextField, CircularProgress, Button, Paper } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import withStyles from "@material-ui/core/styles/withStyles";
import Logo from "../assets/images/logo.png";
import { useHistory } from "react-router-dom";

//redux
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

const styles = (theme) => ({
  ...theme.fileTheme,
  paper: {
    padding: theme.spacing(4),
    width: 450,
    height: 350,
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(3),
  },
  button: {
    position: "relative",
    width: "100%",
    marginTop: theme.spacing(1),
  },
  spinner: {
    position: "absolute",
    left: "45%",
  },
  image: {
    height: 70,
    marginBottom: theme.spacing(2),
  },
  alert: {
    marginBottom: 6,
  },
});

function Login({ classes, loginUser, UI: { loading, errors } }) {
  let history = useHistory();
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(userData, history);
  };

  const handleChange = (event) => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="wrapper bg-blue">
      <Paper className={classes.paper}>
        <div className="text-center">
          <img src={Logo} alt="logo" className={classes.image} />
        </div>
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            className={classes.textField}
            onChange={handleChange}
            required
          />
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            onChange={handleChange}
            className={classes.textField}
            required
          />
          {Object.keys(errors).length > 0 && (
            <Alert severity="error" className={classes.alert}>
              {errors.general}
            </Alert>
          )}

          <div className="text-center">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              className={classes.button}
              disabled={loading}
            >
              LOGIN
              {loading && <CircularProgress className={classes.spinner} />}
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
}

const mapStateToProps = (state) => ({
  state: state.user,
  UI: state.UI,
});

export default connect(mapStateToProps, { loginUser })(
  withStyles(styles)(Login)
);
