


document.addEventListener('DOMContentLoaded', function(){


    const boton = document.getElementById("generarPdfInventario");
    const tabla = document.getElementById("tablaInventario");
    boton.addEventListener('click', function(){
        
        const { jsPDF } = window.jspdf; // Accede a jsPDF desde el CDN
        const doc = new jsPDF();

        const datos = [];
        const header = [];

        // Obtener la fecha actual
        const fechaActual = new Date().toLocaleDateString();

        // Definir margen y posición inicial
        const margenIzquierdo = 14;
        let posicionY = 15;

        // Agregar fecha
        doc.setFontSize(10);
        doc.text(`Fecha: ${fechaActual}`, margenIzquierdo, posicionY);
        posicionY += 5;

        // Agregar título
        doc.setFontSize(16);
        doc.text("CLINIX", margenIzquierdo, posicionY);
        posicionY += 10;

    

        tabla.querySelectorAll("thead tr th").forEach(th => header.push(th.innerText));

        tabla.querySelectorAll("tbody tr").forEach(tr => {
            const lineasTabla = [];
            
            tr.querySelectorAll("td").forEach(td => lineasTabla.push(td.innerText));
            
            datos.push(lineasTabla);
            console.log(lineasTabla)
            
            // Generar tabla en el PDF
        doc.autoTable({
            head: [header],
            body: datos,
            startY: posicionY + 5, // Ubicar debajo del título
            margin: { left: margenIzquierdo, right: 14 },
            didDrawPage: function (data) {
                // Agregar número de página en el pie de página
                const pageSize = doc.internal.pageSize;
                const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
                doc.setFontSize(10);
                doc.text(`Página ${doc.internal.getNumberOfPages()}`, margenIzquierdo, pageHeight - 10);
            }
        });
    
            doc.save("Reporte Inventario.pdf")
            
        })

    })

})