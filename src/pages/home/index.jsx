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

import category from "@modal/category";
import Category from "@modal/category";

export default function index({ data }) {
    const [open, setOpen] = useState(false);
    const [item, setItem] = useState({});
    const handleClose = () => {
        setOpen(false);
        setItem({});
    };

    const deleteItem = async (id) => {
        try {
            const response = await category.delete(id);
            response.status === 200 && window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = (value) => {
        setItem(value);
        setOpen(true);
    };
    return (
        <>
            {open && (
                <Category
                    item={item}
                    open={open}
                    handleClose={handleClose}
                />
            )}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">S/N</TableCell>
                            <TableCell align="center">Category</TableCell>
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
                                <TableCell
                                    align="center"
                                    component="th"
                                    scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell align="center">
                                    {item.category_name}
                                </TableCell>
                                <TableCell align="center">
                                    <div className="flex items-center gap-x-3 justify-center">
                                        <button
                                            className="text-gray-500 mr-2"
                                            onClick={() =>
                                                deleteItem(item.category_id)
                                            }>
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
        </>
    );
}
