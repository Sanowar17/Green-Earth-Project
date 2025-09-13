// Load Plants and Categories

const loadCategory = () => { 
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((json) => {
      const plants = json.plants;
      displayCategory(plants);
      displayPlants(plants);
    });
};

// Display Categories in Sidebar

const displayCategory = (plants) => { 
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = "";

  const categories = [...new Set(plants.map(plant => plant.category))];

  // "All Trees" button

  const allBtn = document.createElement("button");
  allBtn.className = "btn font-semibold hover:bg-green-700 bg-green-600 rounded-[10px] mb-2 block w-full text-left text-white active-category";
  allBtn.innerText = "All Trees";
  allBtn.onclick = () => {
    setActiveCategory(allBtn);
    displayPlants(plants);
  };
  categoryContainer.append(allBtn);

  categoryContainer.className = "p-2 w-90";
  categories.forEach(category => {
    const btn = document.createElement("button");
    btn.className = "btn mb-2 block w-full rounded-[10px] hover:bg-[#BAD8B6] text-left";
    btn.innerText = category;
    btn.onclick = () => {
      setActiveCategory(btn);
      const loadCategoryWord = plants.filter(p => p.category === category);
      displayPlants(loadCategoryWord);
    };
    categoryContainer.append(btn);
  });
};

// Function to highlight active category

const setActiveCategory = (activeBtn) => {
  const buttons = document.querySelectorAll("#category-container button");
  buttons.forEach(btn => {
    btn.classList.remove("bg-sky-600", "text-white", "active-category");
  });
  
  activeBtn.classList.add("bg-sky-600", "text-white", "active-category");
};

// Display Plants as Cards

const displayPlants = (plants) => {
  const plantContainer = document.getElementById("plant-container");
  plantContainer.innerHTML = "";

  // grid system

  plantContainer.className = "p-5 gap-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3";

  plants.forEach((plant) => {
    const card = document.createElement("div");
    card.className = "w-full h-110 p-4 bg-white rounded-xl shadow-md space-y-20";

    card.innerHTML = `
      <div>
        <img src="${plant.image}" 
             alt="${plant.name} - ${plant.category}" 
             class="w-full h-48 object-cover rounded-lg mb-3">
        
        <!-- Name clickable -->
        <h2 class="font-bold text-lg cursor-pointer text-green-700 hover:underline"
            onclick='openPlantModal(${JSON.stringify(plant)})'>
            ${plant.name}
        </h2>

        <p class="text-sm mb-5">${plant.description.slice(0, 80)}...</p>
        
        <div class="flex justify-between font-semibold">
          <div class="rounded-3xl p-2 bg-green-100">
            <span>${plant.category}</span>
          </div>
          <span>${plant.price}৳</span>
        </div>

        <!-- Add to Cart Button -->
<button onclick='addToCart("${plant.name}", ${plant.price})'
class="w-full mt-5 py-2 mx-auto rounded-4xl bg-[#15803d] text-white hover:bg-sky-500">
Add to Cart
</button>

    `;
    plantContainer.append(card);
  });
};


                          // Modal Functions

// Open Modal
function openPlantModal(plant) {
  const modal = document.getElementById("plant-modal");
  const modalContent = document.getElementById("modal-content");
  

  modalContent.innerHTML = `
    <div class="w-130 h-140 p-6 bg-white rounded-xl shadow-md relative">
    <!-- Close Button -->
    <button onclick="closePlantModal()" 
            class="absolute top-122 right-2 bg-gray-300 text-black px-5 py-3 mr-5 rounded-lg hover:bg-yellow-300 text-sm font-semibold">Close</button>

      <!-- Plant Card (same design style) -->
      <div class="flex flex-col items-center">
      <h2 class="self-start mb-4 text-2xl font-bold">${plant.name}</h2>
        <img src="${plant.image}" alt="${plant.name}" class="h-60 w-full object-cover rounded-lg shadow-md mb-4">
        <p class="text-gray-600 self-start font-medium"><span class="font-bold text-lg">Category:</span> ${plant.category}</p>
        <p class="text-gray-600 self-start  font-semibold mt-2"><span class="font-bold text-lg">Price:</span> ${plant.price}৳</p>
        <p class="text-sm mt-2 text-gray-700 self-start "><span class="font-bold text-lg">Description:</span>${plant.description}</p>
      </div>
    </div>
  `;

  modal.classList.remove("hidden");
}

// Close Modal

function closePlantModal() {
  document.getElementById("plant-modal").classList.add("hidden");
}

                           //  CART VARIABLES
                           
let cartItems = [];
let cartTotal = 0;

// Function to update total display
function updateTotalDisplay() {
  const priceEl = document.getElementById("cart-price");
  if (priceEl) {
    priceEl.innerText = `${cartTotal}৳`;
  }
}


function addToCart(plantName, plantPrice) {
  const cartSection = document.getElementById("your-cart-section");

  // History Showing

  cartItems.push({ name: plantName, price: plantPrice });
  cartTotal += plantPrice;

  const item = document.createElement("div");
  item.className = "flex justify-between items-center mb-2 mt-2 text-black bg-green-50 px-3 py-2 text-lg font-medium";
  item.innerHTML = `
    <span>${plantName} - ${plantPrice}৳</span>
    <button class="text-red-600 ml-2 font-bold hover:text-red-800">❌</button>
  `;

  const removeBtn = item.querySelector("button");
  removeBtn.addEventListener("click", () => {
    cartSection.removeChild(item);
    cartTotal -= plantPrice;

    // Remove only first matching item from cartItems

    const index = cartItems.findIndex(i => i.name === plantName && i.price === plantPrice);
    if (index > -1) cartItems.splice(index, 1);

    updateTotalDisplay();
  });

  cartSection.append(item);
  updateTotalDisplay();

  alert(`${plantName} added to cart!`);
}

loadCategory();
