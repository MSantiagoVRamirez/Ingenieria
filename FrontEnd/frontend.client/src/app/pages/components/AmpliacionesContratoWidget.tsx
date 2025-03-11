import { useState, useEffect } from "react"
import { AmpliacionContrato } from "../../interfaces/AmpliacionContrato"
import { Contrato } from "../../interfaces/Contrato"
import ampliacionContratoService from "../../services/ampliacionContratoService"
import contratoService from "../../services/contratoService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function AmpliacionesContratoWidget() {

  const defaultAmpliacionContrato: AmpliacionContrato = {
    id: 0,
    contratoId: 0,
    fechaInicio: '',
    fechaFin: '',
    valor: 0,
    duracion: 0
  }
  const [ampliacionesContrato, setAmpliacionesContrato] = useState<AmpliacionContrato[]>([])
  const [newAmpliacionContrato, setNewAmpliacionContrato] = useState<AmpliacionContrato>(defaultAmpliacionContrato)
  const [editedAmpliacionContrato, setEditedAmpliacionContrato] = useState<AmpliacionContrato>(defaultAmpliacionContrato)
  const [deleteAmpliacionContratoId, setDeleteAmpliacionContratoId] = useState<number>(defaultAmpliacionContrato.id)
  
  const [contratos, setContratos] = useState<Contrato[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)
  
  // Obtener todos los contratos
  const fetchContratos = () => {
    contratoService.getAll()
    .then((response) => {
      setContratos(response.data)  // Llenar la lista de contratos
    })
    .catch((error) => {
      console.error("Hubo un error al obtener los contratos", error)
    })
  }

  // Obtener todas las ampliaciones de contrato
  const fetchAmpliacionesContrato = () => {
    ampliacionContratoService.getAll()
      .then((response) => {
        setAmpliacionesContrato(response.data)  // Llenar la lista de ampliaciones de contrato
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las ampliaciones de contrato", error)
      })
  }
  
  // Obtener todas las ampliaciones de contrato cada vez que se renderiza el componente
  useEffect(() => {
    fetchContratos()  // Obtener todos los contratos
    fetchAmpliacionesContrato()  // Obtener todas las ampliaciones de contrato
  }, [])

  // Obtener una sola ampliación de contrato (para editar)
  const fetchAmpliacionContrato = (id: number) => {
    ampliacionContratoService.get(id)
      .then((response) => {
        setEditedAmpliacionContrato(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la ampliación de contrato", error)
      })
  }

  // Crear una ampliación de contrato
  const createAmpliacionContrato = (data: AmpliacionContrato) => {
    ampliacionContratoService.create(data)
      .then((response) => {
        setNewAmpliacionContrato(defaultAmpliacionContrato) // Limpiar el formulario
        fetchAmpliacionesContrato()  // Actualizar la lista de ampliaciones de contrato
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la ampliación de contrato", error)
      })
  }

  // Actualizar una ampliación de contrato
  const updateAmpliacionContrato = (id: number, data: AmpliacionContrato) => {
    ampliacionContratoService.update(id, data)
      .then((response) => {
        setEditedAmpliacionContrato(defaultAmpliacionContrato) // Limpiar el formulario
        fetchAmpliacionesContrato()  // Actualizar la lista de ampliaciones de contrato
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la ampliación de contrato", error)
      })
  }

  // Eliminar una ampliación de contrato
  const deleteAmpliacionContrato = (id: number) => {
    ampliacionContratoService.remove(id)
      .then((response) => {
        setDeleteAmpliacionContratoId(defaultAmpliacionContrato.id) // Limpiar el input de eliminación
        fetchAmpliacionesContrato()  // Actualizar la lista de ampliaciones de contrato
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la ampliación de contrato", error)
      })
  }

  return (
    <>
      {/* Listado de Ampliaciones de Contrato */}
      <div className="card mx-20 my-10">
        
        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Ampliaciones de Contrato
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
                  <th className='min-w-150px rounded-start ps-5'>Contrato</th>
                  <th className='min-w-150px'>Valor</th>
                  <th className='min-w-150px'>Duración</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { ampliacionesContrato.map((ampliacionContrato) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="fs-6 fw-bold mb-1">
                          {contratos.find((contrato) => contrato.id === ampliacionContrato.contratoId)?.nombre}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-primary d-block fw-bold fs-6">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(ampliacionContrato.valor)}
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-primary fw-bold fs-6">{ampliacionContrato.duracion} años</span>
                      <span className="d-block fs-7">{ampliacionContrato.fechaInicio}</span>
                      <span className="d-block text-muted fs-7">{ampliacionContrato.fechaFin}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchAmpliacionContrato(ampliacionContrato.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteAmpliacionContrato(ampliacionContrato.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Ampliación de Contrato */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Ampliación de Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={newAmpliacionContrato.contratoId}
                  onChange={(e) => setNewAmpliacionContrato({ ...newAmpliacionContrato, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un contrato</option>
                  {contratos.map((contrato) => (
                    <option value={contrato.id}>{contrato.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={newAmpliacionContrato.fechaInicio}
                  onChange={(e) => setNewAmpliacionContrato({ ...newAmpliacionContrato, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={newAmpliacionContrato.fechaFin}
                  onChange={(e) => setNewAmpliacionContrato({ ...newAmpliacionContrato, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={newAmpliacionContrato.valor}
                  onChange={(e) => setNewAmpliacionContrato({ ...newAmpliacionContrato, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={newAmpliacionContrato.duracion}
                  onChange={(e) => setNewAmpliacionContrato({ ...newAmpliacionContrato, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createAmpliacionContrato(newAmpliacionContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Ampliación de Contrato */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Ampliación de Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={editedAmpliacionContrato.contratoId}
                  onChange={(e) => setEditedAmpliacionContrato({ ...editedAmpliacionContrato, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un contrato</option>
                  {contratos.map((contrato) => (
                    <option value={contrato.id}>{contrato.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={editedAmpliacionContrato.fechaInicio}
                  onChange={(e) => setEditedAmpliacionContrato({ ...editedAmpliacionContrato, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={editedAmpliacionContrato.fechaFin}
                  onChange={(e) => setEditedAmpliacionContrato({ ...editedAmpliacionContrato, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={editedAmpliacionContrato.valor}
                  onChange={(e) => setEditedAmpliacionContrato({ ...editedAmpliacionContrato, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={editedAmpliacionContrato.duracion}
                  onChange={(e) => setEditedAmpliacionContrato({ ...editedAmpliacionContrato, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateAmpliacionContrato(editedAmpliacionContrato.id, editedAmpliacionContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}