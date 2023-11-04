const input = document.querySelector("input[type='submit'][value='Generar']");

input.addEventListener("click", async (event) => {
  // Realiza la solicitud fetch
  const response = await fetch("http://localhost:3000/report");

  // Obtén la respuesta como un blob
  const blob = await response.blob();

  // Descarga el blob como un archivo
  await saveAs(blob, "reporteusuarios.csv");
});