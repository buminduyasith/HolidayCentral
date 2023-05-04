const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "HolidayCentral Web API",
            version: "1.0.0",
        },
        components:{
            securitySchemas: {
                bearerAuth : {
                    type: "http",
                    schema:"bearer",
                    bearerFormat:"JWT"
                }
            }
        },
        security:[
            {
                bearerAuth:[]
            }
        ]
    },
    apis: ["./controllers/*.js"], // files containing annotations as above
};



module.exports = {
    swaggerOptions,
};
