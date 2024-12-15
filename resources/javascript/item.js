// https://frontendinterviewquestions.medium.com/how-to-disable-previous-date-in-datepicker-using-javascript-10b77133aeac#:~:text=We%20use%20JavaScript's%20setAttribute%20method,those%20on%20or%20after%20today.
// disables creating an item with a deadline in the past
function disablePastDates() { 
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
  
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("newItemDeadline").setAttribute("min", today);
  }

// first step in submitting a new to-do list item:
async function submitItem(){ 
    const itemData = { // grab form input
        itemTitle: document.getElementById("newItemTitle").value,
        itemDeadline: document.getElementById("newItemDeadline").value
    };
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/api/submit_item', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(itemData)});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderToDoList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}

async function revertItems(){ 
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/revert', {method: 'GET'});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderToDoList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}

async function sortItems(){ 
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/sorted', {method: 'GET'});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderToDoList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}

async function overdueItems(){ 
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/overdue', {method: 'GET'});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderOverdueList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}


async function checkoffItem(ID){
    const itemID = document.getElementById(ID).value;
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/api/checkoff_item', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemID})});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderToDoList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}

async function deleteItem(ID){
    const itemID = document.getElementById(ID).value;
    // make a fetch to the submit_item api with the itemData just collected 
    let result = await fetch('/api/delete_item', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({itemID})});
    // check the status of the result:
    if (result.status == 201) {
        const toDoList = await result.json();
        renderToDoList(toDoList); // if valid, rerender the to do list
    }
    else if (result.status == 400 || result.status == 500) { // Could be a number of errors
        alert("Server error detected: Status Code " + result.status);
    }
}

function renderToDoList(toDoList){
    renderIncomplete(toDoList);
    renderComplete(toDoList);
}

function renderOverdueList(toDoList){
    renderIncomplete(toDoList);
}

function renderComplete(toDoList){
    const existingItems = document.getElementById("completeFlex");
    existingItems.innerHTML = '';
    for(let i = 0; i < toDoList.length; i++ ) {
        if(toDoList[i]['complete'] == 1){
            const item = document.createElement("div");
            item.className = "completedItem"

            const itemTitle = document.createElement("div");
            itemTitle.className = "completedItemTitle"
            itemTitle.innerText = "TASK: " + toDoList[i]['title'];
            item.appendChild(itemTitle);

            const itemDeadline = document.createElement("div");
            // deadline gets converted to string so it must be converted back to a date object before using toString() for formatting:
            const deadline = new Date(toDoList[i]['deadline']); 
            itemDeadline.innerText = "DEADLINE: " + deadline.toString().slice(0,15);
            itemDeadline.className = "completedItemDeadline"
            item.appendChild(itemDeadline);

            const itemComplete = document.createElement("em");
            itemComplete.innerText = "COMPLETE \n";
            itemComplete.className = "completedItemCheck";
            item.appendChild(itemComplete);

            const itemDeleteButton = document.createElement("BUTTON");
            itemDeleteButton.className = "itemDeleteButton"
            itemDeleteButton.id = toDoList[i]['ID']
            itemDeleteButton.onclick = function() {deleteItem(String(toDoList[i]['ID']))}
            itemDeleteButton.type = "submit"
            itemDeleteButton.innerText = 'DELETE'
            itemDeleteButton.value = toDoList[i]['ID']
            item.appendChild(itemDeleteButton);

            existingItems.prepend(item); // prepend so that newest items are displayed first
            
            br = document.createElement("br");
            existingItems.prepend(br)
        }
    };
}

function renderIncomplete(toDoList){
    console.log("enteringing renderIncomplete()")
    const existingItems = document.getElementById("incompleteFlex");
    existingItems.innerHTML = '';
    for(let i = 0; i < toDoList.length; i++ ) {
        if(toDoList[i]['complete'] == 0){
            const item = document.createElement("div");
            item.className = "incompleteItem"

            const itemTitle = document.createElement("div");
            itemTitle.className = "incompleteItemTitle"
            itemTitle.innerText = "TASK: " + toDoList[i]['title'];
            item.appendChild(itemTitle);

            const itemDeadline = document.createElement("div");
            // deadline gets converted to string so it must be converted back to a date object before using toString() for formatting:
            const deadline = new Date(toDoList[i]['deadline']); 
            itemDeadline.innerText = "DEADLINE: " + deadline.toString().slice(0,15);
            itemDeadline.className = "incompleteItemDeadline"
            item.appendChild(itemDeadline);

            const itemCheckoffButton = document.createElement("BUTTON");
            itemCheckoffButton.className = "itemCheckoffButton"
            itemCheckoffButton.id = toDoList[i]['ID']
            itemCheckoffButton.onclick = function() {checkoffItem(String(toDoList[i]['ID']))}
            itemCheckoffButton.type = "submit"
            itemCheckoffButton.innerText = '✔'
            itemCheckoffButton.value = toDoList[i]['ID']
            item.appendChild(itemCheckoffButton);

            const itemDeleteButton = document.createElement("BUTTON");
            itemDeleteButton.className = "itemDeleteButton"
            itemDeleteButton.onclick = function() {deleteItem(String(toDoList[i]['ID']))}
            itemDeleteButton.type = "submit"
            itemDeleteButton.innerText = 'DELETE'
            itemDeleteButton.value = toDoList[i]['ID']
            item.appendChild(itemDeleteButton);

            existingItems.prepend(item); // prepend so that newest items are displayed first
            
            br = document.createElement("br");
            existingItems.prepend(br)
        }
    };
    console.log("adding buttons")
    const allItemsButton = document.createElement("BUTTON");
    allItemsButton.id = "allItemsButton"
    allItemsButton.onclick = function() {sortItems()}
    allItemsButton.type = "submit"
    allItemsButton.innerText = 'All items'
    existingItems.prepend(allItemsButton)

    const overdueButton = document.createElement("BUTTON");
    overdueButton.id = "overdueButton"
    overdueButton.onclick = function() {overdueItems()}
    overdueButton.type = "submit"
    overdueButton.innerText = 'Overdue items only'
    existingItems.prepend(overdueButton)
    document.getElementById("newItemTitle").value = '';
    document.getElementById("newItemDeadline").value = '';
}

