import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    borderRadius: 1.3,
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #fff",
    boxShadow: 24,
    p: 3,
    outline: "none",
};

export default function BasicModal({ open, handleClose }) {
    const navigate = useNavigate();
    const logOut = () => {
        localStorage.removeItem("access_token");
        navigate("/sign-in");
        window.location.reload();
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Do you want to exit?
                </Typography>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        mt: 4,
                    }}>
                    <Button onClick={handleClose}>No</Button>
                    <Button onClick={logOut} variant="contained">
                        Yes
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}
