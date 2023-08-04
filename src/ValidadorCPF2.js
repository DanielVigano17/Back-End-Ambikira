
function CPFValido(cpf){
    this.cpf_F=this.vrCpf;
    this.vrCpf=cpf;
    this.cpfArray1=Array.from(this.vrCpf)
    this.ultimoNUm=this.cpfArray1.splice(12,2)
    
    this.cpf_F=this.vrCpf.replace(/\D+/g,'');
   
}

CPFValido.prototype.Exec=function(){
  
     console.log(this.ConfirmarCpf())
    
}

CPFValido.prototype.Transform_Array=function(){
    
   const  cpfArray=Array.from(this.cpf_F)
     cpfArray.splice(9,2)
    return cpfArray


}

CPFValido.prototype.Multiplicacao=function(){
    let num_multiplicacao=10;
    let valor_total=0;
   for(let i of this.Transform_Array()){
        
       valor_total+=i*num_multiplicacao; 
        num_multiplicacao=num_multiplicacao-1;
       
    }
    
    return valor_total
        
}

CPFValido.prototype.VerificaPrimeiroNum=function(){
    
    const valor=this.Multiplicacao();
    let resultado= 11-(valor%11)

    if(resultado>9){
        resultado=0;
    }

    return resultado
 
 }

 CPFValido.prototype.VerificaSegundoNum=function(){
    
    const valor=this.MultiplicacaoSegundoNum();
    let resultado= 11-(valor%11)

    if(resultado>9){
        resultado=0;
    }

    return resultado
 
 }

 CPFValido.prototype.MultiplicacaoSegundoNum=function(){
    let num_multiplicacao=11;
    let valor_total=0;
    const cpfConfirm=this.Transform_Array();
    cpfConfirm.splice(9,0,this.VerificaPrimeiroNum())

   for(let i of cpfConfirm ){
        
       valor_total+=i*num_multiplicacao; 
        num_multiplicacao=num_multiplicacao-1;
        
       
    }
    
    return valor_total
        
}

CPFValido.prototype.ConfirmarCpf= function(){
    const arrayVerificadas=[this.VerificaPrimeiroNum(),this.VerificaSegundoNum()]
    this.ultimoNUm
    let aleatorio2='';
    let aleatorio='';
    for(i of this.ultimoNUm){
        aleatorio+=i;
        

    }

    for(i of arrayVerificadas){
        aleatorio2+=i;

    }

    if(Number(aleatorio)===Number(aleatorio2)){
        
        return true
    }else{
        return false
    }
    
   
}

module.exports={
    CPFValido
} 