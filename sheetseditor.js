class SheetsEditor {
  static close(win) {
    const path = win.getAttribute("path");
    const bypass = win.getAttribute("bypass");
    const intervalID = win.getAttribute("intervalID");

    clearInterval(intervalID);
    FileLocker.remove(path, bypass);
  }
  static async init(win, file_path) {
    const bypass = FileLocker.add(file_path);
    const intervalID = setInterval(() => {
      FileLocker.continue(file_path);
    }, 5000);

    win.setAttribute("path", file_path);
    win.setAttribute("bypass", bypass);
    win.setAttribute("intervalID", intervalID);

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
      function getColumnName(colCount) {
        if (colCount > 702) {
          spawnNotification(
            "Sheets editor",
            "You're fucking dumbass. I HATE YOU",
          );
          return "dumbass";
        }
        let columnName = "";
        while (colCount > 0) {
          let modulo = colCount % 26;
          if (modulo === 0) {
            columnName = "Z" + columnName;
            colCount = Math.floor(colCount / 26) - 1;
          } else {
            columnName = String.fromCharCode(64 + modulo) + columnName;
            colCount = Math.floor(colCount / 26);
          }
        }
        return columnName;
      }
      newHeaderCell.textContent = getColumnName(colCount);
      headersRow.appendChild(newHeaderCell);

      // Add data cells to each row
      grid.querySelectorAll("tr").forEach((row, rowIndex) => {
        if (rowIndex === 0) {
          return;
        }
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
        const worksheetRow = worksheet.getRow(rowIndex);

        row.querySelectorAll("td").forEach((cell, colIndex) => {
          worksheetRow.getCell(colIndex + 1).value = cell.textContent;
        });
      });

      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });

        const reader = new FileReader();
        reader.onload = async function () {
          const binary = reader.result;
          try {
            await mainFileManager.save(file_path, binary, bypass);
          } catch {
            FileLocker.lockedError();
          }
        };
        reader.readAsBinaryString(blob);
      });
    });
    createExcelGrid(rowCount, colCount);

    var binaryData = await mainFileManager.getContent(file_path);

    var buffer = new ArrayBuffer(binaryData.length);
    var bufferView = new Uint8Array(buffer);
    for (var i = 0; i < binaryData.length; i++) {
      bufferView[i] = binaryData.charCodeAt(i);
    }

    var blob = new Blob([buffer], { type: "application/vnd.ms-excel" });

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
