let listaNombresGastos = JSON.parse(localStorage.getItem('listaNombresGastos')) || [];
let listaValoresGastos = JSON.parse(localStorage.getItem('listaValoresGastos')) || [];
let listaDescripcionesGastos = JSON.parse(localStorage.getItem('listaDescripcionesGastos')) || [];
let limiteGasto = localStorage.getItem('limiteGasto') || 0;
let indiceModificar = -1;

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('limiteGasto').value = limiteGasto;
    actualizarListaGastos();
});

function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;
    limiteGasto = document.getElementById('limiteGasto').value;

    if (nombreGasto === '' || valorGasto === '' || descripcionGasto === '' || isNaN(valorGasto) || Number(valorGasto) <= 0) {
        alert('Por favor, complete todos los campos con valores válidos.');
        return;
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGastos.push(Number(valorGasto));
    listaDescripcionesGastos.push(descripcionGasto);

    localStorage.setItem('listaNombresGastos', JSON.stringify(listaNombresGastos));
    localStorage.setItem('listaValoresGastos', JSON.stringify(listaValoresGastos));
    localStorage.setItem('listaDescripcionesGastos', JSON.stringify(listaDescripcionesGastos));
    localStorage.setItem('limiteGasto', limiteGasto);

    actualizarListaGastos();
}

function actualizarListaGastos() {
    const listaElementos = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;

    listaNombresGastos.forEach((elemento, posicion) => {
        const valorGasto = listaValoresGastos[posicion];
        const descripcionGasto = listaDescripcionesGastos[posicion];
        
        htmlLista += `<li>${elemento} - USD ${valorGasto.toFixed(2)} - ${descripcionGasto}
            <button onclick="prepararModificar(${posicion});">Modificar</button>
            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
        </li>`;

        totalGastos += valorGasto;
    });

    listaElementos.innerHTML = htmlLista;
    totalElementos.innerHTML = totalGastos.toFixed(2);

    if (totalGastos > limiteGasto) {
        alert('¡Has superado el límite de gasto!');
    }

    limpiar();
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = '';
    document.getElementById('descripcionGasto').value = '';
    document.getElementById('botonFormulario').style.display = 'inline-block';
    document.getElementById('botonModificar').style.display = 'none';
}

function prepararModificar(posicion) {
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGastos[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];
    indiceModificar = posicion;
    document.getElementById('botonFormulario').style.display = 'none';
    document.getElementById('botonModificar').style.display = 'inline-block';
}

function modificarGasto() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = document.getElementById('valorGasto').value;
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    if (nombreGasto === '' || valorGasto === '' || descripcionGasto === '' || isNaN(valorGasto) || Number(valorGasto) <= 0) {
        alert('Por favor, complete todos los campos con valores válidos.');
        return;
    }

    listaNombresGastos[indiceModificar] = nombreGasto;
    listaValoresGastos[indiceModificar] = Number(valorGasto);
    listaDescripcionesGastos[indiceModificar] = descripcionGasto;

    localStorage.setItem('listaNombresGastos', JSON.stringify(listaNombresGastos));
    localStorage.setItem('listaValoresGastos', JSON.stringify(listaValoresGastos));
    localStorage.setItem('listaDescripcionesGastos', JSON.stringify(listaDescripcionesGastos));

    actualizarListaGastos();
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGastos.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);

    localStorage.setItem('listaNombresGastos', JSON.stringify(listaNombresGastos));
    localStorage.setItem('listaValoresGastos', JSON.stringify(listaValoresGastos));
    localStorage.setItem('listaDescripcionesGastos', JSON.stringify(listaDescripcionesGastos));

    actualizarListaGastos();
}
