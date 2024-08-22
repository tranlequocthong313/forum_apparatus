import { AppBar, IconButton, Toolbar, Typography, Box, Button, Tooltip, Avatar, Menu, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import AuthModal from '../auth/AuthModal'
import logo from '../../assets/img/logo-ct.png'
import { useUser, useUserDispatch } from '../../hooks/useUser'
import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

const settings = ['Dashboard', 'Đăng xuất']

function Header() {
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
	const { isAuthModalOpen, handleOpenAuthModal, handleCloseAuthModal } = useAuth()
	const user = useUser()
	const dispatch = useUserDispatch()

	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget)
	}

	const handleCloseUserMenu = (setting: string) => {
		switch (setting) {
			case 'Dashboard':
				window.open('http://localhost:8080', '_blank')
				break
			case 'Đăng xuất':
				if (dispatch) {
					dispatch({
						type: 'LOGOUT',
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
					<Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
						<Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', color: '#fff' }}>
							<img src={logo} alt="Apparatus Logo" style={{ height: 36, marginRight: 10 }} />
							<Typography variant="h6" sx={{ flexGrow: 1, color: 'inherit' }}>
								Apparatus Forum
							</Typography>
						</Link>
					</Box>
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
