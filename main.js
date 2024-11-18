window.onload = function () {
  loadData();
  const button = document.getElementById("switch");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("darkmode");
    header.classList.add("darkmode-header");
    button.textContent = "Light Mode";
  } else {
    button.textContent = "Dark Mode";
  }
};

// Function to add single items one at a time
function createItem() {
  const inputText = document.getElementById("itemInput").value;
  const list = document.getElementById("itemList");
  const item = inputText.trim();
  if (item !== "") {
    const div = document.createElement("div");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const label = document.createElement("label");
    label.textContent = item;

    // Add click event to the label for editing
    label.addEventListener("click", function () {
      editItem(label);
    });

    div.appendChild(checkbox);
    div.appendChild(label);
    list.appendChild(div);

    // Clear the input field
    document.getElementById("itemInput").value = "";
  }
}

function deleteItems() {
  const listSection = document.getElementById("list");
  const delList = document.getElementById("itemList");
  listSection.removeChild(delList);

  const newList = document.createElement("ul");
  newList.setAttribute("id", "itemList");
  listSection.appendChild(newList);

  document.getElementById("itemInput").value = "";
}

// Function to edit an item (the label text)
function editItem(label) {
  const currentText = label.textContent;
  const textBox = document.createElement("input");
  textBox.type = "text";
  textBox.value = currentText;

  label.replaceWith(textBox);

  textBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveItem(textBox, label);
    }
  });
}

// Save the edited item and replace input field with the updated label
function saveItem(input, label) {
  label.textContent = input.value;
  input.replaceWith(label);
}

// Function to save data to localStorage
function saveData() {
  const savedList = [];
  const listItems = document.getElementById("itemList").querySelectorAll("div");

  listItems.forEach((item) => {
    const label = item.querySelector("label");
    const checkbox = item.querySelector("input[type='checkbox'");
    savedList.push({
      text: label.textContent,
      checked: checkbox.checked,
    });
  });

  localStorage.setItem("shoppingList", JSON.stringify(savedList));
}

// Function to load data from localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem("shoppingList")) || [];
  data.forEach(addData);
}

// Function to add data from localStorage to the list
function addData(data) {
  const list = document.getElementById("itemList");
  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const label = document.createElement("label");
  label.textContent = data.text;

  // Set checkbox state based on the saved data
  checkbox.checked = data.checked;

  // Add click event to the label for editing
  label.addEventListener("click", function () {
    editItem(label);
  });

  div.appendChild(checkbox);
  div.appendChild(label);
  list.appendChild(div);
}

function darkMode() {
  document.body.classList.toggle("darkmode");
  header.classList.toggle("darkmode-header");
  const button = document.getElementById("switch");
  if (document.body.classList.contains("darkmode")) {
    localStorage.setItem("darkMode", "enabled");
    button.textContent = "Light Mode";
  } else {
    localStorage.setItem("darkMode", "disabled");
    button.textContent = "Dark Mode";
  }
}
const header = document.querySelector("header");
const button = document.getElementById("switch");
button.addEventListener("click", "darkMode");
