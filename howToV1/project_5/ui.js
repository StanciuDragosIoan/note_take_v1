//buttons and inputs
const inputBtn = document.querySelector("#inputBtn");
const listBtn = document.querySelector("#recordsBtn");
const importExportBtn = document.querySelector("#importExportBtn");
const inputDiv = document.querySelector("#input");
const entriesDiv = document.querySelector(".diaryEntries");
const importExportDiv = document.querySelector(".importExport");
const uiText = document.querySelector(".uiText");
//colors for UI customisation
const c1 = document.getElementById("c1");
const c2 = document.getElementById("c2");
const c3 = document.getElementById("c3");
const bodyBackground = document.querySelector("body");

//grab theme and active btn from localStorage
let theme = localStorage.getItem("theme");
let activeBtn = localStorage.getItem("activeBtn");

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
  let activeBtn = localStorage.getItem("activeBtn");

  switch (activeBtn) {
    case "entries":
      listBtn.style.backgroundColor = activeColor;
      break;
    case "importExport":
      importExportBtn.style.backgroundColor = activeColor;
      break;
    case "input":
      inputBtn.style.backgroundColor = activeColor;
      break;
  }
};

//keep track of UI theme and update
if (theme === "blue") {
  changeTheme("#6C8CE2", "#050D31", "#2600FF", "blue");
} else if (theme === "yellow") {
  changeTheme("#fcce03", "#ad871d", "#ebb852", "yellow");
} else if (theme === "pink") {
  changeTheme("pink", "#97089e", "#f003fc", "pink");
}

inputBtn.addEventListener("click", () => {
  toggleElement(
    [inputDiv],
    [entriesDiv, importExportDiv],
    [inputBtn],
    [listBtn, importExportBtn]
  );
  //set active btn to localStorage so app remembers it
  localStorage.setItem("activeBtn", "input");
});

listBtn.addEventListener("click", () => {
  toggleElement(
    [entriesDiv],
    [inputDiv, importExportDiv],
    [listBtn],
    [inputBtn, importExportBtn]
  );
  //set active btn to localStorage so app remembers it
  localStorage.setItem("activeBtn", "entries");
});

importExportBtn.addEventListener("click", () => {
  toggleElement(
    [importExportDiv],
    [inputDiv, entriesDiv],
    [importExportBtn],
    [listBtn, inputBtn]
  );
  //set active btn to localStorage so app remembers it
  localStorage.setItem("activeBtn", "importExport");
});

c1.addEventListener("click", () => {
  changeTheme("#6C8CE2", "#050D31", "#2600FF", "blue");
  //set theme to localStorage so app remembers it
  localStorage.setItem("theme", "blue");
});
c2.addEventListener("click", () => {
  changeTheme("#fcce03", "#ad871d", "#ebb852", "yellow");
  //set theme to localStorage so app remembers it
  localStorage.setItem("theme", "yellow");
});
c3.addEventListener("click", () => {
  changeTheme("pink", "#97089e", "#f003fc", "pink");
  //set theme to localStorage so app remembers it
  localStorage.setItem("theme", "pink");
});

//keep track of active page
if (activeBtn === "input") {
  toggleElement(
    [inputDiv],
    [entriesDiv, importExportDiv],
    [inputBtn],
    [listBtn, importExportBtn]
  );
} else if (activeBtn === "entries") {
  toggleElement(
    [entriesDiv],
    [inputDiv, importExportDiv],
    [listBtn],
    [inputBtn, importExportBtn]
  );
} else if (activeBtn === "importExport") {
  toggleElement(
    [importExportDiv],
    [inputDiv, entriesDiv],
    [importExportBtn],
    [listBtn, inputBtn]
  );
}

/*
 * Alert Functionality
 */
const showAlert = (msg) => {
  //alert functionality
  const alert = document.querySelector(".alert");
  alert.style.display = "block";
  alert.className = "alert uiText";
  alert.innerHTML = msg;

  setTimeout(() => {
    alert.innerHTML = "";
    alert.style.display = "none";
  }, 2000);
};
