const {constants}=require("../constants")
const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode){   //if the statusCode is 400 , i want to pass the Validation Failed ERR!!!
        case constants.VALIDATION_ERROR:
            res.json({
                title: "Validation Failed!",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case constants.NOT_FOUND:         //if the statusCode is 404, i want to pass the err as Not Found!
            res.json({
                title: "Not Found!",
                message: err.message,
                stackTrace: err.stack,
            });
            case constants.UNAUTHORIZED:         //if the statusCode is 404, i want to pass the err as Not Found!
            res.json({
                title: "Unauthorized!",
                message: err.message,
                stackTrace: err.stack,
            });
            case constants.FORBIDDEN:         //if the statusCode is 404, i want to pass the err as Not Found!
            res.json({
                title: "Forbidden!",
                message: err.message,
                stackTrace: err.stack,
            });
            case constants.SERVER_ERROR:         //if the statusCode is 404, i want to pass the err as Not Found!
            res.json({
                title: "Server Error!",
                message: err.message,
                stackTrace: err.stack,
            });
            default:
                console.log("No Err, All Good...")
                break;
    }

};

module.exports=errorHandler;
