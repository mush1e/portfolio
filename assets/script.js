const terminal = document.getElementById('terminal');

// ASCII banner for “mush1e”
// ASCII banner for “mush1e”
const ASCII = [
    "███╗   ███╗██╗   ██╗███████╗██╗  ██╗ ██╗███████╗",
    "████╗ ████║██║   ██║██╔════╝██║  ██║███║██╔════╝",
    "██╔████╔██║██║   ██║███████╗███████║╚██║█████╗  ",
    "██║╚██╔╝██║██║   ██║╚════██║██╔══██║ ██║██╔══╝  ",
    "██║ ╚═╝ ██║╚██████╔╝███████║██║  ██║ ██║███████╗",
    "╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═╝╚══════╝"
  ];
  

// helper to print a line with typewriter effect
function typeLine(text, cb) {
  const lineEl = document.createElement('div');
  lineEl.className = 'line';
  terminal.appendChild(lineEl);

  let i = 0;
  const t = setInterval(() => {
    lineEl.textContent += text[i++];
    if (i === text.length) {
      clearInterval(t);
      lineEl.querySelector('.cursor')?.remove();
      cb && cb();
    }
  }, 30);

  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  lineEl.appendChild(cursor);
}

// print the ASCII banner recursively
function printBanner(lines, idx, cb) {
  if (idx >= lines.length) return cb();
  typeLine(lines[idx], () => printBanner(lines, idx + 1, cb));
}

// available commands
const COMMANDS = {
  help:    'help: show commands\nabout: who am I\nprojects: what I’ve built\nskills: my skillset\nresume: download my resume\ngithub: my GitHub\nlinkedin: my LinkedIn\nbanner: show banner\nclear: clear screen',
  about:   '🚀 I’m mush1e, a backend hacker & frontend nerd based in Toronto.',
  projects:'• Terminal Portfolio\n• Code Sync Live IDE\n• WhisperNet DHT Demo\n• Blogging Sandbox Runner',
  skills:  'Go · Python · JavaScript · C++ · Competitive Programming · Go Concurrency · HTMX · Next.js · Prisma · Supabase · Docker',
  resume:  'Grab my resume: https://yourdomain.com/mush1e_resume.pdf',
  github:  'https://github.com/mush1e',
  linkedin:'https://linkedin.com/in/mush1e'
};

// show the “$ ” prompt
function promptInput() {
  const promptLine = document.createElement('div');
  promptLine.className = 'line';
  promptLine.innerHTML = '<span class="prompt">$</span> ';
  terminal.appendChild(promptLine);

  const input = document.createElement('input');
  input.className = 'cmd';
  promptLine.appendChild(input);
  input.focus();

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const cmd = input.value.trim();
      input.disabled = true;
      runCommand(cmd);
    }
  });
}

// handle built-in commands
function runCommand(cmd) {
  if (cmd === 'clear') {
    terminal.innerHTML = '';
    return promptInput();
  }
  if (cmd === 'banner') {
    return printBanner(ASCII, 0, promptInput);
  }
  const out = COMMANDS[cmd] ?? `command not found: ${cmd}`;
  typeLine(out, promptInput);
}

// start up
printBanner(ASCII, 0, () => {
  typeLine('Welcome to mush1e’s terminal! Type “help” to begin.', promptInput);
});
