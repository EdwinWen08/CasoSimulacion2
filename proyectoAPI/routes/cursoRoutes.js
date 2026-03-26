const express = require("express");
const router = express.Router();
const Curso = require("../models/Curso");

// GET - listar cursos
router.get("/", async (req, res) => {
  const cursos = await Curso.find();
  res.json(cursos);
});

// POST - crear curso
router.post("/", async (req, res) => {
  const nuevoCurso = new Curso(req.body);
  const cursoGuardado = await nuevoCurso.save();
  res.json(cursoGuardado);
});

// PUT - actualizar curso por id
router.put("/:id", async (req, res) => {
  const cursoActualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(cursoActualizado);
});

// DELETE - eliminar curso por id
router.delete("/:id", async (req, res) => {
  await Curso.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Curso eliminado correctamente" });
});

module.exports = router;
