// ===== Data: edit this file to change menu items, orders and chart numbers =====

// Sidebar menu: group name + its pages
var MENU = [
  { g: "Overview", i: ["Dashboard"] },
  { g: "Menu",     i: ["Menu items", "Categories", "Pricing", "Availability"] },
  { g: "Floor",    i: ["Tables", "Reservations", "Table turnover"] },
  { g: "Orders",   i: ["Dine-in", "Takeaway", "Room service", "All orders"] },
  { g: "Billing",  i: ["POS billing", "Payments", "Guest folio"] }
];

// Starting open orders
var orders = [
  { id: 1095, where: "T3", state: "Preparing" }
];
var nextId = 1096;

// Sales by hour (pesos)
var hours = [
  ["8h", 4300], ["10h", 2800], ["12h", 11000], ["14h", 5200],
  ["16h", 3100], ["18h", 13082], ["20h", 10200]
];
