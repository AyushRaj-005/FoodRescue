let foodItems = [];

const foodStorageKey = "foodRescueFoodItems";
const foodList = document.querySelector("#food-list");
const searchInput = document.querySelector("#food-search");
const categoryFilter = document.querySelector("#category-filter");
const foodLoadingMessage = document.querySelector("#food-loading-message");
const emptyMessage = document.querySelector("#empty-message");
const addFoodForm = document.querySelector("#add-food-form");
const quantityInput = document.querySelector("#food-quantity");
const formMessage = document.querySelector("#form-message");
const claimedCount = document.querySelector("#claimed-count");
let isFoodDataLoaded = false;
let hasFoodLoadError = false;
let canSaveFoodItems = true;

function isValidFoodItem(foodItem) {
    if (foodItem === null || typeof foodItem !== "object" || Array.isArray(foodItem) ||
        !Number.isSafeInteger(foodItem.id) || foodItem.id <= 0) {
        return false;
    }

    const requiredTextFields = [
        "name", "category", "quantity", "pickupLocation", "availableUntil", "status"
    ];
    for (const fieldName of requiredTextFields) {
        if (typeof foodItem[fieldName] !== "string" || !foodItem[fieldName].trim()) {
            return false;
        }
    }

    return true;
}

function saveFoodItems(items) {
    try {
        localStorage.setItem(foodStorageKey, JSON.stringify(items));
        canSaveFoodItems = true;
        return true;
    } catch (error) {
        canSaveFoodItems = false;
        foodLoadingMessage.textContent = "Food items could not be saved in this browser.";
        foodLoadingMessage.classList.add("load-error");
        foodLoadingMessage.hidden = false;
        return false;
    }
}

function loadInitialFoodItems() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            const shouldSimulateError =
                new URLSearchParams(window.location.search).get("simulateLoadError") === "true";

            if (shouldSimulateError) {
                reject(new Error("Food items could not be loaded. Please refresh the page to try again."));
                return;
            }

            resolve([
                {
                    id: 1,
                    name: "Vegetable Rice Bowl",
                    category: "Meals",
                    quantity: "5 portions",
                    pickupLocation: "Main Canteen",
                    availableUntil: "2:30 PM",
                    status: "Available"
                },
                {
                    id: 2,
                    name: "Cheese Sandwich",
                    category: "Snacks",
                    quantity: "4 pieces",
                    pickupLocation: "Cafe Counter",
                    availableUntil: "1:45 PM",
                    status: "Limited"
                },
                {
                    id: 3,
                    name: "Fresh Bananas",
                    category: "Fruits",
                    quantity: "6 pieces",
                    pickupLocation: "Main Canteen",
                    availableUntil: "3:00 PM",
                    status: "Available"
                },
                {
                    id: 4,
                    name: "Paneer Wrap",
                    category: "Meals",
                    quantity: "3 portions",
                    pickupLocation: "North Cafe",
                    availableUntil: "2:00 PM",
                    status: "Limited"
                },
                {
                    id: 5,
                    name: "Seasonal Apples",
                    category: "Fruits",
                    quantity: "5 pieces",
                    pickupLocation: "Cafe Counter",
                    availableUntil: "3:15 PM",
                    status: "Available"
                }
            ]);
        }, 800);
    });
}

function escapeHTML(value) {
    const charactersToEscape = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
    };

    return String(value).replace(/[&<>"']/g, function (character) {
        return charactersToEscape[character];
    });
}

function displayFoodItems() {
    if (!isFoodDataLoaded) {
        foodList.innerHTML = "";
        emptyMessage.hidden = true;
        return;
    }

    const searchText = searchInput.value.trim().toLowerCase();
    const selectedCategory = categoryFilter.value;
    let foodCards = "";

    for (const foodItem of foodItems) {
        const matchesSearch = foodItem.name.toLowerCase().includes(searchText);
        const matchesCategory =
            selectedCategory === "All" || foodItem.category === selectedCategory;

        if (matchesSearch && matchesCategory) {
            let statusClass = "unknown";
            switch (foodItem.status) {
                case "Available":
                    statusClass = "available";
                    break;
                case "Limited":
                    statusClass = "limited";
                    break;
                case "Claimed":
                case "Collected":
                    statusClass = "claimed";
                    break;
                case "Expired":
                    statusClass = "expired";
                    break;
                default:
                    statusClass = "unknown";
            }

            foodCards += `
                <article class="food-card" data-food-id="${foodItem.id}">
                    <div class="food-card-top">
                        <div>
                            <h3>${escapeHTML(foodItem.name)}</h3>
                            <p class="food-category">${escapeHTML(foodItem.category)}</p>
                        </div>
                        <span class="food-status ${statusClass}">${escapeHTML(foodItem.status)}</span>
                    </div>
                    <dl class="food-details">
                        <div class="food-detail">
                            <dt>Quantity</dt>
                            <dd>${escapeHTML(foodItem.quantity)}</dd>
                        </div>
                        <div class="food-detail">
                            <dt>Pickup</dt>
                            <dd>${escapeHTML(foodItem.pickupLocation)}</dd>
                        </div>
                        <div class="food-detail">
                            <dt>Available until</dt>
                            <dd>${escapeHTML(foodItem.availableUntil)}</dd>
                        </div>
                    </dl>
                    ${foodItem.status === "Available" ? `
                        <button class="claim-button" type="button" data-food-id="${foodItem.id}">
                            Claim food
                        </button>
                    ` : ""}
                </article>
            `;
        }
    }

    foodList.innerHTML = foodCards;
    emptyMessage.hidden = foodCards !== "" || hasFoodLoadError;
    claimedCount.textContent = foodItems.filter(function (foodItem) {
        return foodItem.status === "Claimed";
    }).length;
}

foodList.addEventListener("click", function (event) {
    const claimButton = event.target.closest(".claim-button");
    if (!claimButton) {
        return;
    }

    const claimedFoodId = Number(claimButton.dataset.foodId);
    const foodToClaim = foodItems.find(function (foodItem) {
        return foodItem.id === claimedFoodId;
    });

    if (!foodToClaim || foodToClaim.status !== "Available") {
        return;
    }

    const updatedFoodItems = foodItems.map(function (foodItem) {
        if (foodItem.id === claimedFoodId) {
            return { ...foodItem, status: "Claimed" };
        }

        return foodItem;
    });

    if (!canSaveFoodItems || !saveFoodItems(updatedFoodItems)) {
        return;
    }

    foodItems = updatedFoodItems;
    displayFoodItems();
});

searchInput.addEventListener("input", displayFoodItems);
categoryFilter.addEventListener("change", displayFoodItems);

document.querySelector("#discount-demo-form").addEventListener("submit", function (event) {
    event.preventDefault();
    showDiscountExample();
});

document.querySelector("#spending-amount").addEventListener("input", showDiscountExample);

addFoodForm.addEventListener("input", function () {
    formMessage.textContent = "";
    formMessage.classList.remove("error");
});

addFoodForm.addEventListener("invalid", function () {
    formMessage.textContent = "";
    formMessage.classList.remove("error");
}, true);

addFoodForm.addEventListener("submit", function (event) {
    event.preventDefault();
    formMessage.textContent = "";
    formMessage.classList.remove("error");

    if (!addFoodForm.checkValidity()) {
        addFoodForm.reportValidity();
        return;
    }

    const foodName = document.querySelector("#food-name").value.trim();
    const pickupLocation = document.querySelector("#pickup-location").value.trim();
    const quantity = Number(quantityInput.value);

    if (!foodName) {
        formMessage.textContent = "Enter a food name using at least one non-space character.";
        formMessage.classList.add("error");
        document.querySelector("#food-name").focus();
        return;
    }

    if (!pickupLocation) {
        formMessage.textContent = "Enter a pickup location using at least one non-space character.";
        formMessage.classList.add("error");
        document.querySelector("#pickup-location").focus();
        return;
    }

    if (!Number.isFinite(quantity) || quantity <= 0) {
        formMessage.textContent = "Quantity must be a number greater than zero.";
        formMessage.classList.add("error");
        quantityInput.focus();
        return;
    }

    let nextId = 1;
    for (const foodItem of foodItems) {
        if (foodItem.id >= nextId) {
            nextId = foodItem.id + 1;
        }
    }

    const newFoodItem = {
        id: nextId,
        name: foodName,
        category: document.querySelector("#food-category").value,
        quantity: `${quantity} portions`,
        pickupLocation: pickupLocation,
        availableUntil: document.querySelector("#available-until").value,
        status: "Available"
    };
    const updatedFoodItems = [...foodItems, newFoodItem];

    if (!canSaveFoodItems || !saveFoodItems(updatedFoodItems)) {
        formMessage.textContent = "Food item could not be saved. Check the saved food data and try again.";
        formMessage.classList.add("error");
        return;
    }

    foodItems = updatedFoodItems;

    addFoodForm.reset();
    searchInput.value = "";
    categoryFilter.value = "All";
    displayFoodItems();
    formMessage.textContent = "Food item added and shown in Available Food.";
});

async function initializeFoodItems() {
    try {
        let hasSavedFoodItems = false;
        try {
            const savedFoodItemsText = localStorage.getItem(foodStorageKey);
            if (savedFoodItemsText !== null) {
                const savedFoodItems = JSON.parse(savedFoodItemsText);
                const savedFoodIds = new Set();

                if (!Array.isArray(savedFoodItems)) {
                    throw new Error("Saved food data must be a list.");
                }

                for (const savedFoodItem of savedFoodItems) {
                    if (!isValidFoodItem(savedFoodItem) || savedFoodIds.has(savedFoodItem.id)) {
                        throw new Error("Saved food data contains an invalid item.");
                    }

                    savedFoodIds.add(savedFoodItem.id);
                }

                foodItems = savedFoodItems;
                hasSavedFoodItems = true;
            }
        } catch (error) {
            canSaveFoodItems = false;
            throw new Error("Saved food data could not be restored and was not overwritten.");
        }

        const searchParameters = new URLSearchParams(window.location.search);
        const requestedSearch = searchParameters.get("foodSearch");
        const requestedCategory = searchParameters.get("category");

        if (requestedSearch) {
            searchInput.value = requestedSearch;
        }

        if (requestedCategory && Array.from(categoryFilter.options).some(function (option) {
            return option.value === requestedCategory;
        })) {
            categoryFilter.value = requestedCategory;
        }

        const initialFoodItems = await loadInitialFoodItems();

        if (!hasSavedFoodItems) {
            for (const initialFoodItem of initialFoodItems) {
                let foodItemId = initialFoodItem.id;
                while (foodItems.some(function (foodItem) {
                    return foodItem.id === foodItemId;
                })) {
                    foodItemId += 1;
                }

                foodItems = [...foodItems, { ...initialFoodItem, id: foodItemId }];
            }

            saveFoodItems(foodItems);
        }

        isFoodDataLoaded = true;
        if (!hasFoodLoadError && canSaveFoodItems) {
            foodLoadingMessage.hidden = true;
        }
        displayFoodItems();
    } catch (error) {
        isFoodDataLoaded = true;
        hasFoodLoadError = true;
        foodLoadingMessage.textContent = error.message;
        foodLoadingMessage.classList.add("load-error");
        displayFoodItems();
    }
}

showDiscountExample();
initializeFoodItems();

function showDiscountExample() {
    const spendingInput = document.querySelector("#spending-amount");
    const discountResult = document.querySelector("#discount-result");

    if (!spendingInput.value) {
        discountResult.textContent = "Enter a spending amount to see the example.";
        return;
    }

    const spendingAmount = Number(spendingInput.value);
    if (!Number.isFinite(spendingAmount) || spendingAmount < 0) {
        discountResult.textContent = "Enter a valid amount of zero or more.";
        return;
    }

    let discountRate = 0;
    if (spendingAmount > 1000) {
        discountRate = 0.2;
    } else if (spendingAmount > 500) {
        discountRate = 0.1;
    } else {
        discountRate = 0;
    }

    const discountedAmount = spendingAmount * (1 - discountRate);
    const discountPercent = discountRate * 100;
    discountResult.textContent =
        `Academic example: ${discountPercent}% discount; final example amount is ${discountedAmount.toFixed(2)}.`;
}