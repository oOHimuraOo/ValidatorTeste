//variaveis globais
var arrayDeTipos = ['nome','nomeCompleto','cpf', 'email', 'telefone', 'celular', 'cep', 'endereco', 'complemento']
var arrayDeCamposInvalidos = []
var arrayDeCamposValidos = []

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
    var nodoPai = objeto.parent()

    if (document.querySelector(`#${nodoPai[0].id} #validation-message`) != null){
        nodoPai.find('#validation-message').removeClass('hidden')
    }
    else{
        $(`<div id="validation-message">Por favor, preencha este campo.</div>`).appendTo(nodoPai)
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
    console.log(arrayDeCamposValidos)
    console.log(arrayDeCamposInvalidos)
}

//Função exclusiva para o nome completo
function validarNome(objeto) {
    var nome = objeto.val().split(' ')

    if (nome.length < 2){
        return false
    }
    else {
        if (nome[1] == ''){
            return false
        }
        return true
    }
}

//função exclusiva para o CPF
function validarCPF(objeto) {
    if (objeto.val().length !== 14) {
        return false
    }
    else{
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
                    return true
                }
                else {
                    return false
                }
            } else {
                return false
            }
        } else {
            return false
        }
    } else {
        return false
    }
}


//função exclusiva para o telefone/celular
function validarTel(objeto, bool=false) {
    if (bool){
        var tamanho = objeto.val().length
        if (tamanho != 15){
            return false
        }
        else{
            return true
        }
    }
    else {
        var tamanho = objeto.val().length
        if (tamanho != 17){
            return false
        }
        else {
            return true
        }
    }
}

//funções exclusivas para o cep
function validarCEP(objeto) {
    var tamanho = objeto.val().length
    if (tamanho != 10){
        return false
    }
    else{
        var cepLimpo = objeto.val().replace(/\D/g, '')

        if (verificarCEP(cepLimpo)){
            return true
        }
        else{
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
    if (endereco.length < 4){
        return false
    }
    else {
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