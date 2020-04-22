import React, {Fragment, PureComponent/*, useEffect*/} from "react";
import PropTypes from "prop-types";
import JobsTable from "./JobsTable";
import JobService from "../../../shared/services/JobService";

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
    // const {
    //   selectDashboard
    // } = this.props;
    //
    //  useEffect(selectDashboard, [selectDashboard]);
  }

  render() {
    return (
        <Fragment>
          <JobsTable data={this.state.data}
                      // rowClickHandler={this.handleRowClick}
              rowClickHandler={console.log("row clicked")}
          />
          <br/>
        </Fragment>
    );
  }
}

Jobs.propTypes = {
  selectDashboard: PropTypes.func.isRequired,
  // classes: PropTypes.object.isRequired,
  // theme: PropTypes.object.isRequired,
};

export default Jobs;
