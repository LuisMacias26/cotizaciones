// Agregar fila de producto
function agregarFila() {
    const tbody = document.getElementById('productos-body');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><input type="number" class="cant" placeholder="1" min="0" title="Cantidad" oninput="calcularTotales()"></td>
        <td><input type="text" class="desc" placeholder="Descripción del producto" title="Descripción"></td>
        <td><input type="number" class="precio" placeholder="0.00" step="0.01" min="0" title="Precio unitario" oninput="calcularTotales()"></td>
        <td class="total-fila">$0.00</td>
        <td><button class="btn-eliminar" onclick="eliminarFila(this)">✕</button></td>
    `;
    tbody.appendChild(fila);
}

// Eliminar fila de producto
function eliminarFila(btn) {
    const fila = btn.closest('tr');
    fila.remove();
    calcularTotales();
}

// Calcular totales
function calcularTotales() {
    const filas = document.querySelectorAll('#productos-body tr');
    let subtotal = 0;

    filas.forEach(fila => {
        const cant = parseFloat(fila.querySelector('.cant').value) || 0;
        const precio = parseFloat(fila.querySelector('.precio').value) || 0;
        const total = cant * precio;
        fila.querySelector('.total-fila').textContent = '$' + total.toFixed(2);
        subtotal += total;
    });

    const costoEnvio = parseFloat(document.getElementById('costo-envio').value) || 0;
    const aplicarITBMS = document.getElementById('aplicar-itbms').checked;
    const impuesto = aplicarITBMS ? subtotal * 0.07 : 0;
    const total = subtotal + costoEnvio + impuesto;

    document.getElementById('subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('impuesto').textContent = '$' + impuesto.toFixed(2);
    document.getElementById('total').textContent = '$' + total.toFixed(2);
}

// Eventos para recalcular
document.getElementById('costo-envio').addEventListener('input', calcularTotales);
document.getElementById('aplicar-itbms').addEventListener('change', calcularTotales);

// Calcular al escribir en la primera fila
document.querySelectorAll('.cant, .precio').forEach(input => {
    input.addEventListener('input', calcularTotales);
});

// Exportar a Excel
function exportarExcel() {
    const numCot = document.getElementById('num-cotizacion').value;
    const fecha = document.getElementById('fecha').value;
    const vendedor = document.getElementById('vendedor').value;
    const metodoPago = document.getElementById('metodo-pago').value;
    const caduca = document.getElementById('caduca').value;

    const clienteNombre = document.getElementById('cliente-nombre').value;
    const clienteDireccion = document.getElementById('cliente-direccion').value;
    const clienteCiudad = document.getElementById('cliente-ciudad').value;
    const clienteProvincia = document.getElementById('cliente-provincia').value;
    const clienteTelefono = document.getElementById('cliente-telefono').value;

    const comentarios = document.getElementById('comentarios').value;
    const anotacion = document.getElementById('anotacion').value;
    const subtotal = document.getElementById('subtotal').textContent;
    const impuesto = document.getElementById('impuesto').textContent;
    const total = document.getElementById('total').textContent;
    const costoEnvio = document.getElementById('costo-envio').value || '0.00';

    // Datos para Excel
    let datos = [
        ['LCNETWORK'],
        ['Tel: 6665-3974 | Email: lcnetwork73@gmail.com | R.U.C 8-455-504 D.V. 20'],
        [],
        ['Cotización N°', numCot],
        [],
        ['CLIENTE', '', '', 'DETALLES'],
        ['Nombre', clienteNombre, '', 'Fecha', fecha],
        ['Dirección', clienteDireccion, '', 'Vendedor', vendedor],
        ['Ciudad', clienteCiudad, '', 'Método de pago', metodoPago],
        ['Provincia', clienteProvincia, '', 'Caduca', caduca],
        ['Teléfono', clienteTelefono],
        [],
        ['PRODUCTOS'],
        ['Cantidad', 'Descripción', 'P. Unitario', 'Total'],
    ];

    // Agregar productos
    const filas = document.querySelectorAll('#productos-body tr');
    filas.forEach(fila => {
        const cant = fila.querySelector('.cant').value;
        const desc = fila.querySelector('.desc').value;
        const precio = fila.querySelector('.precio').value;
        const totalFila = fila.querySelector('.total-fila').textContent;
        datos.push([cant, desc, precio, totalFila]);
    });

    // Totales y notas
    datos = datos.concat([
        [],
        ['', '', 'Subtotal', subtotal],
        ['', '', 'Costo de envío', '$' + costoEnvio],
        ['', '', 'ITBMS (7%)', impuesto],
        ['', '', 'TOTAL', total],
        [],
        ['Comentarios', comentarios],
        ['Anotación del vendedor', anotacion],
        [],
        ['Firma del Cotizante', '', '', 'Firma del cliente al aceptar'],
        [],
        ['Favor Confeccionar cheque a nombre de LUIS CALDERON'],
        [],
        ['Garantía Profesional']
    ]);

    // Crear libro Excel
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(datos);
    XLSX.utils.book_append_sheet(wb, ws, 'Cotización');
    XLSX.writeFile(wb, `Cotizacion-${numCot}.xlsx`);
}

// Ajustar altura del textarea según el contenido
function ajustarAltura(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

function agregarFila() {
    const tbody = document.getElementById('productos-body');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td><input type="number" class="cant" placeholder="1" min="0" title="Cantidad" oninput="calcularTotales()"></td>
        <td><textarea class="desc" placeholder="Descripción del producto" title="Descripción" rows="1" oninput="ajustarAltura(this)"></textarea></td>
        <td><input type="number" class="precio" placeholder="0.00" step="0.01" min="0" title="Precio unitario" oninput="calcularTotales()"></td>
        <td class="total-fila">$0.00</td>
        <td><button class="btn-eliminar" onclick="eliminarFila(this)">✕</button></td>
    `;
    tbody.appendChild(fila);
}