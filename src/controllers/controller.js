const { PrismaClient } = require('@prisma/client');
const { cp } = require('fs');
const prisma = new PrismaClient();
const { z } = require('zod');

 
 async function users(req,res){

    const users = await prisma.user.findMany(
      {
        include:{
          estandes: true
        }
      }
    )


    if(!users[0]){
        res.send("Nenhum usuário encontrado")
        return 
    }
    res.json(users)

 }

 async function createUser(req,res){

    let {
        name,
        email,
        cpf,
        tel,
        estande,
        time,
        pontos,
    } = req.body

    time = Number(time)
    pontos = Number(pontos)
    estande = String(estande)
    cpf = String(cpf)
    tel = String(tel)

    const schema = z.object({
      name: z.string().min(3).max(50),
      email: z.string().email(),
      cpf: z.string().length(11),
      tel: z.string().length(11),
      time: z.number(),
      pontos: z.number().max(6),
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

    const existUser = await prisma.user.findUnique({
      where: {
        cpf: cpf,
      }
    })

    if(!existUser){

      const user = await prisma.user.create({

        data: {
          name: name,
          email: email,
          cpf: cpf,
          tel:tel,
          estandes:{
            create :{
              estande: estande,
              pontos: pontos,
              time: time
            }
          }

        },
      })

    }else{
       
      const estandes = await prisma.estande.create({
        data: {
            estande: estande,
            pontos: pontos,
            time: time,
            autorId: existUser.id
        }
      })
    }

   
      return res.send("Dados cadastrados com sucesso")

   }catch(err){
    console.error(err)
    return res.status(400).send("Erro ao cadastrar dados do usuário")
   }

        
 }

 async function verifyUser(req,res){

   let {
    cpf,
    email,
    estande,
   } =req.body

   cpf = String(cpf)
   email = String(email)
   estande = String(estande)

   const schema = z.string().length(11)

    try{
      schema.parse(cpf)
    }catch(err){
      console.error(err)
      return res.status(400).send("Dados inválidos")
    }

  let users = await prisma.user.findUnique({
    where: {
      cpf: cpf,
    },
    include:{
      estandes: {
        where:{
          estande: estande
        }
      }
    }

  })

  if(!users){

    users = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include:{
        estandes: {
          where:{
            estande: estande
          }
        }
      }

    })

    if(!users){
      res.status(200).send("Usuário qualificado para jogar")
      return 
    }

  }else{
    if(!users.estandes[0]){
      res.status(200).send("Usuário qualificado para jogar")
      return 
  }

  }
      
      res.status(400).send("Usuário já cadastrado")

}




 module.exports = {
    users,
    createUser,
    verifyUser,
 }
