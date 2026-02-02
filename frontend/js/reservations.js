// Reservations Management
const Reservations = {
    init() {
        this.setupForm();
    },

    setupForm() {
        const form = document.getElementById('reservation-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitReservation();
            });
        }

        // Set min date to today
        const dateInput = document.getElementById('res-date');
        if (dateInput) {
            const today = new Date().toISOString().split('T')[0];
            dateInput.min = today;
        }
    },

    async submitReservation() {
        const data = {
            name: document.getElementById('res-name').value,
            phone: document.getElementById('res-phone').value,
            date: document.getElementById('res-date').value,
            time: document.getElementById('res-time').value,
            guests: document.getElementById('res-guests').value,
            section: document.getElementById('res-section').value,
            notes: document.getElementById('res-notes').value
        };

        // Validate
        if (!Utils.validatePhone(data.phone)) {
            Utils.showToast('رقم الهاتف غير صحيح', 'error');
            return;
        }

        const loader = Utils.showLoading(document.getElementById('reservation-form'));

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            Utils.hideLoading(loader);
            Utils.showToast('تم الحجز بنجاح! سنتصل بك للتأكيد', 'success');
            
            // Reset form
            document.getElementById('reservation-form').reset();
        } catch (error) {
            Utils.hideLoading(loader);
            Utils.showToast('حدث خطأ أثناء الحجز', 'error');
        }
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Reservations.init());
} else {
    Reservations.init();
}
