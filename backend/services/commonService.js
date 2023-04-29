function createNewUserDto(data, isError, status, msg) {
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

function CreateUserDto(){
    
}

module.exports = {
    createNewUserDto,
};
