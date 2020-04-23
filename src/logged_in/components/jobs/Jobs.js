import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import JobsTable from "./JobsTable";
import JobService from "../../../shared/services/JobService";
import LinearProgress from '@material-ui/core/LinearProgress';
import StudentService from "../../../shared/services/StudentService";

import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography,
    withStyles
} from "@material-ui/core";
import withWidth from "@material-ui/core/withWidth";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// import JobsListsTable from "./JobListsTable";
import JobListsTree from "./JobListsTree";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import JobApplicationsTable from "./JobApplicationsTable";
import JobFavoritesTable from "./JobFavoritesTable";
// import UsersTable from "../users/UsersTable";
import UserService from "../../../shared/services/UserService";
import AssignedStudentsTable from "./AssignedStudentsTable";
import JobsTableAdmin from "./JobsTableAdmin";

const styles = {
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.26)"
    }
};

class Jobs extends PureComponent {

    state = {
        addPostPaperOpen: false,
        allJobsData: [],
        favoritesData: [],
        applicationsData: [],
        assignedUsersData: [],
        selectedUser: undefined,
        loading: false
    };

    handleRowClick = (userId) =>
        (new UserService()).findUserById(userId)
            .then((user) => {
                console.log(user)
                this.setState({selectedUser: user})
            })

    fetchAllJobs = () => {
        this.setState({loading: true});
        (new JobService()).findJobs()
            .then(d => {
                console.log("fetch all jobs")
                this.setState({allJobsData: d, selectedUser: undefined, loading: false})
            });
    }

    fetchFavorites = () => {
        console.log("fetch favorites")
    }

    fetchApplications = () => {
        (new StudentService()).fetchApplications()
            .then(d => {
                console.log("fetch all applications")
                console.log(d)
                this.setState({applicationsData: d})
            });
    }

    fetchAssignedUsers = () => {
        console.log("fetch assigned users")
    }

    componentDidMount() {
        this.props.selectDashboard()
        this.fetchAllJobs()
        this.fetchApplications()
        this.fetchFavorites()
        this.fetchAssignedUsers()
    }

    render() {

        return (
            <Fragment key='0'>
                {this.state.loading === true && [<LinearProgress key='x'/>]}

                {this.props.loggedInUser.dtype === "Admin" ? [
                    <ExpansionPanel key='1' defaultExpanded={true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}> All Jobs </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>
                            <JobsTableAdmin data={this.state.allJobsData}
                                // rowClickHandler={this.handleRowClick}
                                            rowClickHandler={console.log("row clicked")}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>,
                    <ExpansionPanel key='2' defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}> All Job
                                Applications </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>,
                    <ExpansionPanel key='3' defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}> All Job Lists </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ] : [
                    <ExpansionPanel key='4' defaultExpanded={true}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}>All Jobs </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>
                            <JobsTable data={this.state.allJobsData}
                                       loggedInUser = {this.props.loggedInUser}
                                       rowClickHandler={console.log("row clicked")}
                                       reloadApplications={this.fetchApplications}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>]}
                {this.props.loggedInUser.dtype === "Student" && [
                    <ExpansionPanel key='5' defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}>Favorite Jobs </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>
                            <JobFavoritesTable data={this.state.favoritesData}
                                // rowClickHandler={this.handleRowClick}
                                               rowClickHandler={console.log("row clicked")}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>,

                    <ExpansionPanel key='6' defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}>Job Applications </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>
                            <JobApplicationsTable data={this.state.applicationsData}
                                // rowClickHandler={this.handleRowClick}
                                                  rowClickHandler={console.log("row clicked")}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                ]}
                {this.props.loggedInUser.dtype === "Advisor" && [
                    <ExpansionPanel key='7' defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}>My Assigned
                                Students </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>
                            <AssignedStudentsTable data={this.state.assignedUsersData}
                                                   rowClickHandler={this.handleRowClick}/>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>]}
                {(this.props.loggedInUser.dtype === "Advisor" ||
                  this.props.loggedInUser.dtype === "Admin")
                 && [
                    <div key='8'>
                        <br/>
                        <Typography>Organize Job Lists</Typography>
                        <HighlightedInformation>
                            Job list management is not yet connected to the database.
                        </HighlightedInformation>
                        <JobListsTree/>
                    </div>
                ]}

            </Fragment>
        );
    }
}

Jobs.propTypes = {
    selectDashboard: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    loggedInUser: PropTypes.object.isRequired
};
export default withWidth()(withStyles(styles, {withTheme: true})(Jobs));

