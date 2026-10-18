// ----- Mobile menu -----
const btn = document.getElementById('menuBtn');
const menu = document.getElementById('menu');

if (btn && menu) {
  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
  });
}

// ----- Category carousel -----
const row = document.getElementById('promoRow');
const dotsBox = document.getElementById('promoDots');

if (row && dotsBox) {
  let page = 0;
  let timer;

  const pages = () => Math.max(1, Math.ceil(row.scrollWidth / row.clientWidth));

  function markDot() {
    dotsBox.querySelectorAll('.dot').forEach((d, i) =>
      d.classList.toggle('active', i === page));
  }

  function goTo(i) {
    page = i;
    row.scrollTo({ left: i * row.clientWidth, behavior: 'smooth' });
    markDot();
  }

  function buildDots() {
    dotsBox.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const d = document.createElement('button');
      d.className = 'dot';
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', () => goTo(i));
      dotsBox.appendChild(d);
    }
    markDot();
  }

  function stop() { clearInterval(timer); }
  function start() {
    stop();
    timer = setInterval(() => goTo((page + 1) % pages()), 3000);
  }

  row.addEventListener('mouseenter', stop);
  row.addEventListener('mouseleave', start);
  row.addEventListener('touchstart', stop);
  row.addEventListener('touchend', start);

  row.addEventListener('scroll', () => {
    page = Math.round(row.scrollLeft / row.clientWidth);
    markDot();
  });

  window.addEventListener('resize', buildDots);
  buildDots();
  start();
}

// ----- Wishlist hearts -----
document.querySelectorAll('.wish-btn').forEach(function (heart) {
  heart.addEventListener('click', function () {
    heart.classList.toggle('liked');
  });
});

// ----- Deals arrow -----
const dealsRow = document.getElementById('dealsRow');
const dealsNext = document.getElementById('dealsNext');
const dealsPrev = document.getElementById('dealsPrev');

if (dealsRow && dealsNext && dealsPrev) {
  dealsNext.addEventListener('click', function () {
    dealsRow.scrollBy({ left: 400, behavior: 'smooth' });
  });
  dealsPrev.addEventListener('click', function () {
    dealsRow.scrollBy({ left: -400, behavior: 'smooth' });
  });
}