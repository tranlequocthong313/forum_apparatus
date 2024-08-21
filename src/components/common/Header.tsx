import {AppBar, IconButton, Toolbar, Typography, InputBase, Box, Tooltip, Avatar, Menu, MenuItem} from "@mui/material";
import React, { useState } from "react";
import {useAuth} from "../../hooks/useAuth";
import logo from '../../assets/img/logo-ct.png'
import Button from "@mui/material/Button";
import AuthModal from "../auth/AuthModal";


const settings = ['Home', 'Logout'];
function Header() {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
    const { user, clearAuth } = useAuth();

    const handleOpenAuthModal = () => {
        setIsAuthModalOpen(true);
    };

    const handleCloseAuthModal = () => {
        setIsAuthModalOpen(false);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = async (setting: string) => {
        switch (setting) {
            case 'Dashboard':
                window.open('http://localhost:8080', '_blank');
                break;
            case 'Logout':
                try {
                    clearAuth();
                    // notifications.show('Đăng xuất thành công', {
                    //     autoHideDuration: 3000,
                    //     severity: 'success',
                    // });
                } catch (error) {
                    console.error('Logout failed:', error);
                    // notifications.show('Đăng xuất thất bại', {
                    //     autoHideDuration: 3000,
                    //     severity: 'error',
                    // });
                }
                break;
            default:
                break;
        }
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <img src={logo} alt="Apparatus Logo" style={{height: 36, marginRight: 10}}/>
                <Typography variant="h6" sx={{ flexGrow: 1 }}>
                    Apparatus Forum
                </Typography>
                {user ? (
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
                            onClose={() => setAnchorElUser(null)}
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
        {/*    </Toolbar>*/}
        {/*</AppBar>*/}

    {isAuthModalOpen && <AuthModal open={isAuthModalOpen} onClose={handleCloseAuthModal} />}

                {/*// <IconButton edge="start" color="inherit" aria-label="menu">*/}
                {/*//     <MenuIcon/>*/}
                {/*// </IconButton>*/}
                {/*// <Typography variant="h6" sx={{flexGrow: 1}}>*/}
                {/*//     VOZ*/}
                {/*// </Typography>*/}
                {/*//*/}
                {/*// <div>*/}
                {/*//     <InputBase*/}
                {/*//         placeholder="Search..."*/}
                {/*//         inputProps={{'aria-label': 'search'}}*/}
                {/*//     />*/}
                {/*//     <IconButton color="inherit">*/}
                {/*//         <SearchIcon/>*/}
                {/*//     </IconButton>*/}
                {/*// </div>*/}
            </Toolbar>
        </AppBar>
    )
}

export default Header;