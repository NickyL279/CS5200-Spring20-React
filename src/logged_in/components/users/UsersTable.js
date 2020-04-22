import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import UserService from "../../../shared/services/UserService";




class UsersTable extends React.Component {

  state = {
    data: []
  };

  componentDidMount() {
    this.setState({data: this.props.data});
    console.log("UsersTable didmount")
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({ data: this.props.data });
    }
  }

  handleDeleteRow = (rowsDeleted) => {
    const userIds = rowsDeleted.data.map(row => this.state.data[row.dataIndex][0]);
    userIds.forEach(id => (new UserService()).deleteUser(id).then(console.log("Deleted user " + id)))
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
      serverSide: true,
      onRowClick: (rowData, rowMeta) => {this.props.rowClickHandler(rowData[0]);console.log(rowMeta)},
      onTableChange: (action, tableState) => {
        console.log(action)
        console.log(tableState)
        // this.xhrRequest('my.api.com/tableData', result => {
        //   this.setState({ data: result });
        // });
      }
      //https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-pagination/index.js
    };

    return <MUIDataTable title={"User list"} data={this.state.data} columns={columns} options={options} />;
  }
}

UsersTable.propTypes = {
  data: PropTypes.array.isRequired,
  rowClickHandler: PropTypes.func.isRequired
}

export default UsersTable;