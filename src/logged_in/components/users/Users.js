import React, { PureComponent, Fragment } from "react";
import PropTypes from "prop-types";
import UsersTable from "./UsersTable";
import UsersForm from "./UsersForm";

class Users extends PureComponent {
  state = {
    addPostPaperOpen: false
  };

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

    return (
      <Fragment>
<UsersTable/>
<UsersForm/>
      </Fragment>
    );
  }
}

Users.propTypes = {
  EmojiTextArea: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  DateTimePicker: PropTypes.elementType,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  pushMessageToSnackbar: PropTypes.func,
  selectPosts: PropTypes.func.isRequired
};

export default Users;
