import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {withStyles} from "@material-ui/core/styles";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import JobsListsDialog from "./JobsListsDialog";
import JobsApplicationDialog from "./JobsApplicationDialog";
import PropTypes from "prop-types";
import JobService from "../../../../shared/services/JobService";

const defaultToolbarSelectStyles = {
    iconButton: {},
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};

class JobsTableToolbar extends React.Component {

    state = {
        value: null,
        jobsListDialogOpen: false,
        jobsApplicationDialogOpen: false,
        applicationInitialData: {}
    }

    // handleClickInverseSelection = () => {
    //     const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
    //         if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
    //             nextSelectedRows.push(index);
    //         }
    //
    //         return nextSelectedRows;
    //     }, []);
    //
    //     this.props.setSelectedRows(nextSelectedRows);
    // };

    handleClickCreateApplication = () => {
        const jobArray = this.props.displayData[this.props.selectedRows.data[0]['dataIndex']].data
        const initialData = {
            applicationStatus: "NEW",
            student: {
                id: this.props.loggedInUser.id
            },
            job: {
                id: jobArray[0],
                title: jobArray[1],
                company: jobArray[2],
                location: jobArray[3]
            }
        }
        this.setState({applicationInitialData: initialData})
        this.setState({jobsApplicationDialogOpen: true})
    };

    handleClickAddToFavorites = () => {
        const favId = this.props.displayData[this.props.selectedRows.data[0]['dataIndex']].data[0];
        let date = new Date();
        date.setDate(date.getDate() + 7);

        (new JobService()).createFavorite({
                                              job: {id: favId},
                                              student: {id: this.props.loggedInUser.id},
                                              followup: date.getTime()
                                          }).then(() => {
            this.props.reloadFavorites()
            alert("Added selected jobs to favorites.")
        });
    };

    handleClickAddToList = () => {
        console.log(`add jobs with dataIndexes to list: ${this.props.selectedRows.data.map(
            row => row.dataIndex)}`);
        this.setState({jobsListDialogOpen: true})
    };

    handleCloseJobListsDialog = () => {
        this.setState({jobsListDialogOpen: false})
    };

    handleCloseApplicationDialog = () => {
        this.setState({jobsApplicationDialogOpen: false})
        this.props.reloadApplications()
        alert("Application submitted")
    };

    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <div className={classes.iconContainer}>
                    {this.props.loggedInUser.dtype === "Student" && [
                        <Tooltip key="1" title={"Create Application"}>
                            <IconButton className={classes.iconButton}
                                        onClick={this.handleClickCreateApplication}>
                                <AssignmentIcon className={classes.icon}/>
                            </IconButton>
                        </Tooltip>,
                        <Tooltip key="2" title={"Add to Favorites"}>
                            <IconButton className={classes.iconButton}
                                        onClick={this.handleClickAddToFavorites}>
                                <FavoriteBorderIcon className={classes.icon}/>
                            </IconButton>
                        </Tooltip>]}
                    {this.props.loggedInUser.dtype === "Advisor" && [
                        <Tooltip key="3" title={"Add to List"}>
                            <IconButton className={classes.iconButton}
                                        onClick={this.handleClickAddToList}>
                                <PlaylistAddIcon className={classes.icon}/>
                            </IconButton>
                        </Tooltip>]}
                </div>

                <JobsListsDialog handleClose={this.handleCloseJobListsDialog}
                                 open={this.state.jobsListDialogOpen}/>
                <JobsApplicationDialog
                    handleClose={this.handleCloseApplicationDialog}
                    open={this.state.jobsApplicationDialogOpen}
                    initialData={this.state.applicationInitialData}
                />

            </React.Fragment>
        );
    }
}

JobsTableToolbar.propTypes = {
    loggedInUser: PropTypes.object.isRequired,
    displayData: PropTypes.array.isRequired,
    selectedRows: PropTypes.object.isRequired,
    reloadApplications: PropTypes.func.isRequired,
    reloadFavorites: PropTypes.func.isRequired
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelect"})(
    JobsTableToolbar);