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
  selectDashboard: PropTypes.func.isRequired
};

export default Jobs;
