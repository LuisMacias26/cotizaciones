//Agregar fila
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


  

// Ajustar altura del textarea según el contenido
function ajustarAltura(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight + 5) + 'px';
}

// Ajustar altura de todos los textareas existentes al cargar
document.querySelectorAll('.desc').forEach(t => ajustarAltura(t));

// Primera fila: agregar eventos que le faltaban
document.querySelectorAll('#productos-body .cant, #productos-body .precio').forEach(input => {
    input.addEventListener('input', calcularTotales);
});

/* =======================================================
   ARREGLO: descripciones largas cortadas al imprimir/PDF
   =======================================================
   Los <textarea> recortan internamente el texto que no
   entra en su caja visible, sin importar el CSS
   (overflow, height, etc. no los "des-recortan" al imprimir).
   Solución: justo antes de imprimir, se reemplaza cada
   textarea de descripción por un <div> normal con el mismo
   texto (los div sí crecen libremente con el contenido).
   Al terminar de imprimir, se restaura el textarea editable.
======================================================= */

function prepararDescripcionesParaImprimir() {
    document.querySelectorAll('.desc, #comentarios, #anotacion').forEach(textarea => {
        const div = document.createElement('div');
        div.className = 'desc-print';
        div.textContent = textarea.value;
        textarea.insertAdjacentElement('afterend', div);
        textarea.style.display = 'none';
    });
}

function restaurarDescripcionesTrasImprimir() {
    document.querySelectorAll('.desc-print').forEach(div => div.remove());
    document.querySelectorAll('.desc, #comentarios, #anotacion').forEach(textarea => {
        textarea.style.display = '';
    });
}

window.addEventListener('beforeprint', prepararDescripcionesParaImprimir);
window.addEventListener('afterprint', restaurarDescripcionesTrasImprimir);
