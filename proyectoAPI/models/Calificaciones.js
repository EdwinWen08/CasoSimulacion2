const mongoose = require('mongoose');

const calificacionSchema = new mongoose.Schema({

  nombre_estudiante: {type: String,required: true,},
  cuatrimestre:      {type: Number,required: true,index: true},    
  notamatematicas:   {type: Number,required: true},
  notaciencias:      {type: Number,required: true},
  notaliteratura:    {type: Number,required: true},
  notacivica:        {type: Number,required: true},
  condicion:         {type: String,enum: ["Aprobado", "Ampliación", "Reprobado"],required: true}
},
{ timestamps: true },
);

module.exports = mongoose.model('Calificaciones', calificacionSchema);