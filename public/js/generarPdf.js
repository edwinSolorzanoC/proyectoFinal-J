document.addEventListener('DOMContentLoaded', function () {
    const boton = document.getElementById("generarPdfInventario");
    const tabla = document.getElementById("tablaInventario");

    boton.addEventListener('click', function () {
        const img = new Image();
        img.src = './images/LogoFinal.png'; // Ruta desde /public

        img.onload = function () {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();

            const datos = [];
            const header = [];

            const fechaActual = new Date().toLocaleDateString();
            const margenIzquierdo = 14;
            let posicionY = 15;

            // Agregar imagen
            doc.addImage(img, 'PNG', 170, posicionY, 30, 30); // (x, y, width, height)
            posicionY += 20;

            // Agregar fecha
            doc.setFontSize(10);
            doc.text(`Fecha: ${fechaActual}`, margenIzquierdo, posicionY);
            posicionY += 5;

            // Agregar título
            doc.setFontSize(16);
            doc.text("CLINIX", margenIzquierdo, posicionY);
            posicionY += 10;

            // Encabezado de la tabla
            tabla.querySelectorAll("thead tr th").forEach(th => header.push(th.innerText));

            // Filas de datos
            tabla.querySelectorAll("tbody tr").forEach(tr => {
                const lineasTabla = [];
                tr.querySelectorAll("td").forEach(td => lineasTabla.push(td.innerText));
                datos.push(lineasTabla);
            });

            // Crear tabla en el PDF
            doc.autoTable({
                head: [header],
                body: datos,
                startY: posicionY + 5,
                margin: { left: margenIzquierdo, right: 14 },
                didDrawPage: function (data) {
                    const pageSize = doc.internal.pageSize;
                    const pageHeight = pageSize.height || doc.internal.pageSize.getHeight();
                    doc.setFontSize(10);
                    doc.text(`Página ${doc.internal.getNumberOfPages()}`, margenIzquierdo, pageHeight - 10);
                }
            });

            // Guardar el PDF
            doc.save("Reporte.pdf");
        };
    });
});
