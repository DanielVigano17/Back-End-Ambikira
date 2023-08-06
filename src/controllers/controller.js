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
        time,
        pontos
    } = req.body

    const schema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      cpf: z.string().length(11),
      tel: z.string().length(11),
      time: z.number().positive(),
      pontos: z.number().positive().max(15),
    })

    try{
      schema.parse({
         name: name,
         email: email,
         cpf: cpf,
         tel:tel,
         time:time,
         pontos:pontos,
       })
    }catch(err){
      console.error(err)
      return res.status(400).send("Dados inválidos")
    }

   

   try{
    const user = await prisma.user.create({
        data: {
          name: name,
          email: email,
          cpf: cpf,
          tel:tel,
          time:time,
          pontos:pontos

        },
      })

      return res.send("Dados cadastrados com sucesso")

   }catch(err){
    console.error(err)
    return res.status(400).send("Erro ao cadastrar dados do usuário")
   }

        
 }

 async function verifyUser(req,res){

   const {
    cpf
   } =req.body

   const schema = z.string().length(11)

    try{
      schema.parse(cpf)
    }catch(err){
      console.error(err)
      return res.status(400).send("Dados inválidos")
    }

  const users = await prisma.user.findUnique({
    where: {
      cpf: cpf,
    }
  })


  if(!users){
      res.status(200).send("Usuário qualificado para jogar")
      return 
  }
      
      res.status(400).send("Usuário já cadastrado")

}




 module.exports = {
    users,
    createUser,
    verifyUser
 }
