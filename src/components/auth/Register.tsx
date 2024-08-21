import React, {useEffect, useState} from "react";
import { UserRegisterState} from "../../types/user";
import LoadingButton from '@mui/lab/LoadingButton'
import {useApi} from "../../hooks/useApi";
import {
    Alert, Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Link,
    Snackbar, TextField, Typography, useTheme
} from "@mui/material";
import Api from "../../services/Api";


interface RegisterModalProps {
    open: boolean
    onClose: () => void
    onSwitchToLogin: () => void
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose, onSwitchToLogin }) => {
    const theme = useTheme()
    const [avatar, setAvatar] = useState<File | null>(null)
    const [user, setUser] = useState<UserRegisterState>({
        username: '',
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        passwordConfirm: '',
        avatar: undefined,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' })

    const { execute: registerUser, loading, error } = useApi(Api.register)

    const [alert, setAlert] = useState<{ show: boolean; message: string; severity: 'success' | 'error' }>({
        show: false,
        message: '',
        severity: 'success'
    });

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (error) {
            setAlert({ show: true, message: error.message || 'Đăng ký thất bại', severity: 'error' });

            timer = setTimeout(() => {
                setAlert(prev => ({ ...prev, show: false }));
            }, 3000);
            // setSnackbar({ open: true, message: error.message || 'Đăng ký thất bại', severity: 'error' })
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [error]);

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setAvatar(event.target.files[0])
        }
    }
    const validateForm = (): boolean => {
        const newErrors: Record<string, string> = {}
        if (!user.fullName) newErrors.fullName = 'Họ và tên không được để trống'
        if (!user.username) newErrors.username = 'Tên đăng nhập không được để trống'
        if (!user.email) newErrors.email = 'Email không được để trống'
        if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Email không hợp lệ'
        if (!user.password) newErrors.password = 'Mật khẩu không được để trống'
        if (user.password !== user.passwordConfirm) newErrors.passwordConfirm = 'Mật khẩu xác nhận không khớp'

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if (validateForm()) {
            const formData = new FormData()
            Object.entries(user).forEach(([key, value]) => {
                if (value !== undefined && value !== '') {
                    formData.append(key, value as string)
                }
            })
            if (avatar) {
                formData.append('avatar', avatar)
            }

            try {
                await registerUser(formData)
                setAlert({ show: true, message: 'Đăng ký thành công', severity: 'success' });
                // setSnackbar({ open: true, message: 'Đăng ký thành công', severity: 'success' })
                setTimeout(() => {
                    onSwitchToLogin()
                    // onClose();
                }, 2000); //
            } catch (error) {
                setSnackbar({ open: true, message: 'Đăng ký thất bại', severity: 'error' })
            }
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target
        setUser(prevUser => ({ ...prevUser, [name]: value }))
    }

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }))
    }
    const handleCloseAlert = () => {
        setAlert(prev => ({ ...prev, show: false }));
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#fff' } }}>
                <DialogTitle>
                    <Typography variant="h5" component="div">
                        Đăng ký
                    </Typography>
                </DialogTitle>
                <form onSubmit={handleRegister}>
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
                            id="fullName"
                            name="fullName"
                            label="Họ và tên"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={user.fullName}
                            onChange={handleChange}
                            error={!!errors.fullName}
                            helperText={errors.fullName}
                        />
                        <TextField
                            margin="dense"
                            id="username"
                            name="username"
                            label="Tên đăng nhập"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={user.username}
                            onChange={handleChange}
                            error={!!errors.username}
                            helperText={errors.username}
                        />
                        <TextField
                            margin="dense"
                            id="email"
                            name="email"
                            label="Email"
                            type="email"
                            fullWidth
                            variant="outlined"
                            value={user.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                        />
                        <TextField
                            margin="dense"
                            id="phoneNumber"
                            name="phoneNumber"
                            label="Số điện thoại"
                            type="text"
                            fullWidth
                            variant="outlined"
                            value={user.phoneNumber}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            id="password"
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={user.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            helperText={errors.password}
                        />
                        <TextField
                            margin="dense"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            label="Xác nhận mật khẩu"
                            type="password"
                            fullWidth
                            variant="outlined"
                            value={user.passwordConfirm}
                            onChange={handleChange}
                            error={!!errors.passwordConfirm}
                            helperText={errors.passwordConfirm}
                        />
                        <Button variant="contained" component="label" color="secondary" style={{ marginTop: theme.spacing(2) }}>
                            Tải lên Avatar
                            <input type="file" accept=".png,.jpg,.jpeg" hidden onChange={handleAvatarChange} />
                        </Button>
                        {avatar && (
                            <Avatar
                                src={URL.createObjectURL(avatar)}
                                alt="Avatar"
                                sx={{ width: 56, height: 56, marginTop: theme.spacing(2) }}
                            />
                        )}
                    </DialogContent>
                    <DialogActions style={{ justifyContent: 'space-between', marginLeft: '8px' }}>
                        <Link component="button" variant="body2" onClick={onSwitchToLogin}>
                            Bạn đã có tài khoản? Đăng nhập
                        </Link>
                        <LoadingButton
                            type='submit'
                            color={'primary'}
                            loading={loading}
                            variant={'contained'}
                            >
                            Đăng ký
                        </LoadingButton>

                    </DialogActions>
                </form>
            </Dialog>
            {/*<Snackbar*/}
            {/*    open={snackbar.open}*/}
            {/*    autoHideDuration={6000}*/}
            {/*    onClose={handleCloseSnackbar}*/}
            {/*    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}*/}
            {/*>*/}
            {/*    <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>*/}
            {/*        {snackbar.message}*/}
            {/*    </Alert>*/}
            {/*</Snackbar>*/}
        </>
    )
}

export default RegisterModal;
