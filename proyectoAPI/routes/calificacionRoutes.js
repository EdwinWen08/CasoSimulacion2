const express = require("express");
const router = express.Router();
const Calificacion = require("../models/Calificaciones");

//Get
router.get("/", async (req, res) => {
  const calificaciones = await Calificacion.find();
  res.json(calificaciones);
});

//Post
router.post("/", async (req, res) => {
  const nuevaCalificacion = new Calificacion(req.body);
  const calificacionGuardada = await nuevaCalificacion.save();
  res.json(calificacionGuardada);
});

// Put
router.put("/:id", async (req, res) => {
  const calificacionActualizada = await Calificacion.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(calificacionActualizada);
});

// Delete
router.delete("/:id", async (req, res) => {
  await Calificacion.findByIdAndDelete(req.params.id);
  res.json({ mensaje: "Calificación eliminada correctamente" });
});

// Consulta de solo notas aprobadas 
router.get("/consultas/aprobadas", async (req, res) => {
  const nombre = req.query.nombre;
  const resultados = await Calificacion.find({
    nombre_estudiante: nombre,
    condicion: "Aprobado",
  });

  res.json(resultados);
});

//Consulta de filtrar por cuatrimestre y nombre (sin apellido)

//Consulta de estudiantes con nota menor a 70 y mayor e igual a 60 en civica
router.get("/consultas/civica", async (req, res) => {
  const resultados = await Calificacion.find({
    notacivica: { $gte: 60, $lt: 70 },
  });

  res.json(resultados);
});

//Consulta de promedio por materia para un cuatrimestre
router.get("/consultas/promedio", async (req, res) => {

  const cuatrimestre = Number(req.query.cuatrimestre);

  const resultado = await Calificacion.aggregate([
    { $match: { cuatrimestre: cuatrimestre } },
    {
      $group: {
        _id: "$cuatrimestre",
        promedio_matematicas: { $avg: "$notamatematicas" },
        promedio_ciencias: { $avg: "$notaciencias" },
        promedio_literatura: { $avg: "$notaliteratura" },
        promedio_civica: { $avg: "$notacivica" }
      }
    }
  ]);

  res.json(resultado);

});

//Consulta de nota mas alta del cuatrimestre de un estudiante
router.get("/consultas/nota", async (req, res) => {
  const { cuatrimestre, nombre } = req.query;

  const estudiante = await Calificacion.findOne({
    cuatrimestre: Number(cuatrimestre),
    nombre_estudiante: nombre
  });

  if (!estudiante) return res.json(null);

  const notaMasAlta = Math.max(
    estudiante.notamatematicas,
    estudiante.notaciencias,
    estudiante.notaliteratura,
    estudiante.notacivica
  );

  res.json({
    nombre_estudiante: estudiante.nombre_estudiante,
    cuatrimestre: estudiante.cuatrimestre,
    nota_mas_alta: notaMasAlta
  });

});

module.exports = router;