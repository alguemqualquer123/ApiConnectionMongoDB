import express from "express";
const app = express();
import cors from "cors";
import User from "./models/User.js";
app.use(cors());
// npm install mongodb
import mongoose from "mongoose";
MongoKerberosError.connect( "mongodb+srv://danilovinicius1790:kd584mq9ONBq2F9F@cluster0.v08p4gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Banco de dados conectado ! 🚀");
  })
  .catch((error) => {
    console.log("Não foi possivel conectar ao banco de dado.");
  });




const PORT = 3000;
app.use(express.json());

app.get("/getuser", async (req, res) => {
  const GetUser = await User.find();
  return res.status(200).json(GetUser);
});


app.post("/setuser", async (req, res) => {
  try {
    const { name, age, ip } = req.body;
    if (!name || !age || !ip) return res.status(400).json({erro: "Algum Valor Está Incorreto !!!"});
    const newUser = await User.create({ name, age, ip });
    const GetUser = await User.find();
    return res.status(200).json(GetUser);
  } catch (error) {
    res.status(400).json({ erro: "Ocorreu algum erro ao fazer a postagem" });
  }
});


app.delete("/deleteuser", async (req, res) => {
  try {
    const { id } = req.body;
    await User.deleteOne({ _id: id }).then((result) => {
      if (result.deletedCount > 0) {
        res.status(200).send(`ID: ${id} Deletado Com Sucesso` )
      }else{
        res.status(202).send(`ID: ${id} Não Existe` )
      }
    }).catch((erro) => {
      res.status(404).json(erro)
    })
  } catch (error) {
    res.status(400).json({ erro: "Ocorreu algum erro ao deletar o item" });
  }
})


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
