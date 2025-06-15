document.addEventListener('DOMContentLoaded', () => {
  // Optional: JavaScript to handle hover fallback for dropdowns (if needed)

  document.querySelectorAll('.dropdown-wrapper').forEach(wrapper => {
    const dropdown = wrapper.querySelector('.dropdown-box');

    wrapper.addEventListener('mouseenter', () => {
      dropdown.style.display = 'flex';
    });

    wrapper.addEventListener('mouseleave', () => {
      dropdown.style.display = 'none';
    });
  });

  // Toggle mobile menu and icons
  const toggleButton = document.querySelector('.menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (toggleButton && mobileMenu) {
    const openIcon = toggleButton.querySelector('.open-icon');
    const closeIcon = toggleButton.querySelector('.close-icon');

    toggleButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      const isActive = mobileMenu.classList.contains('active');
      if (openIcon) openIcon.style.display = isActive ? 'none' : 'inline';
      if (closeIcon) closeIcon.style.display = isActive ? 'inline' : 'none';
    });
  }
});

const sendBtn = document.getElementById('sendBtn');
const input = document.getElementById('userInput');
const messages = document.getElementById('messages');

// Store chat history for context
const chatHistory = [
  { role: 'bot', content: "Hi! I'm a chatbot that only answers to questions about Wipro (company, news, jobs, etc.)." }
];

// Display initial system message with beautified style
messages.innerHTML += `<div class="message bot-message"><strong>Bot:</strong> ${beautifyBotText(chatHistory[0].content)}</div>`;

// Helper to beautify bot text (supports **bold**, *italic*, and line breaks)
function beautifyBotText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')   // Bold
    .replace(/\*(.+?)\*/g, '<em>$1</em>')               // Italic
    .replace(/\n/g, '<br>');                            // Line breaks
}

async function getBotResponse(userMessage) {
  chatHistory.push({ role: 'user', content: userMessage });

  // Prepare prompt with chat history for context
  const prompt = chatHistory.map(turn =>
    `${turn.role === 'user' ? 'User' : 'Bot'}: ${turn.content}`
  ).join('\n') + '\nBot:';

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${config.API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
      }
    );
    const data = await response.json();
    const botReply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't answer that.";
    chatHistory.push({ role: 'bot', content: botReply });
    return botReply;
  } catch (err) {
    return "Error: Could not connect to server.";
  }
}

async function sendMessage() {
  const userMessage = input.value.trim();
  if (!userMessage) return;

  // Render user message with beautified style
  messages.innerHTML += `<div class="message user-message"><strong>You:</strong> ${userMessage}</div>`;
  input.value = '';
  messages.scrollTop = messages.scrollHeight;

  const botReply = await getBotResponse(userMessage);

  // Render bot message with beautified style
  messages.innerHTML += `<div class="message bot-message"><strong>Bot:</strong> ${beautifyBotText(botReply)}</div>`;
  messages.scrollTop = messages.scrollHeight;
}

sendBtn.onclick = sendMessage;
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});


const chatToggle = document.getElementById('chatToggle');
const chatbot = document.getElementById('chatbot');

chatToggle.addEventListener('click', () => {
  if (chatbot.style.display === 'none' || chatbot.style.display === '') {
    chatbot.style.display = 'flex';  // Show chatbot
    chatToggle.style.display = 'none'; // Hide toggle button when chatbot is open
  }
});

// Optional: Add a close button inside chatbot to hide it and show toggle again
const closeBtn = document.createElement('button');
closeBtn.textContent = '×';
closeBtn.title = 'Close Chatbot';
closeBtn.style.position = 'absolute';
closeBtn.style.top = '8px';
closeBtn.style.right = '12px';
closeBtn.style.background = 'transparent';
closeBtn.style.border = 'none';
closeBtn.style.fontSize = '24px';
closeBtn.style.cursor = 'pointer';
closeBtn.style.color = '#666';

chatbot.appendChild(closeBtn);

closeBtn.addEventListener('click', () => {
  chatbot.style.display = 'none';  // Hide chatbot
  chatToggle.style.display = 'block'; // Show toggle button
});


