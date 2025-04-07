//routes that does not require authentication 
export const publicRoutes = [
    "/",
    "/api/auth/provider",
]

// routes that ar eused for authentication 
//will redirect user to setting
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
]


// the prefix for Api authententication routes
/// routes with this predfix are used for authentication 
export const  apiAuthPrefix = "/api/auth"


//default redirect path after logging
export const DEFAULT_LOGIN_REDIRECT = "/setting";

