// ===== App logic (uses MENU, orders, nextId, hours from data.js) =====

var current = "Dashboard";
var $ = function (s) { return document.querySelector(s); };

/* ---- Sidebar with dropdown groups ---- */
function buildNav() {
  var nav = $("#nav");
  nav.innerHTML = "";
  MENU.forEach(function (m) {
    var open = m.i.indexOf(current) > -1 || m.g === "Overview";

    var g = document.createElement("div");
    g.className = "group" + (open ? " open" : "");

    var h = document.createElement("button");
    h.className = "ghead";
    h.setAttribute("aria-expanded", open);
    h.innerHTML = "<span>" + m.g + "</span><span class='chev'>▼</span>";
    h.onclick = function () {
      var o = g.classList.toggle("open");
      h.setAttribute("aria-expanded", o);
    };

    var box = document.createElement("div");
    box.className = "items";
    m.i.forEach(function (n) {
      var b = document.createElement("button");
      b.className = "item" + (n === current ? " active" : "");
      b.textContent = n;
      b.onclick = function () { go(n); };
      box.appendChild(b);
    });

    g.appendChild(h);
    g.appendChild(box);
    nav.appendChild(g);
  });
}

/* ---- Switch page ---- */
function go(n) {
  current = n;
  var isDash = n === "Dashboard";
  $("#title").textContent = n;
  $("#sub").textContent = isDash ? "Today’s service at a glance." : "";
  $("#dash").hidden = !isDash;
  $("#other").hidden = isDash;
  buildNav();
  if (innerWidth <= 760) $("#side").classList.remove("show");
}

/* ---- Small pop-up message ---- */
function toast(t) {
  var e = $("#toast");
  e.textContent = t;
  e.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(function () { e.classList.remove("show"); }, 1800);
}

/* ---- Open orders list ---- */
function drawOrders() {
  var box = $("#orders");
  box.innerHTML = "";
  if (!orders.length) {
    box.innerHTML = "<div class='empty'>No open orders. All caught up! 🎉</div>";
  }
  orders.forEach(function (o) {
    var r = document.createElement("div");
    r.className = "order";
    r.innerHTML = "<span>#" + o.id + " · " + o.where + "</span>" +
      "<span class='pill " + (o.state === "Ready" ? "ready" : "") + "'>" + o.state + "</span>";

    var b = document.createElement("button");
    b.className = "btn";
    b.textContent = o.state === "Preparing" ? "Mark ready" : "Mark served";
    b.onclick = function () {
      if (o.state === "Preparing") {
        o.state = "Ready";
      } else {
        orders = orders.filter(function (x) { return x !== o; });
        toast("Order #" + o.id + " served");
      }
      drawOrders();
    };
    r.appendChild(b);
    box.appendChild(r);
  });
  $("#openCount").textContent = orders.length;
}

/* ---- Sales by hour chart ---- */
function drawChart() {
  var max = Math.max.apply(null, hours.map(function (h) { return h[1]; }));
  $("#chart").innerHTML = hours.map(function (h) {
    return "<div class='bar' title='₱" + h[1].toLocaleString() + "'>" +
      "<i style='height:" + Math.round(h[1] / max * 150) + "px'></i>" + h[0] + "</div>";
  }).join("");
}

/* ---- Clicks: new order buttons and page links ---- */
document.addEventListener("click", function (e) {
  var n = e.target.closest("[data-new]");
  var g = e.target.closest("[data-go]");
  if (n) {
    var type = n.dataset.new;
    orders.push({
      id: nextId++,
      where: type === "Dine-in" ? "T" + (orders.length + 1) : type,
      state: "Preparing"
    });
    drawOrders();
    toast(type + " order added");
  }
  if (g) go(g.dataset.go);
});

/* ---- ☰ button: hide/show sidebar ---- */
$("#burger").onclick = function () {
  var s = $("#side");
  if (innerWidth <= 760) s.classList.toggle("show");
  else s.classList.toggle("hide");
};

/* ---- Start ---- */
buildNav();
drawOrders();
drawChart();
