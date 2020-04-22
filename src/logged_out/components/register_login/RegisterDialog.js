import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

import {
  TextField,
  Button,
  withStyles
} from "@material-ui/core";
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import UserService from "../../../shared/services/UserService";

const styles = theme => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark
    }
  }
});

class RegisterDialog extends PureComponent {
  state = {
    loading: false,
    termsOfServiceError: false,
    passwordIsVisible: false,
    userService: new UserService()
  };

  register = () => {

    const { setStatus, history, setLoggedInUser } = this.props;

    if (this.props.status === "accountCreated"){
      this.state.userService.authenticateUser(this.registerEmail.value,
                                              this.registerPassword.value)
          .then((result) => {
            if (result === "fail") {
                alert("account creation failed");
            } else {
                setLoggedInUser(result);
                history.push("/c/dashboard");
            }
          });
    }

    if (this.registerPassword.value !== this.registerPasswordRepeat.value) {
      setStatus("passwordsDontMatch");
      return;
    }

    setStatus(null);

    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({ loading: false });
    }, 1500);

    const user = {}
    user.username = this.registerEmail.value
    user.password = this.registerPassword.value

    console.log(user)
    this.state.userService.createUser(user).then(setStatus("accountCreated"))

  };

  onVisibilityChange = isVisible => {
    this.setState({ passwordIsVisible: isVisible });
  };

  render() {
    const {
      onClose,
      setStatus,
      status
    } = this.props;
    const { loading, passwordIsVisible } = this.state;
    return (
      <FormDialog
        loading={loading}
        onClose={onClose}
        open
        headline="Register"
        onFormSubmit={e => {
          e.preventDefault();
          this.register();
        }}
        hideBackdrop
        hasCloseIcon
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              inputRef={node => {
                this.registerEmail = node;
              }}
              autoFocus
              autoComplete="off"
              type="text"
              FormHelperTextProps={{ error: true }}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Password"
              inputRef={node => {
                this.registerPassword = node;
              }}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "Create a password at least 6 characters long.";
                }
                if (status === "passwordsDontMatch") {
                  return "Your passwords dont match.";
                }
                return null;
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={passwordIsVisible}
              onVisibilityChange={this.onVisibilityChange}
            />
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={
                status === "passwordTooShort" || status === "passwordsDontMatch"
              }
              label="Repeat Password"
              inputRef={node => {
                this.registerPasswordRepeat = node;
              }}
              autoComplete="off"
              onChange={() => {
                if (
                  status === "passwordTooShort" ||
                  status === "passwordsDontMatch"
                ) {
                  setStatus(null);
                }
              }}
              helperText={(() => {
                if (status === "passwordTooShort") {
                  return "Create a password at least 6 characters long.";
                }
                if (status === "passwordsDontMatch") {
                  return "Your passwords dont match.";
                }
              })()}
              FormHelperTextProps={{ error: true }}
              isVisible={passwordIsVisible}
              onVisibilityChange={this.onVisibilityChange}
            />
            {status === "accountCreated" && (
              <HighlightedInformation>
                We have created your account. Please click LOGIN to continue.
              </HighlightedInformation>
             )}
          </Fragment>
        }
        actions={
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            color="secondary"
            disabled={loading}
          >
            {status === "accountCreated" ? "Login" : "Register"}
            {loading && <ButtonCircularProgress />}
          </Button>
        }
      />
    );
  }
}

RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  setLoggedInUser: PropTypes.func.isRequired
};

export default withRouter(withStyles(styles, { withTheme: true })(RegisterDialog));
