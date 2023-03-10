const router = require('express').Router();
const db = require('./postgres');

router.get('/data/', async (req, res) => {
    try {
        const result = await db.query("SELECT * FROM data");
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

router.delete('/data/:id', async (req, res) => {
    try {
        await db.query("DELETE FROM data WHERE id = $1", [req.params.id]);
        const result = await db.query("SELECT * FROM data");
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

router.post('/data/', async (req, res) => {
    try {
        await db.query("INSERT INTO data (a, b, c) VALUES ($1, $2, $3)", [req.body.a, req.body.b, req.body.c]);
        const result = await db.query("SELECT * FROM data");
        res.json(result.rows);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

router.put('/data/', async (req, res) => {
    try {
        await db.query("DROP TABLE IF EXISTS data");
        await db.query("CREATE TABLE IF NOT EXISTS data (id serial PRIMARY KEY, a varchar, b varchar, c int)");
        await db.query("INSERT INTO data (a, b, c) VALUES ('a1', 'b1', '1'), ('a2', 'b2', '2'), ('a3', 'b3', '3')");
        res.status(200).end();
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

module.exports = router;