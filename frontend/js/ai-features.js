// ====================================
// AI Features - ميزات الذكاء الاصطناعي
// ====================================

const AIFeatures = {
    // Initialize - تهيئة
    init() {
        this.initVoiceRecognition();
        this.initImageRecognition();
        this.initRecommendations();
        this.setupEventListeners();
    },

    // Setup Event Listeners - إعداد مستمعي الأحداث
    setupEventListeners() {
        // Voice Order Button
        const voiceBtn = document.getElementById('voice-order-btn');
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => this.startVoiceOrder());
        }

        // AI Assistant Button
        const aiBtn = document.getElementById('ai-assistant-btn');
        if (aiBtn) {
            aiBtn.addEventListener('click', () => this.openChatbot());
        }

        // Smart Suggest Button
        const suggestBtn = document.getElementById('smart-suggest-btn');
        if (suggestBtn) {
            suggestBtn.addEventListener('click', () => this.smartReservationSuggest());
        }
    },

    // Voice Recognition - التعرف على الصوت
    initVoiceRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.lang = 'ar-SA';
            this.recognition.continuous = false;
            this.recognition.interimResults = false;

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.processVoiceCommand(transcript);
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                Utils.showToast('حدث خطأ في التعرف على الصوت', 'error');
            };
        } else {
            console.warn('Speech recognition not supported');
        }
    },

    // Start Voice Order - بدء الطلب الصوتي
    startVoiceOrder() {
        if (!this.recognition) {
            Utils.showToast('التعرف على الصوت غير مدعوم في متصفحك', 'error');
            return;
        }

        Utils.showToast('جاري الاستماع... تحدث الآن', 'success');
        
        try {
            this.recognition.start();
        } catch (error) {
            console.error('Voice recognition error:', error);
            Utils.showToast('حدث خطأ في بدء التعرف على الصوت', 'error');
        }
    },

    // Process Voice Command - معالجة الأمر الصوتي
    processVoiceCommand(command) {
        console.log('Voice command:', command);
        Utils.showToast(`تم التعرف على: "${command}"`, 'success');

        // Simple command processing
        const lowerCommand = command.toLowerCase();
        
        // Check for menu items
        const menuItems = CONFIG.SAMPLE_MENU;
        const foundItem = menuItems.find(item => 
            lowerCommand.includes(item.name.toLowerCase())
        );

        if (foundItem) {
            // Add to cart
            Cart.addItem(foundItem);
            Utils.showToast(`تم إضافة ${foundItem.name} إلى السلة`, 'success');
        } else if (lowerCommand.includes('قائمة') || lowerCommand.includes('منيو')) {
            Utils.scrollToSection('menu');
        } else if (lowerCommand.includes('حجز') || lowerCommand.includes('طاولة')) {
            Utils.scrollToSection('reservations');
        } else {
            // Send to chatbot
            this.openChatbot();
            setTimeout(() => {
                Chatbot.sendMessage(command);
            }, 500);
        }
    },

    // Image Recognition - التعرف على الصور
    initImageRecognition() {
        // Placeholder for image recognition
        // In production, this would use TensorFlow.js or a backend API
    },

    // Open Image Recognition - فتح التعرف على الصور
    openImageRecognition() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.capture = 'environment';

        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const loader = Utils.showLoading(document.body);

            try {
                // Simulate image recognition
                await new Promise(resolve => setTimeout(resolve, 2000));

                // In production, you would send the image to an AI service
                // For demo, we'll show a random menu item
                const randomItem = CONFIG.SAMPLE_MENU[
                    Math.floor(Math.random() * CONFIG.SAMPLE_MENU.length)
                ];

                Utils.hideLoading(loader);
                
                this.showImageRecognitionResult(randomItem);
            } catch (error) {
                Utils.hideLoading(loader);
                Utils.showToast('حدث خطأ في التعرف على الصورة', 'error');
            }
        };

        input.click();
    },

    // Show Image Recognition Result - عرض نتيجة التعرف على الصورة
    showImageRecognitionResult(item) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2>تم التعرف على الطبق!</h2>
                <img src="${item.image}" alt="${item.name}" style="width: 100%; max-width: 400px; border-radius: 12px; margin: 20px 0;">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <div class="modal-price">${Utils.formatCurrency(item.price)}</div>
                <button class="btn-primary" onclick="Cart.addItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                    <i class="fas fa-plus"></i> إضافة إلى السلة
                </button>
            </div>
        `;

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    },

    // Smart Recommendations - التوصيات الذكية
    initRecommendations() {
        this.userPreferences = Utils.storage.get(CONFIG.STORAGE_KEYS.PREFERENCES) || {};
        this.orderHistory = Utils.storage.get(CONFIG.STORAGE_KEYS.RECENT_ORDERS) || [];
    },

    // Get Recommendations - الحصول على التوصيات
    getRecommendations(count = 4) {
        const menu = CONFIG.SAMPLE_MENU;
        
        // Simple recommendation algorithm
        // In production, this would use ML algorithms
        
        // Prioritize highly rated items
        const recommended = [...menu]
            .sort((a, b) => b.rating - a.rating)
            .slice(0, count);

        return recommended;
    },

    // Show Recommendations Modal - عرض نافذة التوصيات
    showRecommendationsModal() {
        const recommendations = this.getRecommendations();
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 900px;">
                <button class="modal-close">&times;</button>
                <h2><i class="fas fa-brain"></i> التوصيات الذكية</h2>
                <p>بناءً على تفضيلاتك وتقييمات العملاء، نقترح عليك:</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 20px;">
                    ${recommendations.map(item => `
                        <div class="recommendation-card">
                            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 200px; object-fit: cover; border-radius: 8px;">
                            <h4 style="margin: 10px 0;">${item.name}</h4>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin: 10px 0;">
                                <span style="color: #DAA520; font-weight: bold;">${Utils.formatCurrency(item.price)}</span>
                                <div>${Utils.generateRatingStars(item.rating)}</div>
                            </div>
                            <p style="font-size: 0.875rem; color: #666;">${item.description}</p>
                            <button class="btn-primary" style="width: 100%; margin-top: 10px;" onclick="Cart.addItem(${JSON.stringify(item).replace(/"/g, '&quot;')})">
                                إضافة إلى السلة
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    },

    // Smart Reservation Suggest - اقتراح الحجز الذكي
    async smartReservationSuggest() {
        const loader = Utils.showLoading(document.body);

        // Simulate AI analysis
        await new Promise(resolve => setTimeout(resolve, 1500));

        Utils.hideLoading(loader);

        // Generate smart suggestions
        const now = new Date();
        const suggestions = [];

        // Suggest less busy times
        const nextDay = new Date(now);
        nextDay.setDate(nextDay.getDate() + 1);
        
        suggestions.push({
            date: nextDay.toISOString().split('T')[0],
            time: '13:00',
            reason: 'وقت هادئ مثالي للعائلات',
            availability: 'عالية'
        });

        suggestions.push({
            date: nextDay.toISOString().split('T')[0],
            time: '19:00',
            reason: 'وقت مزدحم مع أجواء حيوية',
            availability: 'متوسطة'
        });

        const dayAfter = new Date(now);
        dayAfter.setDate(dayAfter.getDate() + 2);
        
        suggestions.push({
            date: dayAfter.toISOString().split('T')[0],
            time: '20:00',
            reason: 'عطلة نهاية الأسبوع - أجواء رائعة',
            availability: 'متوسطة'
        });

        this.showReservationSuggestions(suggestions);
    },

    // Show Reservation Suggestions - عرض اقتراحات الحجز
    showReservationSuggestions(suggestions) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2><i class="fas fa-magic"></i> اقتراحات ذكية للحجز</h2>
                <p>بناءً على تحليل البيانات، إليك أفضل الأوقات المتاحة:</p>
                <div style="margin-top: 20px;">
                    ${suggestions.map((suggestion, index) => `
                        <div class="suggestion-card" style="background: #f5e6d3; padding: 20px; border-radius: 12px; margin-bottom: 15px; cursor: pointer;" onclick="AIFeatures.applyReservationSuggestion('${suggestion.date}', '${suggestion.time}')">
                            <div style="display: flex; justify-content: space-between; align-items: center;">
                                <div>
                                    <h4 style="margin: 0 0 5px 0;">
                                        <i class="fas fa-calendar"></i> ${Utils.formatDate(suggestion.date)}
                                    </h4>
                                    <p style="margin: 0 0 10px 0; color: #8B4513; font-size: 1.25rem; font-weight: bold;">
                                        <i class="fas fa-clock"></i> ${suggestion.time}
                                    </p>
                                    <p style="margin: 0; color: #666; font-size: 0.875rem;">
                                        <i class="fas fa-info-circle"></i> ${suggestion.reason}
                                    </p>
                                </div>
                                <div style="text-align: center;">
                                    <div style="background: ${suggestion.availability === 'عالية' ? '#2ecc71' : '#f39c12'}; color: white; padding: 8px 16px; border-radius: 20px; font-size: 0.875rem; font-weight: bold;">
                                        التوفر: ${suggestion.availability}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    },

    // Apply Reservation Suggestion - تطبيق اقتراح الحجز
    applyReservationSuggestion(date, time) {
        document.getElementById('res-date').value = date;
        document.getElementById('res-time').value = time;
        
        // Close modal
        document.querySelector('.modal-overlay').remove();
        
        Utils.showToast('تم تطبيق الاقتراح! أكمل بقية التفاصيل', 'success');
        Utils.scrollToSection('reservations');
    },

    // Sentiment Analysis - تحليل المشاعر
    analyzeSentiment(text) {
        // Simple sentiment analysis
        // In production, this would use NLP libraries or APIs
        
        const positiveWords = ['رائع', 'ممتاز', 'جميل', 'لذيذ', 'مميز', 'أفضل', 'جيد'];
        const negativeWords = ['سيء', 'رديء', 'بطيء', 'غالي', 'سيئ', 'أسوأ'];
        
        const lowerText = text.toLowerCase();
        
        let positiveCount = 0;
        let negativeCount = 0;
        
        positiveWords.forEach(word => {
            if (lowerText.includes(word)) positiveCount++;
        });
        
        negativeWords.forEach(word => {
            if (lowerText.includes(word)) negativeCount++;
        });
        
        if (positiveCount > negativeCount) return 'positive';
        if (negativeCount > positiveCount) return 'negative';
        return 'neutral';
    },

    // View Analytics - عرض التحليلات
    viewAnalytics() {
        const reviews = CONFIG.SAMPLE_REVIEWS;
        
        const sentiments = {
            positive: 0,
            neutral: 0,
            negative: 0
        };
        
        reviews.forEach(review => {
            const sentiment = this.analyzeSentiment(review.comment);
            sentiments[sentiment]++;
        });
        
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="modal-close">&times;</button>
                <h2><i class="fas fa-chart-line"></i> تحليل المراجعات</h2>
                <p>تحليل ذكي لمشاعر العملاء من المراجعات:</p>
                <div style="margin: 30px 0;">
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span><i class="fas fa-smile" style="color: #2ecc71;"></i> إيجابي</span>
                            <strong>${sentiments.positive} (${Math.round(sentiments.positive / reviews.length * 100)}%)</strong>
                        </div>
                        <div style="background: #f0f0f0; height: 30px; border-radius: 15px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, #2ecc71, #27ae60); height: 100%; width: ${sentiments.positive / reviews.length * 100}%; transition: width 0.5s;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span><i class="fas fa-meh" style="color: #f39c12;"></i> محايد</span>
                            <strong>${sentiments.neutral} (${Math.round(sentiments.neutral / reviews.length * 100)}%)</strong>
                        </div>
                        <div style="background: #f0f0f0; height: 30px; border-radius: 15px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, #f39c12, #e67e22); height: 100%; width: ${sentiments.neutral / reviews.length * 100}%; transition: width 0.5s;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span><i class="fas fa-frown" style="color: #e74c3c;"></i> سلبي</span>
                            <strong>${sentiments.negative} (${Math.round(sentiments.negative / reviews.length * 100)}%)</strong>
                        </div>
                        <div style="background: #f0f0f0; height: 30px; border-radius: 15px; overflow: hidden;">
                            <div style="background: linear-gradient(90deg, #e74c3c, #c0392b); height: 100%; width: ${sentiments.negative / reviews.length * 100}%; transition: width 0.5s;"></div>
                        </div>
                    </div>
                </div>
                <div style="background: #f5e6d3; padding: 20px; border-radius: 12px; margin-top: 20px;">
                    <h4 style="margin: 0 0 10px 0;"><i class="fas fa-lightbulb"></i> الملخص</h4>
                    <p style="margin: 0;">معظم عملائنا راضون جداً عن الخدمة والطعام. نحن نعمل باستمرار على تحسين تجربتكم!</p>
                </div>
            </div>
        `;

        modal.querySelector('.modal-close').onclick = () => modal.remove();
        modal.onclick = (e) => {
            if (e.target === modal) modal.remove();
        };

        document.body.appendChild(modal);
    },

    // Open Chatbot - فتح الشات بوت
    openChatbot() {
        const widget = document.getElementById('chatbot-widget');
        if (widget) {
            widget.classList.add('active');
        }
    }
};

// Make functions globally available
window.openAIFeature = (feature) => {
    switch(feature) {
        case 'recommendations':
            AIFeatures.showRecommendationsModal();
            break;
        case 'sentiment':
            AIFeatures.viewAnalytics();
            break;
    }
};

window.openChatbot = () => AIFeatures.openChatbot();
window.openImageRecognition = () => AIFeatures.openImageRecognition();
window.startVoiceOrder = () => AIFeatures.startVoiceOrder();
window.viewAnalytics = () => AIFeatures.viewAnalytics();
window.smartReservation = () => AIFeatures.smartReservationSuggest();

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => AIFeatures.init());
} else {
    AIFeatures.init();
}
