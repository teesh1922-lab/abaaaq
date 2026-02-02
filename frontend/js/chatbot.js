// Chatbot Management
const Chatbot = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        const toggle = document.getElementById('chatbot-toggle');
        const close = document.getElementById('chatbot-close');
        const send = document.getElementById('chatbot-send');
        const input = document.getElementById('chatbot-input');

        if (toggle) toggle.addEventListener('click', () => this.toggle());
        if (close) close.addEventListener('click', () => this.toggle());
        if (send) send.addEventListener('click', () => this.sendMessage());
        if (input) {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });
        }
    },

    toggle() {
        const widget = document.getElementById('chatbot-widget');
        if (widget) widget.classList.toggle('active');
    },

    sendMessage(message) {
        const input = document.getElementById('chatbot-input');
        const text = message || input.value.trim();
        
        if (!text) return;

        this.addMessage(text, 'user');
        input.value = '';

        setTimeout(() => {
            const response = this.getResponse(text);
            this.addMessage(response, 'bot');
        }, 500);
    },

    addMessage(text, type) {
        const container = document.getElementById('chatbot-messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `${type}-message`;
        messageDiv.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${text}</p>
            </div>
        `;
        container.appendChild(messageDiv);
        container.scrollTop = container.scrollHeight;
    },

    getResponse(message) {
        const lower = message.toLowerCase();
        const responses = CONFIG.CHATBOT_RESPONSES;

        if (lower.includes('مرحبا') || lower.includes('السلام')) {
            return responses.greeting[0];
        } else if (lower.includes('قائمة') || lower.includes('منيو')) {
            return responses.menu;
        } else if (lower.includes('حجز')) {
            return responses.reservation;
        } else if (lower.includes('ساعات') || lower.includes('مفتوح')) {
            return responses.hours;
        } else if (lower.includes('موقع') || lower.includes('عنوان')) {
            return responses.location;
        } else if (lower.includes('توصيل')) {
            return responses.delivery;
        } else if (lower.includes('دفع')) {
            return responses.payment;
        }
        
        return responses.default;
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Chatbot.init());
} else {
    Chatbot.init();
}
