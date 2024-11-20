/* To do DOM problems:
Understand the Goal: Determine what action or change you want to see happen on the webpage.
Identify the Elements: Find the specific elements on the page that need to be used or affected.
Break Down Actions: List each action that needs to happen step by step, like creating, modifying, or deleting elements.
Translate to Code: Use JavaScript DOM methods like createElement, appendChild, or setAttribute to implement each action.
Test the Function: Connect the function to an event like a button click and test its behavior in the browser.
Debug Issues: Use tools like console.log to check values and ensure everything works as expected.
Refine the Function: Simplify the function, make it reusable, or add comments to clarify the steps.
Add Event Listeners: Use addEventListener to link your function to user interactions like clicks or input changes.
Handle Edge Cases: Add conditions to prevent errors, such as checking for empty inputs or invalid data.
Iterate and Improve: Review the function after testing and refine it to make it more efficient or add new features.*/

window.onload = function () {
  loadData();
  const button = document.getElementById("switch");
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("darkmode");
    header.classList.add("darkmode-header");
    button.textContent = "Light Mode";
    button.classList.add("darkmode");
  } else {
    button.textContent = "Dark Mode";
  }
};

// Function to add single items one at a time
/* Steps:
   1. put the words in the text box in a variable
   2. put the div in a variable
   3. trim the spaces from the text box with .trim()
   4. Make sure the text isn't blank with if
   5. put a new div in a variable
   6. make a checkbox variable which is a checkbox
   7. make a label tag that has text from the input
   8. make the label edited with our own function when it's clicked
   9. add the label with the checkbox into the div
   10. add the div to the variable with the div
   11. Clear the input field by setting its value to ""
*/
function createItem() {
  //inputText is the words in the text box
  const inputText = document.getElementById("itemInput").value;
  //list is the value of the div
  const list = document.getElementById("itemList");
  //item is the text in the box with the spaces trimmed
  const item = inputText.trim();
  //The if statement makes sure the text isn't blank.
  if (item !== "") {
    //The variable div is a div tag
    const div = document.createElement("div");
    //The checkbox variable is an input of some sort
    const checkbox = document.createElement("input");
    //The type of input is a checkbox
    checkbox.type = "checkbox";
    //The label variable is a label tag
    const label = document.createElement("label");
    //The label's text is equal to the words in the text box.
    label.textContent = item;

    // Whenever the label tag is clicked (it has your list item) you will activate the editItem function on it.
    label.addEventListener("click", function () {
      editItem(label);
    });

    //First the checkbox is added to the created div, then the label (item text), and then add the div itself to the other div tag.
    div.appendChild(checkbox);
    div.appendChild(label);
    list.appendChild(div);

    // Clear the input field of the text box by getting the value of the text box and setting it to "" (nothing)
    document.getElementById("itemInput").value = "";
  }
}

// Function that clears the items in the list and clears the text box.
/* Steps 
   1. Put the outer div in a variable
   2. Put the inner div in a variable
   3. Remove the inner div from the outer div
   4. Create a ul in a variable
   5. Make the created ul have the id of the deleted div
   6. Add the ul to the outer div
   7. Clear the text box 
*/
function deleteItems() {
  // listSection is equal to a div tag in the html
  const listSection = document.getElementById("list");
  // delList is equal to the other div
  const delList = document.getElementById("itemList");
  // this removes the inner div from the div
  listSection.removeChild(delList);
  // newList is a ul
  const newList = document.createElement("ul");
  // newList's id is set to the id of the deleted div
  newList.setAttribute("id", "itemList");
  // Adding the ul inside of the outer div
  listSection.appendChild(newList);
  // Clearing the value of the ul by setting it to "" (nothing)
  document.getElementById("itemInput").value = "";
}

// Function to edit a list item that's put in here.
/* Steps:
   1. Put the text content of the item inside a variable.
   2. Make a new input tag and put it inside a variable.
   3. Make the input tag a text box and make its text the same text as the item's text using the first variable.
   4. Now, put the text box in place of the item in the website.
   5. Add an event where the item is put back instead of the text box with the text of the item being the new text from the text box by pressing the enter key.
*/
function editItem(label) {
  // Make currentText the text of the item
  const currentText = label.textContent;
  // Make textBox a created input tag
  const textBox = document.createElement("input");
  // The input tag will be a text box
  textBox.type = "text";
  // The text in that tag will be the text of the item
  textBox.value = currentText;
  // Replace the item in the list with the new text box
  label.replaceWith(textBox);
  // Make the text box use the saveItem function when the enter key is pressed
  textBox.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      saveItem(textBox, label);
    }
  });
}

// Function to replace the text box with the item.
/* Steps:
   1. Make two parameters: The first being the text box and the second being the item (label)
   2. Set the item's text to the text box's text with .value
   3. Switch back the item with the text box.
*/
// Make two parameters: The first being the text box and the second being the item (label)
function saveItem(input, label) {
  // Make the item's text equal to the text box's text (value)
  label.textContent = input.value;
  // Replace the item with the text box in the website.
  input.replaceWith(label);
}

// Function to save any data into local storage.
/* Steps:
   1. Make an empty list and put it into a variable.
   2. Put all of the list items into a variable.
   3. Make a function with forEach to go through each item, get its data, and put it into a dictionary to be saved in the empty list.
   4. Put the list with the data into local storage by using setItem and JSON.stringify to turn the data into a string to make it able to save. (Lists don't save into local storage correctly, we need the data to be a string.)
*/
function saveData() {
  // Create an empty list into a variable to be able to save data easier.
  const savedList = [];
  // Make a variable that includes every div and ul inside it (list items)
  const listItems = document.getElementById("itemList").querySelectorAll("div");
  // For each item in the variable (named them "item" and used arrow function)
  listItems.forEach((item) => {
    // Make a variable that selects the labels of the div tags "text that says names of each list item"
    const label = item.querySelector("label");
    // Make a variable for each checkbox that accompanies the divs (list items)
    const checkbox = item.querySelector("input[type='checkbox'");
    // Put the dictionary of each item's text and if the checkboxes are checked into the blank list
    savedList.push({
      text: label.textContent,
      checked: checkbox.checked,
    });
  });
  // Use stringify to turn this list into a JSON string that makes it be able to be saved into local storage. Set the key and the value of the data is the stringified version of the list with the data of the list items.
  localStorage.setItem("shoppingList", JSON.stringify(savedList));
}

// Function to load data from localStorage
/* Steps:
   1. Use JSON.parse and getItem with your key from the function saveData to put the list into a variable.
   2. For every list item, use the function addData.
*/
function loadData() {
  // Make a variable that gets the parsed (unstringified) version of the list from the function saveData from local storage or an empty list. (So if there isn't data, the system won't crash.)
  const data = JSON.parse(localStorage.getItem("shoppingList")) || [];
  // For each item in the list, use the function addData.
  data.forEach(addData);
}

// Function to add data from the loadData function to the list
/* Steps:
   1. Set the parameter to the list from the function loadData.
   2. Put the website's list into a variable.
   3. Make a new div tag and put it inside a variable.
   4. Make a new input tag and set it to a checkbox.
   5. Make a new label tag with the text set to the text inside the dictionary that holds the list item's content.
   6. If the saved dictionary has the label set as checked, set the new checkbox to checked.
   7. Make the new data able to be edited on click like the old data with the function editData.
   8. Add the new tags to the new div.
   9. Add the new div to the list.
*/
// Make the parameter the list from the function loadData.
function addData(data) {
  // Make a variable that has the tag that contains the list.
  const list = document.getElementById("itemList");
  // Make a new div tag inside of a new variable.
  const div = document.createElement("div");
  // Make a new input tag inside of a new variable and after, make the type a checkbox.
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  // Make a new label tag inside of a new variable and after, make the text equal to the data. (In loadData, it uses this in a forEach method so only one piece of data from the dictionary will be taken at a time.)
  const label = document.createElement("label");
  label.textContent = data.text;
  // Set checkbox state based on the saved data in the dictionary (forEach method also used here.)
  checkbox.checked = data.checked;
  // Add click event to the label for editing so these new tags can still be edited by the user.
  label.addEventListener("click", function () {
    editItem(label);
  });

  // Add the label and checkbox to the new div
  div.appendChild(checkbox);
  div.appendChild(label);
  // Add the new div to the original list
  list.appendChild(div);
}

function darkMode() {
  document.body.classList.toggle("darkmode");
  header.classList.toggle("darkmode-header");
  const button = document.getElementById("switch");
  if (document.body.classList.contains("darkmode")) {
    localStorage.setItem("darkMode", "enabled");
    button.textContent = "Light Mode";
    button.classList.add("darkmode");
  } else {
    localStorage.setItem("darkMode", "disabled");
    button.textContent = "Dark Mode";
    button.classList.remove("darkmode");
  }
}
const header = document.querySelector("header");
const button = document.getElementById("switch");
button.addEventListener("click", "darkMode");
