document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. ANIMACIÓN DE ENTRADA (Intro del CV)
    gsap.to(".gsap-reveal", {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "expo.out"
    });

    // 2. SCROLL TRIGGER PARA ÍTEMS ESPECÍFICOS
    // Esto hace que cada trabajo aparezca de forma sutil conforme el reclutador baja
    const elementsToReveal = [".job-item", ".project-card", "#edu", "#skills"];
    
    elementsToReveal.forEach(selector => {
        const els = document.querySelectorAll(selector);
        els.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                x: -15,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });
        });
    });

    // 3. TEMA OSCURO (Con guardado en localStorage)
    const toggle = document.getElementById("theme-toggle");
    const html = document.documentElement;

    toggle.addEventListener("click", () => {
        html.classList.toggle("dark");
        const isDark = html.classList.contains("dark");
        localStorage.setItem("theme", isDark ? "dark" : "light");
        
        // Pequeña vibración visual del toggle usando GSAP
        gsap.to(toggle, { rotation: isDark ? 180 : 0, duration: 0.4 });
    });

    // Cargar preferencia al inicio
    if (localStorage.getItem('theme') === 'light') {
        html.classList.remove('dark');
    }

    // 4. MOUSE HOVER EN PROYECTOS (Discreto Parallax)
    document.querySelectorAll(".project-card").forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(card, {
                x: x * 8,
                y: y * 8,
                duration: 0.4,
                ease: "power2.out"
            });
        });
        card.addEventListener("mouseleave", () => {
            gsap.to(card, { x: 0, y: 0, duration: 0.4 });
        });
    });
});