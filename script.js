document.addEventListener("DOMContentLoaded", () => {
  const noteInput = document.getElementById("note-input");
  const saveNoteButton = document.getElementById("save-note");
  const notesList = document.getElementById("notes-list");

  function loadNotes() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notesList.innerHTML = notes
      .map(
        (note, index) => `
            <div class="note mb-4 p-4 border border-gray-300 rounded-lg">
                <p>${note.content}</p>
                <button class="edit-note mt-2 bg-yellow-500 text-white px-2 py-1 rounded" data-index="${index}">Edit</button>
                <button class="delete-note mt-2 bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Delete</button>
            </div>
        `
      )
      .join("");
  }

  function saveNote() {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const content = noteInput.value.trim();
    if (content) {
      notes.push({ content });
      localStorage.setItem("notes", JSON.stringify(notes));
      noteInput.value = "";
      loadNotes();
    }
  }

  function deleteNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    loadNotes();
  }

  function editNote(index) {
    const notes = JSON.parse(localStorage.getItem("notes")) || [];
    const newContent = prompt("Edit note:", notes[index].content);
    if (newContent !== null) {
      notes[index].content = newContent;
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    }
  }

  saveNoteButton.addEventListener("click", saveNote);

  notesList.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-note")) {
      const index = event.target.dataset.index;
      deleteNote(index);
    } else if (event.target.classList.contains("edit-note")) {
      const index = event.target.dataset.index;
      editNote(index);
    }
  });

  loadNotes();
});
