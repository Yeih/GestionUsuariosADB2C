// Definicion de Perfiles


document.addEventListener('DOMContentLoaded', (event) => {
    const getMenu = (perfil) => {

        switch (perfil) {
          case "Administrador":
            return "BUSCARORDENES,RPTREPORTES,CREAREVENTO,CREARORDEN,EDITAR_ORDEN,RPTDGFREPORTES,RPTSABANA,CARGARARCHIVO,VALIDARORDEN,MOVIMIENTOS,MANT_TARIFAS,RPTKPIS,ERRTRANSP,PRFDIARIO,NOVEDADES,GSTNOVDD,IMPRIMIR_ETIQUETA,ORDESTADO,RPT_DISCREPANCIAS,IMPRIMIRORDENES";
          case "Supervisor":
            return "BUSCARORDENES,RPTREPORTES,CREAREVENTO,CREARORDEN,EDITAR_ORDEN,RPTDGFREPORTES,RPTSABANA,CARGARARCHIVO,VALIDARORDEN";
          case "Operador":
            return "CREAREVENTO";
          case "Cliente":
            return "BUSCARORDENES,RPTSABANA";
          default:
            return null;
        }
      };


// Crear-lote - Accion Boton


  
    document.getElementById('saveButton').addEventListener('click', function() {
      const fileInput = document.getElementById('upload');
      if (!fileInput.files.length) {
        alert('Por favor, selecciona un archivo antes de guardar.');
        return;
      }
  
      var reader = new FileReader();
      reader.readAsArrayBuffer(fileInput.files[0]);
      reader.onload = function(e) {
        var data = new Uint8Array(reader.result);
        var workbook = XLSX.read(data, {type: 'array'});
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var jsonData = XLSX.utils.sheet_to_json(worksheet, {header: 1});
        jsonData.forEach(async function(row, index) {
          if (index > 1) { // Ignora las dos primeras filas (encabezados y fila de ejemplo)
            const menutms = getMenu(row[5]);
            const userJson = {
              accountEnabled: true,
              displayName: row[0],
              passwordPolicies: "DisablePasswordExpiration",
              identities: [
                {
                  signInType: "emailAddress",
                  issuer: "logisflow2.onmicrosoft.com",
                  issuerAssignedId: row[1],
                },
              ],
              creationType: "LocalAccount",
              passwordProfile: {
                password: row[2],
                forceChangePasswordNextSignIn: false,
              },
              extension_6f79a5ad9c2f48e1b17ac7873c991a04_apptenant: row[3],
              extension_6f79a5ad9c2f48e1b17ac7873c991a04_menuTms: menutms,
              extension_6f79a5ad9c2f48e1b17ac7873c991a04_permisoCliente: row[4],
              extension_6f79a5ad9c2f48e1b17ac7873c991a04_rolTms: row[5],
            };
            
            const jsonArray = [userJson];

           /*fetch('http://localhost:3000/clean-json', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                }
              })*/

            // Enviar el JSON al servidor
            const response = await fetch('http://localhost:3000/CrearJson-lote', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonArray),
            });
            const data = await response.json();
            console.log('Success:', data);
  
            // Ejecutar el script del servidor
            const responseBat = await fetch('http://localhost:3000/Bat-crear_usuarios');
            const dataBat = await responseBat.text();
            document.getElementById('data').innerText = dataBat;
  
            alert("El usuario se ha creado correctamente");
          }
        });
      };
    });
  }); 