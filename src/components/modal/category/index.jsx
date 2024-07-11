import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import category from "../../../service/category";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    border: "1px solid #fff",
    borderRadius: "5px",
};

export default function index({ open, handleClose, item }) {
    const initialValues = {
        category_name: item?.category_name || "",
    };
    const handleSubmit = async (values) => {
        const payload = {
            category_id: item?.category_id,
            category_name: values.category_name,
        };
        if (item) {
            try {
                const response = await category.update(payload);
                console.log(response);
                if (response.status === 200) {
                    handleClose();
                    window.location.reload();
                }
            } catch (e) {
                console.log("Error:", e);
            }
        } else {
            try {
                const response = await category.create(values);
                if (response.status === 201) {
                    handleClose();
                    window.location.reload();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2">
                        {item ? "Edit Category" : "Add Category"}
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        // validationSchema={signInValidationSchema}
                        onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    name="category_name"
                                    type="text"
                                    as={TextField}
                                    label="Name"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    disabled={isSubmitting}
                                    fullWidth>
                                    {isSubmitting ? "Submitting" : "Sign In"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </Modal>
        </div>
    );
}
