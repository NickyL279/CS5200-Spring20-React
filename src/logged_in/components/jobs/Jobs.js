import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import JobsTable from "./JobsTable";

function Jobs(props) {
  const {
    selectDashboard
  } = props;

  useEffect(selectDashboard, [selectDashboard]);

  return (
    <Fragment>
      <JobsTable/>
    </Fragment>
  );
}

Jobs.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired
};

export default Jobs;
