import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Paper, withStyles } from "@material-ui/core";
import ProfileForm from "./ProfileForm";
// import NavBar from "../navigation/NavBar";

const styles = {
  divider: {
    backgroundColor: "rgba(0, 0, 0, 0.26)"
  }
};

function Profile(props) {
  const {
    selectSubscription, loggedInUser
  } = props;

  useEffect(selectSubscription, [selectSubscription]);

  return (
    <Paper>
<ProfileForm user = {loggedInUser}/>
    </Paper>
  );
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  selectSubscription: PropTypes.func.isRequired,
  loggedInUser: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
