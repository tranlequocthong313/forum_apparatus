import { AppBar, IconButton, Toolbar, Typography, Box, Button, Tooltip, Avatar, Menu, MenuItem } from '@mui/material'
import React, { useContext, useState } from 'react'
import AuthModal from '../auth/AuthModal'
import { UserContext, UserDispatchContext } from '../../contexts/UserContext'
import logo from '../../assets/img/logo-ct.png'
import { useNotifications } from '@toolpad/core'

const settings = ['Dashboard', 'Logout']

function Header() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const user = useContext(UserContext)
  const dispatch = useContext(UserDispatchContext)
  const notifications = useNotifications()

  const handleOpenAuthModal = () => {
    setIsAuthModalOpen(true)
  }

  const handleCloseAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = (setting: string) => {
    switch (setting) {
      case 'Dashboard':
        window.open('http://localhost:8080', '_blank')
        break
      case 'Logout':
        if (dispatch) {
          dispatch({
            type: 'LOGOUT',
          })
          notifications.show('Đăng xuất thành công', {
            autoHideDuration: 3000,
            severity: 'success',
          })
        }
        break
      default:
        break
    }
    setAnchorElUser(null)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} alt="Apparatus Logo" style={{ height: 36, marginRight: 10 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Apparatus Forum
          </Typography>
          {user?.isLoggedIn ? (
            <Box sx={{ flexGrow: 0 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography component="h6" sx={{ marginRight: 2 }}>
                  Chào mừng {user.fullName}
                </Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src={user.avatar} />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button color="inherit" onClick={handleOpenAuthModal}>
              Đăng nhập
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {isAuthModalOpen && <AuthModal open={isAuthModalOpen} onClose={handleCloseAuthModal} />}
    </>
  )
}

export default Header
