function leerArchivo(evt) {
  let file = evt.target.files[0];
  let reader = new FileReader();

  reader.onload = (e) => {
    let data = e.target.result;
    crearTabla(data);
  };

  reader.readAsText(file);
}

function crearTabla(data) {
  let tabla = `<table>`;
  let filas = data.split("\n");
  for (let fila of filas) {
    let celdas = fila.split(",");
    let tr = `<tr>`;
    for (let celda of celdas) {
      tr += `<td>${celda}</td>`;
    }
    tr += `</tr>`;
    tabla += tr;
  }
  tabla += `</table>`;

  document.querySelector("#tablares").innerHTML = tabla;
}

document.querySelector("form").addEventListener("submit", leerArchivo);