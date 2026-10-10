const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");

const MAX_LENGTH = 200;
const STORAGE_KEY = "quicknotes";

let notes = loadNotes();

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    return [];
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = "You have " + notes.length + " notes.";
  }
}

function createNoteCard(note) {
  const li = document.createElement("li");
  li.classList.add("note-card", "category-" + note.category.toLowerCase());

  const text = document.createElement("p");
  text.classList.add("note-text");
  text.textContent = note.text;

  const meta = document.createElement("div");
  meta.classList.add("note-meta");

  const label = document.createElement("span");
  label.classList.add("note-label");
  label.textContent = note.category;

  const date = document.createElement("span");
  date.textContent = note.createdAt;

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.classList.add("note-delete");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", function () {
    deleteNote(note.id);
  });

  meta.append(label, date, deleteBtn);
  li.append(text, meta);
  return li;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const visible = notes.filter(function (note) {
    return note.text.toLowerCase().includes(query);
  });

  notesList.textContent = "";

  if (notes.length > 0 && visible.length === 0) {
    const empty = document.createElement("li");
    empty.classList.add("empty-message");
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
  } else {
    visible.forEach(function (note) {
      notesList.appendChild(createNoteCard(note));
    });
  }

  updateCount();
}

function addNote(text, category) {
  const note = {
    id: Date.now(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString()
  };
  notes.unshift(note);
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter(function (note) {
    return note.id !== id;
  });
  saveNotes();
  render();
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }

  if (text.length > MAX_LENGTH) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  errorMessage.textContent = "";
  addNote(text, categorySelect.value);
  noteInput.value = "";
  noteInput.focus();
});

searchInput.addEventListener("input", render);

render();
