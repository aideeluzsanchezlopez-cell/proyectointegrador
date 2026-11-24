
const botonCalcular = document.getElementById("calcular");

botonCalcular.addEventListener("click", function () {

    const campos = document.querySelectorAll(".venta");
    const ventas = [];

    // VALIDAR DATOS
    for (let campo of campos) {

        if (campo.value === "" || Number(campo.value) < 0) {
            alert("Ingresa una venta válida en los 10 campos.");
            return;
        }

        ventas.push(Number(campo.value));
    }

    const n = ventas.length;

    let sumaX = 0;
    let sumaY = 0;
    let sumaXY = 0;
    let sumaX2 = 0;
    let sumaY2 = 0;

    const cuerpoTabla = document.getElementById("cuerpoTabla");
    cuerpoTabla.innerHTML = "";

    // CALCULAR TABLA Y SUMATORIAS
    for (let i = 0; i < n; i++) {

        let x = i + 1;
        let y = ventas[i];

        let x2 = x * x;
        let y2 = y * y;
        let xy = x * y;

        sumaX += x;
        sumaY += y;
        sumaX2 += x2;
        sumaY2 += y2;
        sumaXY += xy;

        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${x}</td>
            <td>${y.toFixed(2)}</td>
            <td>${x2}</td>
            <td>${y2.toFixed(2)}</td>
            <td>${xy.toFixed(2)}</td>
        `;

        cuerpoTabla.appendChild(fila);
    }

    // PENDIENTE
    const b = (n * sumaXY - sumaX * sumaY) /
              (n * sumaX2 - sumaX * sumaX);

    // ORDENADA AL ORIGEN
    const a = (sumaY - b * sumaX) / n;

    // CORRELACION
    const numerador = n * sumaXY - sumaX * sumaY;

    const denominador = Math.sqrt(
        (n * sumaX2 - sumaX * sumaX) *
        (n * sumaY2 - sumaY * sumaY)
    );

    const r = denominador === 0 ? 0 : numerador / denominador;

    // PREDICCION
    const siguienteMes = n + 1;
    const prediccion = a + b * siguienteMes;

    // MOSTRAR RESULTADOS
    document.getElementById("pendiente").textContent =
        b.toFixed(2);

    document.getElementById("ordenada").textContent =
        a.toFixed(2);

    document.getElementById("correlacion").textContent =
        r.toFixed(4);

    document.getElementById("tituloPrediccion").textContent =
        "Predicción del mes " + siguienteMes;

    document.getElementById("prediccion").textContent =
        prediccion.toFixed(2);

    // MOSTRAR SUMATORIAS
    document.getElementById("sumaX").textContent =
        sumaX.toFixed(2);

    document.getElementById("sumaY").textContent =
        sumaY.toFixed(2);

    document.getElementById("sumaX2").textContent =
        sumaX2.toFixed(2);

    document.getElementById("sumaY2").textContent =
        sumaY2.toFixed(2);

    document.getElementById("sumaXY").textContent =
        sumaXY.toFixed(2);

    // DESARROLLO DE FORMULAS
    const desarrollo = document.getElementById("desarrollo");

    desarrollo.innerHTML = `

        <h3>1. Pendiente (b)</h3>

        <p>Fórmula:</p>
        <p>b = [n(ΣXY) - (ΣX)(ΣY)] / [n(ΣX²) - (ΣX)²]</p>

        <p>Sustitución:</p>
        <p>b = [${n}(${sumaXY.toFixed(2)}) - (${sumaX})(${sumaY.toFixed(2)})] / [${n}(${sumaX2}) - (${sumaX})²]</p>

        <p>Resultado: <strong>${b.toFixed(4)}</strong></p>

        <hr>

        <h3>2. Ordenada al origen (a)</h3>

        <p>Fórmula:</p>
        <p>a = [ΣY - b(ΣX)] / n</p>

        <p>Sustitución:</p>
        <p>a = [${sumaY.toFixed(2)} - (${b.toFixed(4)})(${sumaX})] / ${n}</p>

        <p>Resultado: <strong>${a.toFixed(4)}</strong></p>

        <hr>

        <h3>3. Correlación (r)</h3>

        <p>Fórmula:</p>
        <p>r = [n(ΣXY) - (ΣX)(ΣY)] / √{[n(ΣX²) - (ΣX)²][n(ΣY²) - (ΣY)²]}</p>

        <p>Sustitución:</p>
        <p>r = ${numerador.toFixed(2)} / ${denominador.toFixed(2)}</p>

        <p>Resultado: <strong>${r.toFixed(4)}</strong></p>

        <hr>

        <h3>4. Predicción de ventas</h3>

        <p>Fórmula:</p>
        <p>Y = a + b(X)</p>

        <p>Sustitución:</p>
        <p>Y = ${a.toFixed(4)} + ${b.toFixed(4)}(${siguienteMes})</p>

        <p>Predicción del mes ${siguienteMes}: <strong>${prediccion.toFixed(2)}</strong></p>
    `;
});
