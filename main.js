
//import express framework
let express = require("express");

//create app
let app = express();


//let app use json
app.use(express.json());

//define port app will listen on

let PORT = 9091;

let db = [];

let counter = 1;
//add entry

app.post("/todos", function(req, res){
// 1 read the title from request body
let t = req.body.title;
// 2 read notes from request body
let n = req.body.notes
// 3 create a new object
// 4 set title and notes of new object using 1 and 2
// 5 give the new object and id
let newEntry = {
  title: t,
  notes: n,
  id: counter
};

counter ++;

//add the entry to the db array
db.push(newEntry);

res.json(newEntry);


})


//define route to summaries

app.get("/todos", function(req, res){
//loop through db array and create a new array of objects that do not
// have the details

let summaries = db.map(function(element){
let summary = {};
summary.title = element.title;
summary.done = element.done;
summary.id = element.id;
return summary;
})

res.json(summaries);
});


//define route to get details of single entry

app.get("/todos/:id", function(req, res){

let id = req.params.id;

let found = db.find(function(element){

if(element.id == id){
  return true;
}
else {
  return false;
}


});

if(found){
res.json(found);
}
else {
  res.sendStatus(404);
}
})


//define route to delete entry

app.delete("/todos/:id", function(req, res){

let id = req.params.id;

let newDB = db.filter(function (element){

if(element.id == id){

  return false;
}

else {
  return true;
}

})

db = newDB;

})

//define route to update entry

app.put("/todos/:id", function(req, res){

let id = req.params.id;
let title = req.body.title;
let notes = req.body.notes;
let done = req.body.done == true;

let found = db.find(function (element){
if(element.id == id){

  return true;
}

else{

  return false;
}

})

if(found){

  found.title = title;
  found.notes = notes;
  found.done = done;
  res.sendStatus(204);
}

else {
//return error message if no match is found
  res.sendStatus(404);
}

})



//start applicaton on port
app.listen(PORT,function(){
console.log("Todo Application started on port", PORT);
})