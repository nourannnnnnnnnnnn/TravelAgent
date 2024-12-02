// config/config.js
const locations = [
 'Cairo',
 'Giza',
 'Alexandria',
 'Luxor',
 'Aswan',
 'Hurghada',
 'Port Said',
 'Suez',
 'Ismailia',
 'Dakahlia',
 'Qena',
 'Gharbia',
 'Sharqia',
 'Beheira',
 'Fayoum',
 'Minya',
 'Beni Suef',
 'Sohag',
 'Assiut',
 'New Valley',
 'Matrouh',
 'Kafr El Sheikh',
 'Damietta',
 'Red Sea',
 'North Sinai',
 'South Sinai',
 'Qalyubia',
 'Monufia',
 'Helwan',
 '6th of October',
];

const programs = {
 Cairo: [
   { name: 'City Tour', basePrice: 500 },
   { name: 'Pyramids Visit', basePrice: 800 },
   { name: 'Nile Cruise', basePrice: 600 },
   { name: 'Museum Visit', basePrice: 400 },
   { name: 'Cultural Tour', basePrice: 300 },
 ],
 Giza: [
   { name: 'Pyramids Visit', basePrice: 600 },
   { name: 'Sphinx Tour', basePrice: 700 },
   { name: 'Camel Ride', basePrice: 150 },
   { name: 'Sound and Light Show', basePrice: 250 },
 ],
 Alexandria: [
   { name: 'Beach Vacation', basePrice: 500 },
   { name: 'City Tour', basePrice: 300 },
   { name: 'Bibliotheca Alexandrina Visit', basePrice: 150 },
   { name: 'Corniche Walk', basePrice: 100 },
 ],
 Luxor: [
   { name: 'Valley of the Kings Tour', basePrice: 600 },
   { name: 'Temple Visit', basePrice: 400 },
   { name: 'Hot Air Balloon Ride', basePrice: 1200 },
   { name: 'Nile Cruise', basePrice: 1000 },
 ],
 Aswan: [
   { name: 'Philae Temple Visit', basePrice: 450 },
   { name: 'Nubian Village Tour', basePrice: 300 },
   { name: 'Nile Felucca Ride', basePrice: 250 },
 ],
 // Add other locations similarly...
};

const accommodations = {
 single: 100,
 double: 150,
 family: 200,
};

const transportation = {
 bus: 50,
 car: 100,
 privateCar: 200,
};

module.exports = {
 locations,
 programs,
 accommodations,
 transportation,
};
