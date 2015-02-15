var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("app.db");

db.run("INSERT INTO patients (name,dob) VALUES (?,?), (?,?), (?,?), (?,?)", 
    'David', '10-20-1981',
    'Sharon', '10-04-1981', 
    'Cheryl', '06-04-1981',
    'Keith', '01-20-1979', 
    function(err){
        if (err) {
            throw err;
        }
    }
);