const menuItems = document.querySelectorAll(".sidebar-menu li");

menuItems.forEach((menuItem) => {

  menuItem.addEventListener("click", () => {

    const subMenu = menuItem.querySelector(".sub-menu");

    if (subMenu) {
    
      if (subMenu.classList.contains("show")) {
        subMenu.classList.remove("show");
        subMenu.style.height = 0; // Setear altura  
      } else {
        subMenu.classList.add("show");
        subMenu.style.height = "auto"; // Altura automática
      }
    
    }
  
  });

});

// Definicion de Perfiles
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


// Crear-usuario - Accion Boton
const crearUsuario = document.getElementById("crear-usuario");
crearUsuario.addEventListener("click", () => {
  const datos = {
    tenant: document.getElementById("tenant").value,
    perfiles: document.getElementById("perfiles").value,
    user: document.getElementById("user").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    clientes: document.getElementById("clientes").value,
  };
  
  const menutms = getMenu(datos.perfiles);
const json = [
  {
    accountEnabled: true,
    displayName: datos.user,
    passwordPolicies: "DisablePasswordExpiration",
    identities: [
      {
        signInType: "emailAddress",
        issuer: "logisflow2.onmicrosoft.com",
        issuerAssignedId: datos.email,
      },
    ],
    creationType: "LocalAccount",
    passwordProfile: {
      password: datos.password,
      forceChangePasswordNextSignIn: false,
    },
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_apptenant: datos.tenant,
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_menuTms: menutms,
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_permisoCliente: datos.clientes,
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_rolTms: datos.perfiles,
  },
];

    // Convertir JSON a string
    const jsonString = JSON.stringify(json);

    fetch('http://localhost:3000/CrearJson', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
    .then(response => response.json())
    .then(data => console.log('Success:', data))
    .catch((error) => console.error('Error:', error));

    const response =  fetch('http://localhost:3000/Bat-crear_usuarios');
    const data =  response.text();
    document.getElementById('data').innerText = data;

    alert("El usuario se ha creado correctamente");

});
