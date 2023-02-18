import  express from "express"
import {setFalta,getAlunosFaltasExcedentes} from "../controllers/faltaController.js"

const router = express.Router()

router.put("/falta/matricula=:matricula&coddisciplina=:coddisciplina" , setFalta) // http://localhost:8800/falta/matricula=4&coddisciplina=2005
router.get("/faltaexcedente/:codturma" , getAlunosFaltasExcedentes)
router.get("/faltaexcedente/:codturma/:codaluno" , getAlunosFaltasExcedentes)

export default router
