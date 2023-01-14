export const AuthValidation = {
    username: {
        required: "Email is required",
        pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
        },
    },
    password: {
        required: "Password is required",
        minLength: {
            value: 2,
            message: "Password must be at least 5 characters",
        },
    },
    firstname: {
        required: "first name is required",
        minLength: {
            value: 3,
            message: "first name must have at least 3 characters"
        }
    }
}