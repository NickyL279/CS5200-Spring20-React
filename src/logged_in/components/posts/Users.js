import React from "react";
import MUIDataTable from "mui-datatables";
import CustomToolbarSelect from "./CustomToolbarSelect";
import UserService from "../../../shared/services/UserService";

class Users extends React.Component {

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

  render() {

    const columns = [
      {
        name: "Id",
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
      },
      {
        name: "Password",
        options: {
          filter: false,
        }
      }
    ];

    const options = {
      filter: true,
      selectableRows: 'multiple',
      filterType: "dropdown",
      responsive: "stacked",
      rowsPerPage: 10,
      customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
          <CustomToolbarSelect selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} />
      ),
    };

    return <MUIDataTable title={"ACME Employee list"} data={this.state.users} columns={columns} options={options} />;
  }
}

export default Users;