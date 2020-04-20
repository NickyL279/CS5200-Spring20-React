import React from "react";
import MUIDataTable from "mui-datatables";
import UserService from "../../../shared/services/UserService";



class UsersTable extends React.Component {

  constructor() {
    super();
    this.userService = new UserService();
    this.state = {users: []};
  }
  componentDidMount() {
    this.userService.findAllUsers()
        .then(data => this.setState({users: data }))
        .then(console.log(this.state.users));
  }

  handleDeleteRow = (rowsDeleted) => {
    const userIds = rowsDeleted.data.map(row => this.state.users[row.dataIndex][0]);
    userIds.forEach(id => this.userService.deleteUser(id).then(console.log("Deleted user " + id)))
  }

  render() {

    const columns = [
      {
        name: "Id",
        options: {
          filter: true,
        }
      },
      {
        name: "User Type",
        options: {
          filter: true,
        }
      },
      {
        name: "First Name",
        options: {
          filter: true,
        }
      },
      {
        name: "Last Name",
        options: {
          filter: true,
        }
      },
      {
        name: "Username",
        options: {
          filter: true,
        }
      }
    ];

    const options = {
      filter: true,
      selectableRows: 'multiple',
      filterType: "dropdown",
      responsive: "stacked",
      rowsPerPage: 10,
      onRowsDelete: this.handleDeleteRow,
      // serverSide: true,
      // onTableChange: (action, tableState) => {
      //   this.xhrRequest('my.api.com/tableData', result => {
      //     this.setState({ data: result });
      //   });
      // }
      //https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-pagination/index.js
    };

    return <MUIDataTable title={"User list"} data={this.state.users} columns={columns} options={options} />;
  }
}

export default UsersTable;