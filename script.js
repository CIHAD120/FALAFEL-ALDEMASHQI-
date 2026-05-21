document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeIcon = themeToggleBtn.querySelector("i");
    const body = document.body;

    // استرجاع السمة المحفوظة (إن وجدت)
    const savedTheme = localStorage.getItem("theme");

    // تطبيق السمة المحفوظة بسلاسة
    if (savedTheme === "dark") {
        body.classList.add("dark-mode");
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }

    // إضافة وظيفة التبديل عند النقر
    themeToggleBtn.addEventListener("click", () => {
        // إضافة تأثير نبض صغير للزر عند النقر
        themeToggleBtn.style.transform = "scale(0.9)";
        setTimeout(() => {
            themeToggleBtn.style.transform = "";
        }, 150);

        body.classList.toggle("dark-mode");
        const isDarkMode = body.classList.contains("dark-mode");

        if (isDarkMode) {
            themeIcon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "dark");
        } else {
            themeIcon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "light");
        }
    });
});