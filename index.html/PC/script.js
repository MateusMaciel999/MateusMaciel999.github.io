
function adicionarAoCarrinho(produto) {
  alert(produto + ' foi adicionado ao carrinho!');
}

const openBtn = document.getElementById('menu-open-btn');
const closeBtn = document.getElementById('menu-close-btn');
const sidebar = document.getElementById('cart-sidebar');
const overlay = document.getElementById('overlay');

function openSidebar() {
  console.log('Abrindo sidebar...'); 
  if (sidebar && overlay) { 
    sidebar.classList.add('cart-open');
    overlay.classList.add('show');
    sidebar.setAttribute('aria-hidden', 'false');
    if (openBtn) {
      openBtn.classList.add('hidden'); 
    }
  } else {
    console.error("Erro: sidebar ou overlay não encontrados para abrir.");
  }
}

function closeSidebar() {
  console.log('Fechando sidebar...'); 
  if (sidebar && overlay) { 
    sidebar.classList.remove('cart-open');
    overlay.classList.remove('show');
    sidebar.setAttribute('aria-hidden', 'true');
    if (openBtn) {
      if (window.scrollY <= 10) { 
        openBtn.classList.remove('hidden');
      }
    }
  } else {
    console.error("Erro: sidebar ou overlay não encontrados para fechar.");
  }
}

if (openBtn) {
  openBtn.addEventListener('click', openSidebar);
} else {
  console.error("Erro: Botão de abrir menu (#menu-open-btn) não encontrado.");
}

if (closeBtn) {
  closeBtn.addEventListener('click', closeSidebar);
} else {
  console.error("Erro: Botão de fechar menu (#menu-close-btn) não encontrado.");
}

if (overlay) {
  overlay.addEventListener('click', closeSidebar);
} else {
  console.error("Erro: Overlay (#overlay) não encontrado.");
}

window.addEventListener('scroll', () => {
  if (openBtn && sidebar) { 
    if (window.scrollY > 10 && !sidebar.classList.contains('cart-open')) {
      openBtn.classList.add('hidden');
    } else if (!sidebar.classList.contains('cart-open')) {
      openBtn.classList.remove('hidden');
    }
  }
});
document.addEventListener('DOMContentLoaded', () => {
    const favoritoBtns = document.querySelectorAll('.favorito-btn');

    if (favoritoBtns.length > 0) {
        favoritoBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                toggleFavorito(btn); 
            });
        });
    } else {
        console.warn("Nenhum botão '.favorito-btn' encontrado no DOM.");
    }
});

function toggleFavorito(botao) {
  const img = botao.querySelector('img');
  const isFavorito = botao.getAttribute('data-favorito') === 'true';

  if (!isFavorito) {
    img.src = "img(Fotos)/heart-red.png" ;
    botao.setAttribute('data-favorito', 'true');
  } else {
    img.src = "img(Fotos)/heart-white.png";
    botao.setAttribute('data-favorito', 'false');
  }
}

function filtrarCategoria(categoria) {
  alert('Filtrando por categoria: ' + categoria);
}

function scrollCarrossel(direcao) {
  const carrossel = document.getElementById("carrossel");
  if (carrossel) {
    const larguraItem = 200; 
    carrossel.scrollBy({
      left: direcao * larguraItem,
      behavior: 'smooth'
    });
  }
}

document.getElementById("carrinho-btn").addEventListener("click", function () {
  window.location.href = "../Carrinho/Cindex.html";
});
