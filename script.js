// ========================================
// SHREE BALAJI SWEETS
// SWEET CALCULATOR
// ========================================


// ---------- MODE BUTTONS ----------

const rateToWeightBtn = document.getElementById("rateToWeightBtn");
const weightToPriceBtn = document.getElementById("weightToPriceBtn");

const rateToWeightSection = document.getElementById("rateToWeightSection");
const weightToPriceSection = document.getElementById("weightToPriceSection");


// ---------- RATE → WEIGHT ----------

const sweetRate = document.getElementById("sweetRate");
const amountGiven = document.getElementById("amountGiven");
const calculateWeightBtn = document.getElementById("calculateWeightBtn");
const weightResult = document.getElementById("weightResult");


// ---------- WEIGHT → PRICE ----------

const sweetRate2 = document.getElementById("sweetRate2");
const weightGiven = document.getElementById("weightGiven");
const weightUnit = document.getElementById("weightUnit");
const calculatePriceBtn = document.getElementById("calculatePriceBtn");
const priceResult = document.getElementById("priceResult");


// ========================================
// SWITCH: RATE → WEIGHT
// ========================================

rateToWeightBtn.addEventListener("click", function () {

    rateToWeightBtn.classList.add("active");
    weightToPriceBtn.classList.remove("active");

    rateToWeightSection.classList.remove("hidden");
    weightToPriceSection.classList.add("hidden");

});


// ========================================
// SWITCH: WEIGHT → PRICE
// ========================================

weightToPriceBtn.addEventListener("click", function () {

    weightToPriceBtn.classList.add("active");
    rateToWeightBtn.classList.remove("active");

    weightToPriceSection.classList.remove("hidden");
    rateToWeightSection.classList.add("hidden");

});


// ========================================
// RATE → WEIGHT CALCULATION
// ========================================

function calculateWeight() {

    const rate = parseFloat(sweetRate.value);
    const amount = parseFloat(amountGiven.value);

    // Check values
    if (
        isNaN(rate) ||
        isNaN(amount) ||
        rate <= 0 ||
        amount < 0
    ) {

        weightResult.textContent = "0 g";
        return;
    }


    // Formula
    // Amount ÷ 1kg Rate × 1000
    const totalGrams = (amount / rate) * 1000;


    // Round to 2 decimal places
    const gramsRounded =
        Math.round(totalGrams * 100) / 100;


    // --------------------------------
    // Less than 1 KG
    // --------------------------------

    if (gramsRounded < 1000) {

        let gramsText;

        if (Number.isInteger(gramsRounded)) {

            gramsText = gramsRounded.toString();

        } else {

            gramsText = gramsRounded
                .toFixed(2)
                .replace(/0+$/, "")
                .replace(/\.$/, "");

        }

        weightResult.textContent =
            gramsText + " g";

        return;
    }


    // --------------------------------
    // 1 KG or more
    // --------------------------------

    const kg = Math.floor(gramsRounded / 1000);

    const remainingGrams =
        Math.round((gramsRounded - (kg * 1000)) * 100) / 100;


    // Exact KG
    if (remainingGrams === 0) {

        weightResult.textContent =
            kg + " kg";

        return;
    }


    // KG + remaining grams
    let gramsText;

    if (Number.isInteger(remainingGrams)) {

        gramsText = remainingGrams.toString();

    } else {

        gramsText = remainingGrams
            .toFixed(2)
            .replace(/0+$/, "")
            .replace(/\.$/, "");

    }


    weightResult.textContent =
        kg + " kg " + gramsText + " g";
}


// Calculate button
calculateWeightBtn.addEventListener(
    "click",
    calculateWeight
);


// ========================================
// WEIGHT → PRICE CALCULATION
// ========================================

function calculatePrice() {

    const rate = parseFloat(sweetRate2.value);
    const weight = parseFloat(weightGiven.value);


    if (
        isNaN(rate) ||
        isNaN(weight) ||
        rate <= 0 ||
        weight < 0
    ) {

        priceResult.textContent = "₹ 0";
        return;
    }


    let grams;


    // If KG selected
    if (weightUnit.value === "kg") {

        grams = weight * 1000;

    }

    // If Gram selected
    else {

        grams = weight;

    }


    // Formula
    // Weight ÷ 1000 × Rate
    const price =
        (grams / 1000) * rate;


    // Round
    const roundedPrice =
        Math.round(price * 100) / 100;


    let priceText;


    if (Number.isInteger(roundedPrice)) {

        priceText = roundedPrice.toString();

    } else {

        priceText = roundedPrice
            .toFixed(2)
            .replace(/0+$/, "")
            .replace(/\.$/, "");

    }


    priceResult.textContent =
        "₹ " + priceText;
}


// Calculate price button
calculatePriceBtn.addEventListener(
    "click",
    calculatePrice
);


// ========================================
// ENTER KEY SUPPORT
// ========================================

sweetRate.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculateWeight();
    }

});


amountGiven.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculateWeight();
    }

});


sweetRate2.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculatePrice();
    }

});


weightGiven.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        calculatePrice();
    }

});
