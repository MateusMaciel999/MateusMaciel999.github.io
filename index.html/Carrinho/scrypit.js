
window.addEventListener('DOMContentLoaded', () => {
  const produtos = [
    {
      nome: 'Camisa Casual Masculino',
      preco: 89.99,
      imagem: 'img-fotos/imgCamisaM.webp',
      estrelas: 5,
      precoAntigo: 99.99,
      desconto: '10% OFF'
    },
    {
      nome: 'Calça Feminina',
      preco: 149.99,
      imagem: 'img-fotos/imgCalçaF.webp',
      estrelas: 2
    },
    {
      nome: 'Camisa Branca Masculina',
      preco: 129.99,
      imagem: 'img-fotos/imgCamisaBranca.webp',
      estrelas: 5
    }
  ];

  const container = document.querySelector('.cart-items');

  produtos.forEach(prod => {
    const card = document.createElement('article');
    card.className = 'card';
    card.dataset.price = prod.preco;

    const estrelas = '★★★★★☆☆☆☆☆'.slice(5 - prod.estrelas, 10 - prod.estrelas);
    const precoAntigo = prod.precoAntigo
      ? `<span class="old">R$ ${prod.precoAntigo.toFixed(2).replace('.', ',')}</span>`
      : '';
    const desconto = prod.desconto ? `<span class="discount">${prod.desconto}</span>` : '';

    card.innerHTML = `
      <button class="icon-btn share" title="Compartilhar produto"></button>
      <button class="icon-btn favorite" title="Favoritar"></button>
      <img src="${prod.imagem}" alt="${prod.nome}" />
      <h3>${prod.nome}</h3>
      <div class="rating" role="img">${estrelas}</div>
      <div class="price-box">
        <span class="current">R$ ${prod.preco.toFixed(2).replace('.', ',')}</span>
        ${precoAntigo}
        ${desconto}
      </div>
      <div class="qty-box">
        <button class="qty-btn minus">-</button>
        <span class="qty">1</span>
        <button class="qty-btn plus">+</button>
      </div>
    `;
    container.appendChild(card);
  });

  const qs = (s, c = document) => c.querySelector(s);
  const qsa = (s, c = document) => [...c.querySelectorAll(s)];

  function updateTotal() {
    let total = 0;
    qsa('.card').forEach(card => {
      const price = parseFloat(card.dataset.price);
      const qty = parseInt(qs('.qty', card).textContent, 10);
      total += price * qty;
    });
    if (window.appliedCoupon) total *= 0.9;
    qs('#total-price').textContent = total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  container.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;

    const card = btn.closest('.card');
    if (btn.classList.contains('plus')) {
      let qty = parseInt(qs('.qty', card).textContent);
      qs('.qty', card).textContent = qty + 1;
    } else if (btn.classList.contains('minus')) {
      let qty = parseInt(qs('.qty', card).textContent);
      if (qty > 1) qs('.qty', card).textContent = qty - 1;
    } else if (btn.classList.contains('favorite')) {
      btn.classList.toggle('active');
    } else if (btn.classList.contains('share')) {
      const name = qs('h3', card).textContent;
      const shareText = `Confira este produto: ${name}`;
      if (navigator.share) {
        navigator.share({ title: name, text: shareText, url: window.location.href });
      } else {
        navigator.clipboard.writeText(shareText);
        alert('Texto copiado!');
      }
    }
    updateTotal();
  });

  qs('#coupon-input').addEventListener('blur', applyCoupon);
  qs('#coupon-input').addEventListener('keyup', e => e.key === 'Enter' && applyCoupon());

  function applyCoupon() {
    const code = qs('#coupon-input').value.trim().toUpperCase();
    if (code === 'LOOK10') {
      window.appliedCoupon = true;
      alert('Cupom aplicado!');
    } else {
      window.appliedCoupon = false;
    }
    updateTotal();
  }

  qs('#continue-btn').addEventListener('click', () => {
    window.location.href = '../PC/index.html';
  });
  qs('#checkout-btn').addEventListener('click', () => {
    alert('Compra finalizada com sucesso!');
  });

  updateTotal();
});


