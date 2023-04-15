import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "./AGGridTable.css";
import { resumedatamapper, usersdatamapper,feedbackdatamapper } from "../../utils/dataMappers";
const AgGridTable = ({ data = [], gridOptions = [], type = "resume" }) => {
  console.log("Data from Customer table --> ",data)
  //const [rowData, setRowData] = useState(resumedatamapper(data));
  //const [rowData, setRowData] = useState(usersdatamapper(data));
  const [gridApi, setGridApi] = useState(null);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    if (type === "resume") {
      setRowData(resumedatamapper(data));
    } else if (type === "users") {
      setRowData(usersdatamapper(data));
    } else if (type === "feedback") {
      setRowData(feedbackdatamapper(data));
    }

  }, [data, type]);

  const onGridReady = (params) => {
    setGridApi(params.api);
  };

  const onFilterTextChange = (event) => {
    gridApi.setQuickFilter(event.target.value);
  };
  const defaultColDef = {
    resizable: true,
    flex: 1,
  };

  return (
    <div style={{ width: "100%", height: "500px" }}>
      <div
        className="ag-theme-alpine"
        style={{ height: "100%", width: "100%" }}
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          rowData={rowData}
          onGridReady={onGridReady}
          // columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
          gridOptions={gridOptions}
        />
      </div>
    </div>
  );
};

export default AgGridTable;
