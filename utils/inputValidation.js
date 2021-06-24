module.exports = {
    validateInput: (user) => {
        const errors = {}
        if (user.username.trim() === "") {
            errors.username = "username must not be empty"
        }
        if (user.name.trim() === "") {
            errors.username = "username must not be empty"
        }
        if (user.password.trim() === "") {
            errors.password = "password must not be empty"
        }
        if (user.confirmPassword.trim() === "") {
            errors.confirmPassword = "confirmPassword must not be empty"
        }
        if (user.email.trim() === "") {
            errors.email = "email must not be empty"
        }

        return {
            errors,
            valid: Object.keys(errors).length < 1
        }

    }

}