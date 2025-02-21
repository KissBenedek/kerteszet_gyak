import express from "express";
import { dbRun, dbQuery } from "../database.js";

const router = express.Router();

router.get("/plants", async (req, res, next) => {
  try {
    const novenyek = await dbQuery("SELECT * FROM novenyek");
    res.status(200).json(novenyek);
  } catch (err) {
    next(err);
  }
});

router.get("/plants/:id", async (req, res, next) => {
  try {
    const [noveny] = await dbQuery("SELECT * FROM novenyek WHERE id=?", [
      req.params.id,
    ]);
    if (!noveny) return res.status(404).json({ message: "Plant not found" });
    res.status(200).json(noveny);
  } catch (err) {
    next(err);
  }
});

router.post("/plants", async (req, res, next) => {
  try {
    const result = await dbRun(
      "INSERT INTO novenyek (nev, evelo, kategoria, ar) VALUES (?, ?, ?, ?);",
      [req.body.nev, req.body.evelo, req.body.kategoria, req.body.ar]
    );
    res.status(201).json({ id: result.lastID, ...req.body });
  } catch (err) {
    next(err);
  }
});

router.put("/plants/:id", async (req, res, next) => {
  try {
    const [noveny] = await dbQuery("SELECT * from novenyek WHERE id=?", [
      req.params.id,
    ]);
    if (!noveny) return res.status(404).json({ message: "Plant not found" });

    await dbRun(
      "UPDATE novenyek SET nev = ?, evelo = ?, kategoria = ?, ar = ? WHERE id = ?;",
      [
        req.body.nev || noveny.nev,
        req.body.evelo || noveny.evelo,
        req.body.kategoria || noveny.kategoria,
        req.body.ar || noveny.ar,
        req.params.id,
      ]
    );
    res.status(200).json({
      id: req.params.id,
      nev: req.body.nev || noveny.nev,
      evelo: req.body.evelo || noveny.evelo,
      kategoria: req.body.kategoria || noveny.kategoria,
      ar: req.body.ar || noveny.ar,
    });
  } catch (err) {
    next(err);
  }
});


router.delete("/plants/:id", async (req, res, next) => {
    try{
        const [noveny] = await dbQuery("SELECT * FROM novenyek WHERE id=?", [req.params.id])
        if (!noveny) return res.status(404).json({ message: "Plant not found" });

        await dbRun("DELETE FROM novenyek WHERE id=?", [req.params.id])
        res.status(204);
    }
    catch{
        next(err);
    }
})


export default router;
