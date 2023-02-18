import  express from "express"
import {getTurmas} from "../controllers/turmaController.js"

const router = express.Router()

router.get("/turmas" , getTurmas)

export default router


