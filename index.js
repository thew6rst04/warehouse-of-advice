import express from "express";
import methodOverride from "method-override";

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

let messages = [];

app.get("/", (req, res) => {
  res.render("index", { messages });
});

app.get("/advice", (req, res) => {
  res.render("partials/advice");
});

app.get("/messages/:id/edit", (req, res) => {
  // get the id for catch all the data
  const msg = messages.find((m) => m.id === req.params.id);
  res.render("partials/edit", { msg });
});

app.post("/messages", (req, res) => {
  const { name, email, message } = req.body;
  const id = Date.now().toString(); // make the date to be a unique id
  messages.push({ id, name, email, message }); // send the data to index.ejs
  res.redirect("/");
});

app.put("/messages/:id", (req, res) => {
  // edit the advice
  const { id } = req.params;
  const { name, email, message } = req.body;
  messages = messages.map((m) =>
    m.id === id ? { id, name, email, message } : m
  );
  res.redirect("/");
});

app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;
  messages = messages.filter((m) => m.id !== id);
  res.redirect("/");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
