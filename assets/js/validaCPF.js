function ValidaCpf(cpf){
    let _cpf = cpf

    Object.defineProperty(this,'cpfClean',{
        enumerable:true,
        configurable:false,

        get:()=> {
            return _cpf.replace(/\D+/g,'');   ;
        },
    })

}

ValidaCpf.prototype.valida = function(){
 
 if(typeof(this.cpfClean)==='undefined' ||this.cpfClean.length !== 11) return false ; 
 if(this.InvalidSequence()) return false ;

 const digito1 = this.criaPrimeiroDigito();
 const digito2 = this.criaSegundoDigito();


 const novoCpf = this.cpfClean.slice(0,9)+String(digito1)+String(digito2);

 return novoCpf === this.cpfClean

}

ValidaCpf.prototype.criaPrimeiroDigito = function(){

let cpfArray = Array.from(this.cpfClean);
let filtredArray = cpfArray.slice(0,9);

let Result  = 0 ;

const total = filtredArray.reduce((iterator,value,index)=>{
   Result+=  Number(value) * (10-index);
   return Result;

},0)

let firstDigit = 11 - (Result%11);

return firstDigit > 9 ? 0 : firstDigit; 

}


ValidaCpf.prototype.criaSegundoDigito = function(){

    let cpfArray = Array.from(this.cpfClean);
    let filtredArray = cpfArray.slice(0,10);
    
    let Result  = 0 ;
    
    const total = filtredArray.reduce((iterator,value,index)=>{
       Result+=  Number(value) * (11-index);
       return Result;
    
    },0)
    
    let SecondDigit = 11 - (Result%11);
    
    if(SecondDigit>9){
    
        SecondDigit = 0 ;
    }
    
    return SecondDigit;
    
    }

    ValidaCpf.prototype.InvalidSequence = function() {
        const value = this.cpfClean[0].repeat(this.cpfClean.length);
        return this.cpfClean === value ;
    }