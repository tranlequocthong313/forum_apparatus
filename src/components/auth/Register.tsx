import React, { useState } from 'react'
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  Box,
  DialogContent,
  DialogTitle,
  useTheme,
  Avatar,
  Link,
  Typography,
  Alert,
} from '@mui/material'
import { UserRegisterState } from '../../types'
import APIs, { authApis } from '../../configs/api'
import { useNotifications } from '@toolpad/core'

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
  const [errors, setErrors] = useState<string[]>([])
  const notifications = useNotifications()

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setAvatar(event.target.files[0])
    }
  }

  const validateForm = () => {
    const newErrors: string[] = []
    for (const field in user) {
      if (user.hasOwnProperty(field)) {
        const value = user[field as keyof UserRegisterState]
        if (field !== 'phoneNumber' && (value === '' || value === null)) {
          newErrors.push(`${field} không được để trống`)
        }
      }
    }
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const appendUserToFormData = () => {
    const form = new FormData()

    for (const field in user) {
      if (user.hasOwnProperty(field)) {
        const value = user[field as keyof UserRegisterState]
        if (field !== 'phoneNumber' && (value === '' || value === null)) {
          continue
        }
        if (field === 'phoneNumber' && !value) {
          continue
        }
        form.append(field, value as string)
      }
    }

    if (avatar) {
      form.append('avatar', avatar)
    }

    return form
  }

  const register = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()

    if (validateForm()) {
      const form = appendUserToFormData()
      try {
        const res = await APIs.post(authApis.register, form, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        if (res.status === 200) {
          notifications.show('Đăng ký thành công', {
            autoHideDuration: 3000,
            severity: 'success',
          })
          onSwitchToLogin()
        }
      } catch (error) {
        console.error(error)
      }
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setUser({ ...user, [field]: event.target.value })
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#fff' } }}>
      <DialogTitle>
        <Typography variant="h5" component="div">
          Đăng ký
        </Typography>
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="fullName"
          label="Họ và tên"
          type="text"
          fullWidth
          variant="outlined"
          value={user.fullName}
          onChange={(e) => onChange(e, 'fullName')}
        />
        <TextField
          margin="dense"
          id="username"
          label="Tên đăng nhập"
          type="text"
          fullWidth
          variant="outlined"
          value={user.username}
          onChange={(e) => onChange(e, 'username')}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={user.email}
          onChange={(e) => onChange(e, 'email')}
        />
        <TextField
          margin="dense"
          id="phoneNumber"
          label="Số điện thoại"
          type="text"
          fullWidth
          variant="outlined"
          value={user.phoneNumber}
          onChange={(e) => onChange(e, 'phoneNumber')}
        />
        <TextField
          margin="dense"
          id="password"
          label="Mật khẩu"
          type="password"
          fullWidth
          variant="outlined"
          value={user.password}
          onChange={(e) => onChange(e, 'password')}
        />
        <TextField
          margin="dense"
          id="passwordConfirm"
          label="Xác nhận mật khẩu"
          type="password"
          fullWidth
          variant="outlined"
          value={user.passwordConfirm}
          onChange={(e) => onChange(e, 'passwordConfirm')}
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
        {errors.length > 0 && (
          <Box mb={2}>
            {errors.map((error, index) => (
              <Alert key={index} severity="error" sx={{ mb: 1 }}>
                {error}
              </Alert>
            ))}
          </Box>
        )}
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between', marginLeft: '8px' }}>
        <Link component="button" variant="body2" onClick={onSwitchToLogin}>
          Bạn đã có tài khoản? Đăng nhập
        </Link>
        <Button onClick={register} color="primary">
          Đăng ký
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default RegisterModal
