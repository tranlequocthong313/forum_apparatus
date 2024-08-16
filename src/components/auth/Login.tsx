import React, { useState } from 'react'
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Typography, Link } from '@mui/material'
import APIs, { authApis } from '../../configs/api'
import { save } from 'react-cookies'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, { AxiosError } from 'axios'
import { useUserDispatch } from '../../hooks/useUser'

interface LoginModalProps {
  open: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose, onSwitchToRegister }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useUserDispatch()

  const login = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault()
    try {
      let res = await APIs.post(authApis.login, {
        username,
        password,
      })
      if (res.status === 200) {
        save('access-token', res.data.token, {})
        save('user', res.data, {})
        if (dispatch) {
          dispatch({
            type: 'LOGIN',
            payload: res.data,
          })
        }
        onClose()
      }
    } catch (error: Error | AxiosError | unknown) {
      console.error(error)
      if (
        axios.isAxiosError(error) &&
        error.response?.data.status === 400 &&
        error.response?.data.message === 'Username or password is incorrect'
      ) {
      }
    }
  }

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { backgroundColor: '#fff' } }}>
      <DialogTitle>
        <Typography variant="h5" component="div">
          Đăng nhập
        </Typography>
      </DialogTitle>
      <DialogContent>
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
        />
      </DialogContent>
      <DialogActions style={{ justifyContent: 'space-between', marginLeft: '8px' }}>
        <Link component="button" variant="body2" onClick={onSwitchToRegister}>
          Bạn chưa có tài khoản? Đăng ký
        </Link>
        <Button onClick={login} color="primary">
          Đăng nhập
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoginModal
