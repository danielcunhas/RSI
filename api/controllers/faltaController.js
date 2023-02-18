import {db} from "../db.js"
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config(); // configurações de email no arquivo .env

/* função responsável por adicionar falta a um aluno especifico*/

export const setFalta = (req, res) => {
    const setFalta = "UPDATE Aluno_Disc SET `Faltas` = Faltas + 1 WHERE  `Matricula` = ? AND `Cod_Disciplina` = ? "
    
      db.query(setFalta,[req.params.matricula,req.params.coddisciplina], (err) => {
        if (err){
          return res.json(err)
        }else {
          return res.status(200).json("Registro de falta concluído");    }
      });
  };

  /* função responsável por retornar alunos que estão entre 50% e 75% de faltas baseado na turma selecionada*/
  /* função tambem resposavel por realizar a chamada do disparo de email para o aluno selecionado, avisando sobre seu numero elevado de faltas*/
  
export const getAlunosFaltasExcedentes = (req, res) => {
  const codturma = req.params.codturma;
  const codaluno = req.params.codaluno;
  let queryGetAluno = "SELECT Aluno.Matricula, Aluno.Nome_Aluno, Aluno.Email_aluno, Disciplina.Nome_Disciplina, (Faltas * 100 / Nummax_faltas) AS Percentual_Faltas " +
  " FROM ALUNO " +
  " JOIN Aluno_Disc ON Aluno.Matricula = Aluno_Disc.Matricula " + 
  " JOIN Disciplina ON Aluno_Disc.Cod_Disciplina = Disciplina.Cod_Disciplina " +
  " WHERE (Faltas * 100 / Nummax_faltas) BETWEEN 50 AND 75 AND " +
  " Disciplina.Cod_turma = " + db.escape(codturma);
  
  if (codaluno) {   
    queryGetAluno += " AND Aluno.Matricula = " + db.escape(codaluno);
    db.query(queryGetAluno, (err,data) => {
      if (err) {
        res.json(err);
      } else {
        enviarEmailFalta(data, res);
      }
    });
  } else {
    db.query(queryGetAluno, (err,data) => {
      if (err) {
        res.json(err);
      } else {
        res.status(200).json(data);
      }
    });
  }
};


/*função responsável pelo disparo de email*/

export const enviarEmailFalta = async (data, res) => {
  try {

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const emailBody = `
    <html>
    <head>
      <style>
        /* Define a fonte e a cor de fundo do corpo do e-mail */
        body {
          font-family: "Open Sans", sans-serif;
          font-size: 16px;
          color: #333;
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
        }
        
        /* Define o estilo do cabeçalho com a cor de destaque */
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-top: 30px;
          margin-bottom: 10px;
          color: #d9534f;
        }
        
        /* Define o estilo do parágrafo de texto com margens e espaçamento */
        p {
          margin: 10px 0;
          line-height: 1.4;
        }
        
        /* Define o estilo do link com sublinhado e cor de destaque */
        a {
          color: #d9534f;
          text-decoration: underline;
        }
        
        /* Define o estilo do link quando passa o mouse por cima */
        a:hover {
          color: #c9302c;
          text-decoration: none;
        }
        
        /* Define o estilo de uma classe de destaque para o texto */
        .destaque {
          color: #d9534f;
          font-weight: bold;
        }
        
        /* Define o estilo de um elemento de lista */
        li {
          margin: 5px 0;
          list-style: none;
        }
        
        /* Define o estilo de um pseudo-elemento para adicionar um ícone */
        p::before {
          content: "\f071";
          font-family: FontAwesome;
          margin-right: 10px;
          color: #d9534f;
        }
      </style>
    </head>
    <body>
      <h1>Notificação de faltas</h1>
      <p>Prezado(a) responsável,</p>
      <p>Gostaríamos de informar que o(a) aluno(a) <span class="destaque">${data[0].Nome_Aluno}</span> está faltando muito nas aulas. Até o momento, ele(a) já acumulou um total de <span class="destaque">${Math.round(data[0].Percentual_Faltas)+"%"}</span> de faltas na disciplina de <span class="destaque">${data[0].Nome_Disciplina}</span>. É importante ressaltar que o percentual máximo de faltas é de 80%, e um elevado numero de faltas implica negativamente para o aproveitamento do conteúdo e o bom desempenho do aluno(a).</p>
      <p>Em caso de dúvidas, por favor entre em contato conosco.</p>
      <ul>
        <li><a href="https://www3.mackenzie.br/tia/index.php">Acesse o portal do aluno</a></li>
        <li><a href="https://www.mackenzie.br/atendimento/central-de-informacoes/telefones-uteis">Entre em contato com a secretaria</a></li>
      </ul>
      <p>Atenciosamente,</p>
      <p><span class="destaque">Escola Mackenzie</span></p>
    </body>
  </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: data[0].Email_aluno,
      subject: 'Notificação de faltas',
      html: emailBody,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'E-mail enviado com sucesso!', status: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao enviar o e-mail.', status: false });
  }
};




