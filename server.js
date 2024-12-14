const express = require('express')
const app = express()
const data = require("./data")

app.set("views", "html")
app.set("view engine", "pug")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('resources'))

const PORT = 4131;

app.get(['/', '/home'], async (req, res) => {
    const toDoList = await data.getToDoList(); // NOW USING DATA.JS
    res.render('main', {"toDoList" : toDoList.toReversed()}); // reversing ensures newest items are shown first
});

app.post('/api/submit_item', async (req, res) => {
    const itemData = req.body; // grab the itemData from submitItem()
    if(itemData != ''){ 
        const itemStatus = await data.addItem(itemData); // add the item
        if(itemStatus === 201){
            const toDoList = await data.getToDoList();
            console.log(typeof toDoList[0]['deadline']);
            res.status(201).json(toDoList);
        }
        else if(itemStatus === 400){
            res.status(400);
        }
    }
});

// Handle all other routes
app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});