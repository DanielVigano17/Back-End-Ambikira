const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { z } = require('zod');
 
 async function users(req,res){

    const users = await prisma.user.findMany()

    if(!users[0]){
        res.send("Nenhum usuário encontrado")
        return 
    }
    res.json(users)

 }

 async function createUser(req,res){

    const {
        name,
        email,
        cpf,
        tel,
        pontos
    } = req.body

   

   try{
    const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          cpf: cpf,
          tel:tel,
          pontos:Number(pontos)

        },
      })

      return res.send("Dados cadastrados com sucesso")

   }catch(err){
    console.error(err)
    return res.status(500).send("Erro ao cadastrar dados do usuário")
   }

        
 }



 module.exports = {
    users,
    createUser
 }
