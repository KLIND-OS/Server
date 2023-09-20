class SheetsEditor {
  static async init(win, file_array) {
    // Initialize variables to keep track of the current number of rows and columns
    let rowCount = 10;
    let colCount = 10;

    // Function to create and initialize the Excel-like grid
    function createExcelGrid(rows, cols) {
      const gridContainer = win.querySelector("#grid-container");

      // Create a table element for the grid
      const table = document.createElement("table");

      // Create headers row
      const headersRow = document.createElement("tr");
      const emptyHeaderCell = document.createElement("th");
      headersRow.appendChild(emptyHeaderCell);

      // Create column headers
      for (let i = 65; i < 65 + cols; i++) {
        const headerCell = document.createElement("th");
        headerCell.textContent = String.fromCharCode(i);
        headersRow.appendChild(headerCell);
      }

      table.appendChild(headersRow);

      // Create data rows and cells
      for (let row = 1; row <= rows; row++) {
        const dataRow = document.createElement("tr");

        // Create row header cell
        const rowHeaderCell = document.createElement("th");
        rowHeaderCell.textContent = row;
        dataRow.appendChild(rowHeaderCell);

        // Create data cells for columns A to Z
        for (let col = 65; col < 65 + cols; col++) {
          const dataCell = document.createElement("td");
          dataCell.contentEditable = true;
          dataRow.appendChild(dataCell);
        }

        table.appendChild(dataRow);
      }

      gridContainer.appendChild(table);
    }

    // Function to add a new row to the grid
    function addRow() {
      rowCount++;
      const grid = win.querySelector("table");
      const newRow = document.createElement("tr");

      // Create row header cell
      const rowHeaderCell = document.createElement("th");
      rowHeaderCell.textContent = rowCount;
      newRow.appendChild(rowHeaderCell);

      // Create data cells for columns A to Z
      for (let col = 65; col < 65 + colCount; col++) {
        const dataCell = document.createElement("td");
        dataCell.contentEditable = true;
        newRow.appendChild(dataCell);
      }

      grid.appendChild(newRow);
    }

    // Function to add a new column to the grid
    function addColumn() {
      colCount++;
      const grid = win.querySelector("table");

      // Update headers row with new column header
      const headersRow = grid.querySelector("tr");
      const newHeaderCell = document.createElement("th");
      newHeaderCell.textContent = String.fromCharCode(64 + colCount);
      headersRow.appendChild(newHeaderCell);

      // Add data cells to each row
      grid.querySelectorAll("tr").forEach((row, rowIndex) => {
        const dataCell = document.createElement("td");
        dataCell.contentEditable = true;
        row.appendChild(dataCell);
      });
    }

    // Function to remove the last row from the grid
    function removeRow() {
      if (rowCount > 1) {
        rowCount--;
        const grid = win.querySelector("table");
        grid.removeChild(grid.lastChild); // Remove the last row
      }
    }

    // Function to remove the last column from the grid
    function removeColumn() {
      if (colCount > 1) {
        colCount--;
        const grid = win.querySelector("table");

        // Update headers row by removing the last header cell
        const headersRow = grid.querySelector("tr");
        headersRow.removeChild(headersRow.lastChild);

        // Remove the last cell in each row
        grid.querySelectorAll("tr").forEach((row) => {
          row.removeChild(row.lastChild);
        });
      }
    }

    // Event listener for the "Add Row" button
    win.querySelector("#add-row-button").addEventListener("click", addRow);

    // Event listener for the "Add Column" button
    win
      .querySelector("#add-column-button")
      .addEventListener("click", addColumn);

    // Event listener for the "Remove Row" button
    win
      .querySelector("#remove-row-button")
      .addEventListener("click", removeRow);

    // Event listener for the "Remove Column" button
    win
      .querySelector("#remove-column-button")
      .addEventListener("click", removeColumn);

    // Event listener for the "Save to Excel" button
    win.querySelector("#save-button").addEventListener("click", async () => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Sheet 1");

      // Loop through the grid to get cell values and add them to the worksheet
      const grid = win.querySelector("table");
      grid.querySelectorAll("tr").forEach((row, rowIndex) => {
        const worksheetRow = worksheet.getRow(rowIndex + 1);

        row.querySelectorAll("td").forEach((cell, colIndex) => {
          worksheetRow.getCell(colIndex + 1).value = cell.textContent;
        });
      });

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        // Create a data URI from the Blob
        const reader = new FileReader();
        reader.onload = function () {
          const dataURI = reader.result;
          var storage = JSON.parse(localStorage.getItem("files-uploaded"));
          for (var i = 0; i < storage.length; i++) {
            if (storage[i][5] + storage[i][0] == file_array[5] + file_array[0]) {
              storage[i][4] = dataURI;
              storage[i][1] = lengthInUtf8Bytes(dataURI)
              localStorage.setItem("files-uploaded", JSON.stringify(storage));

              var windowasjdh = document.querySelectorAll(".window");
              for (var i = 0; i < windowasjdh.length; i++) {
                if (
                  windowasjdh[i].querySelector("#filemanageriframe") !=
                  undefined
                ) {
                  windowasjdh[i]
                    .querySelector("#filemanageriframe")
                    .contentWindow.FileManager.readFiles();
                }
              }
              return;
            }
          }
        };
        reader.readAsDataURL(blob);
      });
    });
    createExcelGrid(rowCount, colCount);

    var dataURI = file_array[4];
    var commaIndex = dataURI.indexOf(",");
    var contentType = file_array[2];
    var data = dataURI.slice(commaIndex + 1);

    // Decode the base64-encoded data
    var binaryData = atob(data);

    // Create a Uint8Array to hold the binary data
    var arrayBuffer = new ArrayBuffer(binaryData.length);
    var uint8Array = new Uint8Array(arrayBuffer);

    // Copy the binary data into the Uint8Array
    for (var i = 0; i < binaryData.length; i++) {
      uint8Array[i] = binaryData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    var blob = new Blob([uint8Array], { type: contentType });

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.load(blob);
    const worksheet = workbook.getWorksheet(1);

    // Clear the existing grid
    const gridContainer = win.querySelector("#grid-container");
    gridContainer.innerHTML = "";

    // Calculate the number of rows and columns in the worksheet
    rowCount = worksheet.rowCount;
    colCount = worksheet.columns.length; // Get the number of columns using worksheet.columns

    // Re-create the grid with the new dimensions
    createExcelGrid(rowCount, colCount);

    // Loop through the worksheet and update the grid
    const grid = win.querySelector("table");
    worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
      row.eachCell({ includeEmpty: true }, (cell, colIndex) => {
        const gridCell = grid.rows[rowIndex].cells[colIndex];
        if (gridCell) {
          gridCell.textContent = cell.value;
        }
      });
    });
  }
}
