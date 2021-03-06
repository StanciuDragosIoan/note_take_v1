//buttons & inputs
const inputBtn = document.querySelector("#inputBtn");
const input = document.querySelector("#input");
const list = document.querySelector("#records");
const listBtn = document.querySelector("#recordsBtn");
const recordsBtn = document.querySelector("#recordsBtn");
let importExportBtn = document.querySelector("#importExportBtn");
const importExportDiv = document.querySelector(".importExport");
const importBtn = document.querySelector("#importBtn");
const exportBtn = document.querySelector("#exportBtn");
let text = document.querySelector(".text");
//colors for UI customisation
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
//colors for customize
const bodyBackground = document.querySelector("body");

let btn1Color = "#050D31";
let btn2Color = "#2600FF";

//methods
const toggleInput = () => {
  input.style.display = "block";
  list.style.display = "none";
  inputBtn.style.backgroundColor = btn1Color;
  listBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  importExportDiv.style.display = "none";
  document.querySelector(".paper").style.display = "block";
  document.querySelector(".filter").style.display = "none";
};

const toggleRecords = () => {
  list.style.display = "block";
  input.style.display = "none";
  listBtn.style.backgroundColor = btn1Color;
  inputBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  document.querySelector(".filter").style.display = "block";
  importExportDiv.style.display = "none";
};

const toggleImportExport = () => {
  importExportBtn.style.backgroundColor = btn1Color;
  inputBtn.style.backgroundColor = btn2Color;
  listBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  importExportDiv.style.display = "block";
  document.querySelector(".filter").style.display = "none";
  list.style.display = "none";
  input.style.display = "none";
};

// swap themes for colors
const swapToBlue = () => {
  // console.log("blue theme here");
  bodyBackground.style.backgroundColor = "#6C8CE2";
  btn1Color = "#050D31";
  btn2Color = "#2600FF";
  inputBtn.style.backgroundColor = btn2Color;
  recordsBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  listBtn.style.border = "none";
  inputBtn.style.border = "none";
  listBtn.style.border = `2px solid ${btn1Color}`;
  inputBtn.style.border = `2px solid ${btn1Color}`;
  importBtn.style.border = `2px solid ${btn1Color}`;
  exportBtn.style.border = `2px solid ${btn1Color}`;
  importExportBtn.style.border = `2px solid ${btn1Color}`;
  text.style.border = `2px solid ${btn1Color}`;
};

const swapToYellow = () => {
  // console.log("yellow theme here");
  bodyBackground.style.backgroundColor = "#fcce03";
  btn1Color = "#ad871d";
  btn2Color = "#ebb852";
  inputBtn.style.backgroundColor = btn2Color;
  recordsBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  listBtn.style.border = "none";
  inputBtn.style.border = "none";
  listBtn.style.border = `2px solid ${btn1Color}`;
  inputBtn.style.border = `2px solid ${btn1Color}`;
  importBtn.style.border = `2px solid ${btn1Color}`;
  exportBtn.style.border = `2px solid ${btn1Color}`;
  importExportBtn.style.border = `2px solid ${btn1Color}`;
  text.style.border = `2px solid ${btn1Color}`;
};

const swapToPink = () => {
  // console.log("pink theme here");
  bodyBackground.style.backgroundColor = "pink";
  btn1Color = "#97089e";
  btn2Color = "#f003fc";
  inputBtn.style.backgroundColor = btn2Color;
  recordsBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  listBtn.style.border = "none";
  inputBtn.style.border = "none";
  listBtn.style.border = `2px solid ${btn1Color}`;
  inputBtn.style.border = `2px solid ${btn1Color}`;
  importBtn.style.border = `2px solid ${btn1Color}`;
  exportBtn.style.border = `2px solid ${btn1Color}`;
  importExportBtn.style.border = `2px solid ${btn1Color}`;
  text.style.border = `2px solid ${btn1Color}`;
};

//event listeners
inputBtn.addEventListener("click", toggleInput);
listBtn.addEventListener("click", toggleRecords);
importExportBtn.addEventListener("click", toggleImportExport);
c1.addEventListener("click", swapToBlue);
c2.addEventListener("click", swapToYellow);
c3.addEventListener("click", swapToPink);
