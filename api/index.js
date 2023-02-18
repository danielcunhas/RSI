import  express from "express"
import alunosRoutes from "./routes/alunoRoutes.js"
import faltaRoutes from "./routes/faltaRoutes.js"
import cors from "cors"

const app = express()

app.use(express.json());
app.use(cors());

app.use("/", alunosRoutes)
app.use("/", faltaRoutes)

app.listen(8800)