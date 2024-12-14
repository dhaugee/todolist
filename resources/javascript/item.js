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
    console.log(result.status);
    if (result.status == 201) {
        const toDoList = await result.json();
        console.log(typeof toDoList[0]['deadline']);
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
            itemComplete.innerText = "COMPLETE";
            itemComplete.className = "completedItemCheck";
            item.appendChild(itemComplete);

            br = document.createElement("br");
            item.appendChild(br);

            existingItems.prepend(item); // prepend so that newest items are displayed first
        }
    };
}

function renderIncomplete(toDoList){
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

            br = document.createElement("br");
            item.appendChild(br);

            existingItems.prepend(item); // prepend so that newest items are displayed first
        }
    };
    document.getElementById("newItemTitle").value = '';
    document.getElementById("newItemDeadline").value = '';
}
