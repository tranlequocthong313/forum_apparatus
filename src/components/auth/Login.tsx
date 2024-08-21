import React, {useContext, useEffect, useState} from "react";
import {useApi} from "../../hooks/useApi";
import {AuthContext} from "../../contexts/AuthContext";
import axios from "axios";
import {
    Alert, Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Link,
    Snackbar,
    TextField,
    Typography
} from "@mui/material";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Api from "../../services/Api";


interface LoginModalProps {
    open: boolean
    onClose: () => void
    onSwitchToRegister: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({open, onClose, onSwitchToRegister }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })
    const { execute: login, loading, error, originResponse: loginRes } = useApi(Api.login)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { setAuth } = useContext(AuthContext);

    const [alert, setAlert] = useState<{ show: boolean; message: string; severity: 'success' | 'error' }>({
        show: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        if (error) {
            setAlert({ show: true, message: error.message || 'Đăng nhập thất bại', severity: 'error' });

            // setSnackbar({ open: true, message: error.message || 'Đăng nhập thất bại', severity: 'error' })
        }
    }, [error])

    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}
        if (!username) newErrors.username = 'Tên đăng nhập không được để trống'
        if (!password) newErrors.password = 'Mật khẩu không được để trống'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleLogin = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(validateForm()) {
            try {
                let response = await login(username, password);
                if(response.status === 200) {
                    setAuth(loginRes?.data.token, response.data);
                    setAlert({ show: true, message: 'Đăng nhập thành công', severity: 'success' });
                    setTimeout(() => {
                        onClose();
                    }, 1500);
                    // onClose();
                    // setSnackbar({ open: true, message: 'Đăng nhập thành công', severity: 'success' })

                }
            } catch (e) {
                console.error(e);
                // if (
                //     axios.isAxiosError(error) &&
                //     error.response?.data.status === 400 &&
                //     error.response?.data.message === 'Username or password is incorrect'
                // ) {
                //     setSnackbar({ open: true, message: 'Tài khoản hoặc mật khẩu không chính xác', severity: 'error' })
                //     setAlert({ show: true, message: 'Đăng nhập thất bại', severity: 'error' });
                // }
            }
        }
    }

    const handleCloseAlert = () => {
        setAlert(prev => ({ ...prev, show: false }));
    };
    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }))
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#fff' } }}>
                <DialogTitle>
                    <Typography variant="h5" component="div">
                        Đăng nhập
                    </Typography>
                </DialogTitle>
                <form onSubmit={handleLogin}>
                    <DialogContent>
                        {alert.show && (
                            <Box mb={2}>
                                <Alert onClose={handleCloseAlert} severity={alert.severity}>
                                    {alert.message}
                                </Alert>
                            </Box>
                        )}
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="Tên đăng nhập"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'space-between', marginLeft: '8px' }}>
                        <Link component="button" variant="body2" onClick={onSwitchToRegister}>
                            Bạn chưa có tài khoản? Đăng ký
                        </Link>
                        <LoadingButton
                            type="submit"
                            color="primary"
                            loading={loading}
                            variant="contained"
                        >
                            Đăng nhập
                        </LoadingButton>
                    </DialogActions>
                </form>
            </Dialog>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );

}

export default LoginModal;