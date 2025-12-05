let carrinho = []
let total = 0

// Adicionar no carrinho
function adicionar(nome, preco) {
  carrinho.push({ nome, preco })
  total += preco
  atualizarCarrinho()
}

function atualizarCarrinho() {
  const lista = document.getElementById("carrinho")
  const totalSpan = document.getElementById("total")

  if (!lista) return

  lista.innerHTML = ""

  carrinho.forEach(item => {
    const li = document.createElement("li")
    li.innerText = `${item.nome} - R$ ${item.preco.toFixed(2)}`
    lista.appendChild(li)
  })

  totalSpan.innerText = `Total: R$ ${total.toFixed(2)}`
}

// Finalizar pedido
function finalizarPedido() {
  const nome = document.getElementById("nomeCliente").value

  if (!nome || carrinho.length === 0) {
    alert("Preencha o seu nome e adicione um lanche!")
    return
  }

  let pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

  pedidos.push({
    cliente: nome,
    itens: carrinho,
    total: total,
    data: new Date().toLocaleString()
  })

  localStorage.setItem("pedidos", JSON.stringify(pedidos))

  alert("✅ Pedido realizado com sucesso!")

  carrinho = []
  total = 0
  atualizarCarrinho()
  document.getElementById("nomeCliente").value = ""
}

// Listar pedidos
if (document.getElementById("pedidos")) {
  const div = document.getElementById("pedidos")
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || []

  if (pedidos.length === 0) {
    div.innerHTML = "<p>Você ainda não fez nenhum pedido</p>"
  }

  pedidos.forEach(p => {
    const card = document.createElement("div")
    card.classList.add("um-produto")

    let itens = p.itens.map(i => i.nome).join(", ")

    card.innerHTML = `
      <h3>👤 ${p.cliente}</h3>
      <p>📅 ${p.data}</p>
      <p>🍔 ${itens}</p>
      <strong>Total: R$ ${p.total.toFixed(2)}</strong>
    `

    div.appendChild(card)
  })
}
// ANIMAÇÃO DOS PRODUTOS AO ROLAR A TELA
const produtos = document.querySelectorAll('.um-produto')

function animarProdutos() {
  produtos.forEach(produto => {
    const posicao = produto.getBoundingClientRect().top
    const tela = window.innerHeight

    if (posicao < tela - 100) {
      produto.classList.add('aparecer')
    }
  })
}

window.addEventListener('scroll', animarProdutos)
animarProdutos()

