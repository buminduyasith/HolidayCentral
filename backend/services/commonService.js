function CreateNewUserDto(data, isError, status, msg) {
    if (isError) {
        return {
            isError,
            msg,
            status: status,
        };
    }

    return {
        isError,
        status,
        data,
        msg,
    };
}

module.exports = {
    CreateNewUserDto,
};
