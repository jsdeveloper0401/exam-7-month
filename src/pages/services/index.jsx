import * as React from "react";
import { useEffect, useState } from "react";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Notification from "../../utils/notification";
import GlobalTable from "../../components/ui/globalTable";
import Modal from "../../components/modal/services";

const DataTable = ({ data, deleteItem }) => (
    <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
                <TableRow>
                    <TableCell>S/N</TableCell>
                    <TableCell align="center">Product name</TableCell>
                    <TableCell align="center">Color</TableCell>
                    <TableCell align="center">Size</TableCell>
                    <TableCell align="center">Count</TableCell>
                    <TableCell align="center">Cost</TableCell>
                    <TableCell align="center">Action</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {data?.map((item, index) => (
                    <TableRow
                        key={index}
                        sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                        }}>
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="center">
                            {item.product_name}
                        </TableCell>
                        <TableCell align="center">{item.color}</TableCell>
                        <TableCell align="center">{item.size}</TableCell>
                        <TableCell align="center">{item.count}</TableCell>
                        <TableCell align="center">{item.cost}</TableCell>
                        <TableCell align="center">
                            <div className="flex items-center gap-x-5 justify-center">
                                <button
                                    className="text-gray-500 mr-2"
                                    onClick={() => deleteItem(item.product_id)}>
                                    <DeleteIcon />
                                </button>
                                <button className="text-gray-500">
                                    <AddPhotoAlternateIcon />
                                </button>
                                <button className="text-gray-500">
                                    <VisibilityIcon />
                                </button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
);
export default DataTable;
const ServiceIndex = () => {
    const { getData, data, isLoading, deleteData } = useServiceStore();
    const [modal, setModal] = useState(false);
    const [item, setItem] = useState({});
    const [params] = useState({ page: 1, limit: 10 });

    useEffect(() => {
        getData(params);
    }, [params, getData]);

    data?.forEach((item, index) => {
        item.index = params.page * params.limit - (params.limit - 1) + index;
    });

    const headers = [
        { title: "№", value: "index" },
        { title: "Service name", value: "name" },
        { title: "Service price", value: "price" },
        { title: "Action", value: "action" },
    ];

    const editItem = (item) => {
        setModal(true);
        setItem(item);
    };

    const handleClose = () => {
        setModal(false);
        setItem({});
    };

    const deleteItem = async (id) => {
        const status = await deleteData(id);
        if (status === 200) {
            Notification({
                title: "deleted service successfully",
                type: "success",
            });
        } else {
            Notification({ title: "Failed to delete service", type: "error" });
        }
    };

    return (
        <div>
            {modal && (
                <Modal open={modal} handleClose={handleClose} item={item} />
            )}
            <div className="py-3 flex justify-end items-center">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setModal(true)}>
                    Add new service
                </Button>
            </div>
            <GlobalTable
                headers={headers}
                body={data}
                isLoading={isLoading}
                editItem={editItem}
                deleteItem={deleteItem}
            />
        </div>
    );
};

const ProductIndex = ({ data }) => {
    const deleteItem = async (id) => {
        try {
            const response = await products.delete(id);
            if (response.status === 200) {
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
        }
    };

    return <DataTable data={data} deleteItem={deleteItem} />;
};

export { ServiceIndex, ProductIndex };
