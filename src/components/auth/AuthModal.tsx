import React, {useState} from "react";
import RegisterModal from "./Register";
import LoginModal from "./Login";


interface AuthModalProps {
    open: boolean
    onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ open, onClose }) => {
    const [isLoginOpen, setIsLoginOpen] = useState(true)

    const handleSwitchToRegister = () => {
        setIsLoginOpen(false)
    }

    const handleSwitchToLogin = () => {
        setIsLoginOpen(true)
    }

    return (
        <>
            {isLoginOpen ? (
                <LoginModal open={open} onClose={onClose} onSwitchToRegister={handleSwitchToRegister} />
            ) : (
                <RegisterModal open={open} onClose={onClose} onSwitchToLogin={handleSwitchToLogin} />
            )}
        </>
    )
}

export default AuthModal