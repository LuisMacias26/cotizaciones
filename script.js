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

