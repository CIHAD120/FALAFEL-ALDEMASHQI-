// رقم الواتساب الخاص بك
const WHATSAPP_NUMBER = "905541422220";

    // 1. الصوت

    const clickSound = document.getElementById("click-sound");

    const playSound = () => {

        if(clickSound) {

            clickSound.currentTime = 0;

            let playPromise = clickSound.play();

            if (playPromise !== undefined) { playPromise.catch(() => {}); }

        }

    };

    document.querySelectorAll("button, .social-btn, .link-btn").forEach(btn => btn.addEventListener("click", playSound));



    // 2. الإنترو

    setTimeout(() => {

        const introScreen = document.getElementById("intro-screen");

        if (introScreen) { introScreen.classList.add("hidden"); setTimeout(() => introScreen.style.display = "none", 800); }

        const mainContent = document.getElementById("main-content");

        if (mainContent) mainContent.classList.add("show-content");

        const topControls = document.querySelector(".top-controls");

        if (topControls) topControls.style.animation = "fadeIn 0.8s ease forwards 0.5s";

        setTimeout(() => {
            const toast = document.getElementById("welcome-toast");
            if(toast) { toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 5000); }
        }, 800);

    }, 400);



    // 3. المظهر

    const themeToggleBtn = document.getElementById("theme-toggle");

    const themeIcon = themeToggleBtn?.querySelector("i");

    const body = document.body;

    if (localStorage.getItem("theme") === "dark") { body.classList.add("dark-mode"); if(themeIcon) themeIcon.classList.replace("fa-moon", "fa-sun"); }

    if(themeToggleBtn) {

        themeToggleBtn.addEventListener("click", () => {

            body.classList.toggle("dark-mode");

            if (body.classList.contains("dark-mode")) { themeIcon?.classList.replace("fa-moon", "fa-sun"); localStorage.setItem("theme", "dark"); }

            else { themeIcon?.classList.replace("fa-sun", "fa-moon"); localStorage.setItem("theme", "light"); }

        });

    }



    // 4. الوقت (9:00 صباحاً إلى 9:30 مساءً)

    const updateTimeFeatures = () => {

        const now = new Date();

        const hour = now.getHours();

        const minute = now.getMinutes();

        const currentTimeInMinutes = (hour * 60) + minute;

       

        const openTime = 540; // 9:00 AM

        const closeTime = 1290; // 9:30 PM



        const greetingEl = document.getElementById("dynamic-greeting");

        const statusEl = document.getElementById("live-status");

        const lang = localStorage.getItem("lang") || "ar";



        if(greetingEl && statusEl) {

            if (hour >= 5 && hour < 12) greetingEl.textContent = lang === "ar" ? "صباح الفلافل الساخنة ☀️" : "Günaydın ☀️";

            else if (hour >= 12 && hour < 18) greetingEl.textContent = lang === "ar" ? "طاب مساؤكم 🌤️" : "İyi Günler 🌤️";

            else greetingEl.textContent = lang === "ar" ? "عشاء شامي أصيل 🌙" : "İyi Akşamlar 🌙";



            if (currentTimeInMinutes >= openTime && currentTimeInMinutes < closeTime) {

                statusEl.className = "status open";

                statusEl.innerHTML = `<span class="dot"></span><span data-i18n="openNow">${lang === "ar" ? "مفتوح الآن" : "Şu an Açık"}</span>`;

            } else {

                statusEl.className = "status closed";

                statusEl.innerHTML = `<span class="dot" style="animation:none"></span><span data-i18n="closedNow">${lang === "ar" ? "مغلق الآن" : "Şu an Kapalı"}</span>`;

            }

        }

    };

    updateTimeFeatures();



    // 5. النوافذ

    const openModal = (id) => { 
        const modal = document.getElementById(id); 
        if(modal) { 
            modal.classList.add("active"); 
            if(id === "menu-modal") {
                modal.querySelectorAll('.menu-item').forEach((item, index) => {
                    setTimeout(() => item.classList.add('show-item'), 100 + (index * 60));
                });
            }
        } 
    };

    const closeModal = (id) => { 
        const modal = document.getElementById(id); 
        if(modal) { 
            modal.classList.remove("active"); 
            if(id === "menu-modal") {
                modal.querySelectorAll('.menu-item').forEach(item => item.classList.remove('show-item'));
            }
        } 
    };



    document.getElementById("open-menu-btn")?.addEventListener("click", () => openModal("menu-modal"));

    document.getElementById("close-menu")?.addEventListener("click", () => closeModal("menu-modal"));

    document.getElementById("smart-wa-btn")?.addEventListener("click", () => openModal("wa-modal"));

    document.getElementById("smart-wa-icon")?.addEventListener("click", (e) => { e.preventDefault(); openModal("wa-modal"); });

    document.getElementById("close-wa")?.addEventListener("click", () => closeModal("wa-modal"));

    document.getElementById('wifi-btn').addEventListener('click', function() {

    alert("كلمة سر الواي فاي هي:123456789g");

});



    window.scrollToCat = (id) => {

        const el = document.getElementById(id);

        const container = document.getElementById('menu-scroll-container');

        if(el && container) container.scrollTo({ top: el.offsetTop - container.offsetTop - 10, behavior: 'smooth' });

    };



    // 6. واتساب (آمن جداً)

    window.sendWA = (type) => {

        let text = "";

        const lang = localStorage.getItem("lang") || "ar";

        if(type === 'delivery') text = lang === "ar" ? "مرحباً، أريد طلب للتوصيل 🛵" : "Merhaba, paket servis istiyorum 🛵";

        else if(type === 'table') text = lang === "ar" ? "مرحباً، أريد حجز طاولة 🍽️" : "Merhaba, rezervasyon yapmak istiyorum 🍽️";
        
        else if(type === 'complaint') text = lang === "ar" ? "مرحباً، لدي مقترح/شكوى: " : "Merhaba, bir önerim/şikayetim var: ";

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");

        closeModal("wa-modal");

    };



    window.orderItem = (itemName, price, btn) => {

        const text = `مرحباً، أريد طلب: ${itemName} 🧆\nالسعر المتوقع: ${price}`;

       

        if(btn) {

            const originalHtml = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-check"></i>';

            btn.style.background = '#25D366';

            btn.style.color = '#fff';

            btn.style.transform = 'scale(1.15)';



            setTimeout(() => {

                btn.innerHTML = originalHtml;

                btn.style.background = '';

                btn.style.color = '';

                btn.style.transform = '';

                window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");

            }, 800);

        } else {

            window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");

        }

    };



    // 7. المطر السري
    
    // 10. تفعيل تأثير حركة الخلفية (Parallax) المفقود
    document.addEventListener("mousemove", (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20; // 20px max movement
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        document.body.style.setProperty("--move-x", `${x}px`);
        document.body.style.setProperty("--move-y", `${y}px`);
    });



    let logoClicks = 0;

    document.getElementById("magic-logo")?.addEventListener("click", () => {

        logoClicks++;

        if(logoClicks === 3) {

            logoClicks = 0;

            const rainContainer = document.getElementById("falafel-rain-container");

            if(rainContainer) {

                for(let i=0; i<30; i++) {

                    const falafel = document.createElement("div");

                    falafel.className = "falling-falafel";

                    falafel.textContent = "🧆";

                    falafel.style.left = Math.random() * 100 + "vw";

                    falafel.style.animationDuration = (Math.random() * 2 + 2) + "s";

                    rainContainer.appendChild(falafel);

                }

                setTimeout(() => { alert("لقد اكتشفت العرض السري! 🕵️‍♂️✨\nأرسل 'سر الفلافل' واحصل على عرض خاص."); rainContainer.innerHTML = ""; }, 3000);

            }

        }

    });



    // 8. الترجمة

    const langToggleBtn = document.getElementById("lang-toggle");

    const htmlTag = document.documentElement;

    // المتغيرات العامة للسلة والعجلة
    let currentCartTotal = 0;

    const translations = {
        ar: { brandName: "فلافل الدمشقي", brandDesc: "طعم الفلافل الشامية الأصيلة، مقرمشة ومحضرة يومياً بأجود البهارات. جربها الآن! 🧆✨", menuBtn: "المنيو (قائمة الطعام)", yemeksepeti: "اطلب عبر Yemeksepeti", trendyol: "اطلب عبر Trendyol Go", custom1: "تواصل معنا المباشر", openNow: "مفتوح الآن", closedNow: "مغلق الآن", menuTitle: "المنيو | قائمة الطعام 🧆", waTitle: "كيف يمكننا مساعدتك؟ 💬", waDelivery: "🛵 طلب توصيل", waTable: "🍽️ حجز طاولة", spinTitle: "العب واربح! 🎁", spinDesc: "لف العجلة لتربح خصماً", spinBtn: "لف العجلة!", toggleText: "TR", complaintBtn: "المقترحات والشكاوى", toastTitle: "أهلاً بك في فلافل الدمشقي! 👋", toastDesc: "نحن سعداء بزيارتك، نتمنى لك تجربة رائعة.", ratingTitle: "تقييم الطلب ⭐", ratingDesc: "كيف كانت تجربتك معنا؟ شاركنا رأيك.", ratingSubmit: "إرسال التقييم", cartTitle: "سلة الطلبات 🛒", cartTotal: "الإجمالي التقريبي:", cartCheckout: "إرسال الطلب عبر واتساب" },

        tr: { brandName: "Falafel Al-Damashqi", brandDesc: "Orijinal Şam falafeli lezzeti, çıtır çıtır ve her gün taze hazırlanır. Hemen deneyin! 🧆✨", menuBtn: "Menü (Yemek Listesi)", yemeksepeti: "Yemeksepeti'nden Sipariş Ver", trendyol: "Trendyol Go'dan Sipariş Ver", custom1: "Doğrudan İletişim", openNow: "Şu an Açık", closedNow: "Şu an Kapalı", menuTitle: "Menü 🧆", waTitle: "Size nasıl yardımcı olabiliriz? 💬", waDelivery: "🛵 Paket Servis", waTable: "🍽️ Rezervasyon", spinTitle: "Oyna ve Kazan! 🎁", spinDesc: "İndirim kazanmak için çarkı çevirin", spinBtn: "Çarkı Çevir!", toggleText: "AR", complaintBtn: "Öneriler ve Şikayetler", toastTitle: "Hoş Geldiniz! 👋", toastDesc: "Ziyaretinizden memnuniyet duyduk, harika bir deneyim dileriz.", ratingTitle: "Siparişi Değerlendir ⭐", ratingDesc: "Deneyiminiz nasıldı? Fikrinizi paylaşın.", ratingSubmit: "Gönder", cartTitle: "Sepetim 🛒", cartTotal: "Tahmini Toplam:", cartCheckout: "WhatsApp'tan Sipariş Ver" }

    };

    const setLanguage = (lang) => {

        htmlTag.setAttribute("lang", lang); htmlTag.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");

        if(langToggleBtn) langToggleBtn.textContent = translations[lang].toggleText;

        document.querySelectorAll("[data-i18n]").forEach(el => { const key = el.getAttribute("data-i18n"); if(translations[lang][key]) el.textContent = translations[lang][key]; });

        localStorage.setItem("lang", lang); updateTimeFeatures();

    };
    
    let currentLang = localStorage.getItem("lang") || "ar"; setLanguage(currentLang);

    if(langToggleBtn) { langToggleBtn.addEventListener("click", () => { currentLang = currentLang === "ar" ? "tr" : "ar"; setLanguage(currentLang); }); };

    // إضافة تأثير التموج (Ripple Effect) للأزرار
    document.querySelectorAll(".link-btn, .nav-btn, .order-sm-btn, .wa-option-btn, .spin-action-btn").forEach(btn => {
        btn.addEventListener("click", function(e) {
            let rect = this.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;
            let ripple = document.createElement("span");
            ripple.className = "ripple";
            ripple.style.left = x + "px";
            ripple.style.top = y + "px";
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // 9. نظام التقييم (النجوم)
    const stars = document.querySelectorAll(".star");
    const ratingEmoji = document.getElementById("rating-emoji");
    const emojis = ["🤔", "😡", "😕", "😐", "🙂", "😍"];
    let currentRating = 0;
    stars.forEach(star => {
        star.addEventListener("mouseover", function() {
            let val = parseInt(this.getAttribute("data-value"));
            if(ratingEmoji) ratingEmoji.textContent = emojis[val];
            stars.forEach(s => {
                if (parseInt(s.getAttribute("data-value")) <= val) s.classList.add("hovered");
                else s.classList.remove("hovered");
            });
        });
        star.addEventListener("mouseout", () => {
            stars.forEach(s => s.classList.remove("hovered"));
            if(ratingEmoji) ratingEmoji.textContent = emojis[currentRating];
        });
        star.addEventListener("click", function() {
            currentRating = parseInt(this.getAttribute("data-value"));
            if(ratingEmoji) { 
                ratingEmoji.textContent = emojis[currentRating]; 
                ratingEmoji.style.transform = "scale(1.2)"; 
                setTimeout(() => ratingEmoji.style.transform = "scale(1)", 200); 
            }
            stars.forEach(s => {
                if (parseInt(s.getAttribute("data-value")) <= currentRating) s.classList.add("selected");
                else s.classList.remove("selected");
            });
        });
    });
    
    document.getElementById("submit-rating")?.addEventListener("click", () => {
        if (currentRating === 0) return alert(currentLang === "tr" ? "Lütfen bir puan seçin!" : "يرجى تحديد تقييم من النجوم أولاً!");
        alert(currentLang === "tr" ? "Değerlendirmeniz için teşekkür ederiz! ⭐" : "شكراً لتقييمك! نحن نسعى دائماً لتقديم الأفضل. ⭐");
        localStorage.setItem("hasRated", "true");
        closeModal("rating-modal"); currentRating = 0; stars.forEach(s => s.classList.remove("selected"));
        if(ratingEmoji) ratingEmoji.textContent = emojis[0];
    });
