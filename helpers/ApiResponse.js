exports.successResponse = function (res, msg) {
    var data = {
        status: 1,
        message: msg
    };
    return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
    const resData = {
        status: 0,
        message: msg,
        data: data
    };
    res.send(200, resData);

};

exports.ErrorResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    res.status(500).send(data);
};

exports.notFoundResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
    var resData = {
        status: 0,
        message: msg,
        data: data
    };
    res.status(400).send(resData);
};

exports.unauthorizedResponse = function (res, msg) {
    var data = {
        status: 0,
        message: msg,
    };
    return res.status(401).json(data);
};