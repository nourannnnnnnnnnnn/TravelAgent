// utils/priceCalculator.js

// Pricing logic for accommodations
const accommodationPrices = {
 single: 50,
 double: 100,
 family: 150
};

// Pricing logic for transportation
const transportationPrices = {
 bus: 30,
 car: 100,
 privateCar: 200
};

// Calculate the total price based on the selected accommodation, transportation, and additional facilities (if any)
const calculatePrice = ({ accommodation, transportation, facilities = [] }) => {
 let price = 0;

 // Add price based on accommodation type
 if (accommodationPrices[accommodation]) {
   price += accommodationPrices[accommodation];
 } else {
   throw new Error(`Invalid accommodation type: ${accommodation}`);
 }

 // Add price based on transportation type
 if (transportationPrices[transportation]) {
   price += transportationPrices[transportation];
 } else {
   throw new Error(`Invalid transportation type: ${transportation}`);
 }

 // Add price for additional facilities (if any)
 if (facilities.length > 0) {
   price += facilities.length * 20;  // Example: each facility adds 20 to the price
 }

 return price;
};

module.exports = { calculatePrice };
