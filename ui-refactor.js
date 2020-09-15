let theme = "blue";

theme = localStorage.getItem("theme");
activeBtn = localStorage.getItem("activeBtn");
document.querySelector(".filter.uiText").style.display = "none";
//buttons & inputs
const inputBtn = document.querySelector("#inputBtn");
const input = document.querySelector("#input");
const list = document.querySelector("#records");
const listBtn = document.querySelector("#recordsBtn");
const recordsBtn = document.querySelector("#recordsBtn");
const importExportBtn = document.querySelector("#importExportBtn");
const importExportDiv = document.querySelector(".importExport");
const importBtn = document.querySelector("#importBtn");
const exportBtn = document.querySelector("#exportBtn");
const text = document.querySelector(".text");
const uiText = document.querySelector(".uiText");
const paper = document.querySelector(".paper");
const filterInput = document.querySelector(".filter");
//colors for UI customisation
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
//colors for customize
const bodyBackground = document.querySelector("body");
let btn1Color = "#050D31";
let btn2Color = "#2600FF";

//methods
const toggleElement = (toShow, toHide, toColor1, toColor2, c1, c2) => {
  toShow.map((el) => (el.style.display = "block"));
  toHide.map((el) => (el.style.display = "none"));
  toColor1.map((el) => (el.style.backgroundColor = c1));
  toColor2.map((el) => (el.style.backgroundColor = c2));
};

//swap themes for colors
// const swapToBlue = () => {
//   console.log("blue theme here");
//   bodyBackground.style.backgroundColor = "#6C8CE2";
//   btn1Color = "#050D31";
//   btn2Color = "#2600FF";
//   inputBtn.style.backgroundColor = btn2Color;
//   recordsBtn.style.backgroundColor = btn2Color;
//   importExportBtn.style.backgroundColor = btn2Color;
//   importBtn.style.backgroundColor = btn2Color;
//   exportBtn.style.backgroundColor = btn2Color;
//   listBtn.style.border = "none";
//   inputBtn.style.border = "none";
//   listBtn.style.border = `2px solid ${btn1Color}`;
//   inputBtn.style.border = `2px solid ${btn1Color}`;
//   importBtn.style.border = `2px solid ${btn1Color}`;
//   exportBtn.style.border = `2px solid ${btn1Color}`;
//   importExportBtn.style.border = `2px solid ${btn1Color}`;
//   uiText.style.border = `2px solid ${btn1Color}`;
//   localStorage.setItem("theme", "blue");
// };

// const swapToYellow = () => {
//   console.log("yellow theme here");
//   bodyBackground.style.backgroundColor = "#fcce03";
//   btn1Color = "#ad871d";
//   btn2Color = "#ebb852";
//   inputBtn.style.backgroundColor = btn2Color;
//   recordsBtn.style.backgroundColor = btn2Color;
//   importExportBtn.style.backgroundColor = btn2Color;
//   importBtn.style.backgroundColor = btn2Color;
//   exportBtn.style.backgroundColor = btn2Color;
//   listBtn.style.border = "none";
//   inputBtn.style.border = "none";
//   listBtn.style.border = `2px solid ${btn1Color}`;
//   inputBtn.style.border = `2px solid ${btn1Color}`;
//   importBtn.style.border = `2px solid ${btn1Color}`;
//   exportBtn.style.border = `2px solid ${btn1Color}`;
//   importExportBtn.style.border = `2px solid ${btn1Color}`;
//   uiText.style.border = `2px solid ${btn1Color}`;
//   localStorage.setItem("theme", "yellow");
// };

const changeTheme = (c1, c2, c3, c4) => {
  bodyBackground.style.backgroundColor = c1;
  btn1Color = c2;
  btn2Color = c3;
  inputBtn.style.backgroundColor = btn2Color;
  recordsBtn.style.backgroundColor = btn2Color;
  importExportBtn.style.backgroundColor = btn2Color;
  importBtn.style.backgroundColor = btn2Color;
  exportBtn.style.backgroundColor = btn2Color;
  listBtn.style.border = `2px solid ${btn1Color}`;
  inputBtn.style.border = `2px solid ${btn1Color}`;
  importBtn.style.border = `2px solid ${btn1Color}`;
  exportBtn.style.border = `2px solid ${btn1Color}`;
  importExportBtn.style.border = `2px solid ${btn1Color}`;
  uiText.style.border = `2px solid ${btn1Color}`;
  localStorage.setItem("theme", c4);
};

// changeTheme("#fcce03", "#ad871d", "#ebb852", "yellow");

const swapToPink = () => {
  //keep track of active page
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
  uiText.style.border = `2px solid ${btn1Color}`;
  localStorage.setItem("theme", "pink");
};

// console.log(theme);
//keep track of UI theme and update
if (theme === "blue") {
  // swapToBlue();
  changeTheme("#6C8CE2", "#050D31", "#2600FF", "blue");
} else if (theme === "yellow") {
  // swapToYellow();
  changeTheme("#fcce03", "#ad871d", "#ebb852", "yellow");
} else if (theme === "pink") {
  // swapToPink();
  changeTheme("pink", "#97089e", "#f003fc", "pink");
}

//keep track of active page
if (activeBtn === "input") {
  toggleElement(
    [input, paper],
    [list, importExportDiv, filterInput, deleteAllBtn],
    [inputBtn],
    [listBtn, importBtn, exportBtn, importExportBtn],
    btn1Color,
    btn2Color
  );
  document.querySelector("#deleteNotes").style.display = "none";
} else if (activeBtn === "entries") {
  toggleElement(
    [list, filterInput],
    [input, importExportDiv],
    [listBtn],
    [inputBtn, importBtn, exportBtn, importExportBtn],
    btn1Color,
    btn2Color
  );
} else if (activeBtn === "importExport") {
  toggleElement(
    [importExportDiv],
    [input, filterInput, list],
    [importExportBtn],
    [inputBtn, listBtn, exportBtn, importBtn],
    btn1Color,
    btn2Color
  );

  document.querySelector("#deleteNotes").style.display = "none";
}
//event listeners

//toggle INPUT section
inputBtn.addEventListener("click", () => {
  toggleElement(
    [input, paper],
    [list, importExportDiv, filterInput, deleteAllBtn],
    [inputBtn],
    [listBtn, importBtn, exportBtn, importExportBtn],
    btn1Color,
    btn2Color
  );

  localStorage.setItem("activeBtn", "input");
});

//toggle diary entries
listBtn.addEventListener("click", () => {
  toggleElement(
    [list, filterInput, deleteAllBtn],
    [input, importExportDiv],
    [listBtn],
    [inputBtn, importBtn, exportBtn, importExportBtn, deleteAllBtn],
    btn1Color,
    btn2Color
  );
  localStorage.setItem("activeBtn", "entries");
});

//toggle importExport section
importExportBtn.addEventListener("click", () => {
  toggleElement(
    [importExportDiv],
    [input, filterInput, list, deleteAllBtn],
    [importExportBtn],
    [inputBtn, listBtn, exportBtn, importBtn],
    btn1Color,
    btn2Color
  );
  localStorage.setItem("activeBtn", "importExport");
});

c1.addEventListener("click", () => {
  changeTheme("#6C8CE2", "#050D31", "#2600FF", "blue");
});
c2.addEventListener("click", () => {
  changeTheme("#fcce03", "#ad871d", "#ebb852", "yellow");
});
c3.addEventListener("click", () => {
  changeTheme("pink", "#97089e", "#f003fc", "pink");
});
