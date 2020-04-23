import React from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import JobService from "../../../shared/services/JobService";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
// import JobsTableToolbar from "./JobsTableToolbar";

class JobsTableAdmin extends React.Component {

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
    userIds.forEach(id => (new JobService()).deleteJob(id).then(console.log("Deleted job " + id)))
    alert("Deleted selected jobs.")
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
        name: "Title",
        options: {
          filter: true,
        }
      },
      {
        name: "Company",
        options: {
          filter: true,
        }
      },
      {
        name: "Location",
        options: {
          filter: false,
        }
      },
      {
        name: "Description",
        options: {
          display: false,
        }
      }
    ];

    const options = {
      filter: true,
      filterType: 'dropdown',
      // responsive: "stacked",
      rowsPerPage: 10,
      onRowsDelete: this.handleDeleteRow,
      // serverSide: true,
      pagination: true,
      print: false,
      download: false,
      expandableRows: true,
      expandableRowsOnClick: true,
      onTableChange: (action, tableState) => {
        console.log(action)
        console.log(tableState)
        // this.xhrRequest('my.api.com/tableData', result => {
        //   this.setState({ data: result });
        // });
      },
      // serverSide: true,
      // onTableChange: (action, tableState) => {
      //   this.xhrRequest('my.api.com/tableData', result => {
      //     this.setState({ data: result });
      //   });
      // }
      //https://github.com/gregnb/mui-datatables/blob/master/examples/serverside-pagination/index.js
      isRowExpandable: (dataIndex, expandedRows) => {
        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        return !(expandedRows.data.length > 0 && expandedRows.data.filter(
            d => d.dataIndex === dataIndex).length === 0);

      },
      rowsExpanded: [],
      renderExpandableRow: (rowData/*, rowMeta*/) => {
        const colSpan = rowData.length + 1;
        const description = rowData[4].replace(/\??\?/g, "\n").replace(/\n/g, "\n\n").replace(/\n\s+\n/g, "\n")//.replace(/\?/g, "<br />");
        return (
            <TableRow>
              <TableCell colSpan={colSpan}>
                <div style={{"white-space":"pre-wrap"}}>{description}</div>
              </TableCell>
            </TableRow>
        );
      },
      onRowsExpand: (curExpanded, allExpanded) => console.log(curExpanded, allExpanded)
    };

    const theme = createMuiTheme({
                                   overrides: {
                                     MUIDataTableSelectCell: {
                                       expandDisabled: {
                                         // Soft hide the button.
                                         visibility: 'hidden',
                                       },
                                     },
                                   },
                                 });

    return (
        <React.Fragment>
          <MuiThemeProvider theme={theme}>
            <MUIDataTable data={this.state.data} columns={columns} options={options} />
          </MuiThemeProvider>
        </React.Fragment>
    );
  }
}

JobsTableAdmin.propTypes = {
  data: PropTypes.array.isRequired
}

export default JobsTableAdmin;