import {db} from "../db.js"

export const getTurmas = (_,res)=>{
  
    const queryGetTurmas = "SELECT t.Cod_turma, t.Nome_Turma, " +
   " (SELECT COUNT(*) FROM Disciplina d WHERE d.Cod_turma = t.Cod_turma) AS Num_Disciplinas, " +
   " (SELECT COUNT(*) FROM Aluno a WHERE a.Cod_turma = t.Cod_turma) AS Num_Alunos " +
   " FROM Turma t; " 

    db.query(queryGetTurmas,(err,data) => {
        if (err){
          return res.json(err)
        }else {
          return res.status(200).json(data)
        }  
    })
}