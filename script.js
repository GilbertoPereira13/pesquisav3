//-----------------------------------------------------------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('nomePesquisador')) {
        var nomePesquisador = prompt('Por favor, digite seu nome:');
        if (nomePesquisador) {
            localStorage.setItem('nomePesquisador', nomePesquisador);
        }
    }
});

document.getElementById('formularioPesquisa').addEventListener('submit', function(e) {
    e.preventDefault(); // Impede o envio tradicional do formulário

    // Captura os dados do formulário
    var dadosDoFormulario = {
        regiao: document.getElementById('regiao').value,
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        sexo: document.getElementById('sexo').value,
        idade: document.getElementById('idade').value,
        votoEspontaneo: document.getElementById('votoEspontaneo').value,
        votoCandidatos: document.getElementById('votoCandidatos').value,
        segundaOpcaoVoto: document.getElementById('segundaOpcaoVoto').value,
        rejeicaoCandidato: document.getElementById('rejeicaoCandidato').value,
        votoVereador: document.getElementById('votoVereador').value,
        problemaBairro: document.getElementById('problemaBairro').value,
        problemaCidade: document.getElementById('problemaCidade').value,
        avaliacaoGoverno: document.getElementById('avaliacaoGoverno').value,
        notaGoverno: document.getElementById('notaGoverno').value
    };

    // Gera uma chave única para cada entrada
    var chave = 'DadosFormulario_' + Date.now();
    // Armazena os dados no localStorage em formato de string JSON
    localStorage.setItem(chave, JSON.stringify(dadosDoFormulario));

    alert('Dados salvos com sucesso!');

    // Limpa manualmente cada campo
    document.getElementById('regiao').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('telefone').value = '';
    document.getElementById('sexo').value = '';
    document.getElementById('idade').value = '';
    document.getElementById('votoEspontaneo').value = '';
    document.getElementById('votoCandidatos').value = '';
    document.getElementById('segundaOpcaoVoto').value = '';
    document.getElementById('votoVereador').value = '';
    document.getElementById('problemaBairro').value = '';
    document.getElementById('problemaCidade').value = '';
    document.getElementById('avaliacaoGoverno').value = '';
    document.getElementById('notaGoverno').value = '';
});


function verificarSenha() {
    var senha = prompt("Digite a senha para exportar:");
    if (senha == "senhaSecreta") {
        exportarDadosParaCSV();
    } else {
        alert("Senha incorreta!");
    }
}
// Botão Limpar Dados do Cache
document.getElementById('btnLimparCache').addEventListener('click', function() {
    var senha = prompt("Digite a senha para limpar os dados salvos:");
    if (senha == "LimparDados") { // Substitua 'senhaParaLimpar' pela senha desejada
        localStorage.clear(); // Limpa todo o localStorage
        alert("Dados limpos com sucesso!");
    } else {
        alert("Senha incorreta!");
    }
});

function exportarDadosParaCSV() {
    var dadosRecuperados = [];
    for (var i = 0; i < localStorage.length; i++) {
        var chave = localStorage.key(i);
        if (chave.startsWith('DadosFormulario_')) {
            var valor = localStorage.getItem(chave);
            dadosRecuperados.push(JSON.parse(valor));
        }
    }

    // Modificação para incluir o nome do pesquisador e a data no nome do arquivo
    var nomePesquisador = localStorage.getItem('nomePesquisador') || 'pesquisador';
    var dataAtual = new Date().toISOString().slice(0,10); // Formato 'AAAA-MM-DD'
    var nomeArquivo = `dados_pesquisa_${nomePesquisador}_${dataAtual}.csv`;

    var csvContent = "data:text/csv;charset=utf-8,\uFEFF";
    var cabeçalhos = Object.keys(dadosRecuperados[0]).join(",") + "\r\n";
    csvContent += cabeçalhos;

    dadosRecuperados.forEach(function(obj) {
        var row = Object.values(obj).map(function(val){
            // Assegura que strings com vírgulas sejam envoltas em aspas
            return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        }).join(",");
        csvContent += row + "\r\n";
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", nomeArquivo);
    document.body.appendChild(link);

    link.click(); // Inicia o download
}