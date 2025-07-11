const tryCatch = (func) => async (req, res, next) => {
    try {
        await func(req, res, next)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

export default tryCatch