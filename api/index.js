import  express from "express"
import alunosRoutes from "./routes/alunoRoutes.js"
import faltaRoutes from "./routes/faltaRoutes.js"
import turmaRoutes from "./routes/turmaRoutes.js"
import materiaRoutes from "./routes/materiaRoutes.js"
import cors from "cors"

const app = express()

app.use(express.json());
app.use(cors());

app.use("/", alunosRoutes)
app.use("/", faltaRoutes)
app.use("/", turmaRoutes)
app.use("/", materiaRoutes)

app.listen(8800)