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
const month = monthNames[d.getMonth()];
const preMonth = monthNames[d.getMonth() - 1];
document.getElementById("month").innerHTML = `${month}`;
document.getElementById("previousMonth").innerText = `Mess bill of ${preMonth}`;

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
  tray.style.top = "-89px";
  iBar.style.display = "flex";
  iClose.style.display = "flex";
}
