const API_URL = "https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"; 

async function buscarCotacoes() {
  const res = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL"); 
  const data = await res.json();
  cotacoes.USD = parseFloat(data.USDBRL.bid);
  cotacoes.EUR = parseFloat(data.EURBRL.bid);
  cotacoes.BTC = parseFloat(data.BTCBRL.bid);
} {
  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Limpa conteúdo anterior

    const moedas = Object.values(dados);

    moedas.forEach(moeda => {
      const card = document.createElement("div");
      card.className = "moeda-card";

      card.innerHTML = `
        <div class="nome">${moeda.name}</div>
        <div class="valor">R$ ${parseFloat(moeda.bid).toFixed(2)}</div>
        <div class="variacoes">
          Alta: R$ ${parseFloat(moeda.high).toFixed(2)} | 
          Baixa: R$ ${parseFloat(moeda.low).toFixed(2)}<br>
          Variação: ${moeda.varBid} (${moeda.pctChange}%)
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar cotações:", error);
    alert("Não foi possível carregar as cotações.");
  }
}

// Carrega automaticamente ao abrir a página
window.onload = buscarCotacoes;

// Atualiza a cada 60 segundos
setInterval(buscarCotacoes, 60000);