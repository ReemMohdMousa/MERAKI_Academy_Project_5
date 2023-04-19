import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const UserTable = () => {
  const [rows, setRows] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/count/alluser`)
      .then((result) => {
        console.log(result.data)
        setRows(result.data);
      })
      .catch((error) => {
         console.log(error);
      });
  }, []);

  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell className="tableCell">Row Number</TableCell>
            <TableCell className="tableCell">User Name</TableCell>
            <TableCell className="tableCell">Age</TableCell>
            <TableCell className="tableCell">Email</TableCell>
       
   
          </TableRow>
        </TableHead>
        <TableBody>
          {rows && rows.map((row,id) => (
            <TableRow key={id}>
              <TableCell className="tableCell">{id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                <img
                        className="friend-img"
                        src={
                          row.avatar ||
                          "https://png.pngtree.com/png-clipart/20210613/original/pngtree-gray-silhouette-avatar-png-image_6404679.jpg"
                        }
                      />
                     {"    "} {row.username}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.age}</TableCell>
              <TableCell className="tableCell">{row.email}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserTable;
