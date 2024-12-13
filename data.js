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

async function addItem(item) {

}

async function getItem(id) {
    
}

async function deleteItem(id) {
    
}

async function checkOffItem(id) {
    
}

async function getToDoList() {
    
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