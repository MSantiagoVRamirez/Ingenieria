import { useState, useEffect } from "react"
import { Modulo } from "../../interfaces/Modulo"
import moduloService from "../../services/moduloService"
import moduloService2 from "../../services/moduloService2"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function ModulosWidget() {

  const defaultModulo: Modulo = {
    id: 0,
    nombre: "",
    estado: false
  }
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [newModulo, setNewModulo] = useState<Modulo>(defaultModulo)
  const [editedModulo, setEditedModulo] = useState<Modulo>(defaultModulo)
  const [deleteModuloId, setDeleteModuloId] = useState<number>(defaultModulo.id)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todos los módulos
  const fetchModulos = () => {
    moduloService2.getAll()
      .then((response) => {
        setModulos(response.data)  // Llenar la lista de módulos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los módulos", error)
      })
  }

  // Obtener todos los módulos cada vez que se renderiza el componente
  useEffect(() => {
    fetchModulos()
  }, [])

  // Obtener un solo módulo (para editar)
  const fetchModulo = (id: number) => {
    moduloService2.get(id)
      .then((response) => {
        setEditedModulo(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el módulo", error)
      })
  }

  // Crear un módulo
  const createModulo = (data: Modulo) => {
    moduloService2.create(data)
      .then((response) => {
        setNewModulo(defaultModulo) // Limpiar el formulario
        fetchModulos()  // Actualizar la lista de módulos
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el módulo", error)
      })
  }

  // Actualizar un módulo
  const updateModulo = (id: number, data: Modulo) => {
    moduloService2.update(data)
      .then((response) => {
        setEditedModulo(defaultModulo) // Limpiar el formulario
        fetchModulos()  // Actualizar la lista de módulos
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el módulo", error)
      })
  }

  // Eliminar un módulo
  const deleteModulo = (id: number) => {
    moduloService2.remove(id)
      .then((response) => {
        setDeleteModuloId(defaultModulo.id) // Limpiar el input de eliminación
        fetchModulos()  // Actualizar la lista de módulos
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el módulo", error)
      })
  }

  return (
    <>
      {/* Listado de Módulos */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Módulos
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
          { modulos.map((modulo) => (
            <div className="d-flex gap-2" key={modulo.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="flex-grow-1 mx-3">
                <span className="text-gray-800 fw-bold fs-6">
                  { modulo.nombre }
                </span>
                <div className="d-block mt-1">
                  <span className={`badge fs-7 fw-bold ${modulo.estado ? "badge-light-success" : "badge-light-danger"}`}>
                    { modulo.estado ? "Activo" : "Inactivo" }
                  </span>
                </div>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchModulo(modulo.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteModulo(modulo.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Módulo */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Módulo</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del módulo"
                  value={newModulo.nombre}
                  onChange={(e) => setNewModulo({ ...newModulo, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={newModulo.estado}
                  onChange={(e) => setNewModulo({ ...newModulo, estado: e.target.checked })}
                  className="form-check-input"
                  onClick={() => setNewModulo({ ...newModulo, estado: !newModulo.estado })}
                />
                <label className="form-label"> Activo </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createModulo(newModulo)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      
        {/* Formulario de Edición de Módulo */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Módulo</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del módulo"
                  value={editedModulo.nombre}
                  onChange={(e) => setEditedModulo({ ...editedModulo, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <input
                  type="radio"
                  checked={editedModulo.estado}
                  onChange={(e) => setEditedModulo({ ...editedModulo, estado: e.target.checked })}
                  className="form-check-input"
                  onClick={() => setEditedModulo({ ...editedModulo, estado: !editedModulo.estado })}
                />
                <label className="form-label"> Activo </label>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateModulo(editedModulo.id, editedModulo)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}