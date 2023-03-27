const nombre = document.getElementById("nombreInput");
const Licenciatura = document.getElementById("LicInput");
const idInput = document.getElementById("idInput");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
const cuerpoTabla = document.getElementById("cuerpoTabla");

const btnAgregar = document.getElementById("btnAgregar")
const btnEditar = document.getElementById("btnEditar")


const agregarUsuario = () => {
  const usuario = {
    id: crypto.randomUUID(),
    nombre: nombre.value,
    Licenciatura: Licenciatura.value,
  };

  usuarios.push(usuario);

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
};

const mostrarUsuarios = () => {
  cuerpoTabla.innerHTML = "";
  usuarios.forEach((usuario) => {
    cuerpoTabla.innerHTML += `<tr>
        <th scope="row">${usuario.id}</th>
        <td>${usuario.nombre}</td>
        <td>${usuario.Licenciatura}</td>
        <td>
        <button
          type="button"
          class="btn btn-danger"
          onclick="eliminarUusario('${usuario.id}')"
        >
          Eliminar
        </button>
        <td>
        <td>
        <button
          type="button"
          class="btn btn-warning"
          onclick="editarUsuario('${usuario.id}')"
        >
          Editar
        </button>
        </td>
    </tr>`;
  });
};

const eliminarUusario = (id) => {
  const usuario = usuarios.find((usuario) => usuario.id === id)
  const index = usuarios.indexOf(usuario)
  usuarios.splice(index, 1)
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  mostrarUsuarios();
};

const editarUsuario = (id) => {
  btnAgregar.style.display = "none";
  btnEditar.style.display = "inline";

  const usuario = usuarios.find((usuario) => usuario.id === id)
  idInput.value = usuario.id;
  nombre.value = usuario.nombre;
 Licenciatura.value = usuario.Licenciatura;
}

const confirmarEdicion = () => {
  const usuario = usuarios.find((usuario) => usuario.id === idInput.value)
  usuario.nombre = nombre.value;
  usuario.Licenciatura = Licenciatura.value;
  localStorage.setItem("usuarios", JSON.stringify(usuarios))

  btnAgregar.style.display = "inline";
  btnEditar.style.display = "none";

  idInput.value = "";
  nombre.value = "";
  Licenciatura.value = "";

  mostrarUsuarios();
}

window.addEventListener("load", mostrarUsuarios)
