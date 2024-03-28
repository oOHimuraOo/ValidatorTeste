//variaveis globais
var arrayDeTipos = ['nome','nomeCompleto','cpf', 'email', 'telefone', 'celular', 'cep', 'endereco', 'complemento']
var arrayDeCamposInvalidos = []
var arrayDeCamposValidos = []
var Regras = {}
var index = 0
var timeStamp


//eventos
$(document).ready(function() {
    verificadorDeCamposPreenchidos()
    $('#cpf').mask('000.000.000-00', {
        placeholder: '123.456.789-01'
    })

    $('#telefone').mask('(000) 0000-0000',{
        placeholder: '(012) 3456-7890'
    })

    $('#celular').mask('(000) 0 0000-0000',{
        placeholder: '(012) 9 8765-4321'
    })

    $('#cep').mask('00.000-000',{
        placeholder: '01 234-567'
    })
    
    ativarEndereco(false)
})

$('#nomeCompleto').keyup(function(e){
    var objeto = $('#nomeCompleto')
    
    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#cpf').keyup(function(e) {
    var objeto = $('#cpf')
    
    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#email').keyup(function(e) {
    var objeto = $('#email')
    
    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#telefone').keyup(function(e) {
    var objeto = $('#telefone')

    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#celular').keyup(function(e) {
    var objeto = $('#celular')

    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#cep').keyup(function(e) {
    var objeto = $('#cep')

    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#endereco').keyup(function(e){
    var objeto = $('#endereco')

    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('#complemento').keyup(function(e){
    var objeto = $('#complemento')

    verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
})

$('form').on('submit', function(e){
    e.preventDefault()
    alert('Cadastro Finalizado Com sucesso!')

    for (var i = 0; i < arrayDeTipos.length; i++){
        if ($(`#${arrayDeTipos[i]}`)){
            $(`#${arrayDeTipos[i]}`).val('')
        }
    }
})
//funcoes gerais
function bloqueadorDeSubmit(){
    if (arrayDeCamposInvalidos.length > 0){
        $('#btn-enviar').attr('disabled', true)
    }
    else{
        $('#btn-enviar').attr('disabled', false)
    }
}

function SolicitarTipo(Objeto) {
    if (arrayDeTipos.includes(Objeto[0].id)){
        return Objeto[0].id
    }
    else{
        return 'Tipo invalido'
    }
}

function Validar(objeto, tipo) {
    switch (tipo) {
        case 'nome':
            var valido = objeto.val() !== ''
            return reveladorDeMensagem(valido, objeto)

        case 'nomeCompleto':
            var valido = validarNome(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'cpf':
            var valido = validarCPF(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'email':
            var valido = validarEmail(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'telefone':
            var valido = validarTel(objeto,true)
            return reveladorDeMensagem(valido, objeto)

        case 'celular':
            var valido = validarTel(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'cep':
            var valido = validarCEP(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'endereco':
            var valido = validarEnd(objeto)
            return reveladorDeMensagem(valido, objeto)

        case 'complemento':
            var valido = validarComp(objeto)
            return reveladorDeMensagem(valido, objeto)

        default:
            console.error('"tipo" invalido!');
    }
}

function reveladorDeMensagem(bool, objeto){
    if (!bool){
        mensagemErro(objeto)
        if (arrayDeCamposValidos.includes(objeto[0].id)){
            var index = arrayDeCamposValidos.indexOf(objeto[0].id)
            arrayDeCamposValidos.splice(index,1)
        }
        return false
    }
    else{
        mensagemSucesso(objeto)
        if (!arrayDeCamposValidos.includes(objeto[0].id)){
            arrayDeCamposValidos.push(objeto[0].id)
        }
        return true
    }
}

function mensagemErro(objeto){
    var timer = new Date()
    if (timeStamp == '' || timeStamp == undefined){
        timeStamp = timer.getSeconds()
    }

    var nodoPai = objeto.parent()

    if (document.querySelector(`#${nodoPai[0].id} #validation-message`) != null){
        nodoPai.find('#validation-message').text(definirMensagemUsada(objeto))
        nodoPai.find('#validation-message').removeClass('hidden')
        
    }
    else{
        $(`<div id="validation-message">${definirMensagemUsada(objeto)}</div>`).appendTo(nodoPai)
    }
    
}

function mensagemSucesso(objeto){
    var nodoPai = objeto.parent()
    
    $(`#${nodoPai[0].id} #validation-message`).addClass('hidden')
}

function verificadorDeCamposPreenchidos(bool=false){
    for (var j = 0; j < arrayDeTipos.length; j++){
        var objeto = $(`#${arrayDeTipos[j]}`) 
        if (!arrayDeCamposInvalidos.includes(arrayDeTipos[j])){
            if (!arrayDeCamposValidos.includes(arrayDeTipos[j])){
                if (objeto.length > 0){
                    if (!bool){
                        arrayDeCamposInvalidos.push(arrayDeTipos[j])
                    }
                }
            }
        }
        else {
            if (objeto.length > 0){
                if (arrayDeCamposValidos.includes(objeto[0].id) && bool){
                    var index = arrayDeCamposInvalidos.indexOf(arrayDeTipos[j])
                    if (index != -1){
                        arrayDeCamposInvalidos.splice(index, 1)
                    }
                }
            }
        }
    }
    bloqueadorDeSubmit()
}

function definirMensagemUsada(objeto){
    var timer = new Date
    var timerCompardo = timer.getSeconds()

    var tipo = objeto[0].id
    switch (tipo) {
        case 'nome':
            var mensagem = ['mensagem 1', 'mensagem 2', 'mensagem 3', 'mensagem 4', 'mensagem 5']
            
            if (timeStamp <= timerCompardo - 5){
                index++
                timeStamp = timerCompardo
            }
            if (index > mensagem.length){
                index = 0
            }

            return mensagem[index]

        case 'nomeCompleto':
            if (Regras['regrasNome'] === 'regra 0'){
                return 'Este campo é obrigatorio.'
            }
            else if (Regras['regrasNome'] === 'regra 1'){
                return 'por favor preencha este campo com pelo menos 1 nome e 1 sobrenome.'
            }
            else if (Regras['regrasNome'] === 'regra 2'){
                return 'por favor complemente com 1 sobrenome.'
            }
            else {
                return 'Mensagem generica 1'
            }

        case 'cpf':
            if (Regras['regrasCPF'] === 'regra 0'){
                return 'Este campo é obrigatorio.'
            }
            else if (Regras['regrasCPF'] === 'regra 1'){
                return 'Por favor Digite os 11 digitos do CPF'
            }
            else {
                return 'Mensagem generica 2'
            }

        case 'email':
            if (Regras['regrasEmail'] === 'regra 0'){
                return 'por favor insira uma terminação valida'
            }
            else if (Regras['regrasEmail'] === 'regra 1'){
                return 'por favor insira um terminação'
            }
            else if (Regras['regrasEmail'] === 'regra 2'){
                return 'por favor insira um dominio valido'
            }
            else if (Regras['regrasEmail'] === 'regra 3'){
                return 'por favor insira um usuario valido.'
            }
            else 'mensagem generica 3'

        case 'telefone':
            if (Regras['regrasTelefone'] === 'regra 0') {
                return `Por favor digite TODOS os digitos do DDD e do TELEFONE FIXO`
            }
            else {
                return 'mensagem generica 4'
            }

        case 'celular':
            if (Regras['regrasTelefone'] === 'regra 1') {
                return `Por favor digite TODOS os digitos do DDD e do CELULAR`
            }
            else {
                return 'mensagem generica 5'
            }

        case 'cep':
            if (Regras['regrasCEP'] === 'regra 0'){
                return 'Por favor digite um CEP valido, para preenchimento automatico do endereço.'
            }
            else if (Regras['regrasCEP'] === 'regra 1'){
                return 'o CEP precisa ter 8 digitos.'
            }
            else if (Regras['regrasCEP'] === 'regra 2'){
                return 'CEP ineserido não está registrado no banco de dados.'
            }
            else{
                return 'mensagem generica 6'
            }

        case 'endereco':
            if (Regras['regrasEndereco'] === 'regra 0'){
                return `Por favor insira o endereço nessa ordem: LOGRADOUR, BAIRRO, LOCALIDADE, UF, PAÍS.`
            }
            else {
                return 'mensagem generica 7'
            }

        case 'complemento':
            var mensagem = ['mensagem 1', 'mensagem 2', 'mensagem 3', 'mensagem 4', 'mensagem 5']
            
            if (timeStamp <= timerCompardo - 5){
                index++
                timeStamp = timerCompardo
            }
            if (index > mensagem.length){
                index = 0
            }

            return mensagem[index]

        default:
            console.error('"tipo" invalido!');
    }
}


//Função exclusiva para o nome completo
function validarNome(objeto) {
    var nome = objeto.val().split(' ')
    if (nome[0] == ''){
        Regras['regrasNome'] = 'regra 0'
        return false
    }
    else if(nome.length < 2){
        Regras['regrasNome'] = 'regra 1'
        return false
    }
    else {
        if (nome[1] == ''){
            Regras['regrasNome'] = 'regra 2'
            return false
        }
        Regras['regrasNome'] = ''
        return true
    }
}

//função exclusiva para o CPF
function validarCPF(objeto) {
    if (objeto.val().length <= 1){
        Regras['regrasCPF'] = 'regra 0'
    }
    else if (objeto.val().length !== 14) {
        Regras['regrasCPF'] = 'regra 1'
        return false
    }
    else{
        Regras['regrasCPF'] = ''
        return true
    }
}

//função exclusiva para o email
function validarEmail(objeto) {
    var valor = objeto.val()
    var indiceArroba = valor.indexOf('@')

    if (indiceArroba !== -1 && indiceArroba !== 0) {
        var indicePonto = valor.indexOf('.', indiceArroba)
        if (indicePonto !== -1 && indicePonto > indiceArroba + 1) {
            if (valor[indicePonto + 1] !== undefined) {
                if (valor[indicePonto + 1] !== '') {
                    Regras['regrasEmail'] = ''
                    return true
                }
                else {
                    Regras['regrasEmail'] = 'regra 0'
                    return false
                }
            } else {
                Regras['regrasEmail'] = 'regra 1'
                return false
            }
        } else {
            Regras['regrasEmail'] = 'regra 2'
            return false
        }
    } else {
        Regras['regrasEmail'] = 'regra 3'
        return false
    }
}


//função exclusiva para o telefone/celular
function validarTel(objeto, bool=false) {
    if (bool){
        var tamanho = objeto.val().length
        if (tamanho != 15){
            Regras['regrasTelefone'] = 'regra 0'
            return false
        }
        else{
            Regras['regrasTelefone'] = ''
            return true
        }
    }
    else {
        var tamanho = objeto.val().length
        if (tamanho != 17){
            Regras['regrasTelefone'] = 'regra 1'
            return false
        }
        else {
            Regras['regrasTelefone'] = ''
            return true
        }
    }
}

//funções exclusivas para o cep
function validarCEP(objeto) {
    var tamanho = objeto.val().length
    if (tamanho <= 5) {
        Regras['regrasCEP'] = 'regra 0'
        return false
    }
    else if (tamanho != 10){
        Regras['regrasCEP'] = 'regra 1'
        return false
    }
    else{
        var cepLimpo = objeto.val().replace(/\D/g, '')

        if (verificarCEP(cepLimpo)){
            Regras['regrasCEP'] = ''
            return true
        }
        else{
            Regras['regrasCEP'] = 'regra 2'
            ativarEndereco()
            return false
        }
    }
    
}

function verificarCEP(cep) {
    var url = `https://viacep.com.br/ws/${cep}/json/`

    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.hasOwnProperty('erro')) {
                escreverEndereco(false, 'erro')
                return false
            } 
            else {
                escreverEndereco(true, data)
                return true
            }
        })
}

//função exclusiva para o endereço
function ativarEndereco(bool){
    var objeto = $('#endereco')
    if (bool){
        objeto.attr('disabled', false)
    }
    else{
        objeto.attr('disabled', true)
        if (objeto.val() != ''){
            verificadorDeCamposPreenchidos(Validar(objeto, SolicitarTipo(objeto)))
        }
    }
}

function escreverEndereco(bool, data){
    if (bool){
        var linha = `Rua: ${data.logradouro}, `
        linha += `Bairro: ${data.bairro}, `
        linha += `Cidade: ${data.localidade}, `
        linha += `Estado: ${data.uf}, `
        linha += `País: Brasil`
        
        $('#endereco').attr('placeholder', '')
        $('#endereco').val(linha)
        ativarEndereco(false)
    }
    else{
        $('#endereco').attr('placeholder', 'Endereço não encontrado')
        $('#endereco').val('')
        ativarEndereco(true)
    }
}

function validarEnd(objeto){
    var endereco = objeto.val().split(' ')
    if (endereco.length < 5){
        Regras['regrasEndereco'] = 'regra 0'
        return false
    }
    else {
        Regras['regrasEndereco'] = ''
        return true
    }
}

//função exclusiva para o complemento
function validarComp(objeto){
    if (objeto.val() != ''){
        return true
    }
    else{
        return false
    }
}


















//nao gostei dessa validação vou criar a minha.
    /*$('form').validate({
        rules:{
            nome:{
                required: true
            },
            cpf:{
                required: true
            },
            email:{
                required:true,
                email: true
            },
            telefone:{
                required: true
            },
            cep:{
                required: true
            },
            complemento:{
                required: true
            }
        }
    })*/