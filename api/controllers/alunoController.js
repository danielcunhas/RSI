import {db} from "../db.js"

/*função responsavel por retornar os alunos de uma turma x que fazem uma materia y */

export const getAlunos = (req,res)=>{

  const codTurma = req.params.codturma;
  const codDisciplina = req.params.coddisciplina;

  let getAlunosTurmaMateria = "SELECT Aluno.Matricula ,Aluno.Nome_Aluno, Aluno.Email_Aluno, Aluno.Cod_Turma " +
  " FROM ALUNO " +
  " INNER JOIN Aluno_Disc ON Aluno.Matricula = Aluno_Disc.Matricula " + 
  " INNER JOIN Disciplina ON Aluno_Disc.Cod_Disciplina = Disciplina.Cod_Disciplina " +
  " WHERE Aluno.Cod_Turma = "+ db.escape(codTurma) + "AND Disciplina.Cod_Disciplina = " + db.escape(codDisciplina)

    db.query(getAlunosTurmaMateria,(err,data) => {
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



