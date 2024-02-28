import express from 'express';
import cors from 'cors';
import dbConnection from '../db/config';
import routerUser from '../routes/users.routes';
import routerAuth from '../routes/auth.routes';
class Server{
    constructor(){
        this.app = express()
        this.port = process.env.PORT || 3000
        this.paths = {
            auth:       '/api/auth',
            categorys:  '/api/categorys',
            products:   '/api/products',
            users:      '/api/users'
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
        // this.app.use(this.paths.categorys, require('../routes/categorys.routes'))
        this.app.use(this.paths.users, routerUser)
        // this.app.use(this.paths.products, require('../routes/productos.routes'))

    }
    listen(){
        this.app.listen( this.port, ()=>{
            console.log('SERVIDOR', this.port)
        })
    }
}
export default Server;