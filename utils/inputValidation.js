module.exports = {
    validateInput: (username, password, confirmPassword, email, name) => {
        const errors = {}
        if (username.trim() === "") {
            errors.username = "username must not be empty"
        }
        if (name.trim() === "") {
            errors.username = "username must not be empty"
        }
        if (password.trim() === "") {
            errors.password = "password must not be empty"
        }
        if (confirmPassword.trim() === "") {
            errors.confirmPassword = "confirmPassword must not be empty"
        }
        if (confirmPassword !== password) {
            errors.confirmPassword = "passwords must match"
        }
        if (email.trim() === "") {
            errors.email = "email must not be empty"
        }

        return {
            errors,
            valid: Object.keys(errors).length < 1
        }

    },
    validateLogin:(username,password)=>{
        if (username.trim() === "") {
            errors.username = "username must not be empty"
        }
        if (password.trim() === "") {
            errors.password = "password must not be empty"
        }
    }

}