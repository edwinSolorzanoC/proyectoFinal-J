

document.addEventListener('DOMContentLoaded', function () {
    const botones = document.querySelectorAll("#tablaInventario .btn-warning");

    botones.forEach(boton => {
        boton.addEventListener('click', function () {
            const fila = this.closest('tr');
            const celdas = fila.querySelectorAll("td");

            const img = new Image();
            img.src = './images/LogoFinal.png';

            img.onload = function () {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                const fechaActual = new Date().toLocaleDateString();
                const margenIzquierdo = 20;
                let y = 20;

                // Logo
                doc.addImage(img, 'PNG', 150, y - 5, 40, 25);

                // Encabezado
                doc.setFontSize(14);
                doc.setFont("helvetica", "bold");
                doc.text("CLÍNICA CLINIX", margenIzquierdo, y);
                y += 8;

                doc.setFontSize(10);
                doc.setFont("helvetica", "normal");
                doc.text("Dirección: Barrio Aranjuez, Calle 23 y Avenida 7, San José, Costa Rica 10101", margenIzquierdo, y);
                y += 5;
                doc.text("Teléfono: 555-123-4567 | Email: soporte@clinix.com", margenIzquierdo, y);
                y += 5;
                doc.text(`Fecha de emisión: ${fechaActual}`, margenIzquierdo, y);
                y += 10;

                doc.setFontSize(12);
                doc.setFont("helvetica", "bold");
                doc.text("FACTURA", margenIzquierdo, y);
                y += 10;

                // Datos
                const encabezados = ["ID", "Fecha Emisión", "Monto Cita", "Monto Medicamentos", "Monto Total"];
                const datosFila = Array.from(celdas).slice(0, 5).map(td => td.innerText);

                doc.autoTable({
                    startY: y,
                    head: [encabezados],
                    body: [datosFila],
                    theme: 'grid',
                    styles: {
                        fontSize: 10,
                        halign: 'center',
                    },
                    headStyles: {
                        fillColor: [0, 102, 204],
                        textColor: 255,
                        fontStyle: 'bold',
                    },
                    margin: { left: margenIzquierdo, right: 20 },
                });

                y = doc.lastAutoTable.finalY + 10;

                // Totales destacados
                doc.setFontSize(11);
                doc.setFont("helvetica", "bold");
                doc.text(`Total a pagar: CRC ${datosFila[4]}`, margenIzquierdo, y);
                y += 15;

                // Firma y agradecimiento
                doc.setFont("helvetica", "normal");
                doc.setFontSize(10);
                doc.text("______________________________", margenIzquierdo, y);
                doc.text("Firma del cliente", margenIzquierdo, y + 5);

                y += 20;
                doc.text("¡Gracias por confiar en nosotros!", margenIzquierdo, y);

                // Guardar PDF
                doc.save(`Factura-${datosFila[0]}.pdf`);
            };
        });
    });
});
