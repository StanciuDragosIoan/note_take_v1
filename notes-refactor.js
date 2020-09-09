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
  let noteText = document.querySelector("#note").value;
  note.text = noteText;
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
};

let saveBtn = document.querySelector(".add-note");
saveBtn.addEventListener("click", grabNote);

/*
 * Grabs notes from localStorage API and displays them to UI
 */
const displayNotes = () => {
  let records = document.querySelector("#records");
  let output = "";
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

displayNotes();

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
  let newText = e.target.parentElement.parentElement.childNodes[1].innerText.trim();
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
 * filters notes
 */

const filter = () => {
  //filter by title, subreddit, author
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

//import export functionality
const importBTN = document.querySelector("#importBtn");
const exportBTN = document.querySelector("#exportBtn");

const importNotes = (e) => {
  importBTN.style.backgroundColor = btn1Color;
  exportBTN.style.backgroundColor = btn2Color;

  document.getElementById("file").addEventListener(
    "change",
    (evt) => {
      var files = evt.target.files;
      var file = files[0];
      var reader = new FileReader();
      reader.onload = function (event) {
        let newNotes = JSON.parse(event.target.result).notes;
        localStorage.setItem("notes", JSON.stringify(newNotes));
        document.querySelector(".alert").style.display = "block";
        setTimeout(() => {
          document.querySelector(".alert").style.display = "none";
        }, 3000);
      };
      let readValue = reader.readAsText(file);
    },
    false
  );
};

const exportNotes = () => {
  exportBTN.style.backgroundColor = btn1Color;
  importBTN.style.backgroundColor = btn2Color;

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

importBtn.addEventListener("click", importNotes);
exportBtn.addEventListener("click", exportNotes);
