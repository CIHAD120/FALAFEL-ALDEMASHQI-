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

    document.getElementById('wifi-btn')?.addEventListener('click', function() {
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
    let cartItems = [];

    const translations = {
        ar: {
            brandName: "فلافل الدمشقي", brandDesc: "طعم الفلافل الشامية الأصيلة، مقرمشة ومحضرة يومياً بأجود البهارات. جربها الآن! 🧆✨", menuBtn: "المنيو (قائمة الطعام)", yemeksepeti: "اطلب عبر Yemeksepeti", trendyol: "اطلب عبر Trendyol Go", custom1: "تواصل معنا المباشر", openNow: "مفتوح الآن", closedNow: "مغلق الآن", menuTitle: "المنيو | قائمة الطعام 🧆", waTitle: "كيف يمكننا مساعدتك؟ 💬", waDelivery: "🛵 طلب توصيل", waTable: "🍽️ حجز طاولة", spinTitle: "العب واربح! 🎁", spinDesc: "لف العجلة لتربح خصماً", spinBtn: "لف العجلة!", toggleText: "TR", complaintBtn: "المقترحات والشكاوى", toastTitle: "أهلاً بك في فلافل الدمشقي! 👋", toastDesc: "نحن سعداء بزيارتك، نتمنى لك تجربة رائعة.", ratingTitle: "تقييم الطلب ⭐", ratingDesc: "كيف كانت تجربتك معنا؟ شاركنا رأيك.", ratingSubmit: "إرسال التقييم", cartTitle: "سلة الطلبات 🛒", cartTotal: "الإجمالي التقريبي:", cartCheckout: "إرسال الطلب عبر واتساب",
            navFalafel: "دوروم فلافل", navWestern: "غربي", navShami: "شاميات", navSalad: "سلطات",
            catFalafelTitle: "دوروم فلافل", catWesternTitle: "قسم الغربي", catShamiTitle: "شاميات", catSaladTitle: "سلطات وإضافات",
            tagBest: "🔥 الأكثر طلباً", tagNew: "⭐ مميز", tagChef: "👑 توصية الشيف", tagHot: "🌶️ حار",
            itemFalafelWrap: "فلافل لف", itemFalafelDouble: "فلافل دبل", itemFalafelFoul: "فلافل مع فول", itemFalafelPotato: "فلافل مع بطاطا", itemFalafelArabi: "فلافل عربي مع بطاطا",
            itemCrispy: "كريسبي", descCrispy: "(Acılı çıtır tavuk)", itemEscalope: "سكالوب", descEscalope: "(Galata ünlü çıtır tavuk)", descEscalopeNoCheese: "بدون جبنة وبدون خس", itemZinger: "زنجر", descZinger: "(Çıtır tavuk göğsü)", itemFrancisco: "فرانشيسكو", itemFajita: "فاهيتا", descFajita: "(Fajita)", descFajitaDetails: "تشمل فطر وذرة (بدون بصل)", itemMexican: "مكسيكي", itemShishTawook: "شيش طاووق", descShish: "(Tavuk şiş)", itemPotato: "بطاطا", descPotato: "(Patates)", itemPotatoCheese: "بطاطا مع قشقوان",
            priceWestern1: "دوروم: 140 TL | عربي: 210 TL | وجبة: 235 TL", priceWestern2: "دوروم: 140 TL | عربي: 210 TL | وجبة: 240 TL", priceWestern3: "دوروم: 115 TL | عربي: 175 TL | وجبة: 140 TL", priceWestern4: "دوروم: 150 TL | عربي: 220 TL | وجبة: 180 TL",
            itemFoulTahini: "فول بطحينة", itemFoulOil: "فول مدمس بزيت", itemFoulTahiniMashed: "فول بطحينة مهروس", itemFoulOilMashed: "فول بزيت مهروس", itemHummusTahini: "حمص حب طحينة", itemHummusOil: "حمص حب بزيت", itemMusabaha: "حمص بطحينة (مسبحة)", itemFattehOil: "فتة بزيت بلدي", itemFattehGhee: "فتة بسمنة", itemFattehFaqsa: "فتة بزيت فقسة", itemFattehCashew: "فتة بالكاجو", itemFattehMeat: "فتة باللحمة", itemMusabahaBeirut: "مسبحة بيروتية", itemMusabahaMeat: "مسبحة باللحمة", itemMusabahaCashew: "مسبحة بالكاجو", itemMutabal: "متبل باذنجان", itemFalafel6: "فلافل 6 قرص", itemFalafel10: "فلافل 10 قرص",
            itemSaladOriental: "سلطة شرقية", itemFattoush: "فتوش", itemTabbouleh: "تبولة", itemSaladRussian: "سلطة روسية", itemExtraVeg: "زينة خضرة", itemService: "سيرفيس", itemMayo: "مايونيز",
            interactiveTitle: "المنيو التفاعلي", interactiveDesc: "اطلب مباشرة ووفر الكثير!", maxBudget: "أقصى ميزانية", noItems: "لا توجد عناصر ضمن ميزانيتك.", deliveryPrice: "سعر تطبيقات التوصيل", directPrice: "الطلب المباشر", youSave: "أنت توفر", ingredients: "المكونات", closeBtn: "إغلاق", addToCart: "أضف إلى السلة", emptyCart: "السلة فارغة"
        },
        tr: {
            brandName: "Falafel Al-Damashqi", brandDesc: "Orijinal Şam falafeli lezzeti, çıtır çıtır ve her gün taze hazırlanır. Hemen deneyin! 🧆✨", menuBtn: "Menü (Yemek Listesi)", yemeksepeti: "Yemeksepeti'nden Sipariş Ver", trendyol: "Trendyol Go'dan Sipariş Ver", custom1: "Doğrudan İletişim", openNow: "Şu an Açık", closedNow: "Şu an Kapalı", menuTitle: "Menü 🧆", waTitle: "Size nasıl yardımcı olabiliriz? 💬", waDelivery: "🛵 Paket Servis", waTable: "🍽️ Rezervasyon", spinTitle: "Oyna ve Kazan! 🎁", spinDesc: "İndirim kazanmak için çarkı çevirin", spinBtn: "Çarkı Çevir!", toggleText: "AR", complaintBtn: "Öneriler ve Şikayetler", toastTitle: "Hoş Geldiniz! 👋", toastDesc: "Ziyaretinizden memnuniyet duyduk, harika bir deneyim dileriz.", ratingTitle: "Siparişi Değerlendir ⭐", ratingDesc: "Deneyiminiz nasıldı? Fikrinizi paylaşın.", ratingSubmit: "Gönder", cartTitle: "Sepetim 🛒", cartTotal: "Tahmini Toplam:", cartCheckout: "WhatsApp'tan Sipariş Ver",
            navFalafel: "Falafel Dürüm", navWestern: "Batı Yemekleri", navShami: "Şam İşleri", navSalad: "Salatalar",
            catFalafelTitle: "Falafel Dürüm", catWesternTitle: "Batı Yemekleri", catShamiTitle: "Şam İşleri", catSaladTitle: "Salatalar ve Ekstralar",
            tagBest: "🔥 En Çok Satan", tagNew: "⭐ Özel", tagChef: "👑 Şefin Tavsiyesi", tagHot: "🌶️ Acı",
            itemFalafelWrap: "Falafel Dürüm", itemFalafelDouble: "Duble Falafel", itemFalafelFoul: "Foullu Falafel", itemFalafelPotato: "Patatesli Falafel", itemFalafelArabi: "Arap Falafel & Patates",
            itemCrispy: "Crispy (Çıtır Tavuk)", descCrispy: "(Acılı çıtır tavuk)", itemEscalope: "Eskalop", descEscalope: "(Galata ünlü çıtır tavuk)", descEscalopeNoCheese: "Peynirsiz ve marulsuz", itemZinger: "Zinger", descZinger: "(Çıtır tavuk göğsü)", itemFrancisco: "Francisco", itemFajita: "Fajita", descFajita: "(Fajita)", descFajitaDetails: "Mantar ve mısır içerir (Soğansız)", itemMexican: "Meksika", itemShishTawook: "Tavuk Şiş", descShish: "(Tavuk şiş)", itemPotato: "Patates", descPotato: "(Patates)", itemPotatoCheese: "Kaşarlı Patates",
            priceWestern1: "Dürüm: 140 TL | Arap: 210 TL | Porsiyon: 235 TL", priceWestern2: "Dürüm: 140 TL | Arap: 210 TL | Porsiyon: 240 TL", priceWestern3: "Dürüm: 115 TL | Arap: 175 TL | Porsiyon: 140 TL", priceWestern4: "Dürüm: 150 TL | Arap: 220 TL | Porsiyon: 180 TL",
            itemFoulTahini: "Tahinli Foul", itemFoulOil: "Zeytinyağlı Foul", itemFoulTahiniMashed: "Tahinli Ezme Foul", itemFoulOilMashed: "Zeytinyağlı Ezme Foul", itemHummusTahini: "Tahinli Humus (Tane)", itemHummusOil: "Zeytinyağlı Humus (Tane)", itemMusabaha: "Musabaha (Tahinli Humus)", itemFattehOil: "Zeytinyağlı Fatteh", itemFattehGhee: "Tereyağlı Fatteh", itemFattehFaqsa: "Faksa Yağlı Fatteh", itemFattehCashew: "Kaju Fıstıklı Fatteh", itemFattehMeat: "Etli Fatteh", itemMusabahaBeirut: "Beyrut Usulü Musabaha", itemMusabahaMeat: "Etli Musabaha", itemMusabahaCashew: "Kaju Fıstıklı Musabaha", itemMutabal: "Mütebbel (Patlıcan Ezmesi)", itemFalafel6: "6 Adet Falafel", itemFalafel10: "10 Adet Falafel",
            itemSaladOriental: "Doğu Salatası", itemFattoush: "Fettuş", itemTabbouleh: "Tabule", itemSaladRussian: "Rus Salatası", itemExtraVeg: "Yeşillik Süslemesi", itemService: "Servis", itemMayo: "Mayonez",
            interactiveTitle: "İnteraktif Menü", interactiveDesc: "Doğrudan sipariş verin ve tasarruf edin!", maxBudget: "Maksimum Bütçe", noItems: "Bütçenize uygun ürün bulunamadı.", deliveryPrice: "Uygulama Fiyatı", directPrice: "Doğrudan Sipariş", youSave: "Tasarrufunuz", ingredients: "İçindekiler", closeBtn: "Kapat", addToCart: "Sepete Ekle", emptyCart: "Sepet Boş"
        }
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

    // =========================================
    // Interactive Menu (Link-in-Bio) Logic
    // =========================================
    const INTERACTIVE_MENU_DATA = [
        { id: "falafelWrap", emoji: "🧆", basePrice: 100, name: { ar: "فلافل لف", en: "Falafel Wrap", tr: "Falafel Dürüm" }, description: { ar: "فلافل مقرمشة بخبز الصاج مع الخضروات الطازجة وصلصة الطحينة.", en: "Crispy falafel in saj bread with fresh vegetables and tahini sauce.", tr: "Çıtır falafel, taze sebzeler ve tahin sosu ile dürüm." }, ingredients: { ar: ["فلافل", "طماطم", "مخلل", "بقدونس", "صوص طحينة"], en: ["Falafel", "Tomato", "Pickles", "Parsley", "Tahini Sauce"], tr: ["Falafel", "Domates", "Turşu", "Maydanoz", "Tahin Sosu"] } },
        { id: "falafelDouble", emoji: "🧆", basePrice: 115, name: { ar: "فلافل دبل", en: "Double Falafel", tr: "Duble Falafel" }, description: { ar: "كمية مضاعفة من الفلافل لتجربة أغنى وألذ.", en: "Double the amount of falafel for a richer, tastier experience.", tr: "Daha zengin bir deneyim için iki kat falafel." }, ingredients: { ar: ["فلافل دبل", "طماطم", "مخلل", "بقدونس", "صوص طحينة"], en: ["Double Falafel", "Tomato", "Pickles", "Parsley", "Tahini Sauce"], tr: ["Duble Falafel", "Domates", "Turşu", "Maydanoz", "Tahin Sosu"] } },
        { id: "falafelArabi", emoji: "⭐", basePrice: 175, name: { ar: "فلافل عربي مع بطاطا", en: "Arabic Falafel with Fries", tr: "Arap Usulü Falafel" }, description: { ar: "وجبة فلافل مقطعة تقدم مع البطاطا المقلية والمخللات.", en: "A deconstructed falafel meal served with fries and pickles.", tr: "Patates kızartması ve turşu ile servis edilen doğranmış falafel tabağı." }, ingredients: { ar: ["فلافل مقطعة", "بطاطا مقلية", "مخللات", "صوص طحينة", "خبز"], en: ["Chopped Falafel", "French Fries", "Pickles", "Tahini Sauce", "Bread"], tr: ["Doğranmış Falafel", "Patates Kızartması", "Turşu", "Tahin Sosu", "Ekmek"] } },
        { id: "escalope", emoji: "🍗", basePrice: 140, name: { ar: "سكالوب", en: "Escalope (Şinitzel)", tr: "Şinitzel" }, description: { ar: "صدر دجاج مقلي ومقرمش. يقدم حصراً بدون جبنة وبدون خس.", en: "Crispy fried chicken breast. Served strictly WITHOUT cheese and WITHOUT lettuce.", tr: "Çıtır tavuk göğsü. Peynirsiz ve marulsuz servis edilir." }, ingredients: { ar: ["صدر دجاج مقلي", "مايونيز بالثوم", "مخلل", "❌ بدون جبنة", "❌ بدون خس"], en: ["Fried Chicken Breast", "Garlic Mayonnaise", "Pickles", "❌ WITHOUT Cheese", "❌ WITHOUT Lettuce"], tr: ["Tavuk Şinitzel", "Sarımsaklı Mayonez", "Turşu", "❌ Peynirsiz", "❌ Marulsuz"] } },
        { id: "zinger", emoji: "🔥", basePrice: 140, name: { ar: "زنجر", en: "Zinger", tr: "Zinger" }, description: { ar: "صدر دجاج حار ومقرمش مع صوص خاص.", en: "Spicy and crispy chicken breast with a special sauce.", tr: "Acılı ve çıtır tavuk göğsü, özel sos ile." }, ingredients: { ar: ["دجاج زنجر حار", "صوص حار", "خس", "طماطم"], en: ["Spicy Zinger Chicken", "Spicy Sauce", "Lettuce", "Tomato"], tr: ["Acılı Zinger Tavuk", "Acı Sos", "Marul", "Domates"] } },
        { id: "fattehGhee", emoji: "🍲", basePrice: 160, name: { ar: "فتة بسمنة", en: "Fatteh with Ghee", tr: "Tereyağlı Fette" }, description: { ar: "فتة حمص بالخبز المحمص والسمنة البلدية.", en: "Chickpea fatteh with toasted bread and traditional ghee.", tr: "Kızarmış ekmek ve geleneksel tereyağı ile nohutlu fette." }, ingredients: { ar: ["حمص", "خبز محمص", "لبن", "طحينة", "سمنة"], en: ["Chickpeas", "Toasted Bread", "Yogurt", "Tahini", "Ghee"], tr: ["Nohut", "Kızarmış Ekmek", "Yoğurt", "Tahin", "Tereyağı"] } },
        { id: "mutabal", emoji: "🍆", basePrice: 110, name: { ar: "متبل باذنجان", en: "Mutabal", tr: "Mütebbel" }, description: { ar: "باذنجان مشوي مهروس مع الطحينة واللبن.", en: "Grilled and mashed eggplant with tahini and yogurt.", tr: "Közlenmiş ve ezilmiş patlıcan, tahin ve yoğurt ile." }, ingredients: { ar: ["باذنجان مشوي", "طحينة", "لبن", "ثوم", "زيت زيتون"], en: ["Grilled Eggplant", "Tahini", "Yogurt", "Garlic", "Olive Oil"], tr: ["Közlenmiş Patlıcan", "Tahin", "Yoğurt", "Sarımsak", "Zeytinyağı"] } },
        { id: "tabbouleh", emoji: "🥗", basePrice: 140, name: { ar: "تبولة", en: "Tabbouleh", tr: "Tabule" }, description: { ar: "سلطة البقدونس الناعم مع البرغل والطماطم والليمون.", en: "Finely chopped parsley salad with bulgur, tomatoes, and lemon.", tr: "İnce kıyılmış maydanoz, bulgur, domates ve limon ile hazırlanan salata." }, ingredients: { ar: ["بقدونس", "برغل", "طماطم", "بصل", "زيت زيتون وليمون"], en: ["Parsley", "Bulgur", "Tomato", "Onion", "Olive Oil & Lemon"], tr: ["Maydanoz", "Bulgur", "Domates", "Soğan", "Zeytinyağı ve Limon"] } },
    ];
    const DELIVERY_APP_MARGIN = 1.35;

    window.renderInteractiveMenu = (maxBudget) => {
        const container = document.getElementById("interactive-items-container");
        if (!container) return;
        container.innerHTML = "";
        const lang = localStorage.getItem("lang") || "ar";
        const filtered = INTERACTIVE_MENU_DATA.filter(item => item.basePrice <= maxBudget);

        if (filtered.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: #9ca3af; margin-top: 30px; font-weight: bold;">${translations[lang].noItems}</p>`;
            return;
        }

        filtered.forEach((item, index) => {
            const deliveryPrice = Math.round(item.basePrice * DELIVERY_APP_MARGIN);
            const savings = deliveryPrice - item.basePrice;
            const article = document.createElement("article");
            article.className = "interactive-card animate-fade-up";
            article.style.animationDelay = `${(index + 2) * 100}ms`;
            
            article.onclick = () => {
                document.getElementById("ing-title").textContent = item.name[lang] || item.name.en;
                document.getElementById("ing-desc").textContent = item.description[lang] || item.description.en;
                const list = document.getElementById("ing-list");
                list.innerHTML = "";
                const ingredients = item.ingredients[lang] || item.ingredients.en;
                ingredients.forEach(ing => {
                    const isWithout = ing.includes("❌") || ing.includes("بدون");
                    list.innerHTML += `<li class="ingredient-item ${isWithout ? 'without' : ''}"><div class="dot ${isWithout ? 'red' : 'blue'}"></div>${ing}</li>`;
                });
                openModal("ingredients-modal");
            };
            
            article.innerHTML = `
                <h2 style="font-size: 1.1rem; color: #111827; margin-bottom: 5px; font-weight: bold;">${item.emoji} ${item.name[lang] || item.name.en}</h2>
                <p style="color: #6b7280; font-size: 0.85rem; margin-bottom: 15px; line-height: 1.5;">${item.description[lang] || item.description.en}</p>
                <div class="savings-box">
                    <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #9ca3af; text-decoration: line-through; margin-bottom: 5px;"><span>${translations[lang].deliveryPrice}</span><span>${deliveryPrice} TL</span></div>
                    <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.1rem; color: #111827; margin-bottom: 8px;"><span>${translations[lang].directPrice}</span><span>${item.basePrice} TL</span></div>
                    <div style="background: #dcfce3; color: #166534; font-size: 0.75rem; font-weight: bold; padding: 4px 8px; border-radius: 6px; display: inline-block;">✨ ${translations[lang].youSave} ${savings} TL!</div>
                </div>
                <button class="add-cart-btn" onclick="event.stopPropagation(); addToCart('${item.id}')" style="width: 100%; margin-top: 12px; padding: 10px; background: var(--wa-color); color: white; border: none; border-radius: 12px; font-weight: bold; font-size: 0.95rem; cursor: pointer;">
                    <i class="fa-solid fa-cart-plus"></i> ${translations[lang].addToCart || 'أضف إلى السلة'}
                </button>
            `;
            container.appendChild(article);
        });
    };

    document.getElementById("budget-slider")?.addEventListener("input", (e) => {
        document.getElementById("budget-display").textContent = `${e.target.value} TL`;
        renderInteractiveMenu(Number(e.target.value));
    });

    document.getElementById("open-interactive-btn")?.addEventListener("click", () => {
        const slider = document.getElementById("budget-slider");
        if(slider) renderInteractiveMenu(Number(slider.value));
        openModal("interactive-modal");
    });

    // =========================================
    // Cart Logic (نظام سلة الطلبات)
    // =========================================
    window.addToCart = (id) => {
        const item = INTERACTIVE_MENU_DATA.find(i => i.id === id);
        if (!item) return;
        cartItems.push(item);
        updateCartUI();
        
        // عرض رسالة نجاح الإضافة المؤقتة
        const toast = document.getElementById("welcome-toast");
        if(toast) {
            const lang = localStorage.getItem("lang") || "ar";
            const originalTitle = translations[lang].toastTitle;
            const originalDesc = translations[lang].toastDesc;
            
            toast.querySelector("h4").textContent = "🛒";
            toast.querySelector("p").textContent = lang === 'ar' ? `تم إضافة ${item.name.ar} إلى السلة` : `${item.name.tr} sepete eklendi`;
            toast.classList.add("show");
            
            setTimeout(() => {
                toast.classList.remove("show");
                setTimeout(() => {
                    toast.querySelector("h4").textContent = originalTitle;
                    toast.querySelector("p").textContent = originalDesc;
                }, 600);
            }, 2500);
        }
    };

    window.removeFromCart = (index) => {
        cartItems.splice(index, 1);
        updateCartUI();
    };

    const updateCartUI = () => {
        const floatingBtn = document.getElementById("cart-floating-btn");
        const badge = document.getElementById("cart-badge");
        const lang = localStorage.getItem("lang") || "ar";
        
        if (cartItems.length > 0) { floatingBtn.style.display = "flex"; badge.textContent = cartItems.length; } 
        else { floatingBtn.style.display = "none"; closeModal("cart-modal"); }
        
        const container = document.getElementById("cart-items-container");
        const totalPriceEl = document.getElementById("cart-total-price");
        if (!container) return;
        
        if (cartItems.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: var(--text-secondary); padding: 20px; font-weight: bold;">${translations[lang].emptyCart}</p>`;
            totalPriceEl.textContent = "0 TL";
            return;
        }
        
        container.innerHTML = "";
        let total = 0;
        cartItems.forEach((item, index) => {
            total += item.basePrice;
            const name = item.name[lang] || item.name.en;
            container.innerHTML += `
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 10px; border-bottom: 1px solid rgba(150,150,150,0.1);">
                    <div><strong style="color: var(--text-primary);">${item.emoji} ${name}</strong><div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 4px;">${item.basePrice} TL</div></div>
                    <button onclick="removeFromCart(${index})" style="background: rgba(234,0,75,0.1); border: none; color: var(--yemeksepeti); width: 35px; height: 35px; border-radius: 8px; cursor: pointer; transition: 0.2s;"><i class="fa-solid fa-trash"></i></button>
                </div>`;
        });
        totalPriceEl.textContent = total + " TL";
    };

    document.getElementById("cart-floating-btn")?.addEventListener("click", () => openModal("cart-modal"));

    document.getElementById("checkout-btn")?.addEventListener("click", () => {
        if (cartItems.length === 0) return;
        const lang = localStorage.getItem("lang") || "ar";
        let text = lang === "ar" ? "مرحباً، أريد طلب الآتي:\n\n" : "Merhaba, şu siparişi vermek istiyorum:\n\n";
        let total = 0;
        const counts = {};
        cartItems.forEach(item => { const name = item.name[lang] || item.name.en; counts[name] = (counts[name] || 0) + 1; total += item.basePrice; });
        for (const [name, count] of Object.entries(counts)) { text += `▪️ ${name} (x${count})\n`; }
        text += lang === "ar" ? `\nالإجمالي التقريبي: *${total} TL*` : `\nTahmini Toplam: *${total} TL*`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
    });
