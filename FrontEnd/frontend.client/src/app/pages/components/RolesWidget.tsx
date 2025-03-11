import { useState, useEffect } from "react"
import { Rol } from "../../interfaces/Rol"
import rolService from "../../services/rolService"
import rolService2 from "../../services/rolService2"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function RolesWidget() {

  const defaultRol: Rol = {
    id: 0,
    nombre: "",
    estado: false
  }
  const [roles, setRoles] = useState<Rol[]>([])
  const [newRol, setNewRol] = useState<Rol>(defaultRol)
  const [editedRol, setEditedRol] = useState<Rol>(defaultRol)
  const [deleteRolId, setDeleteRolId] = useState<number>(defaultRol.id)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todos los roles
  const fetchRoles = () => {
    rolService2.getAll()
      .then((response) => {
        setRoles(response.data)  // Llenar la lista de roles
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los roles", error)
      })
  }

  // Obtener todos los roles cada vez que se renderiza el componente
  useEffect(() => {
    fetchRoles()
  }, [])

  // Obtener un solo rol (para editar)
  const fetchRol = (id: number) => {
    rolService.get(id)
      .then((response) => {
        setEditedRol(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el rol", error)
      })
  }

  // Crear un rol
  const createRol = (data: Rol) => {
    rolService.create(data)
      .then((response) => {
        setNewRol(defaultRol) // Limpiar el formulario
        fetchRoles()  // Actualizar la lista de roles
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el rol", error)
      })
  }

  // Actualizar un rol
  const updateRol = (id: number, data: Rol) => {
    rolService.update(id, data)
      .then((response) => {
        setEditedRol(defaultRol) // Limpiar el formulario
        fetchRoles()  // Actualizar la lista de roles
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el rol", error)
      })
  }

  // Eliminar un rol
  const deleteRol = (id: number) => {
    rolService.remove(id)
      .then((response) => {
        setDeleteRolId(defaultRol.id) // Limpiar el input de eliminación
        fetchRoles()  // Actualizar la lista de roles
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el rol", error)
      })
  }

  return (
    <>
      {/* Listado de Roles */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Roles
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
        <div className="card-body d-flex flex-column gap-5">
          { roles.map((rol) => (
            <div className="d-flex gap-2" key={rol.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="flex-grow-1 mx-3">
                <span className="text-gray-800 fw-bold fs-6">
                  { rol.nombre }
                </span>
                <div className="d-block mt-1">
                  <span className={`badge fs-7 fw-bold ${rol.estado ? "badge-light-success" : "badge-light-danger"}`}>
                    { rol.estado ? "Activo" : "Inactivo" }
                  </span>
                </div>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchRol(rol.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteRol(rol.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Rol */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Rol</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del rol"
                  value={newRol.nombre}
                  onChange={(e) => setNewRol({ ...newRol, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newRol.estado}
                  onChange={(e) => setNewRol({ ...newRol, estado: e.target.checked })}
                  className="form-check-input"
                  onClick={() => setNewRol({ ...newRol, estado: !newRol.estado })}
                />
                <label className="form-label"> Activo </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createRol(newRol)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Rol */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Rol</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del rol"
                  value={editedRol.nombre}
                  onChange={(e) => setEditedRol({ ...editedRol, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedRol.estado}
                  onChange={(e) => setEditedRol({ ...editedRol, estado: e.target.checked })}
                  className="form-check-input"
                  onClick={() => setEditedRol({ ...editedRol, estado: !editedRol.estado })}
                />
                <label className="form-label"> Activo </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateRol(editedRol.id, editedRol)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}