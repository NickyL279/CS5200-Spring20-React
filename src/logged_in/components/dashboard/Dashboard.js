import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Jobs from "./Jobs";

function Dashboard(props) {
  const {
    selectDashboard
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <Jobs/>
    </Fragment>
  );
}

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired
};

export default Dashboard;
