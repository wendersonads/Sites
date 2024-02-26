
const form = document.getElementById("form");
const nome = document.getElementById("nome");
const cpfCnpj = document.getElementById("cpfCnpf");
const dataNasc = document.getElementById("dataNasc");
const email = document.getElementById("email");
const celular = document.getElementById("celular");
const cep = document.getElementById("cep");
const cidade = document.getElementById("cidade");
const uf = document.getElementById("uf");


function validarDados() {

    var dadoCpfCnpj = cpfCnpj.value;
    var dadoNome = nome.value;
    var dadoDataNasc = dataNasc.value;
    var dadoEmail = email.value;   
    var dadoCelular = celular.value;
    var dadoCep = cep.value;
    var dadoCidade = cidade.value;
    var dadoUf = uf.value; 



    if (!validaCpfCnpj(dadoCpfCnpj)) {
        alert("CPF ou CNPF inválido!!!");

    }
    //Numero fica no site https://dashboard.emailjs.com/admin/account Public Key
    emailjs.init("0JoaOwFb1uhuEa7Rb");

    var mensagem = ""
    mensagem += "Nome: " + dadoNome + "\n";
    mensagem += "E-mail: " + dadoEmail + "\n";
    mensagem += "Data Nasc.: " + dadoDataNasc + "\n";
    mensagem += "Celular: " + dadoCelular + "\n";
    mensagem += "CEP: " + dadoCep + "\n";
    mensagem += "Cidade: " + dadoCidade + "\n";
    mensagem += "UF: " + dadoUf + "\n\n";

    var params = {
     email: 'aasolarma@gmail.com',
     from_name: dadoNome,
     message: mensagem
    }   

    //Primeiro parametro Service ID fica na aba Email Services https://dashboard.emailjs.com/admin
    //Segundo parametro https://dashboard.emailjs.com/admin/templates  
    emailjs.send("service_3ko5ipk","template_s69rum8", params).then(function(response){
        if (response.status == 200) {
            alert("Dados enviados com sucesso!");
        }
    },function(error){
        alert("Erro ao enviar e-mail. Por favor, tente novamente." + error);

    }
    );
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    validarDados();
})

function validaCpfCnpj(val) {
    if (val.length == 14) {

        var cpf = val.trim();
        cpf = cpf.replace(/\./g, '');
        cpf = cpf.replace('-', '');
        cpf = cpf.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cpf.length > i; i++) {
            if (cpf[i - 1] != cpf[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p = 10; (cpf.length - 2) > i; i++, p--) {
            v1 += cpf[i] * p;
        }

        v1 = ((v1 * 10) % 11);

        if (v1 == 10) {
            v1 = 0;
        }

        if (v1 != cpf[9]) {
            return false;
        }

        for (var i = 0, p = 11; (cpf.length - 1) > i; i++, p--) {
            v2 += cpf[i] * p;
        }

        v2 = ((v2 * 10) % 11);

        if (v2 == 10) {
            v2 = 0;
        }

        if (v2 != cpf[10]) {
            return false;
        } else {
            return true;
        }
    } else if (val.length == 18) {

        var cnpj = val.trim();

        cnpj = cnpj.replace(/\./g, '');
        cnpj = cnpj.replace('-', '');
        cnpj = cnpj.replace('/', '');
        cnpj = cnpj.split('');

        var v1 = 0;
        var v2 = 0;
        var aux = false;

        for (var i = 1; cnpj.length > i; i++) {
            if (cnpj[i - 1] != cnpj[i]) {
                aux = true;
            }
        }

        if (aux == false) {
            return false;
        }

        for (var i = 0, p1 = 5, p2 = 13; (cnpj.length - 2) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v1 += cnpj[i] * p1;
            } else {
                v1 += cnpj[i] * p2;
            }
        }

        v1 = (v1 % 11);

        if (v1 < 2) {
            v1 = 0;
        } else {
            v1 = (11 - v1);
        }

        if (v1 != cnpj[12]) {
            return false;
        }

        for (var i = 0, p1 = 6, p2 = 14; (cnpj.length - 1) > i; i++, p1--, p2--) {
            if (p1 >= 2) {
                v2 += cnpj[i] * p1;
            } else {
                v2 += cnpj[i] * p2;
            }
        }

        v2 = (v2 % 11);

        if (v2 < 2) {
            v2 = 0;
        } else {
            v2 = (11 - v2);
        }

        if (v2 != cnpj[13]) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}
var cpfsCnpjs = {
    onKeyPress: function (cpf, ev, el, op) {
        var masks = ['000.000.000-000', '00.000.000/0000-00'];
        $('#cpfCnpf').mask((cpf.length > 14) ? masks[1] : masks[0], op);
    }
}
$('#cpfCnpf').length > 11 ? $('#cpfCnpf').mask('00.000.000/0000-00', cpfsCnpjs) : $('#cpfCnpf').mask('000.000.000-00#', cpfsCnpjs);

var ceps = {
    onKeyPress: function (cep, e, field, options) {
        var masks = ['00000-000', '0-00-00-00'];
        var mask = (cep.length > 7) ? masks[1] : masks[0];
        $('.crazy_cep').mask(mask, options);
    }
}
$('#cep').mask('00000-000', ceps);

var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
},
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        }
    };

$('#celular').mask(SPMaskBehavior, spOptions);

$(document).ready(function () {
    $('#cep').on('blur', function () {
    var cep = $(this).val().replace(/\D/g, '');

    if (cep.length != 8) {
        alert('CEP inválido');
        return;
      }

      $.getJSON('https://viacep.com.br/ws/' + cep + '/json/', function(data) {
        if (!data.erro) {
            console.log(data);
          $('#uf').val(data.uf);
          $('#cidade').val(data.localidade);
        } else {
          alert('CEP não encontrado');
        }
      });

    });
});
