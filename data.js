const mysql = require(`mysql-await`); // npm install mysql-await

// connection pools: https://www.npmjs.com/package/mysql#pooling-connections
var connPool = mysql.createPool({
  connectionLimit: 5, 
  host: "127.0.0.1",
  user: "C4131F24U44",
  port: 3306,
  database: "C4131F24U44",
  password: "1986" 
});

async function addItem(itemData) {
    const {itemTitle, itemDeadline} = itemData;
    if (itemTitle === '' || itemDeadline === '') {
        return 400;
    }
    let res = await connPool.awaitQuery('INSERT INTO Items(title, deadline, complete) VALUES (?, ?, false);', [itemTitle, itemDeadline]);
    // no items are initially checked off (complete = false), which will be  represented as a 0 in mysql when selected
    if (res.insertId != null){
        return 201; 
    }
    return 400;
}

async function getItem(id) {
    
}

async function deleteItem(id) {
    
}

async function checkOffItem(id) {
    
}

async function getToDoList() {
    const res = await connPool.awaitQuery("SELECT * FROM Items");
    return res;
}

async function getOverdueItems() {
    
}

module.exports = {
    addItem,
    getItem,
    deleteItem,
    checkOffItem,
    getToDoList,
    getOverdueItems,
};