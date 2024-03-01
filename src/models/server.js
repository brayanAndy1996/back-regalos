import express from 'express';
import cors from 'cors';
import dbConnection from '../db/config';
import routerUser from '../routes/users.routes';
import routerAuth from '../routes/auth.routes';
import routerRole from '../routes/roles.routes';
import routerPermission from '../routes/permissions.routes';
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.paths = {
            auth:       '/api/auth',
            users:      '/api/users',
            roles:      '/api/roles',
            permissions:'/api/permissions'
        }
        //Conectar db
        this.conectarDb()
        //MIDDLEWARES
        this.middlewares()
        this.routes()
    }
    async conectarDb(){
        await dbConnection()
    }

    middlewares(){
        //CORS
        this.app.use(cors())
        //LECTURA Y PARSEO DEL BODY
        this.app.use( express.json() )
        //DIRECTORIO PUBICO
        // this.app.use( express.static('public') )
    }
    routes(){
        this.app.use(this.paths.auth, routerAuth)
        this.app.use(this.paths.users, routerUser)
        this.app.use(this.paths.roles, routerRole)
        this.app.use(this.paths.permissions, routerPermission)
    }
    listen(){
        this.app.listen( this.port, ()=>{
            console.log('SERVIDOR', this.port)
        })
    }
}
export default Server;