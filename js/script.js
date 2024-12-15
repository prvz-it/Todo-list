let inputTodo = document.querySelector(".todoInner input");
let buttonTodo = document.querySelector(".todoInner button");
let ulContent = document.querySelector(".ul-content");

let editTask = null;

function addTodo() {
  let currentInputValue = inputTodo.value.trim();

  if (inputTodo.value == "") {
    alert("Write something in the input field ...!");
  } else {
    if (editTask) {
      editTask.firstChild.textContent = currentInputValue;
      editTask = null;
      buttonTodo.textContent = "Add";
    } else {
      let liContent = document.createElement("li");
      liContent.innerHTML = ` <div class="completed_li">${inputTodo.value}<i class="edit fa-solid fa-pen-to-square"></i></div>
                                                                          <i class="delete fa-solid fa-trash-can"></i>`;
      ulContent.appendChild(liContent);
    }
  }
  inputTodo.value = "";
  saveItem();
}

inputTodo.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

ulContent.addEventListener("click", (event) => {
  if (event.target.classList.contains("completed_li")) {
    event.target.classList.toggle("completed");
    // let editIcon = ulContent.querySelector(".edit");
    // editIcon.style.display = "none";
  } else if (event.target.classList.contains("delete")) {
    event.target.parentElement.remove();
  } else if (event.target.classList.contains("edit")) {
    editTask = event.target.parentElement;
    inputTodo.value = editTask.firstChild.textContent.trim();
    buttonTodo.textContent = "Update";
  }
  saveItem();
});

function saveItem() {
  localStorage.setItem("Todo", ulContent.innerHTML);
}

function getItem() {
  ulContent.innerHTML = localStorage.getItem("Todo");
}

getItem();
