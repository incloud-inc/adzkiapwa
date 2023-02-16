export interface Loading {
    isOpen: boolean,
    message?: string,
}
export interface Alert {
    isOpen: boolean,
    header: string,
    subHeader?: string,
    message: string,
}
export interface AuthData{
    token:string,
    uid:string,
    password?:string,
    email?:string,
    first_name:string,
    last_name:string,
    contact_no:string,
    connection_key?:string,
    gid?:string,
    su?:string,
    subscription_expired?:string,
    verify_code?:string,
    wp_user?:string,
    registered_date?:string,
    photo?:string,
    user_status?:string,
    web_token?:string,
    android_token?:string,
    skype_id?:string,
    time_zone?:string,
    alamat_lengkap?:string,
    alamat_sekolah?:string,
}
export interface AuthLogin{
    email:string,
    password:string,
}
export interface AuthSignUp{
    email:string,
    password:string,
    first_name:string,
    last_name:string,
    phone:string,
}
export interface AuthForgotPassword{
    phone:string,
}
export interface ApiResponse<T>{
    m?:string
    data?:T,
}