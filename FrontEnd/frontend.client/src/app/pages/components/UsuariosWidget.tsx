import { useState, useEffect } from "react"
import { Usuario } from "../../interfaces/Usuario"
import { Empresa } from "../../interfaces/Empresa"
import { Rol } from "../../interfaces/Rol"
import usuarioService from "../../services/usuarioService"
import empresaService from "../../services/empresaService"
import rolService from "../../services/rolService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function UsuariosWidget() {

  const defaultUsuario: Usuario = {
    id: 0,
    usuario: '',
    password: '',
    confirmPassword: '',
    nombres: '',
    apellidos: '',
    correo: '',
    telefono: '',
    fechaCreacion: '',
    fechaExpiracion: '',
    empresaId: 0,
    rolId: 0
  }
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [newUsuario, setNewUsuario] = useState<Usuario>(defaultUsuario)
  const [editedUsuario, setEditedUsuario] = useState<Usuario>(defaultUsuario)
  const [deleteUsuarioId, setDeleteUsuarioId] = useState<number>(defaultUsuario.id)

  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [roles, setRoles] = useState<Rol[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  
  // Obtener todas las empresas
  const fetchEmpresas = () => {
    empresaService.getAll()
    .then((response) => {
      setEmpresas(response.data)  // Llenar la lista de empresas
    })
    .catch((error) => {
      console.error("Hubo un error al obtener las empresas", error)
    })
  }

  // Obtener todos los roles
  const fetchRoles = () => {
    rolService.getAll()
    .then((response) => {
      setRoles(response.data)  // Llenar la lista de roles
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los roles", error)
    })
  }

  // Obtener todos los usuarios
  const fetchUsuarios = () => {
    usuarioService.getAll()
      .then((response) => {
        setUsuarios(response.data)  // Llenar la lista de usuarios
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los usuarios", error)
      })
  }
  
  // Obtener todos los usuarios cada vez que se renderiza el componente
  useEffect(() => {
    fetchEmpresas()  // Obtener todas las empresas
    fetchRoles()  // Obtener todos los roles
    fetchUsuarios()  // Obtener todos los usuarios
  }, [])

  // Obtener un solo usuario (para editar)
  const fetchUsuario = (id: number) => {
    usuarioService.get(id)
      .then((response) => {
        setEditedUsuario(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el usuario", error)
      })
  }

  // Crear un usuario
  const createUsuario = (data: Usuario) => {
    usuarioService.create(data)
      .then((response) => {
        setNewUsuario(defaultUsuario) // Limpiar el formulario
        fetchUsuarios()  // Actualizar la lista de usuarios
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el usuario", error)
      })
  }

  // Actualizar un usuario
  const updateUsuario = (id: number, data: Usuario) => {
    usuarioService.update(id, data)
      .then((response) => {
        setEditedUsuario(defaultUsuario) // Limpiar el formulario
        fetchUsuarios()  // Actualizar la lista de usuarios
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el usuario", error)
      })
  }

  // Eliminar un usuario
  const deleteUsuario = (id: number) => {
    usuarioService.remove(id)
      .then((response) => {
        setDeleteUsuarioId(defaultUsuario.id) // Limpiar el input de eliminación
        fetchUsuarios()  // Actualizar la lista de usuarios
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el usuario", error)
      })
  }

  return (
    <>
      {/* Listado de Usuarios */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Usuarios
          </div>
          <div className="card-toolbar">
            <button
              type='button'
              className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary mx-3'
              data-kt-menu-trigger='click'
              data-kt-menu-placement='bottom-end'
              data-kt-menu-flip='top-end'
            >
              <KTIcon iconName='category' className='fs-3' />
            </button>
            <Dropdown1 />
            <button className="btn btn-sm btn-light-primary btn-active-primary" onClick={() => setShowCreateForm(true)}>
              <KTIcon iconName="plus" className="fs-3" /> Agregar
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="card-body">
          <div className="table-responsive">
            {/* Table */}
            <table className="table align-middle gs-0 gy-3">
              {/* Table Head */}
              <thead>
                <tr className='fw-semibold text-muted bg-light fs-6'>
                  <th className='min-w-150px rounded-start ps-5'>Usuario - Rol</th>
                  <th className='min-w-150px'>Nombre - Empresa</th>
                  <th className='min-w-150px'>Datos de contacto</th>
                  <th className='min-w-150px'>Fechas C/E</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { usuarios.map((usuario) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="d-flex flex-column gap-1">
                        <span className="fw-bold d-block fs-6">{usuario.usuario}</span>
                        <span className="badge badge-light-primary fs-8">
                          {roles.find(rol => rol.id === usuario.rolId)?.nombre}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{usuario.nombres} {usuario.apellidos}</span>
                      <span className="badge badge-light fs-8">
                        {empresas.find(empresa => empresa.id === usuario.empresaId)?.nombre}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{usuario.correo}</span>
                      <span className="text-muted d-block fs-7">{usuario.telefono}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{usuario.fechaCreacion}</span>
                      <span className="text-muted d-block fs-7">{usuario.fechaExpiracion}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchUsuario(usuario.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteUsuario(usuario.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Usuario */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Usuario</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Usuario </label>
                <input
                  type="text"
                  value={newUsuario.usuario}
                  onChange={(e) => setNewUsuario({ ...newUsuario, usuario: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Contraseña </label>
                <input
                  type="password"
                  value={newUsuario.password}
                  onChange={(e) => setNewUsuario({ ...newUsuario, password: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Confirmar Contraseña </label>
                <input
                  type="password"
                  value={newUsuario.confirmPassword}
                  onChange={(e) => setNewUsuario({ ...newUsuario, confirmPassword: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombres </label>
                <input
                  type="text"
                  value={newUsuario.nombres}
                  onChange={(e) => setNewUsuario({ ...newUsuario, nombres: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Apellidos </label>
                <input
                  type="text"
                  value={newUsuario.apellidos}
                  onChange={(e) => setNewUsuario({ ...newUsuario, apellidos: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Correo </label>
                <input
                  type="email"
                  value={newUsuario.correo}
                  onChange={(e) => setNewUsuario({ ...newUsuario, correo: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Teléfono </label>
                <input
                  type="text"
                  value={newUsuario.telefono}
                  onChange={(e) => setNewUsuario({ ...newUsuario, telefono: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Empresa </label>
                <select
                  value={newUsuario.empresaId}
                  onChange={(e) => setNewUsuario({ ...newUsuario, empresaId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Rol </label>
                <select
                  value={newUsuario.rolId}
                  onChange={(e) => setNewUsuario({ ...newUsuario, rolId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createUsuario(newUsuario)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Usuario */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Usuario</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Usuario </label>
                <input
                  type="text"
                  value={editedUsuario.usuario}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, usuario: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Contraseña </label>
                <input
                  type="password"
                  value={editedUsuario.password}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, password: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Confirmar Contraseña </label>
                <input
                  type="password"
                  value={editedUsuario.confirmPassword}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, confirmPassword: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombres </label>
                <input
                  type="text"
                  value={editedUsuario.nombres}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, nombres: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Apellidos </label>
                <input
                  type="text"
                  value={editedUsuario.apellidos}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, apellidos: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Correo </label>
                <input
                  type="email"
                  value={editedUsuario.correo}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, correo: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Teléfono </label>
                <input
                  type="text"
                  value={editedUsuario.telefono}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, telefono: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Empresa </label>
                <select
                  value={editedUsuario.empresaId}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, empresaId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Rol </label>
                <select
                  value={editedUsuario.rolId}
                  onChange={(e) => setEditedUsuario({ ...editedUsuario, rolId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un rol</option>
                  {roles.map((rol) => (
                    <option key={rol.id} value={rol.id}>
                      {rol.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateUsuario(editedUsuario.id, editedUsuario)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}