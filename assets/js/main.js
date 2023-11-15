    class validaFormulario{
        
    constructor(){
        this.formulario = document.querySelector('.formulario');
        this.getEvent();
    }
    
    getEvent(){

        this.formulario.addEventListener('submit',(e)=>{
            this.handleSubmit(e);     
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const camposValidos  = this.checkFields();  
        console.log(camposValidos);

        if(camposValidos){
            alert('formulário enviado');
            this.formulario.submit();
        }

    }

    checkFields(){

    let valid = true ;

    for(let error of this.formulario.querySelectorAll('.error')){
        error.remove(); 
    }

        for(let campo of this.formulario.querySelectorAll('._validar')){
            
            const label = campo.previousElementSibling.innerText;

            if(!campo.value ){
                this.emptyFieldError(campo,` O Campo "${label}" não pode estar em branco!`)
                valid = false ;
            }

            if(campo.classList.contains('usuario')){
            if(!this.checkUsuarioCriteria(campo)){
                valid = false ;
            }
        }

            if(campo.classList.contains('repetir-senha')){
                if(!this.checkPassWordFields(campo)){
                    valid = false ;
                }
            }

            if(campo.classList.contains('senha')){

                if(this.checkPassWordLength(campo)==false){
                    valid = false ;
                }
            }

            if(campo.classList.contains('cpf')){
            if(!this.validaCpf(campo)){
                valid = false ;
            }
            }

        }
        
    return valid;

    }

    checkUsuarioCriteria(campo){
        let valid  = true ;
        const usuario = campo.value ;

        if(usuario.length <3 ||usuario.length>12 ){
        this.InvalidFieldError(campo,` Usuário deverá ter entre 3 e 12 caracteres`);
        valid = false ;
        }

        if (!usuario.match(/^[A-Za-z0-9]*$/)) {
            this.InvalidFieldError(campo, "Usuário só pode conter letras e/ou números");
            valid = false;
        }
        
        return valid ;
    }

    
    checkPassWordFields(campo){

    let valid = true ;

    const senha = this.formulario.querySelector('.senha');
    const senhaConfirm = this.formulario.querySelector('.repetir-senha');

    if(senha.value!== senhaConfirm.value){
            this.InvalidFieldError(campo,"As senhas precisam ser  iguais!")
            valid = false ;
    }
        return valid ;
    }

    checkPassWordLength(campo){
    let valid = true ;
    const senha = this.formulario.querySelector('.senha');

        if(senha.value.length <6 ||senha.value.length > 12){
            this.InvalidFieldError(campo,"Senha precisa ter entre 6 e 12 caracteres")
            valid = false ;
        }
        return valid ;
    }

    validaCpf(campo){
        
    const value = this.formulario.querySelector('.cpf').value;
    const validator =  new ValidaCpf(value);

    if(validator.valida() == false){

        this.InvalidFieldError(campo,"CPF INVÁLIDO !")
        return false ;
    }

        return true; 
    }

    emptyFieldError(field,msg){
    const div = document.createElement('div');
    div.innerHTML = msg;
    div.classList.add('error');
    field.insertAdjacentElement('afterend',div);
    }

    
    InvalidFieldError(field,msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error');
        field.insertAdjacentElement('afterend',div);
    }

    }

    const valida = new validaFormulario();
