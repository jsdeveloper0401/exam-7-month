import {
    Button,
    Card,
    CardContent,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { auth } from "../../service/index";
import { Notification } from "@utils/index";
import { signInValidationSchema } from "@utils/validation";

const Index = () => {
    const initialValues = {
        email: "xasannosirov094@gmail.com",
        password: "Sehtols@01",
    };

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (values) => {
        try {
            const response = await auth.sign_in(values);
            if (response.status === 200) {
                navigate("/");
                localStorage.setItem(
                    "access_token",
                    response.data.access_token
                );
                localStorage.setItem("user_id", response.data.id);
                Notification({
                    title: "Sign In Successfully",
                    type: "success",
                });
            }
        } catch (error) {
            console.error(error);
            Notification({
                title: "Sign In Failed",
                type: "error",
            });
        }
    };

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="h-screen flex-col flex items-center justify-center p-5">
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 700,
                    borderRadius: "30px 0 30px 0",
                    padding: "30px",
                    boxShadow: 3,
                }}>
                <CardContent>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: "35px", sm: "36px", md: "56px" },
                            fontWeight: "bold",
                            textAlign: "center",
                            marginBottom: "20px",
                        }}>
                        Tizimga kirish
                    </Typography>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={signInValidationSchema}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Field
                                    name="email"
                                    type="email"
                                    as={TextField}
                                    label="Email address"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="email"
                                            component="span"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                />
                                <Typography
                                    variant="body2"
                                    sx={{
                                        marginTop: "10px",
                                        textAlign: "right",
                                        color: "blue",
                                        fontSize: "16px",
                                        "&:hover": {
                                            color: "darkblue",
                                            textDecoration: "underline",
                                        },
                                    }}>
                                    <Link to="/forgot-password">
                                        Forgot Password?
                                    </Link>
                                </Typography>
                                <Field
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    as={TextField}
                                    label="Password"
                                    fullWidth
                                    margin="normal"
                                    variant="outlined"
                                    helperText={
                                        <ErrorMessage
                                            name="password"
                                            component="span"
                                            className="text-[red] text-[15px]"
                                        />
                                    }
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() =>
                                                        setShowPassword(
                                                            !showPassword
                                                        )
                                                    }
                                                    edge="end">
                                                    {showPassword ? (
                                                        <VisibilityOff />
                                                    ) : (
                                                        <Visibility />
                                                    )}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={isSubmitting}
                                    sx={{ marginTop: "20px" }}>
                                    {isSubmitting ? "Signing" : "Sign In"}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
};

export default Index;
