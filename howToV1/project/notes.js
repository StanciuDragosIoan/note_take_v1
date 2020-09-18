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
  // icon1.addEventListener("click", editFresh);
  const icon2 = document.createElement("i");
  icon2.className = "fa fa-times-circle delete-fresh";
  noteDiv.appendChild(icon2);
  // icon2.addEventListener("click", deleteFresh);
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
