// Reviews Management
const Reviews = {
    init() {
        this.loadReviews();
        this.setupAddReviewButton();
    },

    loadReviews() {
        const container = document.getElementById('reviews-grid');
        if (!container) return;

        const reviews = CONFIG.SAMPLE_REVIEWS;
        container.innerHTML = reviews.map(review => this.createReviewCard(review)).join('');
    },

    createReviewCard(review) {
        return `
            <div class="review-card">
                <div class="review-header">
                    <div class="review-avatar">${review.customerAvatar}</div>
                    <div class="review-info">
                        <h4>${review.customerName}</h4>
                        <span class="review-date">${Utils.formatDate(review.date)}</span>
                    </div>
                </div>
                <div class="review-rating">
                    ${Utils.generateRatingStars(review.rating)}
                </div>
                <p class="review-text">${review.comment}</p>
            </div>
        `;
    },

    setupAddReviewButton() {
        const btn = document.getElementById('add-review-btn');
        if (btn) {
            btn.addEventListener('click', () => this.showAddReviewModal());
        }
    },

    showAddReviewModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>أضف تقييمك</h2>
                <form id="review-form">
                    <div class="form-group">
                        <label>التقييم</label>
                        <div class="star-rating" id="star-rating">
                            ${[5,4,3,2,1].map(i => `<i class="far fa-star" data-rating="${i}"></i>`).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea id="review-comment" rows="4" placeholder="اكتب تعليقك هنا..." required></textarea>
                    </div>
                    <button type="submit" class="btn-primary btn-block">إرسال التقييم</button>
                </form>
            </div>
        `;

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        document.body.appendChild(modal);

        // Star rating interaction
        const stars = modal.querySelectorAll('.star-rating i');
        let selectedRating = 0;
        
        stars.forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                stars.forEach(s => {
                    if (parseInt(s.dataset.rating) >= selectedRating) {
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });

        // Form submission
        modal.querySelector('form').addEventListener('submit', (e) => {
            e.preventDefault();
            if (selectedRating === 0) {
                Utils.showToast('الرجاء اختيار التقييم', 'error');
                return;
            }
            Utils.showToast('شكراً لتقييمك!', 'success');
            modal.remove();
        });
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Reviews.init());
} else {
    Reviews.init();
}
