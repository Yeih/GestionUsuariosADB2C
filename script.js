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




const crearUsuario = document.getElementById("crear-usuario");
crearUsuario.addEventListener("click", () => {
  var user = $('#user').val()
const json = [
  {
    accountEnabled: true,
    displayName: user,
    passwordPolicies: "DisablePasswordExpiration",
    identities: [
      {
        signInType: "emailAddress",
        issuer: "logisflow2.onmicrosoft.com",
        issuerAssignedId: "",
      },
    ],
    creationType: "LocalAccount",
    passwordProfile: {
      password: datos.password,
      forceChangePasswordNextSignIn: false,
    },
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_apptenant: "",
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_menuTms: "",
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_permisoCliente: "",
    extension_6f79a5ad9c2f48e1b17ac7873c991a04_rolTms: "",
  },
];

// Convertir JSON a string
const jsonString = JSON.stringify(json);

// Guardar el JSON en un archivo
const file = new File([jsonString], "usuarios.json", { type: "application/json" });
const saveAs = window.saveAs;
saveAs(file, "/ruta/donde/quieres/guardar/el/archivo/usuarios.json");
alert("El usuario se ha creado correctamente");
});