const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch (statusCode){   //if the statusCode is 400 , i want to pass the Validation Failed ERR!!!
        case 400:
            res.json({
                title: "Validation Failed!",
                message: err.message,
                stackTrace: err.stack,
            });
            break;
        case 404:
            res.json({
                title: "Not Found!",
                message: err.message,
                stackTrace: err.stack,
            });
            default:
                break;
    }

};

module.exports=errorHandler;
