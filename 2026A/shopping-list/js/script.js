document.addEventListener("DOMContentLoaded", () => {
    let bag = [];
    const productDropdown = document.getElementById("productDropdown");
    const selectedText = document.querySelector(".select-selected");
    const itemsContainer = document.querySelector(".select-items");
    const hiddenInput = document.getElementById("itemName");
    const mainPreview = document.getElementById("mainPreview");
    const shopForm = document.getElementById("shopForm");
    let currentImg = "";

    // 1. Lógica para abrir/cerrar dropdown
    selectedText.addEventListener("click", (e) => {
        e.stopPropagation();
        itemsContainer.classList.toggle("select-hide");
    });

    // 2. Lógica para seleccionar item
    itemsContainer.querySelectorAll("div").forEach(item => {
        item.addEventListener("click", function() {
            const val = this.getAttribute("data-value");
            const img = this.getAttribute("data-img");

            selectedText.innerText = val; // Cambia el texto visible
            hiddenInput.value = val;      // LLENA EL INPUT REQUIRED
            mainPreview.src = img;       // Cambia el preview
            currentImg = img;            // Guarda imagen para la lista

            itemsContainer.classList.add("select-hide");
        });
    });

    // Cerrar si hace click afuera
    window.addEventListener("click", () => itemsContainer.classList.add("select-hide"));

    // 3. Lógica Añadir a la cesta
    shopForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Verificación extra de seguridad
        if (!hiddenInput.value) {
            alert("Por favor, selecciona un producto del menú.");
            return;
        }

        const newItem = {
            id: Date.now(),
            name: hiddenInput.value,
            qty: document.getElementById("itemQty").value,
            category: document.getElementById("itemCategory") ? document.getElementById("itemCategory").value : "GNDR",
            img: currentImg || mainPreview.src
        };

        bag.push(newItem);
        renderBag();
        
        // Reset del formulario
        shopForm.reset();
        selectedText.innerText = "Selecciona un artículo";
        hiddenInput.value = "";
    });

    function renderBag() {
        const list = document.getElementById("shoppingList");
        const counter = document.getElementById("counter");
        list.innerHTML = "";
        counter.innerText = `${bag.length} ARTÍCULOS`;

        bag.forEach(item => {
            const div = document.createElement("div");
            div.className = "item-card";
            div.style.display = "flex";
            div.style.justifyContent = "space-between";
            div.style.alignItems = "center";
            div.style.padding = "15px 0";
            div.style.borderBottom = "1px solid #eee";

            div.innerHTML = `
                <div style="display:flex; align-items:center; gap:15px;">
                    <img src="${item.img}" style="width:50px; height:70px; object-fit:cover;">
                    <div class="item-info">
                        <h2 style="font-size:12px; text-transform:uppercase;">${item.name}</h2>
                        <span style="font-size:10px; color:#666;">CANT: ${item.qty} | ${item.category}</span>
                    </div>
                </div>
                <button onclick="window.removeBagItem(${item.id})" 
                        style="background:none; border:none; text-decoration:underline; font-size:10px; cursor:pointer;">
                        Eliminar
                </button>
            `;
            list.appendChild(div);
        });
    }

    // Hacer función de eliminar accesible globalmente
    window.removeBagItem = (id) => {
        bag = bag.filter(item => item.id !== id);
        renderBag();
    };
});