import React, { useState } from "react";
import Papa from "papaparse";

const UploadAndDisplayCSV = () => {
  const [data, setData] = useState([]);
  const [headers, setHeaders] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setData(results.data);
          setHeaders(Object.keys(results.data[0] || {}));
        },
      });
    }
  };

  return (
    <div>
      <h2>Carregar e Exibir CSV</h2>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex}>{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UploadAndDisplayCSV;
