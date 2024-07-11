import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

import workers from "../../../service/workers";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
];

export default function index({ data }) {
    const deleteItem = async (id) => {
        try {
            const response = await workers.delete(id);
            response.status === 200 && window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>S/N</TableCell>
                        <TableCell align="center">First name</TableCell>
                        <TableCell align="center">Last name</TableCell>
                        <TableCell align="center">Gender</TableCell>
                        <TableCell align="center">Age</TableCell>
                        <TableCell align="center">Phone number</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((item, index) => (
                        <TableRow
                            key={index}
                            sx={{
                                "&:last-child td, &:last-child th": {
                                    border: 0,
                                },
                            }}>
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="center">
                                {item.first_name}
                            </TableCell>
                            <TableCell align="center">
                                {item.last_name}
                            </TableCell>
                            <TableCell align="center">{item.gender}</TableCell>
                            <TableCell align="center">{item.age}</TableCell>
                            <TableCell align="center">
                                {item.phone_number}
                            </TableCell>
                            <TableCell align="center">
                                <div className="flex items-center gap-y-3 justify-center">
                                    <button
                                        className="text-gray-500 mr-2"
                                        onClick={() => deleteItem(item.id)}>
                                        <DeleteIcon />
                                    </button>
                                    <button
                                        onClick={() => handleClick(item)}
                                        className="text-gray-500">
                                        <EditIcon />
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
