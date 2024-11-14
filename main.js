function createList() {
  // Getting the text in <label>
  var inputText = document.getElementById("itemInput").value;

  // splitting items with commas
  var items = inputText.split(",");

  // Getting <ul>
  var list = document.getElementById("itemList");

  // create <li> for each item in items
  for (var i = 0; i < items.length; i++) {
    // trimming spaces
    var item = items[i].trim();

    // Create a new <li> element for each item
    var listItem = document.createElement("li");
    // Set to currect <li>
    listItem.textContent = item;
    // put <li> in <ul>
    list.appendChild(listItem);
  }
}
