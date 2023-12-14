import { connect } from 'mongoose'
import { dbPass } from './settings.js'

const DB_URL = `mongodb+srv://leonelroman:${dbPass}@cluster0.fo3dmlm.mongodb.net/?w=majority`
const DB_CONFIG = {
  dbName: 'tellme-app',
  retryWrites: true
}

export const connectDb = () => {
  connect(DB_URL, DB_CONFIG)
    .then(({ connection }) => console.log(`aplicacion conectada a base de datos: ${connection.db.databaseName}`))
    .catch(err => console.log(err))
    .finally(() => console.log('conexion finalizada'))
}
