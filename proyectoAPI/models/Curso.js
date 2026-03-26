const mongoose = require("mongoose");

const cursoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    estado: { type: String, required: true },
    creditos: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Curso", cursoSchema);
