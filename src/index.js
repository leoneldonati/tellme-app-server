import { app } from './app.js'
import { connectDb } from './db.js'
import { port } from './settings.js'

connectDb()

app.listen(port, () => console.log(`servidor corriendo en puerto ${port}`))
