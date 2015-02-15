var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("app.db");

db.run("INSERT INTO patients (name,sex) VALUES (?,?), (?,?), (?,?), (?,?)", 
    'David', 'male',
    'Sharon', 'female', 
    'Cheryl', 'female',
    'Keith', 'male', 
    function(err){
        if (err) {
            throw err;
        }
    }
);