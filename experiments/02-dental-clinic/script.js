document.addEventListener('DOMContentLoaded', () => {
    // ---- 1. Navbar Logic
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ---- 1b. Hamburger Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('open');
            });
        });
    }

    // ---- 2. Global Save Lead Function (to localStorage)
    const saveLead = (leadData) => {
        const existing = JSON.parse(localStorage.getItem('dentalLeads')) || [];
        existing.push({
            ...leadData,
            date: new Date().toLocaleString()
        });
        localStorage.setItem('dentalLeads', JSON.stringify(existing));
    };

    // ---- 3. Main Hero Form Logic
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');

    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = leadForm.querySelector('button[type="submit"]');
            btn.textContent = 'Processing...';
            btn.style.cursor = 'wait';
            btn.disabled = true;

            // Gather inputs dynamically
            const inputs = leadForm.querySelectorAll('input, select');
            let data = { source: 'Hero Form', service: 'General Inquiry', name: 'Unknown', phone: 'Unknown' };
            inputs.forEach(inp => {
                const type = inp.type || inp.tagName.toLowerCase();
                const val = inp.value;
                if (type === 'tel') data.phone = val;
                else if (inp.tagName.toLowerCase() === 'select') data.service = inp.options[inp.selectedIndex].text;
                else if (type === 'text') data.name = val;
            });

            setTimeout(() => {
                saveLead(data);
                leadForm.classList.add('hidden');
                formSuccess.classList.remove('hidden');
            }, 800);
        });
    }

    // ---- 4. Live Agent Chatbot Widget
    injectChatWidget();

    function injectChatWidget() {
        // Inject HTML
        const chatHTML = `
            <div id="liveAgentWidget" style="position:fixed; bottom:20px; right:20px; z-index:9999; font-family:'Plus Jakarta Sans', sans-serif;">
                <!-- Chat Window -->
                <div id="chatWindow" style="display:none; width:320px; background:white; border-radius:12px; box-shadow:0 10px 25px rgba(0,0,0,0.15); border:1px solid #e2e8f0; overflow:hidden; margin-bottom:15px;">
                    <div style="background:#0ea5e9; color:white; padding:15px; font-weight:600; display:flex; justify-content:space-between; align-items:center;">
                        <div>👩‍⚕️ Dr. Sarah (Live Agent)</div>
                        <button id="closeChatBtn" style="background:none; border:none; color:white; cursor:pointer; font-size:1.2rem;">&times;</button>
                    </div>
                    <div id="chatMessages" style="height:250px; overflow-y:auto; padding:15px; background:#f8fafc; display:flex; flex-direction:column; gap:10px;">
                        <!-- Messages go here -->
                    </div>
                    <div style="padding:10px; border-top:1px solid #e2e8f0; background:white; display:flex; gap:5px;">
                        <input type="text" id="chatInput" placeholder="Type a message..." style="flex:1; padding:8px 12px; border:1px solid #cbd5e1; border-radius:20px; outline:none;">
                        <button id="chatSendBtn" style="background:#0ea5e9; color:white; border:none; padding:8px 15px; border-radius:20px; cursor:pointer; font-weight:600;">Send</button>
                    </div>
                </div>
                <!-- Floating Bubble -->
                <button id="chatFab" style="width:60px; height:60px; border-radius:50%; background:#0ea5e9; color:white; border:none; box-shadow:0 4px 10px rgba(14,165,233,0.4); cursor:pointer; font-size:1.5rem; display:flex; align-items:center; justify-content:center; float:right; transition:transform 0.2s;">
                    💬
                </button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', chatHTML);

        // Chat logic
        const chatFab = document.getElementById('chatFab');
        const chatWindow = document.getElementById('chatWindow');
        const closeChatBtn = document.getElementById('closeChatBtn');
        const chatMessages = document.getElementById('chatMessages');
        const chatInput = document.getElementById('chatInput');
        const chatSendBtn = document.getElementById('chatSendBtn');

        let chatState = 0;
        let chatData = { source: 'Live Agent', name: '', phone: '', service: '' };

        const appendMsg = (text, isAgent) => {
            const div = document.createElement('div');
            div.style.padding = '8px 12px';
            div.style.borderRadius = '12px';
            div.style.maxWidth = '80%';
            div.style.fontSize = '0.9rem';
            if (isAgent) {
                div.style.background = '#e0f2fe';
                div.style.color = '#0369a1';
                div.style.alignSelf = 'flex-start';
                div.style.borderBottomLeftRadius = '2px';
            } else {
                div.style.background = '#0ea5e9';
                div.style.color = 'white';
                div.style.alignSelf = 'flex-end';
                div.style.borderBottomRightRadius = '2px';
            }
            div.textContent = text;
            chatMessages.appendChild(div);
            // Auto scroll
            chatMessages.scrollTop = chatMessages.scrollHeight;
        };

        const botReply = (text) => {
            setTimeout(() => appendMsg(text, true), 600);
        };

        chatFab.addEventListener('click', () => {
            chatWindow.style.display = 'block';
            chatFab.style.display = 'none';
            if (chatState === 0) {
                botReply("Hi there! I'm Dr. Sarah. Are you looking to book an appointment with our New York clinic today?");
                chatState = 1;
            }
        });

        closeChatBtn.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatFab.style.display = 'flex';
        });

        const handleSend = () => {
            const val = chatInput.value.trim();
            if (!val) return;
            appendMsg(val, false);
            chatInput.value = '';

            if (chatState === 1) {
                botReply("Great! Could I get your first name?");
                chatState = 2;
            } else if (chatState === 2) {
                chatData.name = val;
                botReply("Nice to meet you, " + val + "! What specific dental service are you interested in? (e.g., Checkup, Implants, Braces)");
                chatState = 3;
            } else if (chatState === 3) {
                chatData.service = val;
                botReply("Perfect. I can help book you in. What is the best phone number for our team to call and confirm the time?");
                chatState = 4;
            } else if (chatState === 4) {
                chatData.phone = val;
                botReply("Thank you! I've sent your details to our front desk. They will call you at " + val + " shortly to finalize. Have a wonderful day!");
                saveLead(chatData);
                chatState = 5;
                setTimeout(() => { closeChatBtn.click(); }, 4000);
            }
        };

        chatSendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});
