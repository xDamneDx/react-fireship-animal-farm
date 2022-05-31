import express from "express";
import cors from "cors";

// Initialize the express app:
const app = express();
app.use(cors()); // Allow requests to the server from different URL.
app.use(express.json()); // Automatically parse any json that is sent to the server.

// Make some animals:
import Chance from "chance"; // Generate random data.
const chance = new Chance();

const animals = [...Array(250).keys()].map((id) => {
  return {
    id,
    type: chance.animal(),
    age: chance.age(),
    name: chance.name(),
  };
});

// Endponit to search for animals:
app.get("", (req, res) => {
  // Filter results by query:
  const q = req.query.q?.toLowerCase() || "";
  const results = animals.filter((animal) =>
    animal.type.toLowerCase().includes(q)
  );
  res.send(results);
});

app.listen(8080, () => console.log("Listening on port http://localhost:8080"));
