// TODO: this file :)
const express = require("express");
const app = express();
const employees = require("./employees");

const init = async() => {
    app.listen(3000, () => console.log("I am listening on port 3000"));
};

app.get("/", async(req, res) => {
    res.status(200).send("Hello employees");
});

app.get("/employees", async(req, res) => {
    res.status(200).json(employees);
});


app.get("/employees/random", async (req, res) => {

    try {
        if (!Array.isArray(employees) || employees.length === 0) {
            return res.status(404).json({ error: "No employees available" });
        }
        
        const randomIndex = Math.floor(Math.random() * employees.length);
        res.status(200).json(employees[randomIndex]);

    } catch (error) {
        console.error("Error fetching random employee:", error);
        res.status(500).json({ error: "An error occurred while fetching the random employee." });
    }
  });

  
app.get("/employees/:id", async(req, res) => {
    
    const id = req.params.id;

    const filterArray = employees.filter((element)=>Number(id) === element.id);

    if(filterArray.length > 0) res.status(200).json(filterArray);
    else res.status(404).send("employee not found");
});

init();