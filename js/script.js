class Produto {

    constructor() {
        this.id = 1
        this.arrayProdutos = []
        this.editId = null
    }

    salvar() { // quando clicar em salvar chamara a função ler dados
        let produto = this.lerDados()



        if (this.validaCampos(produto)) {
            if (this.editId === null) {
                this.adiconar(produto)
            } else {
                this.atualizar(this.editId, produto)
            }
        }
        this.listaTabela()
        this.cancelar()
    }

    listaTabela() { // Essa função ira percorrer todos os elemetos do array, e criara linhas e colunas
        let tbody = document.getElementById("tbody")
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow() // Essa função tem o papel de criar uma nova linha no tbody

            let tdId = tr.insertCell() // vai inserir uma nova coluna
            let tdProduct = tr.insertCell()
            let tdValue = tr.insertCell()
            let tdActions = tr.insertCell()

            tdId.innerText = this.arrayProdutos[i].id
            tdProduct.innerText = this.arrayProdutos[i].nomeProduto
            tdValue.innerText = this.arrayProdutos[i].preco

            tdId.classList.add('center') // adicionar uma classe no td

            let imgEdit = document.createElement('img') // criar um novo elemento
            imgEdit.src = 'img/edit.png'
            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")")

            let imgDelete = document.createElement('img')
            imgDelete.src = 'img/delete.png'

            tdActions.appendChild(imgEdit)// add a img como filha do tdActions
            tdActions.appendChild(imgDelete)
            // atributo que chama uma função , Essa função aeita 2 parametros("eventos", "ação")
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")")


            tdActions.classList.add('center')
        }
    }

    adiconar(produto) { // vai adicionar nosso elemento no array
        produto.preco = parseFloat(produto.preco)
        this.arrayProdutos.push(produto)
        this.id++
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id === id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto
                this.arrayProdutos[i].preco = produto.preco
            }
        }
    }

    preparaEdicao(dados) {
        this.editId = dados.id
        document.getElementById("produto").value = dados.nomeProduto
        document.getElementById("preco").value = dados.preco

        document.getElementById("btn1").innerText = "Atualizar"
    }

    lerDados() { // vai ter o papel de ler os campos e devolver para o "salvar"
        let produto = {}
        produto.id = this.id // quando o usuario apertar salvar o ID incial sera 1
        produto.nomeProduto = document.getElementById('produto').value
        produto.preco = document.getElementById('preco').value

        return produto
    }

    //Função para verificar se os dados estão vazios
    validaCampos(produto) {
        let msg = ""
        if (produto.nomeProduto === "") {
            msg += "- Informe o nome do produto. \n \n"
        }
        if (produto.preco === "") {
            msg += "- Informe o preço do produto. \n"
        }
        if (msg != "") {
            alert(msg)
            return false
        }
        return true

    }

    cancelar() {
        document.getElementById('produto').value = ''
        document.getElementById('preco').value = ''

        document.getElementById("btn1").innerText = "Salvar"
        this.editId = null
    }

    deletar(id) {
        if (confirm("Deseja realmente deletar o produto com ID " + id)) {
            let tbody = document.getElementById("tbody")

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id === id) {
                    this.arrayProdutos.splice(i, 1)
                    // função para DELETAR ; indesse que quero deletar e quantos registros quero deletar
                    tbody.deleteRow(i)
                }
            }

        }
    }
}

let produto = new Produto()