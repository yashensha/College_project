let d = new Date();
let m = d.getMonth();
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function op_att() {
  let op = document.getElementById("months").value;
  let monthAtt = `/admin/monthly/${op}`;
  console.log(monthAtt);
}

function linkTray() {
  let tray = document.querySelector(".link-tray");
  let iBar = document.querySelector(".b-icon");
  let iClose = document.querySelector(".c-icon");
  tray.style.top = "69px";
  iBar.style.display = "none";
  iClose.style.display = "flex";
}
function linkTrayClose() {
  let tray = document.querySelector(".link-tray");
  let iBar = document.querySelector(".b-icon");
  let iClose = document.querySelector(".c-icon");
  tray.style.top = "-120px";
  iBar.style.display = "flex";
  iClose.style.display = "flex";
}
