let notes;

if (localStorage.getItem("notes") === null) {
  notes = [];
} else {
  notes = JSON.parse(localStorage.getItem("notes"));
}

/*
 * Grabs user note and saves to localStorage API
 */
const grabNote = (e) => {
  const note = {};
  //regexp to 'know' how to put linebreaks
  let noteText = document.querySelector("#note").value;
  note.text = noteText.replace(/\r?\n/g, "<br />");
  const noteDate = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3");
  note.date = noteDate;
  let id =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
  note.id = id;
  notes.push(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("#note").value = "";

  //build the new note in the DOM so it is
  //seemlessly added and the UI flow is not broken
  const noteDiv = document.createElement("div");
  noteDiv.className = "card card-fresh";
  const pText = document.createElement("p");
  pText.className = "text";
  //pre tag allows for text to be displayed on multiple lines
  const preTag = document.createElement("pre");
  pText.appendChild(preTag);
  const text = document.createTextNode(`${noteText}`);
  preTag.appendChild(text);
  noteDiv.appendChild(pText);
  const pDate = document.createElement("p");
  pDate.className = "text";
  const dateText = document.createTextNode(`Written at: ${noteDate}`);
  pDate.appendChild(dateText);
  noteDiv.appendChild(pDate);
  const pId = document.createElement("p");
  pId.className = "text invisible";
  const idText = document.createTextNode(`id: ${id}`);
  pId.appendChild(idText);
  noteDiv.appendChild(pId);
  const icon1 = document.createElement("i");
  icon1.className = "fa fa-pencil pencil-note";
  noteDiv.appendChild(icon1);
  const span = document.createElement("span");
  span.id = "saveEdit";
  noteDiv.appendChild(span);
  icon1.addEventListener("click", editFresh);
  const icon2 = document.createElement("i");
  icon2.className = "fa fa-times-circle delete-fresh";
  noteDiv.appendChild(icon2);
  icon2.addEventListener("click", deleteFresh);
  const hr = document.createElement("hr");
  noteDiv.appendChild(hr);
  const list = document.querySelector(".first-card");
  list.insertBefore(noteDiv, list.childNodes[0]);

  //alert functionality
  const alert = document.querySelector(".alert");
  alert.style.display = "block";
  alert.className = "alert uiText";
  alert.innerHTML = "Note Saved &#x1F609;";

  setTimeout(() => {
    alert.innerHTML = "";
    alert.style.display = "none";
  }, 2000);
};

let saveBtn = document.querySelector(".add-note");
saveBtn.addEventListener("click", grabNote);

/*
 * Grabs notes from localStorage API and displays them to UI
 */
const displayNotes = () => {
  let records = document.querySelector("#records");
  let output = "<div class='first-card'></div>";
  notes.reverse().map((n) => {
    output += `
        <div class="card">
            <p class="text">
                ${n.text}
            </p>
            <p class="text">
                Written at: ${n.date}
            </p>
            <p class="text invisible">
                id: ${n.id}
            </p>
            <i class="fa fa-pencil pencil-note" aria-hidden="true"></i>
            <span id="saveEdit"></span><i class="fa fa-times-circle" aria-hidden="true"></i>
            <hr>
        </div>
      `;
  });
  records.innerHTML = output;
};
//call display notes to see the notes
displayNotes();

const filterField = document.querySelector(".filter");
filterField.addEventListener("click", () => (filterField.value = ""));

const filter = () => {
  //filter by title,  date
  document.querySelectorAll(".card").forEach((item) => {
    let value = document.querySelector(".filter").value.toLowerCase();

    const note = item.children[0].innerText;
    const date = item.children[1].innerText;

    if (
      note.toLowerCase().indexOf(value) != -1 ||
      date.toLowerCase().indexOf(value) != -1
    ) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
};

//put this on one line
const editBtns = Array.from(document.querySelectorAll(".pencil-note"));

/*
 * Allows note editing
 */
const editNote = (e) => {
  let idToEdit = e.target.parentElement.childNodes[5].innerText
    .trim()
    .split(":")[1]
    .trim();
  let cardToEdit = e.target.parentElement.childNodes[1];
  cardToEdit.contentEditable = "true";
  cardToEdit.style.backgroundColor = "#fff";
  cardToEdit.style.padding = "1.5rem";
  const editIcon = e.target.parentElement.childNodes[9];
  editIcon.style.display = "inline-block";
  editIcon.innerHTML = `<i class="fa fa-check" aria-hidden="true"></i>`;
  e.preventDefault();
};

editBtns.map((i) => {
  i.addEventListener("click", editNote);
});

/*
 * saves note after edit
 */
const saveNote = (e) => {
  let newText = e.target.parentElement.parentElement.childNodes[1].innerText
    .trim()
    .replace(/\r?\n/g, "<br />");
  let newDate = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3");
  let idToEdit = e.target.parentElement.parentElement.childNodes[5].innerText
    .trim()
    .split(":")[1]
    .trim();

  let newResource = {
    text: newText,
    date: newDate,
    id: idToEdit,
  };

  notes.map((n, index) => {
    if (n.id === idToEdit) {
      notes[index] = newResource;
    }
  });

  localStorage.setItem("notes", JSON.stringify(notes.reverse()));

  let cardToEdit = e.target.parentElement.parentElement.childNodes[1];
  cardToEdit.contentEditable = "false";
  cardToEdit.style.backgroundColor = "#f0edd9";
  cardToEdit.style.padding = "0";
  const editIcon = e.target.parentElement.parentElement.childNodes[9];
  editIcon.style.display = "none";
};

const saveIcon = Array.from(document.querySelectorAll("#saveEdit"));

saveIcon.map((i) => {
  i.addEventListener("click", saveNote);
});

/*
 * Deletes a note
 */
const deleteNote = (e) => {
  let idToDelete = e.target.parentElement.childNodes[5].innerText
    .split(":")[1]
    .trim();
  notes.map((n, index) => {
    if (n.id === idToDelete) {
      notes.splice(index, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  e.target.parentElement.style.display = "none";
};
let deleteBtns = Array.from(document.querySelectorAll(".fa-times-circle"));
deleteBtns.map((b) => {
  b.addEventListener("click", deleteNote);
});

/*
 * Edit note while just adding it (without refresh)
 */
const editFresh = (e) => {
  let idToEdit = e.target.parentElement.childNodes[2].innerText
    .split(":")[1]
    .trim();
  let cardToEdit = e.target.parentElement.childNodes[0];
  cardToEdit.contentEditable = "true";
  cardToEdit.style.backgroundColor = "#fff";
  cardToEdit.style.padding = "1.5rem";
  const editIcon = e.target.parentElement.childNodes[5];
  editIcon.style.display = "inline";
  editIcon.addEventListener("click", saveFresh);
  editIcon.innerHTML = `<i class="fa fa-check save-fresh" aria-hidden="true"></i>`;
  e.preventDefault();
};

/*
 * Save while just adding it (no refresh)
 */
const saveFresh = (e) => {
  let newText;
  let idToEdit;
  if (e.target.parentElement.parentElement.childNodes[0] !== undefined) {
    newText = e.target.parentElement.parentElement.childNodes[0].innerHTML
      .trim()
      .replace(/\r?\n/g, "<br />");
  }

  let newDate = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3");
  if (e.target.parentElement.parentElement.childNodes[2] !== undefined) {
    idToEdit = e.target.parentElement.parentElement.childNodes[2].innerHTML
      .split(":")[1]
      .trim();
  }
  let newResource = {
    text: newText,
    date: newDate,
    id: idToEdit,
  };
  notes.map((n, index) => {
    if (n.id === idToEdit) {
      notes[index] = newResource;
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));
  let cardToEdit = e.target.parentElement.parentElement.childNodes[0];
  cardToEdit.contentEditable = "false";
  cardToEdit.style.backgroundColor = "#f0edd9";
  cardToEdit.style.padding = "0";
  const editIcon = e.target.parentElement.childNodes[0];
  editIcon.style.display = "none";
  const deleteIcon = document.querySelector(".delete-fresh");
  deleteIcon.style.display = "block";
};

editBtns.map((i) => {
  i.addEventListener("click", editNote);
});

/*
 * Delete a note while just adding it (no refresh)
 */
const deleteFresh = (e) => {
  let idToDelete;
  if (e.target.parentElement.childNodes[2] !== undefined) {
    idToDelete = e.target.parentElement.childNodes[2].innerText
      .split(":")[1]
      .trim();
  }
  notes.map((n, index) => {
    if (n.id === idToDelete) {
      notes.splice(index, 1);
    }
  });
  localStorage.setItem("notes", JSON.stringify(notes));

  let cardToHide = e.target.parentElement;
  cardToHide.style.display = "none";
};

/*
 * Delete all notes
 */
const deleteAllBtn = document.querySelector("#deleteNotes");
const deleteNotes = () => {
  deleteAllBtn.style.backgroundColor = "red";
  deleteAllBtn.style.border = "2px solid black";
  localStorage.removeItem("notes");
  document.querySelector(".first-card").innerHTML = "";
  const cardsToDelete = Array.from(document.querySelectorAll(".card"));
  cardsToDelete.map((i) => (i.style.display = "none"));
};
deleteAllBtn.addEventListener("click", deleteNotes);

/*
 * Export  notes as JSON
 */
const exportBTN = document.querySelector("#exportBtn");
const importBTN = document.querySelector("#importBtn");

const exportNotes = () => {
  exportBTN.style.backgroundColor = activeColor;
  importBTN.style.backgroundColor = inactiveColor;

  let notesObj = {
    notes,
  };
  let exportDate = new Date()
    .toString()
    .replace(/\S+\s(\S+)\s(\d+)\s(\d+)\s.*/, "$2-$1-$3");
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  var json = JSON.stringify(notesObj),
    blob = new Blob([json], { type: "octet/stream" }),
    url = window.URL.createObjectURL(blob);
  a.href = url;
  a.download = `myNotes-${exportDate}.json`;
  a.click();
  window.URL.revokeObjectURL(url);
};

exportBtn.addEventListener("click", exportNotes);

/*
 * Import JSON with  notes
 */
const importNotes = (e) => {
  importBTN.style.backgroundColor = activeColor;
  exportBTN.style.backgroundColor = inactiveColor;

  document.getElementById("file").addEventListener(
    "change",
    (evt) => {
      var files = evt.target.files;
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        let newNotes = JSON.parse(event.target.result).notes;
        newNotes.map((i) => notes.push(i));
        localStorage.setItem("notes", JSON.stringify(notes));

        const alert = document.querySelector(".alert");
        alert.style.display = "block";
        alert.className = "alert uiText";
        alert.innerHTML = "Notes imported Successfully &#x1F609;";
        setTimeout(() => {
          alert.innerHTML = "";
          alert.style.display = "none";
        }, 2000);
        displayNotes();
      };
      let readValue = reader.readAsText(file);
    },
    false
  );
};
importBtn.addEventListener("click", importNotes);
