export interface UserState {
    username: string
    isLoggedIn: boolean
    id: number,
    fullName: string,
    email: string,
    phoneNumber: string,
    active: boolean,
    userRole: string,
    avatar: string,
    createdAt: number,
    updatedAt: number,
    note: string | null,
}

export interface UserRegisterState {
    username: string
    fullName: string,
    email: string,
    phoneNumber: string,
    password: string,
    passwordConfirm: string,
    avatar?: File | string,
}

export interface ThreadState {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    user: UserState
}

export type UserAction =
    { type: 'LOGIN'; payload: UserState } |
    { type: 'LOGOUT' } |
    { type: 'CURRENT'; payload: UserState }

export interface UserContextType {
    state: UserState
    dispatch: React.Dispatch<UserAction>
}
