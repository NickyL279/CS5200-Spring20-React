import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import {withStyles} from "@material-ui/core/styles";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';
import JobsListsDialog from "./JobsListsDialog";
import JobsApplicationDialog from "./JobsApplicationDialog";

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
        applicationDialogOpen: false
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
        console.log(`add jobs with dataIndexes to list: ${this.props.selectedRows.data.map(
            row => row.dataIndex)}`);
        this.setState({jobsApplicationDialogOpen: true})
    };

    handleClickAddToFavorites = () => {
        console.log(`add jobs with dataIndexes to favorites: ${this.props.selectedRows.data.map(
            row => row.dataIndex)}`);
        alert("Added selected jobs to favorites.")
    };

    handleClickAddToList = () => {
        console.log(`add jobs with dataIndexes to list: ${this.props.selectedRows.data.map(
            row => row.dataIndex)}`);
        this.setState({jobsListDialogOpen: true})
    };

    handleClose = () => {
        this.setState({ jobsListDialogOpen: false, jobsApplicationDialogOpen: false })
    };


    render() {
        const {classes} = this.props;

        return (
            <React.Fragment>

                <div className={classes.iconContainer}>
                    <Tooltip title={"Create Application"}>
                        <IconButton className={classes.iconButton}
                                    onClick={this.handleClickCreateApplication}>
                            <AssignmentIcon className={classes.icon}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Add to Favorites"}>
                        <IconButton className={classes.iconButton}
                                    onClick={this.handleClickAddToFavorites}>
                            <FavoriteBorderIcon className={classes.icon}/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={"Add to List"}>
                        <IconButton className={classes.iconButton}
                                    onClick={this.handleClickAddToList}>
                            <PlaylistAddIcon className={classes.icon}/>
                        </IconButton>
                    </Tooltip>
                </div>

                <JobsListsDialog handleClose={this.handleClose}
                                 open={this.state.jobsListDialogOpen}/>
                <JobsApplicationDialog
                    handleClose={this.handleClose}
                    open={this.state.jobsApplicationDialogOpen}/>

            </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, {name: "CustomToolbarSelect"})(
    JobsTableToolbar);