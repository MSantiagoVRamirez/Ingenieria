import { useState, useEffect } from "react"
import { Permiso } from "../../interfaces/Permiso"
import { Rol } from "../../interfaces/Rol"
import { Modulo } from "../../interfaces/Modulo"
import permisoService from "../../services/permisoService"
import rolService from "../../services/rolService"
import moduloService from "../../services/moduloService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function PermisosWidget() {

  const defaultPermiso: Permiso = {
    id: 0,
    rolId: 0,
    moduloId: 0,
    leer: false,
    editar: false,
    consultar: false,
    insertar: false,
    eliminar: false,
    exportar: false,
    importar: false
  }
  const [permisos, setPermisos] = useState<Permiso[]>([])
  const [newPermiso, setNewPermiso] = useState<Permiso>(defaultPermiso)
  const [editedPermiso, setEditedPermiso] = useState<Permiso>(defaultPermiso)
  const [deletePermisoId, setDeletePermisoId] = useState<number>(defaultPermiso.id)

  const [roles, setRoles] = useState<Rol[]>([])
  const [modulos, setModulos] = useState<Modulo[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  
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
  
  // Obtener todos los módulos
  const fetchModulos = () => {
    moduloService.getAll()
    .then((response) => {
      setModulos(response.data)  // Llenar la lista de módulos
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los módulos", error)
    })
  }

  // Obtener todos los permisos
  const fetchPermisos = () => {
    permisoService.getAll()
      .then((response) => {
        setPermisos(response.data)  // Llenar la lista de permisos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los permisos", error)
      })
  }

  // Obtener todos los permisos cada vez que se renderiza el componente
  useEffect(() => {
    fetchRoles()  // Obtener todos los roles
    fetchModulos()  // Obtener todos los módulos
    fetchPermisos()  // Obtener todos los permisos
  }, [])

  // Obtener un solo permiso (para editar)
  const fetchPermiso = (id: number) => {
    permisoService.get(id)
      .then((response) => {
        setEditedPermiso(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el permiso", error)
      })
  }

  // Crear un permiso
  const createPermiso = (data: Permiso) => {
    permisoService.create(data)
      .then((response) => {
        setNewPermiso(defaultPermiso) // Limpiar el formulario
        fetchPermisos()  // Actualizar la lista de permisos
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el permiso", error)
      })
  }

  // Actualizar un permiso
  const updatePermiso = (id: number, data: Permiso) => {
    permisoService.update(id, data)
      .then((response) => {
        setEditedPermiso(defaultPermiso) // Limpiar el formulario
        fetchPermisos()  // Actualizar la lista de permisos
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el permiso", error)
      })
  }

  // Eliminar un permiso
  const deletePermiso = (id: number) => {
    permisoService.remove(id)
      .then((response) => {
        setDeletePermisoId(defaultPermiso.id) // Limpiar el input de eliminación
        fetchPermisos()  // Actualizar la lista de permisos
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el permiso", error)
      })
  }

  return (
    <>
      {/* Listado de Permisos */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Permisos
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
                  <th className='min-w-150px rounded-start ps-5'>Rol - Módulo</th>
                  <th className='min-w-80px'>Leer</th>
                  <th className='min-w-80px'>Editar</th>
                  <th className='min-w-80px'>Consultar</th>
                  <th className='min-w-80px'>Insertar</th>
                  <th className='min-w-80px'>Eliminar</th>
                  <th className='min-w-80px'>Exportar</th>
                  <th className='min-w-80px'>Importar</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { permisos.map((permiso) => (
                  <tr>
                    <td className="d-flex">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="ms-3">
                        <span className="text-gray-800 test-hover-primary fw-bold fs-6">
                          { roles.find(rol => rol.id === permiso.rolId)?.nombre }
                        </span>
                        <div className="text-muted fw-semibold fs-7">
                          { modulos.find(modulo => modulo.id === permiso.moduloId)?.nombre }
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.leer ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.leer ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.editar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.editar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.consultar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.consultar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.insertar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.insertar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.eliminar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.eliminar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.exportar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.exportar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td>
                      <span className={`badge fw-semibold fs-7 ${ permiso.importar ? 'badge-light-success' : 'badge-light-danger' }`}>
                        { permiso.importar ? 'Permitido' : 'Restringido' }
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchPermiso(permiso.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deletePermiso(permiso.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Permiso */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Permiso</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Rol </label>
                <select
                  value={newPermiso.rolId}
                  onChange={(e) => setNewPermiso({ ...newPermiso, rolId: parseInt(e.target.value) })}
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
              <div className="form-group">
                <label className="form-label required"> Módulo </label>
                <select
                  value={newPermiso.moduloId}
                  onChange={(e) => setNewPermiso({ ...newPermiso, moduloId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un módulo</option>
                  {modulos.map((modulo) => (
                    <option key={modulo.id} value={modulo.id}>
                      {modulo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.leer}
                  onChange={(e) => setNewPermiso({ ...newPermiso, leer: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Leer </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.editar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, editar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Editar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.consultar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, consultar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Consultar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.insertar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, insertar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Insertar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.eliminar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, eliminar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Eliminar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.exportar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, exportar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Exportar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newPermiso.importar}
                  onChange={(e) => setNewPermiso({ ...newPermiso, importar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Importar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createPermiso(newPermiso)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Permiso */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Permiso</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Rol </label>
                <select
                  value={editedPermiso.rolId}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, rolId: parseInt(e.target.value) })}
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
              <div className="form-group">
                <label className="form-label required"> Módulo </label>
                <select
                  value={editedPermiso.moduloId}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, moduloId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un módulo</option>
                  {modulos.map((modulo) => (
                    <option key={modulo.id} value={modulo.id}>
                      {modulo.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.leer}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, leer: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Leer </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.editar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, editar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Editar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.consultar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, consultar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Consultar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.insertar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, insertar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Insertar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.eliminar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, eliminar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Eliminar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.exportar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, exportar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Exportar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedPermiso.importar}
                  onChange={(e) => setEditedPermiso({ ...editedPermiso, importar: e.target.checked })}
                  className="form-check-input"
                />
                <label className="form-label"> Importar </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updatePermiso(editedPermiso.id, editedPermiso)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}