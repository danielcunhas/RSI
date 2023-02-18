import {db} from "../db.js"

/* funções responsáveis pela tabela de alunos*/

export const getAlunos = (_,res)=>{
    const queryGetTodosAlunos = "SELECT * FROM ALUNO"

    db.query(queryGetTodosAlunos,(err,data) => {
        if (err){
          return res.json(err)
        }else {
          return res.status(200).json(data)
        }  
    })
}

export const getAluno = (req, res) => {
  const queryGetAluno = "SELECT * FROM ALUNO WHERE `Matricula` = ?";

  db.query(queryGetAluno, [req.params.id], (err,data) => {
    if (err){
      return res.json(err)
    }else {
      return res.status(200).json(data)
    }
  });
};

export const updateAluno = (req, res) => {
  const atualizarAluno =
    "UPDATE ALUNO SET `Nome_Aluno` = ?, `Email_aluno` = ?  WHERE `Matricula` = ?";

  const values = [
    req.body.Nome_Aluno,
    req.body.Email_aluno,
  ];

  db.query(atualizarAluno, [...values, req.params.id], (err) => {
    if (err){
      return res.json(err)
    }else {
      return res.status(200).json("Aluno atualizado com sucesso.");    }
  });
};

export const deleteAluno = (req, res) => {
  const deletarAluno = "DELETE FROM ALUNO WHERE `Matricula` = ?";

  db.query(deletarAluno, [req.params.id], (err) => {
    if (err) {
      return res.json(err);
      }else {
        return res.status(200).json("Aluno deletado com sucesso.");
      }
    
  });
};




