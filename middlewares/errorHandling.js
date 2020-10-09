module.exports = (err, req, res, next) => {
    //Default
    let status;
    let msg;

    switch(err.name){
        case "SequelizeValidationError":
            status = 400;
            msg = err.errors[0].message;
        break;
        case "SequelizeDatabaseError":
            status = 500;
            msg = err.errors[0].message;
        break;
        case "Data already exist":
            status = 400;
            msg = err.name
        break;
        default :
            status = 500;
            msg = err.errors[0].message
        break;
    }
    
    res.status(status).json({
        status, msg
    })
}