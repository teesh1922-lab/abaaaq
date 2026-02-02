// ====================================
// Menu Management - إدارة القائمة
// ====================================

const Menu = {
    currentCategory: 'all',
    currentPage: 1,
    itemsPerPage: CONFIG.ITEMS_PER_PAGE,

    init() {
        this.setupFilterButtons();
        this.loadMenuItems();
    },

    setupFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                filterButtons.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                e.target.classList.add('active');
                // Filter menu
                this.currentCategory = e.target.dataset.filter;
                this.currentPage = 1;
                this.loadMenuItems();
            });
        });

        // Load More Button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                this.currentPage++;
                this.loadMenuItems(true);
            });
        }
    },

    loadMenuItems(append = false) {
        const grid = document.getElementById('menu-grid');
        if (!grid) return;

        let items = CONFIG.SAMPLE_MENU;

        // Filter by category
        if (this.currentCategory !== 'all') {
            items = items.filter(item => item.category === this.currentCategory);
        }

        // Pagination
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedItems = items.slice(start, end);

        if (!append) {
            grid.innerHTML = '';
        }

        paginatedItems.forEach(item => {
            const card = this.createMenuCard(item);
            grid.innerHTML += card;
        });

        // Show/hide load more button
        const loadMoreBtn = document.getElementById('load-more-btn');
        if (loadMoreBtn) {
            if (end >= items.length) {
                loadMoreBtn.style.display = 'none';
            } else {
                loadMoreBtn.style.display = 'inline-flex';
            }
        }
    },

    createMenuCard(item) {
        return `
            <div class="menu-item" data-id="${item.id}">
                <div class="menu-item-image">
                    <img src="${item.image}" alt="${item.name}">
                    ${item.badge ? `<span class="menu-item-badge">${item.badge}</span>` : ''}
                </div>
                <div class="menu-item-content">
                    <div class="menu-item-header">
                        <h3 class="menu-item-title">${item.name}</h3>
                        <span class="menu-item-price">${Utils.formatCurrency(item.price)}</span>
                    </div>
                    <p class="menu-item-description">${item.description}</p>
                    <div class="menu-item-footer">
                        <div class="menu-item-rating">
                            ${Utils.generateRatingStars(item.rating)}
                            <span>(${item.reviews})</span>
                        </div>
                        <button class="add-to-cart-btn" onclick='Cart.addItem(${JSON.stringify(item)})'>
                            <i class="fas fa-plus"></i>
                            أضف
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
};

// Initialize
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Menu.init());
} else {
    Menu.init();
}
