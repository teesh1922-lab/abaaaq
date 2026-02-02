// ====================================
// Configuration - الإعدادات الرئيسية
// ====================================

const CONFIG = {
    // API Settings
    API_BASE_URL: 'http://localhost:3000/api',
    API_TIMEOUT: 10000,
    
    // Application Settings
    APP_NAME: 'مطعم عبق التراثي الذكي',
    APP_VERSION: '2.0.0',
    
    // Features Flags
    FEATURES: {
        AI_RECOMMENDATIONS: true,
        VOICE_ORDERING: true,
        IMAGE_RECOGNITION: true,
        CHATBOT: true,
        SENTIMENT_ANALYSIS: true,
        SMART_RESERVATIONS: true
    },
    
    // Pagination
    ITEMS_PER_PAGE: 12,
    REVIEWS_PER_PAGE: 6,
    
    // Cache Settings
    CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
    
    // Animation Settings
    ANIMATION_DURATION: 300,
    SCROLL_OFFSET: 100,
    
    // Map Settings
    MAP_CENTER: {
        lat: 32.2211,
        lng: 35.2544
    },
    MAP_ZOOM: 15,
    
    // Social Media Links
    SOCIAL_LINKS: {
        facebook: 'https://facebook.com/abaq-restaurant',
        instagram: 'https://instagram.com/abaq-restaurant',
        twitter: 'https://twitter.com/abaq-restaurant',
        whatsapp: 'https://wa.me/970599123456'
    },
    
    // Contact Info
    CONTACT: {
        phone: '+970-9-238-5555',
        mobile: '+970-599-123-456',
        email: 'info@abaq-restaurant.ps',
        address: 'نابلس، فلسطين - شارع رفيديا الرئيسي'
    },
    
    // Business Hours
    BUSINESS_HOURS: {
        saturday: { open: '10:00', close: '24:00' },
        sunday: { open: '10:00', close: '24:00' },
        monday: { open: '10:00', close: '24:00' },
        tuesday: { open: '10:00', close: '24:00' },
        wednesday: { open: '10:00', close: '24:00' },
        thursday: { open: '10:00', close: '24:00' },
        friday: { open: '14:00', close: '24:00' }
    },
    
    // Menu Categories
    MENU_CATEGORIES: [
        { id: 'all', name: 'الكل', icon: 'fa-utensils' },
        { id: 'appetizers', name: 'المقبلات', icon: 'fa-leaf' },
        { id: 'main', name: 'الأطباق الرئيسية', icon: 'fa-drumstick-bite' },
        { id: 'grills', name: 'المشاوي', icon: 'fa-fire' },
        { id: 'desserts', name: 'الحلويات', icon: 'fa-ice-cream' },
        { id: 'drinks', name: 'المشروبات', icon: 'fa-mug-hot' }
    ],
    
    // Sample Menu Data (for demo purposes)
    SAMPLE_MENU: [
        {
            id: 1,
            name: 'المنسف الأردني',
            category: 'main',
            price: 45.00,
            description: 'طبق تراثي شهير من لحم الخروف مع الأرز واللبن الجميد',
            image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500',
            rating: 4.8,
            reviews: 156,
            badge: 'الأكثر طلباً',
            isNew: false,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 2,
            name: 'المقلوبة الفلسطينية',
            category: 'main',
            price: 38.00,
            description: 'أرز مع الخضار واللحم أو الدجاج مقلوب بطريقة تقليدية',
            image: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500',
            rating: 4.9,
            reviews: 203,
            badge: 'الأفضل تقييماً',
            isNew: false,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 3,
            name: 'المسخن الفلسطيني',
            category: 'main',
            price: 42.00,
            description: 'دجاج مشوي مع البصل والسماق على خبز الطابون',
            image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=500',
            rating: 4.7,
            reviews: 187,
            badge: null,
            isNew: false,
            isVegan: false,
            isSpicy: true
        },
        {
            id: 4,
            name: 'الكبة النية',
            category: 'appetizers',
            price: 28.00,
            description: 'لحم نيء مع البرغل والبهارات الخاصة',
            image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=500',
            rating: 4.6,
            reviews: 98,
            badge: null,
            isNew: true,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 5,
            name: 'الحمص بالطحينة',
            category: 'appetizers',
            price: 15.00,
            description: 'حمص طازج مع الطحينة وزيت الزيتون',
            image: 'https://images.unsplash.com/photo-1621510456681-2330135e5871?w=500',
            rating: 4.8,
            reviews: 312,
            badge: null,
            isNew: false,
            isVegan: true,
            isSpicy: false
        },
        {
            id: 6,
            name: 'الفلافل',
            category: 'appetizers',
            price: 12.00,
            description: 'أقراص الفلافل المقرمشة المحضرة طازجة',
            image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500',
            rating: 4.7,
            reviews: 245,
            badge: null,
            isNew: false,
            isVegan: true,
            isSpicy: false
        },
        {
            id: 7,
            name: 'المشاوي المشكلة',
            category: 'grills',
            price: 55.00,
            description: 'تشكيلة من اللحوم المشوية: كباب، شيش طاووق، كفتة',
            image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=500',
            rating: 4.9,
            reviews: 178,
            badge: 'مميز',
            isNew: false,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 8,
            name: 'الكنافة النابلسية',
            category: 'desserts',
            price: 20.00,
            description: 'حلوى تراثية من الكنافة بالجبنة والقطر',
            image: 'https://images.unsplash.com/photo-1571167901129-f3e89811d5da?w=500',
            rating: 5.0,
            reviews: 421,
            badge: 'الأفضل',
            isNew: false,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 9,
            name: 'القطايف',
            category: 'desserts',
            price: 18.00,
            description: 'قطايف محشوة بالجوز أو الجبنة',
            image: 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=500',
            rating: 4.6,
            reviews: 156,
            badge: null,
            isNew: false,
            isVegan: false,
            isSpicy: false
        },
        {
            id: 10,
            name: 'الشاي بالنعناع',
            category: 'drinks',
            price: 8.00,
            description: 'شاي أخضر طازج مع النعناع الطبيعي',
            image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500',
            rating: 4.7,
            reviews: 289,
            badge: null,
            isNew: false,
            isVegan: true,
            isSpicy: false
        },
        {
            id: 11,
            name: 'القهوة العربية',
            category: 'drinks',
            price: 10.00,
            description: 'قهوة عربية أصيلة بالهيل',
            image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?w=500',
            rating: 4.8,
            reviews: 198,
            badge: null,
            isNew: false,
            isVegan: true,
            isSpicy: false
        },
        {
            id: 12,
            name: 'عصير الليمون بالنعناع',
            category: 'drinks',
            price: 12.00,
            description: 'عصير ليمون طازج مع النعناع والسكر',
            image: 'https://images.unsplash.com/photo-1523677011781-c91d1bbe1f33?w=500',
            rating: 4.5,
            reviews: 167,
            badge: null,
            isNew: false,
            isVegan: true,
            isSpicy: false
        }
    ],
    
    // Sample Reviews Data
    SAMPLE_REVIEWS: [
        {
            id: 1,
            customerName: 'أحمد محمود',
            customerAvatar: 'A',
            rating: 5,
            date: '2026-01-28',
            comment: 'تجربة رائعة! الطعام لذيذ جداً والخدمة ممتازة. المساعد الذكي ساعدني كثيراً في اختيار الطبق المناسب.',
            helpful: 24
        },
        {
            id: 2,
            customerName: 'سارة علي',
            customerAvatar: 'س',
            rating: 5,
            date: '2026-01-25',
            comment: 'المطعم يجمع بين الأصالة والتكنولوجيا بشكل مبهر. الطلب الصوتي ميزة رائعة!',
            helpful: 18
        },
        {
            id: 3,
            customerName: 'محمد حسن',
            customerAvatar: 'م',
            rating: 4,
            date: '2026-01-22',
            comment: 'طعام تراثي أصيل بجودة عالية. الأسعار معقولة والجو رائع.',
            helpful: 15
        },
        {
            id: 4,
            customerName: 'ليلى عبدالله',
            customerAvatar: 'ل',
            rating: 5,
            date: '2026-01-20',
            comment: 'أفضل مطعم تراثي جربته. المنسف والكنافة النابلسية لا يُضاهى!',
            helpful: 31
        },
        {
            id: 5,
            customerName: 'خالد يوسف',
            customerAvatar: 'خ',
            rating: 4,
            date: '2026-01-18',
            comment: 'خدمة سريعة وطعام شهي. نظام الحجز الذكي وفر علي الكثير من الوقت.',
            helpful: 12
        },
        {
            id: 6,
            customerName: 'فاطمة أحمد',
            customerAvatar: 'ف',
            rating: 5,
            date: '2026-01-15',
            comment: 'مكان مثالي للعائلات. الأطفال استمتعوا بالمساعد الذكي والطعام كان رائعاً.',
            helpful: 27
        }
    ],
    
    // AI Chatbot Responses
    CHATBOT_RESPONSES: {
        greeting: [
            'مرحباً بك في مطعم عبق التراثي الذكي! كيف يمكنني مساعدتك اليوم؟',
            'أهلاً وسهلاً! أنا هنا لمساعدتك في أي استفسار.',
            'مرحباً! سعيد بخدمتك. ماذا تريد أن تعرف؟'
        ],
        menu: 'يمكنك تصفح قائمتنا الكاملة من خلال النقر على "القائمة" في الأعلى. لدينا تشكيلة واسعة من الأطباق التراثية الشهية!',
        reservation: 'لحجز طاولة، يمكنك استخدام نموذج الحجز في قسم "الحجوزات" أو يمكنني مساعدتك الآن. كم عدد الأشخاص وما هو الموعد المفضل؟',
        hours: 'نحن مفتوحون من السبت إلى الخميس من 10:00 صباحاً حتى 12:00 منتصف الليل، ويوم الجمعة من 2:00 ظهراً حتى 12:00 منتصف الليل.',
        location: 'نحن موجودون في نابلس، فلسطين - شارع رفيديا الرئيسي. يمكنك الاتصال بنا على +970-9-238-5555',
        delivery: 'نعم، نقدم خدمة التوصيل للمنازل. يمكنك الطلب من خلال موقعنا أو تطبيقنا.',
        payment: 'نقبل الدفع نقداً، ببطاقات الائتمان، والدفع الإلكتروني.',
        default: 'آسف، لم أفهم سؤالك. هل يمكنك إعادة صياغته؟ أو يمكنك التواصل معنا مباشرة على +970-9-238-5555'
    },
    
    // Local Storage Keys
    STORAGE_KEYS: {
        CART: 'abaq_cart',
        USER: 'abaq_user',
        FAVORITES: 'abaq_favorites',
        PREFERENCES: 'abaq_preferences',
        RECENT_ORDERS: 'abaq_recent_orders'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}
