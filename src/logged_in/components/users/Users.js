import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";
import UserService from "../../../shared/services/UserService";

class Users extends PureComponent {
  state = {
    addPostPaperOpen: false,
    data: []
  };

  fetchData = () => {
    (new UserService()).findAllUsers()
        .then(d => {
            console.log("fetch")
          console.log(d)
          this.setState({data: d })
        })
        .then(console.log(this.state));
  }

  componentWillMount() {
    this.fetchData()
  }

  componentDidMount() {
    const { selectPosts } = this.props;
    selectPosts();
  }

  openAddPostModal = () => {
    this.setState({ addPostPaperOpen: true });
  };

  closeAddPostModal = () => {
    this.setState({ addPostPaperOpen: false });
  };

  render() {
      console.log("render")
console.log(this.state)
    return (
      <Fragment>
<UsersTable data={this.state.data}/>
<UsersForm datacall={this.fetchData}/>
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
  selectPosts: PropTypes.func.isRequired
};

export default Users;
