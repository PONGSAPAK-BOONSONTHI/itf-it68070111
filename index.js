import express from "express";
import cors from "cors";

const app = express();
app.get('/favicon.ico', (req, res) => res.status(204).end());
app.use(cors());
app.use(express.json());

let mock_data = [];

app.get("/ping", (req, res) => {
    res.json({ text: "it68070111" });
  });

app.post("/form", (req, res) => {
  const owner = req.body.owner;
  const color = req.body.color;
  const type = req.body.type;
  const wheels = req.body.wheels;
  const weight = req.body.weight;

  mock_data.push({
    owner,
    color,
    type,
    wheels,
    weight,
    id: mock_data.length + 1,
  });

  console.log(mock_data);

  res.json(mock_data[mock_data.length - 1]);
});

app.listen(5000, () => {
  console.log("http://localhost:5000");
})

