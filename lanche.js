let nomesProdutos = [];
let precosProdutos = [];
let totaisVendas = [];

function cadastrarProduto() {
    let nome = prompt("Digite o nome do produto:");

    if (nome === null || nome.trim() === "") {
        alert("O nome do produto não pode estar vazio.");
        return;
    }

    nome = nome.trim();

    for (let i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i] === nome) {
            alert("Este produto já foi cadastrado.");
            return;
        }
    }

    let entradaPreco = prompt("Digite o preço do produto:");

    if (entradaPreco === null) {
        return;
    }

    let preco = Number(entradaPreco.replace(",", "."));

    if (!(preco > 0)) {
        alert("O preço deve ser maior que zero.");
        return;
    }

    nomesProdutos.push(nome);
    precosProdutos.push(preco);
    alert("Produto cadastrado com sucesso.");
}

function listarProdutos() {
    if (nomesProdutos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    let lista = "PRODUTOS CADASTRADOS\n";

    for (let i = 0; i < nomesProdutos.length; i++) {
        lista += (i + 1) + " - " + nomesProdutos[i] +
            " - R$ " + precosProdutos[i].toFixed(2) + "\n";
    }

    alert(lista);
}

function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}

function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10;
    }

    return 0;
}

function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    let valorFinal = subtotal - desconto;

    alert("RESUMO DA VENDA\n" +
        "Produto: " + nome + "\n" +
        "Preço unitário: R$ " + preco.toFixed(2) + "\n" +
        "Quantidade: " + quantidade + "\n" +
        "Subtotal: R$ " + subtotal.toFixed(2) + "\n" +
        "Desconto: R$ " + desconto.toFixed(2) + "\n" +
        "Valor final: R$ " + valorFinal.toFixed(2));
}

function realizarVenda() {
    if (nomesProdutos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    listarProdutos();

    let entradaCodigo = prompt("Digite o código do produto:");

    if (entradaCodigo === null) {
        return;
    }

    let codigo = Number(entradaCodigo);

    if (nomesProdutos[codigo - 1] === undefined) {
        alert("Código de produto inválido.");
        return;
    }

    let entradaQuantidade = prompt("Digite a quantidade desejada:");

    if (entradaQuantidade === null) {
        return;
    }

    let quantidade = Number(entradaQuantidade.replace(",", "."));

    if (!(quantidade > 0)) {
        alert("A quantidade deve ser maior que zero.");
        return;
    }

    let nome = nomesProdutos[codigo - 1];
    let preco = precosProdutos[codigo - 1];
    let subtotal = calcularTotalVenda(preco, quantidade);
    let desconto = calcularDesconto(subtotal);
    let valorFinal = subtotal - desconto;

    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);

    if (confirm("Confirmar esta venda?")) {
        totaisVendas.push(valorFinal);
        alert("Venda concluída.");
    } else {
        alert("Venda cancelada.");
    }
}

function obterTotalVendasDia() {
    let total = 0;

    for (let i = 0; i < totaisVendas.length; i++) {
        total += totaisVendas[i];
    }

    return total;
}

function exibirTotalVendasDia() {
    if (totaisVendas.length === 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    alert("TOTAL DE VENDAS DO DIA\n" +
        "Quantidade de vendas: " + totaisVendas.length + "\n" +
        "Valor total vendido: R$ " + obterTotalVendasDia().toFixed(2));
}

function exibirMenu() {
    return prompt("SISTEMA DE LANCHONETE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar o sistema\n\n" +
        "Escolha uma opção:");
}

function controlarMenu() {
    let opcao = "";

    while (opcao !== "5") {
        opcao = exibirMenu();

        if (opcao === null) {
            return;
        }

        if (opcao === "1") {
            cadastrarProduto();
        } else if (opcao === "2") {
            listarProdutos();
        } else if (opcao === "3") {
            realizarVenda();
        } else if (opcao === "4") {
            exibirTotalVendasDia();
        } else if (opcao === "5") {
            alert("Sistema encerrado.");
        } else {
            alert("Opção inválida.");
        }
    }
}

controlarMenu();