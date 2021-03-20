
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Core = require('./core.js');
new Core();

const User = require('./schema/user.js');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/users", async (req, res) => {
    if (!req.query.age) {
        const user = await User.find();
        return res.status(200).json({ data: user, });
    }
    const user = await User.find({ age: req.query.age });
    if (user.length == 0) {
        return res.status(404).json({ error: "usuário não encontrado" });
    }
    return res.status(200).json({
        data: user,
    });
});

app.get("/users/id", async (req, res) => {
    const user = await User.findById(req.query.id);
    if (!user) {
        return res.status(404).json({ error: "usuário não encontrado" });
    }
    return res.status(200).json({
        data: user
    });
});

app.get("/users/cell", async (req, res) => {
    const phone = req.query.cell;
    if (phone.length > 11 || phone.length < 11) {
        res.status(400).json({ error: "numero de telefone invalido" })
    }
    const user = await User.find({ cell: req.query.cell });
    if (!user) {
        return res.status(404).json({ error: "usuário não encontrado" });
    }
    return res.status(200).json({
        data: user
    });
});

app.post("/users", async (req, res) => {
    const user = {
        name: req.body.name,
        cpf: req.body.cpf,
        age: req.body.age,
        cell: req.body.cell
    };
    if (user.cell.toString().length < 11 || user.cell.toString().length > 11) {
        return res.status(400).json({ error: "número de telefone inválido" });
    }
    await (new User(user).save());
    return res.status(200).json({ data: user });
});


app.patch("/users/:id", async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({
            error: "usuário não encontrado"
        });
    }
    await user.updateOne(req.body);
    return res.status(200).json({ data: req.body });
});

app.delete("/users/:id", async (req, res) => {
    return res.status(200).json({
        data: (await User.findOneAndRemove({ _id: req.params.id }))
    });
});

app.listen(3000, () => {
    console.log("Serve Started");

});
