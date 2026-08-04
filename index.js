// Spotify Audio State & Tracks
let isPlaying = false;
const tracks = [
  { name: '1. Lofi Chill Beat', artist: 'Free Ambient', url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3' },
  { name: '2. Synthwave Pulse', artist: 'Neon Dreams', url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=synthwave-80s-110045.mp3' },
  { name: '3. Cyberpunk Horizon', artist: 'Digital Waves', url: 'https://cdn.pixabay.com/download/audio/2021/09/06/audio_24b8686e08.mp3?filename=cyberpunk-2099-10701.mp3' }
];
let currentTrackIdx = 0;

// Unlock Desktop Function with PIN Password Check
function unlockDesktop() {
  const passInput = document.getElementById('loginPass');
  const errorMsg = document.getElementById('loginError');
  const loginScreen = document.getElementById('loginScreen');

  // Set PIN password here
  const correctPin = "1234";

  if (passInput && passInput.value === correctPin) {
    if (loginScreen) {
      loginScreen.classList.add('hidden');
      showToast('Logged in successfully!');
    }
    if (errorMsg) errorMsg.style.display = 'none';
  } else {
    if (errorMsg) errorMsg.style.display = 'block';
    if (passInput) {
      passInput.value = '';
      passInput.focus();
      passInput.style.borderColor = '#ff4757';
      setTimeout(() => { passInput.style.borderColor = 'rgba(255, 255, 255, 0.2)'; }, 1000);
    }
  }
}

// Live Clock
function updateClock() {
  const clockElement = document.getElementById('clock');
  if (!clockElement) return;
  const now = new Date();
  clockElement.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
setInterval(updateClock, 1000);
updateClock();

// Toast Notifications
function showToast(message) {
  const toast = document.getElementById('toastNotification');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}

// Start Menu Controls
function toggleStartMenu() {
  document.getElementById('startMenu').classList.toggle('active');
}

document.addEventListener('click', (event) => {
  const startMenu = document.getElementById('startMenu');
  if (!event.target.closest('.taskbar') && !event.target.closest('.start-menu') && startMenu.classList.contains('active')) {
    startMenu.classList.remove('active');
  }
});

// Window Controls
function closeWindow() {
  const win = document.getElementById('appWindow');
  win.classList.remove('active', 'minimized', 'maximized');
  if (window.snakeInterval) clearInterval(window.snakeInterval);
}

function minimizeWindow() {
  const win = document.getElementById('appWindow');
  win.classList.toggle('minimized');
}

function maximizeWindow() {
  const win = document.getElementById('appWindow');
  win.classList.toggle('maximized');
}

// Application Launcher
function openApp(appKey) {
  const win = document.getElementById('appWindow');
  const title = document.getElementById('windowTitle');
  const body = document.getElementById('windowBody');

  if (window.snakeInterval) clearInterval(window.snakeInterval);

  const startMenu = document.getElementById('startMenu');
  if (startMenu) startMenu.classList.remove('active');
  win.classList.remove('minimized');
  win.classList.add('active');

  switch (appKey) {
    case 'spotify':
      title.innerHTML = `<span>🎧</span> Spotify`;
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; height: 100%; background: #121212; color: white; padding: 20px; box-sizing: border-box; font-family: sans-serif;">
          <div style="display: flex; align-items: center; gap: 20px; background: #181818; padding: 15px; border-radius: 8px;">
            <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #1db954, #191414); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 32px;">🎵</div>
            <div>
              <div id="trackTitle" style="font-size: 18px; font-weight: bold;">${tracks[currentTrackIdx].name}</div>
              <div id="trackArtist" style="color: #b3b3b3; font-size: 14px; margin-top: 4px;">${tracks[currentTrackIdx].artist}</div>
            </div>
          </div>
          
          <div style="margin-top: 20px; display: flex; flex-direction: column; gap: 10px;">
            ${tracks.map((t, idx) => `
              <div style="display: flex; justify-content: space-between; align-items: center; background: #282828; padding: 10px 15px; border-radius: 4px; cursor: pointer;" onclick="playSelectedTrack(${idx})">
                <span>${t.name}</span>
                <span style="color: #1db954; font-size: 12px;">${idx === currentTrackIdx ? '▶ Active' : ''}</span>
              </div>
            `).join('')}
          </div>

          <div style="margin-top: auto; background: #181818; padding: 12px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between;">
            <button onclick="prevTrack()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">⏮</button>
            <button id="playBtn" onclick="toggleAudio()" style="background: #1db954; border: none; color: white; border-radius: 50%; width: 40px; height: 40px; cursor: pointer; font-size: 16px;">${isPlaying ? '⏸' : '▶'}</button>
            <button onclick="nextTrack()" style="background: none; border: none; color: white; cursor: pointer; font-size: 18px;">⏭</button>
          </div>
        </div>
      `;
      break;

    case 'minesweeper':
      title.innerHTML = `<span>💣</span> Minesweeper`;
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px; background: #111;">
          <div style="display: flex; gap: 20px; color: white; font-weight: bold; font-size: 14px;">
            <span>💣 Mines Left: <span id="mineCount">10</span></span>
            <button onclick="initMinesweeper()" style="padding: 4px 12px; border-radius: 6px; cursor: pointer;">🔄 Reset</button>
          </div>
          <div id="minesweeperBoard" style="display: grid; grid-template-columns: repeat(8, 36px); gap: 4px; background: #222; padding: 10px; border-radius: 8px;"></div>
        </div>
      `;
      initMinesweeper();
      break;

    case 'snake':
      title.innerHTML = `<span>🐍</span> Snake Game`;
      body.innerHTML = `
        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; background: #111; gap: 10px;">
          <div style="color: white; font-weight: bold; font-size: 14px;">Score: <span id="snakeScore">0</span></div>
          <canvas id="snakeCanvas" width="300" height="300" style="background: #000; border: 2px solid #333; border-radius: 8px;"></canvas>
          <div style="color: #aaa; font-size: 11px;">Use Arrow Keys or WASD to move</div>
        </div>
      `;
      initSnake();
      break;

    case 'terminal':
      title.innerHTML = `<span>>_</span> Windows Terminal`;
      body.innerHTML = `
        <div class="terminal-container" id="terminal">
          <div class="terminal-output" id="termOutput">Windows PowerShell [Version 12.0.22621.1]
(c) Microsoft Corporation. All rights reserved.

Type 'neofetch', 'minesweeper', 'snake', 'spotify', or 'help' to get started.
</div>
          <div class="terminal-input-row">
            <span class="terminal-prompt">PS C:\\Users\\User></span>
            <input type="text" class="terminal-input" id="termInput" autofocus onkeydown="handleTermCommand(event)">
          </div>
        </div>
      `;
      setTimeout(() => document.getElementById('termInput')?.focus(), 100);
      break;

    case 'browser':
      title.innerHTML = `<span>🌐</span> Microsoft Edge`;
      body.innerHTML = `
        <div class="browser-bar">
          <input type="text" id="browserUrl" placeholder="Search web or type URL..." value="https://lite.duckduckgo.com/lite/" onkeydown="handleBrowserKey(event)">
          <button onclick="navigateBrowser()">Go</button>
          <button onclick="openExternalBrowser()" title="Open blocked sites in a new window">↗ New Tab</button>
        </div>
        <iframe class="browser-content" id="browserFrame" src="https://lite.duckduckgo.com/lite/"></iframe>
      `;
      break;

    case 'copilot':
      title.innerHTML = `<span>🤖</span> Copilot AI`;
      body.innerHTML = `
        <div class="copilot-container">
          <div class="chat-history" id="chatHistory">
            <div class="chat-bubble ai">Hello! I am Windows 12 Copilot. How can I assist you today?</div>
          </div>
          <div class="chat-input-box">
            <input type="text" id="copilotInput" placeholder="Ask anything..." onkeydown="if(event.key==='Enter') sendCopilotMsg()">
            <button onclick="sendCopilotMsg()">Send</button>
          </div>
        </div>
      `;
      break;

    case 'settings':
      title.innerHTML = `<span>⚙️</span> System Settings`;
      body.innerHTML = `
        <div class="settings-layout">
          <div class="settings-sidebar">
            <div class="settings-sidebar-item active" onclick="switchSettingsTab('system', this)">System</div>
            <div class="settings-sidebar-item" onclick="switchSettingsTab('personalization', this)">Personalization</div>
            <div class="settings-sidebar-item" onclick="switchSettingsTab('copilot', this)">Copilot AI</div>
            <div class="settings-sidebar-item" onclick="switchSettingsTab('privacy', this)">Privacy</div>
          </div>
          <div class="settings-content">
            <div class="settings-panel active" id="panel-system">
              <h2>System Settings</h2>
              <div class="setting-row">
                <span>Glassmorphism Blur Effects</span>
                <input type="checkbox" checked onchange="toggleGlassEffect(this.checked)">
              </div>
            </div>

            <div class="settings-panel" id="panel-personalization">
              <h2>Personalization</h2>
              <div class="setting-row">
                <span>Custom Wallpaper (From PC)</span>
                <label class="upload-btn">
                  Choose Image
                  <input type="file" id="wallpaperUpload" accept="image/*" style="display:none;" onchange="handleCustomWallpaper(event)">
                </label>
              </div>
              <div class="setting-row">
                <span>Light Wallpaper Preset</span>
                <input type="checkbox" onchange="toggleTheme(this.checked)">
              </div>
            </div>

            <div class="settings-panel" id="panel-copilot">
              <h2>Copilot AI Settings</h2>
              <div class="setting-row">
                <span>Enable Smart Suggestions</span>
                <input type="checkbox" checked onchange="showToast('Copilot settings updated')">
              </div>
            </div>

            <div class="settings-panel" id="panel-privacy">
              <h2>Privacy & Security</h2>
              <div class="setting-row">
                <span>Location Access</span>
                <input type="checkbox" checked onchange="showToast('Location permissions updated')">
              </div>
            </div>
          </div>
        </div>
      `;
      break;

    case 'files':
    case 'pc':
      title.innerHTML = `<span>📁</span> File Explorer`;
      body.innerHTML = `
        <div class="explorer-grid">
          <div class="explorer-folder" onclick="showToast('Opening Documents...')">
            <div style="font-size: 32px;">📁</div>
            <span>Documents</span>
          </div>
          <div class="explorer-folder" onclick="showToast('Opening Pictures...')">
            <div style="font-size: 32px;">🖼️</div>
            <span>Pictures</span>
          </div>
        </div>
      `;
      break;
  }
}

/* SPOTIFY REAL PLAYER CONTROLS */
function toggleAudio() {
  const audio = document.getElementById('spotifyAudio');
  const btn = document.getElementById('playBtn');

  if (!audio.src) {
    audio.src = tracks[currentTrackIdx].url;
  }

  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    if (btn) btn.innerText = '▶';
  } else {
    audio.play();
    isPlaying = true;
    if (btn) btn.innerText = '⏸';
    showToast(`Playing: ${tracks[currentTrackIdx].name}`);
  }
}

function playSelectedTrack(idx) {
  currentTrackIdx = idx;
  const audio = document.getElementById('spotifyAudio');
  audio.src = tracks[currentTrackIdx].url;
  isPlaying = false;
  toggleAudio();
  openApp('spotify');
}

function nextTrack() {
  currentTrackIdx = (currentTrackIdx + 1) % tracks.length;
  playSelectedTrack(currentTrackIdx);
}

function prevTrack() {
  currentTrackIdx = (currentTrackIdx - 1 + tracks.length) % tracks.length;
  playSelectedTrack(currentTrackIdx);
}

/* MINESWEEPER LOGIC */
function initMinesweeper() {
  const board = document.getElementById('minesweeperBoard');
  if (!board) return;

  const rows = 8, cols = 8, mines = 10;
  let grid = [];
  board.innerHTML = '';

  for (let r = 0; r < rows; r++) {
    grid[r] = [];
    for (let c = 0; c < cols; c++) {
      grid[r][c] = { mine: false, count: 0, revealed: false, flagged: false };
    }
  }

  let planted = 0;
  while (planted < mines) {
    let r = Math.floor(Math.random() * rows);
    let c = Math.floor(Math.random() * cols);
    if (!grid[r][c].mine) {
      grid[r][c].mine = true;
      planted++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          let nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc].mine) count++;
        }
      }
      grid[r][c].count = count;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cell = document.createElement('button');
      cell.style.cssText = "width:36px; height:36px; background:#444; border:none; border-radius:4px; font-weight:bold; color:white; font-size:14px; cursor:pointer;";
      
      cell.onclick = () => revealCell(r, c, grid, rows, cols, mines);
      cell.oncontextmenu = (e) => {
        e.preventDefault();
        flagCell(r, c, grid, cell);
      };
      cell.id = `cell-${r}-${c}`;
      board.appendChild(cell);
    }
  }
}

function flagCell(r, c, grid, cell) {
  if (grid[r][c].revealed) return;
  grid[r][c].flagged = !grid[r][c].flagged;
  cell.innerText = grid[r][c].flagged ? '🚩' : '';
}

function revealCell(r, c, grid, rows, cols, totalMines) {
  if (grid[r][c].revealed || grid[r][c].flagged) return;

  let cell = document.getElementById(`cell-${r}-${c}`);
  grid[r][c].revealed = true;

  if (grid[r][c].mine) {
    cell.style.background = '#e74c3c';
    cell.innerText = '💣';
    showToast('Game Over! You hit a mine!');
    return;
  }

  cell.style.background = '#222';
  if (grid[r][c].count > 0) {
    cell.innerText = grid[r][c].count;
  } else {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        let nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
          revealCell(nr, nc, grid, rows, cols, totalMines);
        }
      }
    }
  }
}

/* SNAKE LOGIC */
function initSnake() {
  const canvas = document.getElementById('snakeCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const gridSize = 15;
  const tileCount = canvas.width / gridSize;
  let snake = [{ x: 10, y: 10 }];
  let food = { x: 5, y: 5 };
  let dx = 1, dy = 0;
  let score = 0;

  function handleInput(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') { if (dy === 0) { dx = 0; dy = -1; } }
    if (e.key === 'ArrowDown' || e.key === 's') { if (dy === 0) { dx = 0; dy = 1; } }
    if (e.key === 'ArrowLeft' || e.key === 'a') { if (dx === 0) { dx = -1; dy = 0; } }
    if (e.key === 'ArrowRight' || e.key === 'd') { if (dx === 0) { dx = 1; dy = 0; } }
  }

  document.removeEventListener('keydown', handleInput);
  document.addEventListener('keydown', handleInput);

  window.snakeInterval = setInterval(() => {
    let head = { x: snake[0].x + dx, y: snake[0].y + dy };

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
      clearInterval(window.snakeInterval);
      showToast('Game Over! Snake crashed into the wall.');
      return;
    }

    for (let segment of snake) {
      if (head.x === segment.x && head.y === segment.y) {
        clearInterval(window.snakeInterval);
        showToast('Game Over! Snake ate itself.');
        return;
      }
    }

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      score += 10;
      document.getElementById('snakeScore').innerText = score;
      food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
      };
    } else {
      snake.pop();
    }

    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    snake.forEach((seg, index) => {
      ctx.fillStyle = index === 0 ? '#8a2be2' : '#00d2ff';
      ctx.fillRect(seg.x * gridSize, seg.y * gridSize, gridSize - 1, gridSize - 1);
    });

    ctx.fillStyle = '#ff4757';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 1, gridSize - 1);
  }, 100);
}

/* SETTINGS & UTILITIES */
function switchSettingsTab(tabName, element) {
  document.querySelectorAll('.settings-sidebar-item').forEach(i => i.classList.remove('active'));
  element.classList.add('active');

  document.querySelectorAll('.settings-panel').forEach(p => p.classList.remove('active'));
  const activePanel = document.getElementById(`panel-${tabName}`);
  if (activePanel) activePanel.classList.add('active');
}

function handleCustomWallpaper(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
      showToast('Desktop wallpaper updated successfully!');
    };
    reader.readAsDataURL(file);
  }
}

function toggleGlassEffect(enabled) {
  if (enabled) {
    document.body.classList.remove('no-glass');
    showToast('Glassmorphism enabled');
  } else {
    document.body.classList.add('no-glass');
    showToast('Glassmorphism disabled');
  }
}

function toggleTheme(isLight) {
  if (isLight) {
    document.body.classList.add('light-theme');
    showToast('Switched to Light wallpaper');
  } else {
    document.body.classList.remove('light-theme');
    showToast('Switched to Dark wallpaper');
  }
}

function handleBrowserKey(event) {
  if (event.key === 'Enter') navigateBrowser();
}

function navigateBrowser() {
  const urlInput = document.getElementById('browserUrl');
  const frame = document.getElementById('browserFrame');
  if (!urlInput || !frame) return;

  let query = urlInput.value.trim();
  if (!query) return;

  if (query.startsWith('http://') || query.startsWith('https://')) {
    frame.src = query;
  } else if (query.includes('.') && !query.includes(' ')) {
    frame.src = 'https://' + query;
    urlInput.value = 'https://' + query;
  } else {
    frame.src = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
  }
  showToast('Loading...');
}

function openExternalBrowser() {
  const urlInput = document.getElementById('browserUrl');
  if (!urlInput) return;
  let target = urlInput.value.trim();
  if (!target.startsWith('http')) target = 'https://' + target;
  window.open(target, '_blank');
}

// Terminal Engine
function handleTermCommand(event) {
  if (event.key === 'Enter') {
    const input = document.getElementById('termInput');
    const output = document.getElementById('termOutput');
    const cmd = input.value.trim().toLowerCase();

    output.innerHTML += `\nPS C:\\Users\\User> ${input.value}\n`;

    if (cmd === 'neofetch') {
      const neofetchOutput = `
<div style="font-family: monospace; white-space: pre; line-height: 1.25; margin-top: 10px;">
<span style="color: #a020f0;">  0*0-0*0</span> <span style="color: #8a2be2;">0*0-0*0</span>     <span style="color: #a020f0; font-weight:bold;">User</span><span style="color: #00d2ff; font-weight:bold;">@Windows12-PC</span>
<span style="color: #9225e8;">  *0-0*0-</span> <span style="color: #7b3fe4;">*0-0*0-</span>     -------------------
<span style="color: #842be0;">  0-0*0*0</span> <span style="color: #6c53d6;">0-0*0*0</span>     <span style="color: #a020f0; font-weight:bold;">OS:</span> Windows 12 Pro (Concept) x86_64
                            <span style="color: #a020f0; font-weight:bold;">Kernel:</span> 12.0.2026.1-web
<span style="color: #635ebd;">  0*0-0*0</span> <span style="color: #4b73b5;">0*0-0*0</span>     <span style="color: #a020f0; font-weight:bold;">Uptime:</span> 18 mins
<span style="color: #407fcb;">  *0-0*0-</span> <span style="color: #2893dd;">*0-0*0-</span>     <span style="color: #00d2ff; font-weight:bold;">Shell:</span> PowerShell 7.4
<span style="color: #1ea7ee;">  0-0*0*0</span> <span style="color: #00d2ff;">0-0*0*0</span>     <span style="color: #00d2ff; font-weight:bold;">Memory:</span> 4210MiB / 32768MiB
</div>
      `;
      output.innerHTML += neofetchOutput;
    } else if (cmd === 'minesweeper') {
      openApp('minesweeper');
    } else if (cmd === 'snake') {
      openApp('snake');
    } else if (cmd === 'spotify') {
      openApp('spotify');
    } else if (cmd === 'clear') {
      output.innerHTML = '';
    } else if (cmd === 'help') {
      output.innerHTML += `Commands: neofetch, minesweeper, snake, spotify, clear, help, echo, date\n`;
    } else if (cmd.startsWith('echo ')) {
      output.innerHTML += cmd.substring(5) + '\n';
    } else if (cmd === 'date') {
      output.innerHTML += new Date().toString() + '\n';
    } else if (cmd !== '') {
      output.innerHTML += `'${cmd}' is not recognized as an internal command.\n`;
    }

    input.value = '';
    const termContainer = document.getElementById('terminal');
    termContainer.scrollTop = termContainer.scrollHeight;
  }
}

// Conversational AI Copilot Engine
function sendCopilotMsg() {
  const input = document.getElementById('copilotInput');
  const history = document.getElementById('chatHistory');
  if (!input || !input.value.trim()) return;

  const userText = input.value.trim();
  history.innerHTML += `<div class="chat-bubble user">${userText}</div>`;
  input.value = '';

  setTimeout(() => {
    let response = generateAIResponse(userText);
    history.innerHTML += `<div class="chat-bubble ai">${response}</div>`;
    history.scrollTop = history.scrollHeight;
  }, 400);
}

function generateAIResponse(text) {
  const lower = text.toLowerCase();
  if (lower.includes('hello') || lower.includes('hi')) return "Hello! How can I assist you with your Windows 12 concept today?";
  if (lower.includes('how are you')) return "I'm doing well! Ready to help you test out the desktop interface.";
  if (lower.includes('wallpaper') || lower.includes('background')) return "You can change your wallpaper by opening Settings -> Personalization and clicking 'Choose Image'!";
  return `Got it! Let me know if you need help with apps, browser search, wallpaper settings, or playing games like Snake & Minesweeper!`;
}
