import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { withStyles } from "@material-ui/core/styles";
import JobListsSelect from "./JobListsSelect";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AssignmentIcon from '@material-ui/icons/Assignment';

const defaultToolbarSelectStyles = {
    iconButton: {
    },
    iconContainer: {
        marginRight: "24px",
    },
    inverseIcon: {
        transform: "rotate(90deg)",
    },
};

class JobsTableToolbar extends React.Component {
    handleClickInverseSelection = () => {
        const nextSelectedRows = this.props.displayData.reduce((nextSelectedRows, _, index) => {
            if (!this.props.selectedRows.data.find(selectedRow => selectedRow.index === index)) {
                nextSelectedRows.push(index);
            }

            return nextSelectedRows;
        }, []);

        this.props.setSelectedRows(nextSelectedRows);
    };

    handleClickDeselectAll = () => {
        this.props.setSelectedRows([]);
    };

    handleClickBlockSelected = () => {
        console.log(`block users with dataIndexes: ${this.props.selectedRows.data.map(row => row.dataIndex)}`);
        this.setState({ open: true })
    };

    //-----------------------------DIALOG

    state = {
        value: null,
        open: false,
        dialogValue:{title: '', year: ''}
    }

     handleClose = () => {
         this.setState({ dialogValue: {title: '', year: ''}, open: false })
    };

     handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ value:
                {
                    title: this.state.dialogValue.title,
                    year: parseInt(this.state.dialogValue.year, 10),
                }})
        this.handleClose();
    };
    //--------------------DIALOG------------//

    render() {
        const { classes } = this.props;

        return (
    <React.Fragment>
        <div className={classes.iconContainer}>
            <Tooltip title={"Create Application"} >
                <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected}>
                    <AssignmentIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
            <Tooltip title={"Add to Favorites"} >
                <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected}>
                    <FavoriteBorderIcon className={classes.icon} />
                </IconButton>
            </Tooltip>
                <Tooltip title={"Add to List"} >
                    <IconButton className={classes.iconButton} onClick={this.handleClickBlockSelected}>
                        <PlaylistAddIcon className={classes.icon} />
                    </IconButton>
                </Tooltip>
            </div>
        <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={this.handleSubmit}>
                <DialogTitle id="form-dialog-title">Add Selected Jobs</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Choose a list to add the selected jobs to.
                    </DialogContentText>
                   <JobListsSelect/>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    </React.Fragment>
        );
    }
}

export default withStyles(defaultToolbarSelectStyles, { name: "CustomToolbarSelect" })(JobsTableToolbar);