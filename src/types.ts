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


export interface ForumCategory {
	id: number,
	name: string
}

export interface ThreadCategoryState {
	id: number,
	name: string,
	createdAt: string,
	updatedAt: string,
	forumCategory: ForumCategory
}

export interface ThreadState {
	id: number,
	title: string,
	content: string,
	createdAt: number,
	updatedAt: number,
	user: UserState
	threadCategory: ThreadCategoryState
}

export type UserAction =
	{ type: 'LOGIN'; payload: UserState } |
	{ type: 'LOGOUT' } |
	{ type: 'CURRENT'; payload: UserState }

export interface UserContextType {
	state: UserState
	dispatch: React.Dispatch<UserAction>
}

export interface ReplyState {
	id: number;
	content: string;
	createdAt: number;
	updatedAt: number;
	thread: ThreadState;
	user: UserState;
	reply?: ParentReplyState;
}

export interface ParentReplyState {
	id: number;
	content: string;
	createdAt: number;
	updatedAt: number;
	user: UserState;
}
