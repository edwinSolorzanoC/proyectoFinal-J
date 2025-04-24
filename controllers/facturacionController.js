
import facturacionModel from "../models/facturacionModel.js";

const facturacionController = {}

facturacionController.inicio = async (req, res) => {
    try {
      const results = await facturacionModel.mostrarDatos();
  
      // Modificamos cada factura agregando montoMedicamentos
      const datosFacturacion = results.map(factura => {
        const montoCita = parseFloat(factura.montoCita);
        const montoTotal = parseFloat(factura.montoTotal);
        const montoMedicamentos = montoTotal - montoCita;
  
        return {
          ...factura,
          montoMedicamentos: montoMedicamentos.toFixed(2) // si quieres que se vea así: '4500.00'
        };
      });
  
      res.render("facturacion/page", { datosFacutacion: datosFacturacion });
  
    } catch (error) {
      console.log("Error en el controller mostrar facturas inicio", error);
    }
  };
  

export default facturacionController