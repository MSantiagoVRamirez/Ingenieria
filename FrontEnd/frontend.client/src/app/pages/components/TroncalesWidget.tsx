import { useState, useEffect } from "react"
import { Troncal } from "../../interfaces/Troncal"
import troncalService from "../../services/troncalService"
import troncalService2 from "../../services/troncalService2"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function TroncalesWidget() {

  const defaultTroncal: Troncal = {
    id: 0,
    nombre: ""
  }
  const [troncales, setTroncales] = useState<Troncal[]>([])
  const [newTroncal, setNewTroncal] = useState<Troncal>(defaultTroncal)
  const [editedTroncal, setEditedTroncal] = useState<Troncal>(defaultTroncal)
  const [deleteTroncalId, setDeleteTroncalId] = useState<number>(defaultTroncal.id)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todas las troncales
  const fetchTroncales = () => {
    troncalService2.getAll()
      .then((response) => {
        setTroncales(response.data)  // Llenar la lista de troncales
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las troncales", error)
      })
  }

  // Obtener todas las troncales cada vez que se renderiza el componente
  useEffect(() => {
    fetchTroncales()
  }, [])

  // Obtener una sola troncal (para editar)
  const fetchTroncal = (id: number) => {
    troncalService2.get(id)
      .then((response) => {
        setEditedTroncal(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la troncal", error)
      })
  }

  // Crear una troncal
  const createTroncal = (data: Troncal) => {
    troncalService2.create(data)
      .then((response) => {
        setNewTroncal(defaultTroncal) // Limpiar el formulario
        fetchTroncales()  // Actualizar la lista de troncales
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la troncal", error)
      })
  }

  // Actualizar una troncal
  const updateTroncal = (id: number, data: Troncal) => {
    troncalService2.update(data)
      .then((response) => {
        setEditedTroncal(defaultTroncal) // Limpiar el formulario
        fetchTroncales()  // Actualizar la lista de troncales
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la troncal", error)
      })
  }

  // Eliminar una troncal
  const deleteTroncal = (id: number) => {
    troncalService2.remove(id)
      .then((response) => {
        setDeleteTroncalId(defaultTroncal.id) // Limpiar el input de eliminación
        fetchTroncales()  // Actualizar la lista de troncales
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la troncal", error)
      })
  }

  return (
    <>
      {/* Listado de Troncales */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Troncales
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
          { troncales.map((troncal) => (
            <div className="d-flex gap-2" key={troncal.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="flex-grow-1 mx-3 d-flex align-items-center">
                <span className="text-gray-800 fw-bold fs-6">
                  { troncal.nombre }
                </span>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchTroncal(troncal.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteTroncal(troncal.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Troncal */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Troncal</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre de la troncal"
                  value={newTroncal.nombre}
                  onChange={(e) => setNewTroncal({ ...newTroncal, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createTroncal(newTroncal)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Troncal */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Troncal</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre de la troncal"
                  value={editedTroncal.nombre}
                  onChange={(e) => setEditedTroncal({ ...editedTroncal, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateTroncal(editedTroncal.id, editedTroncal)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}