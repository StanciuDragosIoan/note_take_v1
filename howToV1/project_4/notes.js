let notes;

if (localStorage.getItem("notes") === null) {
  notes = [];
} else {
  notes = JSON.parse(localStorage.getItem("notes"));
}

/*
 * Grabs notes from localStorage API and displays to UI
 */
const displayNotes = () => {
  let records = document.querySelector("#records");
  let output = "";
  notes.map((n) => {
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
                <i 
                  class="fa fa-pencil pencil-note" 
                  aria-hidden="true"></i>
                <span 
                  id="saveEdit"></span>
                    <i 
                        class="fa fa-times-circle" 
                        aria-hidden="true"
                    ></i>
                <hr>
            </div>
          `;
  });
  records.innerHTML = output;

  //select 'all' edit buttons (not just 1)
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
    editIcon.innerHTML = `
          <i class="fa fa-check" aria-hidden="true"></i>`;
    e.preventDefault();
  };

  //bind the event to all edit buttons
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

    localStorage.setItem("notes", JSON.stringify(notes));

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
  //event listener for delete
  let deleteBtns = Array.from(document.querySelectorAll(".fa-times-circle"));
  deleteBtns.map((b) => {
    b.addEventListener("click", deleteNote);
  });
};

//call display notes to see the notes
displayNotes();

/*
 * Grabs note and saves to localStorage API
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
  notes.unshift(note);
  localStorage.setItem("notes", JSON.stringify(notes));
  document.querySelector("#note").value = "";

  //call displayNotes & 'refresh' the notes after each add
  displayNotes();

  //alert functionality
  const alert = document.querySelector(".alert");
  alert.style.display = "block";
  alert.className = "alert uiText";
  alert.innerHTML = "Note Saved 😉";
  setTimeout(() => {
    alert.innerHTML = "";
    alert.style.display = "none";
  }, 2000);
};

let saveBtn = document.querySelector(".add-note");
saveBtn.addEventListener("click", grabNote);

/*
 * filter notes functionality
 */
const filterField = document.querySelector(".filter");
//put this on one line
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

/*
 * Delete all notes
 */
const deleteAllBtn = document.querySelector("#deleteNotes");

const deleteNotes = () => {
  deleteAllBtn.style.backgroundColor = "red";
  deleteAllBtn.style.border = "2px solid black";
  //empty notes array
  notes = [];
  localStorage.removeItem("notes");
  document.querySelector("#records").innerHTML = "";
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
        newNotes.map((i) => notes.unshift(i));
        localStorage.setItem("notes", JSON.stringify(notes));

        const alert = document.querySelector(".alert");
        alert.style.display = "block";
        alert.className = "alert uiText";
        alert.innerHTML = "Notes imported Successfully 😉";
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
