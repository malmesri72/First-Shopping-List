window.onload = function () {
  loadData();
};
//Creating a function named "createList()"
function createList() {
  // Getting the text in <input> by putting its id
  const inputText = document.getElementById("itemInput").value;

  // splitting items by the commas to different items ex: "Apples, Oranges" will be "Apples" and "Oranges"
  const items = inputText.split(",");

  // Getting <ul> by id
  const list = document.getElementById("itemList");

  // loop to create <li> for each item in items that's separated by commas. First the temporary variable "i" is declared, then the requirement for entering the loop is set to i being less than the number of items, and i increments each time so it can exit the loop when there aren't any more list items.
  for (let i = 0; i < items.length; i++) {
    // creating "item", which is the next item in items, but with trimmed spaces.
    let item = items[i].trim();
    // If the item isn't blank, create a list item (Fixes blank bullet point issue caused by multiple commas)
    if (item !== "") {
      // Create a new <li> element for each item
      const listItem = document.createElement("li");
      // Set the text of the <li> to the text in "item", which holds the text for each item that the loop is focused on.
      listItem.textContent = item;
      // put <li> in <ul>
      list.appendChild(listItem);
    }
  }
}
function deleteItems() {
  // Putting div with list inside in listSection
  const listSection = document.getElementById("list");

  // Remove <ul> by getting id of <ul> and removing it from <div>
  const delList = document.getElementById("itemList");
  listSection.removeChild(delList);

  // Create a new <ul> with the same id as the old one
  const newList = document.createElement("ul");
  newList.setAttribute("id", "itemList"); // Correct way to set the ID
  listSection.appendChild(newList);

  // Clearing input text box
  document.getElementById("itemInput").value = "";
}
const ul = document.getElementById("itemList");
ul.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    editItem(event.target);
  }
});
function editItem(item) {
  const currentItem = item;
  const currentText = item.textContent;
  const textBox = document.createElement("input");
  textBox.type = "text";
  textBox.placeholder = "Edit item: ";
  currentItem.replaceWith(textBox);
  textBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveItem(textBox);
    }
  });
}
function saveItem(item) {
  {
    const li = document.createElement("li");
    li.textContent = item.value;
    item.replaceWith(li);
  }
}
function saveData() {
  const savedList = [];
  const ul = document.getElementById("itemList");
  ul.querySelectorAll("li").forEach((li) => savedList.push(li.textContent));
  localStorage.setItem("shoppingList", JSON.stringify(savedList));
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("shoppingList")) || [];
  data.forEach(addData);
}

function addData(data) {
  const newItem = document.createElement("li");
  newItem.textContent = data;
  const ul = document.getElementById("itemList");
  ul.appendChild(newItem);
}
