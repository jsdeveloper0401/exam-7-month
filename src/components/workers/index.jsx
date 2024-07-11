// components/WorkerTable.jsx
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
import { useState, useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import workers from "../../../service/workers";
import WorkerModal from "./WorkerModal";

export default function WorkerTable() {
    const [data, setData] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [params, setParams] = useState({
        page: 1,
        limit: 5,
    });
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});

    const fetchData = async () => {
        try {
            const response = await workers.get(params);
            setData(response.data.workers);
            setTotalCount(response.data.totalCount);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [params]);

    const deleteItem = async (id) => {
        try {
            const response = await workers.delete(id);
            if (response.status === 200) {
                fetchData();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const editItem = (item) => {
        setOpen(true);
        setItem(item);
    };

    const handleClose = () => {
        setOpen(false);
        setItem({});
    };

    const changePage = (event, page) => {
        setParams((prevParams) => ({
            ...prevParams,
            page,
        }));
    };

    return (
        <>
            <WorkerModal open={open} handleClose={handleClose} item={item} />
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
                        {data.map((item, index) => (
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
                                <TableCell align="center">
                                    {item.gender}
                                </TableCell>
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
                                            onClick={() => editItem(item)}
                                            className="text-gray-500">
                                            <EditIcon />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    count={Math.ceil(totalCount / params.limit)}
                    page={params.page}
                    onChange={changePage}
                    sx={{ mt: 2 }}
                />
            </TableContainer>
        </>
    );
}
