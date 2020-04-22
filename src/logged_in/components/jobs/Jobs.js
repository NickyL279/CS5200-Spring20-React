import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import JobsTable from "./JobsTable";
import JobService from "../../../shared/services/JobService";
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
        selectedUser: undefined
    };

    handleRowClick = (userId) =>
        (new UserService()).findUserById(userId)
            .then((user) => {
                console.log(user)
                this.setState({selectedUser: user})
            })

    fetchAllJobs = () => {
        (new JobService()).findJobs()
            .then(d => {
                console.log("fetch all jobs")
                console.log(d)
                this.setState({allJobsData: d, selectedUser: undefined})
            })
            .then(console.log(this.state));
    }

    fetchFavorites = () => {
        console.log("fetch favorites")
    }

    fetchApplications = () => {
        console.log("fetch applications")
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
            <Fragment>
                {this.props.loggedInUser.dtype === "Admin" ? [
                    <ExpansionPanel defaultExpanded={true}>
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
                    <ExpansionPanel defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}> All Job Applications </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>,
                    <ExpansionPanel defaultExpanded={false}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                            <Typography style={{fontSize: "22px"}}> All Job Lists </Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={this.props.classes.dBlock}>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    ] : [
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography style={{fontSize: "22px"}}>All Jobs </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={this.props.classes.dBlock}>
                        <JobsTable data={this.state.allJobsData}
                            // rowClickHandler={this.handleRowClick}
                                   rowClickHandler={console.log("row clicked")}
                        />
                    </ExpansionPanelDetails>
                </ExpansionPanel>]}
                {this.props.loggedInUser.dtype === "Student" && [
                    <ExpansionPanel defaultExpanded={false}>
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

                    <ExpansionPanel defaultExpanded={false}>
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
                        <ExpansionPanel defaultExpanded={false}>
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
                        <br/>,
                        <Typography>Organize Job Lists</Typography>,
                        <HighlightedInformation>
                            Job list management is not yet connected to the database.
                        </HighlightedInformation>,
                        <JobListsTree/>
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

