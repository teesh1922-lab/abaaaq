// ====================================
// Utility Functions - دوال مساعدة
// ====================================

const Utils = {
    // Format Currency - تنسيق العملة
    formatCurrency(amount) {
        return new Intl.NumberFormat('ar-PS', {
            style: 'currency',
            currency: 'ILS',
            minimumFractionDigits: 2
        }).format(amount).replace('ILS', '₪');
    },

    // Format Date - تنسيق التاريخ
    formatDate(date) {
        const d = new Date(date);
        return new Intl.DateTimeFormat('ar-PS', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(d);
    },

    // Format Time - تنسيق الوقت
    formatTime(time) {
        return new Intl.DateTimeFormat('ar-PS', {
            hour: '2-digit',
            minute: '2-digit'
        }).format(new Date(`2000-01-01 ${time}`));
    },

    // Debounce Function - تأخير تنفيذ الدالة
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle Function - تقييد تنفيذ الدالة
    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Scroll to Section - التمرير إلى قسم
    scrollToSection(sectionId, offset = 100) {
        const section = document.getElementById(sectionId);
        if (section) {
            const top = section.offsetTop - offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        }
    },

    // Show Toast Notification - عرض إشعار
    showToast(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles if not already in CSS
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
            color: white;
            padding: 15px 25px;
            border-radius: 50px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            z-index: 10000;
            animation: slideUp 0.3s ease;
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    // Show Loading - عرض شاشة التحميل
    showLoading(container = document.body) {
        const loader = document.createElement('div');
        loader.className = 'loading-overlay';
        loader.innerHTML = `
            <div class="spinner"></div>
            <p>جاري التحميل...</p>
        `;
        loader.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 15px;
            z-index: 1000;
        `;
        container.style.position = 'relative';
        container.appendChild(loader);
        return loader;
    },

    // Hide Loading - إخفاء شاشة التحميل
    hideLoading(loader) {
        if (loader && loader.parentNode) {
            loader.remove();
        }
    },

    // Generate Rating Stars - إنشاء نجوم التقييم
    generateRatingStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let html = '';
        
        for (let i = 0; i < fullStars; i++) {
            html += '<i class="fas fa-star"></i>';
        }
        
        if (hasHalfStar) {
            html += '<i class="fas fa-star-half-alt"></i>';
        }
        
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            html += '<i class="far fa-star"></i>';
        }
        
        return html;
    },

    // Validate Email - التحقق من صحة البريد الإلكتروني
    validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    // Validate Phone - التحقق من صحة رقم الهاتف
    validatePhone(phone) {
        const re = /^(\+970|0)?5[0-9]{8}$/;
        return re.test(phone.replace(/\s/g, ''));
    },

    // Local Storage Helper - مساعد التخزين المحلي
    storage: {
        get(key) {
            try {
                const item = localStorage.getItem(key);
                return item ? JSON.parse(item) : null;
            } catch (error) {
                console.error('Error reading from localStorage:', error);
                return null;
            }
        },
        
        set(key, value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
                return true;
            } catch (error) {
                console.error('Error writing to localStorage:', error);
                return false;
            }
        },
        
        remove(key) {
            try {
                localStorage.removeItem(key);
                return true;
            } catch (error) {
                console.error('Error removing from localStorage:', error);
                return false;
            }
        },
        
        clear() {
            try {
                localStorage.clear();
                return true;
            } catch (error) {
                console.error('Error clearing localStorage:', error);
                return false;
            }
        }
    },

    // API Helper - مساعد الاتصال بالAPI
    api: {
        async get(endpoint) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API GET Error:', error);
                throw error;
            }
        },
        
        async post(endpoint, data) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API POST Error:', error);
                throw error;
            }
        },
        
        async put(endpoint, data) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API PUT Error:', error);
                throw error;
            }
        },
        
        async delete(endpoint) {
            try {
                const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                return await response.json();
            } catch (error) {
                console.error('API DELETE Error:', error);
                throw error;
            }
        }
    },

    // Image Helper - مساعد الصور
    loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    },

    // Random ID Generator - مولد المعرفات العشوائية
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Sanitize HTML - تنظيف HTML
    sanitizeHTML(str) {
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    },

    // Copy to Clipboard - النسخ للحافظة
    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showToast('تم النسخ بنجاح!', 'success');
            return true;
        } catch (error) {
            console.error('Copy failed:', error);
            this.showToast('فشل النسخ!', 'error');
            return false;
        }
    },

    // Check if element is in viewport - التحقق من ظهور العنصر
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    },

    // Animate Number - تحريك الأرقام
    animateNumber(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.round(current);
        }, 16);
    },

    // Get Time Greeting - الحصول على تحية حسب الوقت
    getTimeGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return 'صباح الخير';
        if (hour < 18) return 'مساء الخير';
        return 'مساء الخير';
    },

    // Check Business Status - التحقق من حالة العمل
    isBusinessOpen() {
        const now = new Date();
        const day = now.toLocaleDateString('en-US', { weekday: 'lowercase' });
        const time = now.toTimeString().slice(0, 5);
        
        const hours = CONFIG.BUSINESS_HOURS[day];
        if (!hours) return false;
        
        return time >= hours.open && time <= hours.close;
    },

    // Calculate Distance - حساب المسافة
    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Radius of the earth in km
        const dLat = this.deg2rad(lat2 - lat1);
        const dLon = this.deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    },

    deg2rad(deg) {
        return deg * (Math.PI / 180);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}

// Make scrollToSection globally available
window.scrollToSection = Utils.scrollToSection;
