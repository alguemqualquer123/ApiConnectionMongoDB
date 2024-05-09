import express from "express";
const app = express();
import cors from "cors";
import { User, Admins } from "./models/User.js";
import mongoose from "mongoose";
app.use(cors());
const PORT = 3000;
app.use(express.json());
// npm install mongodb



// Coloque sua chave do MongoDB Abaixo !!!!
mongoose.connect("mongodb+srv://danilovinicius1790:kd584mq9ONBq2F9F@cluster0.v08p4gq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Banco de dados conectado ! 🚀");
  })
  .catch((error) => {
    console.log("Não foi possivel conectar ao banco de dado.");
  });




  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // http://localhost:3000/getAdmins
app.get("/getAdmins", async (req, res) => {
  const GetUser = await Admins.find();
  return res.status(200).json(GetUser);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// http://localhost:3000/newAdmin
// {
//   "name": "Vini Santos",
//   "discordId": "530706233389350912",
//   "roles": [
//       {
//           "role": "Vendedor",
//           "id": "4"
//       }
//   ]
// }
app.post("/newAdmin", async (req, res) => {
  try {
    const { name, discordId, roles } = req.body;
    if (!name || !discordId || !roles) return res.status(400).json({ erro: "Erro Ao Inserir Novo Admin." });
    const Userexistent = await Admins.findOne({ discordId: discordId })
    if (Userexistent) return res.json({ error: "Usuario Já Existente." })

    const newUser = await Admins.create({ name, discordId, roles });
    const GetUser = await Admins.find();
    return res.status(200).json({ allAdmins: GetUser, return: newUser });
  } catch (error) {
    res.status(400).json({ erro: "Ocorreu algum erro ao fazer a postagem" });
  }
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// http://localhost:3000/updateAdmin
// {
//   "id": "530706233389350912",
//   "roles": [{
//       "role": "Diretor",
//       "id": "2"
//   }]

// }
app.post("/updateUserInfos", async (req, res) => {
  try {
    const { id, name, roles } = req.body;
    const GetUser = await Admins.findOne({ discordId: id });
    if (GetUser) {
      Admins.updateOne({ discordId: id, name: name || GetUser.name, roles: roles || GetUser.roles }).then(async () => {
        const newAdmin = await Admins.findOne({ discordId: id })
        res.json(newAdmin)
      })
    } else {
      res.status(403).json({ erro: "Usuario Não Encontrado" })
    }
  } catch (error) {
    res.status(400).json({ erro: error });
  }
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// http://localhost:3000/deleteUser
// {
//   "discordId": "505858070291808256"
// }
app.delete("/deleteUser", async (req, res) => {
  try {
    const { discordId } = req.body;
    const GetUser = await Admins.findOne({ discordId: discordId });
    if (GetUser) {
      Admins.deleteOne({ discordId: discordId }).then(async (result) => {
        if (result.deletedCount > 0) {
          const AllUsers = await Admins.find();
          res.status(200).json(AllUsers)
          // res.status(200).send(`Usuario: ${GetUser.name} Deletado Com Sucesso`)
        } else {
          res.status(202).send(`Usuario: ${GetUser.name} Não Existe`)
        }
      }).catch((erro) => {
        res.status(404).json(erro)
      })
    } else {
      res.json({ error: "Usuario Não Encontrado." })
    }
  } catch (error) {
    res.status(400).json({ erro: "Ocorreu algum erro ao deletar o item" });
  }
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////








/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////
app.get("/getuser", async (req, res) => {
  const GetUser = await User.find();
  return res.status(200).json(GetUser);
});


app.post("/setuser", async (req, res) => {
  try {
    const { name, age, ip } = req.body;
    if (!name || !age || !ip) return res.status(400).json({ erro: "Algum Valor Está Incorreto !!!" });
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
        res.status(200).send(`ID: ${id} Deletado Com Sucesso`)
      } else {
        res.status(202).send(`ID: ${id} Não Existe`)
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
