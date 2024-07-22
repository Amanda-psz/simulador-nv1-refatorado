const repassesGovernamentais = JSON.parse(
    "[{\"orgao\":\"Ministério da Educação\",\"data\":\"01/01/2024\",\"valor\":500.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"03/01/2024\",\"valor\":750.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"05/01/2024\",\"valor\":1000.00,\"status\": \"falha\",\"motivo\":\"falta de documentação\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"08/01/2024\",\"valor\":600.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"10/01/2024\",\"valor\":900.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"11/01/2024\",\"valor\":900.00,\"status\":\"falha\",\"motivo\":\"dados inválidos\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"12/01/2024\",\"valor\":500.00,\"status\":\"falha\",\"motivo\":\"\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"12/01/2024\",\"valor\":300.00,\"status\":\"falha\",\"motivo\":\"dados incompletos\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"15/01/2024\",\"valor\":1200.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"17/01/2024\",\"valor\":800.00,\"status\": \"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"20/01/2024\",\"valor\":400.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"22/01/2024\",\"valor\":100.00,\"status\":\"falha\",\"motivo\":\"\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"22/01/2024\",\"valor\":1100.00,\"status\":\"falha\",\"motivo\":\"falta de verba\"}]"
);

//Usuário 6: Ajustes nas estatísticas
const repassesValidos = repassesGovernamentais.filter((elemento) => elemento.motivo !== '');

//repasses em geral, por orgão, com sucesso , com falha
const repassesStatusSucesso = repassesValidos.filter((elemento) => elemento.status === "sucesso");

const repassesStatusFalha = repassesValidos.filter((elemento) => elemento.status === "falha");

function repassesPorOrgao(array) {
    let quantidadeDeRepassesPorOrgao = {};
    array.forEach(repasse => {
        if (quantidadeDeRepassesPorOrgao[repasse.orgao]) {
            quantidadeDeRepassesPorOrgao[repasse.orgao]++;
        } else {
            quantidadeDeRepassesPorOrgao[repasse.orgao] = 1;
        }
    });
    return quantidadeDeRepassesPorOrgao;
}
const repassesGeralPorOrgao = repassesPorOrgao(repassesValidos);
const repassesSucessoPorOrgao = repassesPorOrgao(repassesStatusSucesso);
const repasssesFalhaPorOrgao = repassesPorOrgao(repassesStatusFalha);

//Usuário 1: Recebimento e Exibição de Dados do Governo
function exibeTotalDeRepasses() {
    console.log("\n----------------Exibição Geral de Dados do Governo----------------\n");
    console.log(`Total de repasses processados: ${repassesValidos.length}`);
    console.log("------------------------------------------------------------------\n")
}
exibeTotalDeRepasses();

//Usuário 2: Análise de Transações por status
function transacoesStatusSucesso() {
    console.log("\n----------------Resumo dos repasses bem sucedidos----------------\n");
    console.log("Quantidade de repasses bem sucedidos: \n");
    console.log(`Geral: ${repassesStatusSucesso.length}`);
    for (let orgao in repassesSucessoPorOrgao) {
        console.log(`${orgao}: ${repassesSucessoPorOrgao[orgao]}`);
    }

    console.log("\nValores dos repasses bem sucedidos:\n");
    const valorTotalRepassesSucesso = repassesStatusSucesso.reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
    console.log(`Geral: R$ ${valorTotalRepassesSucesso.toFixed(2).replace('.', ',')}`);

    let valorTotalRepassesPorOrgao = {};
    repassesStatusSucesso.forEach(repasse => {
        if (!valorTotalRepassesPorOrgao[repasse.orgao]) {
            valorTotalRepassesPorOrgao[repasse.orgao] = 0;
        }
        valorTotalRepassesPorOrgao[repasse.orgao] += repasse.valor;
    });
    for (let orgao in valorTotalRepassesPorOrgao) {
        console.log(`${orgao}: R$ ${valorTotalRepassesPorOrgao[orgao].toFixed(2).replace('.', ',')}`);
    }
    console.log("------------------------------------------------------------------\n")
}
transacoesStatusSucesso();

function transacoesStatusFalha() {
    console.log("\n------------------Resumo dos repasses com falha------------------\n");
    console.log("Quantidade de repasses com falha:\n");
    console.log(`Geral: ${repassesStatusFalha.length}`);
    for (let orgao in repasssesFalhaPorOrgao) {
        console.log(`${orgao}: ${repasssesFalhaPorOrgao[orgao]}`);
    }

    const repassesFalhaComMotivo = repassesStatusFalha.filter(elemento => elemento.motivo !== " ")
    console.log(`Por Motivo: ${repassesFalhaComMotivo.length}\n`)

    console.log("\nValores dos repasses com falha:\n");
    const valorTotalRepassesFalha = repassesStatusFalha.reduce((acumulador, elemento) => acumulador + elemento.valor, 0)
    console.log(`Geral: R$ ${valorTotalRepassesFalha.toFixed(2).replace('.', ',')}`);

    let valorTotalRepassesPorOrgao = {};
    let valorRepassesFalhaPorMotivo = {};
    repassesStatusFalha.forEach(repasse => {
        if (!valorTotalRepassesPorOrgao[repasse.orgao]) {
            valorTotalRepassesPorOrgao[repasse.orgao] = 0;
        }
        if (!valorRepassesFalhaPorMotivo[repasse.motivo]) {
            valorRepassesFalhaPorMotivo[repasse.motivo] = 0;
        }
        valorTotalRepassesPorOrgao[repasse.orgao] += repasse.valor;
        valorRepassesFalhaPorMotivo[repasse.motivo] += repasse.valor;
    });

    for (let orgao in valorTotalRepassesPorOrgao) {
        console.log(`${orgao}: R$ ${valorTotalRepassesPorOrgao[orgao].toFixed(2).replace('.', ',')}`);
    }
    console.log("Por tipo de motivo:")
    console.log(valorRepassesFalhaPorMotivo);
    console.log("------------------------------------------------------------------\n");
}
transacoesStatusFalha();

//Usuário 3: Estatísticas de Repasses por critérios
function repassesPorCriterios() {
    console.log("\n----------------------Repasses por critérios----------------------\n")

    function repasseComMaiorValor(array, propriedade) {
        return array.reduce((acumulador, elemento) => {
            return elemento[propriedade] > acumulador[propriedade] ? elemento : acumulador;
        });
    }
    const repasseMaiorValor = repasseComMaiorValor(repassesValidos, "valor");
    console.log("Com maior valor: ");
    console.log(repasseMaiorValor);

    function repasseComMenorValor(array, propriedade) {
        return array.reduce((acumulador, elemento) => {
            return elemento[propriedade] < acumulador[propriedade] ? elemento : acumulador;
        });
    }
    const repasseMenorValor = repasseComMenorValor(repassesValidos, "valor");
    console.log("Com o menor valor: ");
    console.log(repasseMenorValor);

    function diaComMaisRepasses() {
        const converteData = repassesValidos.map((elemento) => {
            const separaData = elemento.data.split('/');
            const dataFormatoAmericano = [separaData[2], separaData[1], separaData[0]].join('/')
            return dataFormatoAmericano
        })

        const contarDatas = converteData.reduce((acumulador, data) => {
            acumulador[data] = (acumulador[data] || 0) + 1;
            return acumulador;
        }, {})

        const dataComMaisRepasses = Object.keys(contarDatas)
            .reduce((dataAtual, ProximaData) =>
                contarDatas[dataAtual] > contarDatas[ProximaData] ? dataAtual : ProximaData);

        let dataFormatoBrasileiro = dataComMaisRepasses.split('/');
        dataFormatoBrasileiro = [dataFormatoBrasileiro[2], dataFormatoBrasileiro[1], dataFormatoBrasileiro[0]].join('/');

        console.log(`\nData com mais repasses: ${dataFormatoBrasileiro}`);
    }
    diaComMaisRepasses();

    function orgaoComMaisRepasses() {
        let quantidadeRepassesPorOrgao = {}
        repassesValidos.forEach(repasse => {
            if (quantidadeRepassesPorOrgao[repasse.orgao]) {
                quantidadeRepassesPorOrgao[repasse.orgao]++;
            } else {
                quantidadeRepassesPorOrgao[repasse.orgao] = 1;
            }
        })

        const orgaoMaisRepasses = Object.keys(quantidadeRepassesPorOrgao).reduce((a, b) => quantidadeRepassesPorOrgao[a] > quantidadeRepassesPorOrgao[b] ? a : b);
        console.log(`Órgão com mais repasses: ${orgaoMaisRepasses}`)
    }
    orgaoComMaisRepasses();

    function orgaoComMaisRepassesSucesso() {
        let quantidadeRepassesSucesso = {}
        repassesStatusSucesso.forEach(repasse => {
            if (quantidadeRepassesSucesso[repasse.orgao]) {
                quantidadeRepassesSucesso[repasse.orgao]++;
            } else {
                quantidadeRepassesSucesso[repasse.orgao] = 1;
            }
        })
        const orgaoMaisRepassesSucesso = Object.keys(quantidadeRepassesSucesso).reduce((a, b) => quantidadeRepassesSucesso[a] > quantidadeRepassesSucesso[b] ? a : b);
        console.log(`Órgão com mais repasses com sucesso: ${orgaoMaisRepassesSucesso}`)
    }
    orgaoComMaisRepassesSucesso();

    function orgaoComMaisRepassesComFalha() {
        let quantidadeRepassesFalha = {}
        repassesStatusFalha.forEach(repasse => {
            if (quantidadeRepassesFalha[repasse.orgao]) {
                quantidadeRepassesFalha[repasse.orgao]++;
            } else {
                quantidadeRepassesFalha[repasse.orgao] = 1;
            }
        })
        const orgaoMaisRepassesFalha = Object.keys(quantidadeRepassesFalha).reduce((a, b) => quantidadeRepassesFalha[a] > quantidadeRepassesFalha[b] ? a : b);
        console.log(`Órgão com mais repasses com falha: ${orgaoMaisRepassesFalha}`)
    }
    orgaoComMaisRepassesComFalha();

    let quantidadeMotivo = {};
    repassesStatusFalha.forEach(repasse => {
        if (!quantidadeMotivo[repasse.motivo]) {
            quantidadeMotivo[repasse.motivo]++;
        }
        quantidadeMotivo[repasse.motivo] = 1;
    });
    console.log("Quantidades por tipo de motivo de falha:")
    console.log(quantidadeMotivo)
    console.log("------------------------------------------------------------------\n")
}
repassesPorCriterios();

//Usuário 4: Apresentação Automática de Detalhes de Transações
function detalhaTransacoesPorOrgao() {
    console.log("\n-----------------Detalhe de Transações por órgão------------------\n");

    console.log("Geral:");
    for (let orgao in repassesGeralPorOrgao) {
        console.log(`${orgao}: ${repassesGeralPorOrgao[orgao]}`);
    }
    console.log("\nStatus Sucesso:")
    for (let orgao in repassesSucessoPorOrgao) {
        console.log(`${orgao}: ${repassesSucessoPorOrgao[orgao]}`);
    }
    console.log("\nStatus Falha:")
    for (let orgao in repasssesFalhaPorOrgao) {
        console.log(`${orgao}: ${repasssesFalhaPorOrgao[orgao]}`);
    }
    console.log("------------------------------------------------------------------\n")
}
detalhaTransacoesPorOrgao();

//Usuário 5: Tratamento de erros
//Utilizando uma nova lista com a inclusão de dados inválidos
const repassesComDadosInvalidos = "[{\"orgao\":\"MEC\",\"data\":\"01/01/2024\",\"valor\":500.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"03/01/2024\",\"valor\":750.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"MEC\",\"data\":\"05/01/2024\",\"valor\":1000.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"08/01/2024\",\"valor\":600.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"10/01/2024\",\"valor\":900.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"12/01/2024\",\"valor\":300.00,\"status\":\"falha\",\"motivo\":\"dados inválidos\"}," +
    "{\"orgao\":\"Ministério da Saúde\",\"data\":\"15/01/2024\",\"valor\":1200.00,\"status\":\"sucesso\"}," +
    "{\"orgao\":\"MEC\",\"data\":\"17/01/2024\",\"valor\":800.00,\"status\":\"falha\",\"motivo\":\"falta de verba\"}," +
    "{\"orgao\":\"Ministério da Educação\",\"data\":\"20/01/2024\",\"valor\":400.00,\"status\":\"falha\",\"motivo\":\"falta de limite\"}," +
    "{\"orgao\":\"MEC\",\"data\":\"22/01/2024\",\"valor\":1100.00,\"status\":\"falha\"}]";

const repassesInvalidosRecebidos = JSON.parse(repassesComDadosInvalidos);

const repassesComDadosValidos = repassesInvalidosRecebidos.filter((elemento) => elemento.motivo !== '');

function verificandoErros() {
    console.log("\n-----------Resumo de repasses com falha com nova lista-------------\n")
    const repassesComStatusFalha = repassesComDadosValidos.filter((elemento) => elemento.status === "falha")
    console.log("Geral: ");
    console.log(repassesComStatusFalha);
    console.log("------------------------------------------------------------------\n")
}
verificandoErros();