import React from "react";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import PropTypes from "prop-types";


class JobsApplicationDialog extends React.Component {

    state = {
        dialogValue:{title: '', year: ''}
    }

    ////-----------------------------JOBS LIST DIALOG

     handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ value:
                {
                    title: this.state.dialogValue.title,
                    year: parseInt(this.state.dialogValue.year, 10),
                }})
        this.handleClose();
    };
    //--------------------JOBS LIST DIALOG------------////

    render() {

        return (
    <React.Fragment>

        <Dialog open={this.props.open} onClose={this.props.handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={this.props.handleSubmit}>
                <DialogTitle id="form-dialog-title">Complete Job Application</DialogTitle>
                <DialogContent>

                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button type="submit" color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </form>
        </Dialog>

    </React.Fragment>
        );
    }
}

JobsApplicationDialog.propTypes = {
    handleClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired
}

export default JobsApplicationDialog;