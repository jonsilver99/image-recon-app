export interface AppLoginState { isLoggedIn: boolean, role: string, liked_pictures?: string[] }
export interface LoginRequestStatus { token: string, loginState: AppLoginState }