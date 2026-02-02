// ====================================
// Cart Management - إدارة السلة
// ====================================

const Cart = {
    items: [],

    init() {
        this.loadCart();
        this.setupEventListeners();
        this.updateUI();
    },

    setupEventListeners() {
        const cartBtn = document.getElementById('cart-btn');
        const cartClose = document.getElementById('cart-close');
        const checkoutBtn = document.getElementById('checkout-btn');

        if (cartBtn) {
            cartBtn.addEventListener('click', () => this.toggleCart());
        }

        if (cartClose) {
            cartClose.addEventListener('click', () => this.toggleCart());
        }

        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => this.checkout());
        }
    },

    loadCart() {
        const saved = Utils.storage.get(CONFIG.STORAGE_KEYS.CART);
        if (saved) {
            this.items = saved;
        }
    },

    saveCart() {
        Utils.storage.set(CONFIG.STORAGE_KEYS.CART, this.items);
    },

    addItem(item, quantity = 1) {
        const existing = this.items.find(i => i.id === item.id);
        
        if (existing) {
            existing.quantity += quantity;
        } else {
            this.items.push({
                ...item,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateUI();
        Utils.showToast(`تم إضافة ${item.name} إلى السلة`, 'success');
    },

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateUI();
    },

    updateQuantity(itemId, newQuantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            if (newQuantity <= 0) {
                this.removeItem(itemId);
            } else {
                item.quantity = newQuantity;
                this.saveCart();
                this.updateUI();
            }
        }
    },

    getTotal() {
        return this.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    },

    toggleCart() {
        const sidebar = document.getElementById('cart-sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    },

    updateUI() {
        // Update cart count
        const countEl = document.getElementById('cart-count');
        if (countEl) {
            const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
            countEl.textContent = totalItems;
        }

        // Update cart items
        const itemsContainer = document.getElementById('cart-items');
        if (itemsContainer) {
            if (this.items.length === 0) {
                itemsContainer.innerHTML = '<p class="cart-empty">السلة فارغة</p>';
            } else {
                itemsContainer.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                        <div class="cart-item-info">
                            <h4 class="cart-item-title">${item.name}</h4>
                            <div class="cart-item-price">${Utils.formatCurrency(item.price)}</div>
                            <div class="cart-item-controls">
                                <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                    <i class="fas fa-minus"></i>
                                </button>
                                <span class="cart-item-quantity">${item.quantity}</span>
                                <button onclick="Cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                    <i class="fas fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }
        }

        // Update total
        const totalEl = document.getElementById('cart-total');
        if (totalEl) {
            totalEl.textContent = Utils.formatCurrency(this.getTotal());
        }
    },

    checkout() {
        if (this.items.length === 0) {
            Utils.showToast('السلة فارغة!', 'error');
            return;
        }

        // In production, this would navigate to checkout page
        Utils.showToast('جاري الانتقال إلى صفحة الدفع...', 'success');
        
        // Save order to history
        const order = {
            id: Utils.generateId(),
            items: [...this.items],
            total: this.getTotal(),
            date: new Date().toISOString()
        };

        const history = Utils.storage.get(CONFIG.STORAGE_KEYS.RECENT_ORDERS) || [];
        history.unshift(order);
        Utils.storage.set(CONFIG.STORAGE_KEYS.RECENT_ORDERS, history.slice(0, 10));

        // Clear cart
        this.items = [];
        this.saveCart();
        this.updateUI();
        this.toggleCart();
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Cart.init());
} else {
    Cart.init();
}
