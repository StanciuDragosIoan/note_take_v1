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
};
//call display notes to see the notes
displayNotes();

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
