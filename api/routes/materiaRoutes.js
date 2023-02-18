import  express from "express"
import {getMateriasDaTurma} from "../controllers/materiaController.js"

const router = express.Router()

router.get("/materiaturma/:codturma" , getMateriasDaTurma)

export default router