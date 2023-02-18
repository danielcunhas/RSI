import {db} from "../db.js"

/*  a ideia é após selecionar a turma apresentar as materias que compoe a turma e os professores que ministram cada materia 
e assim listar os alunos daquela materia posteriormente na função getAlunos() */

export const getMateriasDaTurma = (req, res) => {

    const codturma = req.params.codturma;

    let queryMateriasTurma = "SELECT Disciplina.Cod_Disciplina, Disciplina.Nome_Disciplina, Professor.Nome_Professor" +
    " FROM Disciplina " +
    " INNER JOIN Turma ON Disciplina.Cod_turma = Turma.Cod_turma " + 
    " INNER JOIN Prof_Disc ON Disciplina.Cod_Disciplina = Prof_Disc.Cod_Disciplina " +
    " INNER JOIN Professor ON Prof_Disc.Cod_Professor = Professor.Cod_Professor " +
    " WHERE Turma.Cod_turma = " + db.escape(codturma);
  
    db.query(queryMateriasTurma, codturma , (err,data) => {
      if (err) {
        return res.json(err);
        }else {
          return res.status(200).json(data);
        }
      
    });
  };