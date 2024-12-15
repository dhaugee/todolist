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
    const {itemID} = id;
    if(itemID === ''){
        return 400;
    }
    const ItemID = parseInt(itemID)
    let res = await connPool.awaitQuery("DELETE FROM Items WHERE ID = ?", [ItemID]);
    if (res.affectedRows === 0){
        console.log("item with given id could not be found");
        return 400;
    }
    return 201;
}

async function checkoffItem(id) {
    const {itemID} = id;
    if(itemID === ''){
        return 400;
    }
    let res = await connPool.awaitQuery('UPDATE Items SET complete = true WHERE ID = ?;', [itemID]);
    if(res.changedRows != 0){
        return 201;
    }
}

async function getToDoList() {
    const res = await connPool.awaitQuery("SELECT * FROM Items");
    return res;
}

async function sortedList() {
    const res = await connPool.awaitQuery("SELECT * FROM Items ORDER BY deadline");
    return res;
}

async function getOverdueItems() {
    const res = await connPool.awaitQuery("SELECT * FROM Items WHERE complete = false and deadline < CURRENT_DATE() ORDER BY deadline");
    return res;
}

module.exports = {
    addItem,
    getItem,
    deleteItem,
    checkoffItem,
    getToDoList,
    sortedList,
    getOverdueItems,
};