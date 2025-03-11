import { useState, useEffect } from "react"
import { TipoTaller } from "../../interfaces/TipoTaller"
import tipoTallerService from "../../services/tipoTallerService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function TiposTallerWidget() {

  const defaultTipoTaller: TipoTaller = {
      id: 0,
      nombre: "",
      descripcion: ""
  }
  const [tiposTaller, setTiposTaller] = useState<TipoTaller[]>([])
  const [newTipoTaller, setNewTipoTaller] = useState<TipoTaller>(defaultTipoTaller)
  const [editedTipoTaller, setEditedTipoTaller] = useState<TipoTaller>(defaultTipoTaller)
  const [deleteTipoTallerId, setDeleteTipoTallerId] = useState<number>(defaultTipoTaller.id)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todos los tipos de taller
  const fetchTiposTaller = () => {
    tipoTallerService.getAll()
      .then((response) => {
        setTiposTaller(response.data)  // Llenar la lista de tipos de taller
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los tipos de taller", error)
      })
  }

  // Obtener todos los tipos de taller cada vez que se renderiza el componente
  useEffect(() => {
    fetchTiposTaller()
  }, [])

  // Obtener un solo tipo de taller (para editar)
  const fetchTipoTaller = (id: number) => {
    tipoTallerService.get(id)
      .then((response) => {
        setEditedTipoTaller(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el tipo de taller", error)
      })
  }

  // Crear un tipo de taller
  const createTipoTaller = (data: TipoTaller) => {
    tipoTallerService.create(data)
      .then((response) => {
        setNewTipoTaller(defaultTipoTaller) // Limpiar el formulario
        fetchTiposTaller()  // Actualizar la lista de tipos de taller
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el tipo de taller", error)
      })
  }

  // Actualizar un tipo de taller
  const updateTipoTaller = (id: number, data: TipoTaller) => {
    tipoTallerService.update(id, data)
      .then((response) => {
        setEditedTipoTaller(defaultTipoTaller) // Limpiar el formulario
        fetchTiposTaller()  // Actualizar la lista de tipos de taller
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el tipo de taller", error)
      })
  }

  // Eliminar un tipo de taller
  const deleteTipoTaller = (id: number) => {
    tipoTallerService.remove(id)
      .then((response) => {
        setDeleteTipoTallerId(defaultTipoTaller.id) // Limpiar el input de eliminación
        fetchTiposTaller()  // Actualizar la lista de tipos de taller
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el tipo de taller", error)
      })
  }

  return (
    <>
      {/* Listado de Tipos de Taller */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Tipos de Taller
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
          { tiposTaller.map((tipoTaller) => (
            <div className="d-flex gap-2" key={tipoTaller.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="flex-grow-1 mx-3">
                <span className="text-gray-800 fw-bold fs-6">
                  { tipoTaller.nombre }
                </span>
                <div className="d-block mt-1">
                  <span className="text-gray-600 fs-7">
                    { tipoTaller.descripcion }
                  </span>
                </div>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchTipoTaller(tipoTaller.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteTipoTaller(tipoTaller.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Tipo de Taller */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Tipo de Taller</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del tipo de taller"
                  value={newTipoTaller.nombre}
                  onChange={(e) => setNewTipoTaller({ ...newTipoTaller, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  placeholder="Descripción del tipo de taller"
                  value={newTipoTaller.descripcion}
                  onChange={(e) => setNewTipoTaller({ ...newTipoTaller, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createTipoTaller(newTipoTaller)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Tipo de Taller */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Tipo de Taller</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del tipo de taller"
                  value={editedTipoTaller.nombre}
                  onChange={(e) => setEditedTipoTaller({ ...editedTipoTaller, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  placeholder="Descripción del tipo de taller"
                  value={editedTipoTaller.descripcion}
                  onChange={(e) => setEditedTipoTaller({ ...editedTipoTaller, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateTipoTaller(editedTipoTaller.id, editedTipoTaller)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}