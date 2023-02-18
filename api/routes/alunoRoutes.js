import  express from "express"
import {getAlunos, getAluno, updateAluno,deleteAluno} from "../controllers/alunoController.js"

const router = express.Router()

router.get("/alunos/codturma=:codturma/coddisciplina=:coddisciplina", getAlunos)
router.get("/aluno/:id", getAluno)
router.put("/aluno/:id" , updateAluno)
router.delete("/aluno/:id" , deleteAluno)


export default router
