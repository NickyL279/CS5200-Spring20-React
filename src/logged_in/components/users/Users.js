import React, {Fragment, PureComponent} from "react";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import UsersEditForm from "./UsersEditForm";
import UserService from "../../../shared/services/UserService";
import {
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography, withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";

const styles = {
    divider: {
        backgroundColor: "rgba(0, 0, 0, 0.26)"
    }
};

class Users extends PureComponent {
    state = {
        addPostPaperOpen: false,
        data: [],
        selectedUser: undefined
    };

    handleRowClick = (userId) =>
        (new UserService()).findUserById(userId)
            .then( (user) => {
                console.log(user)
                this.setState({ selectedUser: user })
            })

        // this.render();


    fetchData = () => {
        (new UserService()).findAllUsers()
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
        const {selectPosts} = this.props;
        selectPosts();
    }

    render() {
        return (

            <Fragment>
                <UsersTable data={this.state.data}
                            rowClickHandler={this.handleRowClick}/>
                <br/>
                <ExpansionPanel defaultExpanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Edit User </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={this.props.classes.dBlock}>
                        {this.state.selectedUser !== undefined ? [
                        <UsersEditForm datacall={this.fetchData}
                                       user={this.state.selectedUser}
                        />
                        ] : [
                            <HighlightedInformation>
                            Click a row in the table.
                            </HighlightedInformation>
                            ]
                        }
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography>Create New User</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={this.props.classes.dBlock}>
                        <UsersForm datacall={this.fetchData}/>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </Fragment>
        );
    }
}

Users.propTypes = {
    // EmojiTextArea: PropTypes.elementType,
    // ImageCropper: PropTypes.elementType,
    // Dropzone: PropTypes.elementType,
    // DateTimePicker: PropTypes.elementType,
    // posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    // pushMessageToSnackbar: PropTypes.func,
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
    selectPosts: PropTypes.func.isRequired
};

export default withWidth()(withStyles(styles, {withTheme: true})(Users));