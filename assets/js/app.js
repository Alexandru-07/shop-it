document.addEventListener("DOMContentLoaded", () => {
    const categoryLinks = document.querySelectorAll("[data-category-link]");
    const productCards = document.querySelectorAll("[data-category]");
    const searchInput = document.querySelector("[data-search]");
    const emptyState = document.getElementById("emptyState");
    let activeCategory = "all";

    const yearSlot = document.getElementById("year");
    if (yearSlot) {
        yearSlot.textContent = new Date().getFullYear();
    }

    const filterCards = () => {
        const query = (searchInput?.value || "").trim().toLowerCase();
        let visibleCount = 0;

        productCards.forEach((card) => {
            const category = card.dataset.category;
            const matchesCategory = activeCategory === "all" || category === activeCategory;
            const text = card.textContent.toLowerCase();
            const matchesSearch = !query || text.includes(query);
            const shouldShow = matchesCategory && matchesSearch;

            card.hidden = !shouldShow;
            if (shouldShow) visibleCount += 1;
        });

        if (emptyState) {
            emptyState.hidden = visibleCount !== 0;
        }
    };

    categoryLinks.forEach((link) => {
        const category = link.dataset.categoryLink;

        link.addEventListener("click", (event) => {
            event.preventDefault();
            activeCategory = category;

            categoryLinks.forEach((lnk) => lnk.classList.toggle("active", lnk === link));
            filterCards();

            const productsSection = document.getElementById("products");
            productsSection?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    searchInput?.addEventListener("input", filterCards);

    document.querySelectorAll("[data-scroll-to]").forEach((trigger) => {
        const targetSelector = trigger.dataset.scrollTo;
        trigger.addEventListener("click", () => {
            const section = document.querySelector(targetSelector);
            section?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });

    filterCards();
});
