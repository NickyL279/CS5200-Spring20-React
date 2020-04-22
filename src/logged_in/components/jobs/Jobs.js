import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import JobsTable from "./JobsTable";
import JobService from "../../../shared/services/JobService";
import {
    // ExpansionPanel,
    // ExpansionPanelDetails,
    // ExpansionPanelSummary,
    Typography, withStyles
} from "@material-ui/core";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
// import JobsListsTable from "./JobListsTable";
import JobListsTree from "./JobListsTree";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";

const styles = {
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.26)"
    }
};

class Jobs extends PureComponent {

  state = {
    addPostPaperOpen: false,
    data: [],
    selectedUser: undefined
  };

  // handleRowClick = (userId) =>
  //     (new UserService()).findUserById(userId)
  //         .then( (user) => {
  //           console.log(user)
  //           this.setState({ selectedUser: user })
  //         })

  fetchData = () => {
    (new JobService()).findJobs()
        .then(d => {
          console.log("fetch")
          console.log(d)
          this.setState({data: d, selectedUser: undefined})
        })
        .then(console.log(this.state));
  }

  componentWillMount() {
    this.fetchData()
  }

  componentDidMount() {
      this.props.selectDashboard()
  }

  render() {


    return (
        <Fragment>
          <JobsTable data={this.state.data}
                      // rowClickHandler={this.handleRowClick}
              rowClickHandler={console.log("row clicked")}
          />
          <br/>
            <Typography>Manage Job Lists</Typography>
            <HighlightedInformation>
                Job list management is not yet connected to the database.
            </HighlightedInformation>
            <JobListsTree/>

        </Fragment>
    );
  }
}

Jobs.propTypes = {
  selectDashboard: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};
export default withWidth()(withStyles(styles, {withTheme: true})(Jobs));

