//buttons and inputs
const inputBtn = document.querySelector("#inputBtn");
const listBtn = document.querySelector("#recordsBtn");
const importExportBtn = document.querySelector("#importExportBtn");
const inputDiv = document.querySelector("#input");
const entriesDiv = document.querySelector(".diaryEntries");
const importExportDiv = document.querySelector(".importExport");
//colors for UI customisation
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const bodyBackground = document.querySelector("body");

let activeColor = "#050D31";
let inactiveColor = "#2600FF";

const toggleElement = (toShow, toHide, activeC, inactiveC) => {
  toShow.map((i) => (i.style.display = "block"));
  toHide.map((i) => (i.style.display = "none"));
  activeC.map((i) => (i.style.backgroundColor = activeColor));
  inactiveC.map((i) => (i.style.backgroundColor = inactiveColor));
};

const changeTheme = (c1, c2, c3, c4) => {
  bodyBackground.style.backgroundColor = c1;
  activeColor = c2;
  inactiveColor = c3;
  inputBtn.style.backgroundColor = inactiveColor;
  recordsBtn.style.backgroundColor = inactiveColor;
  importExportBtn.style.backgroundColor = inactiveColor;
  importBtn.style.backgroundColor = inactiveColor;
  exportBtn.style.backgroundColor = inactiveColor;
  listBtn.style.border = `2px solid ${activeColor}`;
  inputBtn.style.border = `2px solid ${activeColor}`;
  importBtn.style.border = `2px solid ${activeColor}`;
  exportBtn.style.border = `2px solid ${activeColor}`;
  importExportBtn.style.border = `2px solid ${activeColor}`;
  uiText.style.border = `2px solid ${activeColor}`;
};

inputBtn.addEventListener("click", () => {
  toggleElement(
    [inputDiv],
    [entriesDiv, importExportDiv],
    [inputBtn],
    [listBtn, importExportBtn]
  );
});

listBtn.addEventListener("click", () => {
  toggleElement(
    [entriesDiv],
    [inputDiv, importExportDiv],
    [listBtn],
    [inputBtn, importExportBtn]
  );
});

importExportBtn.addEventListener("click", () => {
  toggleElement(
    [importExportDiv],
    [inputDiv, entriesDiv],
    [importExportBtn],
    [listBtn, inputBtn]
  );
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
