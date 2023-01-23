export const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: 'Silabuz Proyecto Unidad 7',
            version: '1.0.0',
            description: "Rest Express TypeScript Nodejs Prisma"
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth: [],
            }
        ],
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    },
    apis: ["./index.ts"]
}