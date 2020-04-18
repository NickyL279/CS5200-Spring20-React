import ReactDOM from "react-dom";
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import React from "react";
import JobService from "../services/JobService";

    const data  = (new JobService()).findJobs();


    const columns = [
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
      responsive: 'scrollMaxHeight',
      expandableRows: true,
      expandableRowsOnClick: true,
      isRowExpandable: (dataIndex, expandedRows) => {
        // Prevent expand/collapse of any row if there are 4 rows expanded already (but allow those already expanded to be collapsed)
        if (expandedRows.data.length > 0 && expandedRows.data.filter(d => d.dataIndex === dataIndex).length === 0) return false;
        return true;
      },
      rowsExpanded: [],
      renderExpandableRow: (rowData, rowMeta) => {
        const colSpan = rowData.length + 1;
        const description = rowData[3].replace("\\n", "\n");//.replace(/\n/g, "<br />");
        return (
          <TableRow>
            <TableCell colSpan={colSpan}>
              {description}
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

export default function Jobs() {
    return (
        <React.Fragment>
      <MuiThemeProvider theme={theme}>
        <MUIDataTable title={"Jobs"} data={data} columns={columns} options={options} />
      </MuiThemeProvider>
          </React.Fragment>
    );

  }