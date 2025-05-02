const menuItems = Array.from(document.querySelectorAll('.menu-item'));
const output    = document.getElementById('output');
let selected    = 0;

// stagger slide-up using CSS var --delay
menuItems.forEach((el, i) => {
  el.style.setProperty('--delay', `${0.1 * i + 0.2}s`);
});

// initial highlight
updateUI();

// click nav
menuItems.forEach((el, i) => {
  el.addEventListener('click', () => {
    selected = i;
    updateUI();
    activate(el.dataset.cmd);
  });
});

// arrow + enter nav
document.addEventListener('keydown', e => {
  if (['ArrowDown','ArrowUp','Enter'].includes(e.key)) {
    e.preventDefault();
    if (e.key === 'ArrowDown')   selected = (selected + 1) % menuItems.length;
    if (e.key === 'ArrowUp')     selected = (selected - 1 + menuItems.length) % menuItems.length;
    updateUI();
    if (e.key === 'Enter')       activate(menuItems[selected].dataset.cmd);
  }
});

function updateUI() {
  menuItems.forEach((el, i) =>
    el.classList.toggle('selected', i === selected)
  );
}

function activate(cmd) {
  switch(cmd) {
    case 'about':
        case 'about':
            output.textContent = 'I build break stuff on the internet (backend)';
            output.innerHTML = output.innerHTML.replace(
                'break',
                '<span class="strike">break</span>'
            );
            break;
          
      break;
    case 'projects':
      output.textContent = '• Terminal Portfolio\n• Code Sync Live IDE\n• WhisperNet DHT Demo\n• Blogging Sandbox Runner';
      break;
    case 'skills':
      output.textContent = 'Go · Python · JS · C++ · Concurrency · HTMX · Next.js · Prisma · Docker';
      break;
    case 'contact':
      output.innerHTML = '📧 you@domain.com<br>🐦 @your_twitter<br>💼 linkedin.com/in/mush1e';
      break;
    default:
      output.textContent = '';
  }
}
