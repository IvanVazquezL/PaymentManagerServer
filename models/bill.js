import { Schema, model } from 'mongoose';

const BillSchema = Schema({
    userId: {
        type: String,
        required: true
    },
    fechaDePagoIdentifier: {
      type: String,
      required: true
    },
    nombre: {
        type: String,
        required: true
    },
    tipoDeRecibo: {
        type: String,
        required: true
    },
    fechaDePago: {
        type: Date,
        required: true
    },
    inicioDelPeriodo: {
        type: Date,
        required: true      
    },
    finDelPeriodo: {
        type: Date,
        required: true  
    },
    sueldo: {
        type: Number
    },
    imss: {
        type: Number
    },
    premioAsistencia: {
        type: Number
    },
    fondoAhorroEmpleado: {
        type: Number
    },
    premioPuntualidad: {
        type: Number
    },
    isr: {
        type: Number
    },
    fondoAhorroEmpresa: {
        type: Number
    },
    sggm: {
        type: Number
    },
    fondoAhorroTrabajador: {
        type: Number
    },
    subtotal: {
        type: Number
    },
    descuentos: {
        type: Number
    },
    retenciones: {
        type: Number
    },
    total: {
        type: Number
    },
    netoDelRecibo: {
        type: Number
    },
    totalPercepcionMasOtrosPagos: {
        type: Number
    }
});

BillSchema.index(
    { userId: 1, fechaDePagoIdentifier: 1, nombre: 1, tipoDeRecibo: 1 },
    { unique: true }
  );

BillSchema.method('toJSON', function() {
  const { __v, _id, password, ...object } = this.toObject();
  object.uid = _id;
  return object;
})

const Bill = model('Bill', BillSchema);

export default Bill;
  
