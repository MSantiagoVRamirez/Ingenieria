import { useState, useEffect } from "react"
import { ActaContrato } from "../../interfaces/ActaContrato"
import { Contrato } from "../../interfaces/Contrato"
import actaContratoService from "../../services/actaContratoService"
import contratoService from "../../services/contratoService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function ActasContratoWidget() {

  const defaultActaContrato: ActaContrato = {
    id: 0,
    contratoId: 0,
    nombre: '',
    descripcion: '',
    documento: ''
  }
  const [actasContrato, setActasContrato] = useState<ActaContrato[]>([])
  const [newActaContrato, setNewActaContrato] = useState<ActaContrato>(defaultActaContrato)
  const [editedActaContrato, setEditedActaContrato] = useState<ActaContrato>(defaultActaContrato)
  const [deleteActaContratoId, setDeleteActaContratoId] = useState<number>(defaultActaContrato.id)
  
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
  
  // Obtener todas las actas de contrato
  const fetchActasContrato = () => {
    actaContratoService.getAll()
      .then((response) => {
        setActasContrato(response.data)  // Llenar la lista de actas de contrato
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las actas de contrato", error)
      })
  }
  
  // Obtener todas las actas de contrato cada vez que se renderiza el componente
  useEffect(() => {
    fetchContratos()  // Obtener todos los contratos
    fetchActasContrato()  // Obtener todas las actas de contrato
  }, [])

  // Obtener una sola acta de contrato (para editar)
  const fetchActaContrato = (id: number) => {
    actaContratoService.get(id)
      .then((response) => {
        setEditedActaContrato(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el acta de contrato", error)
      })
  }

  // Crear un acta de contrato
  const createActaContrato = (data: ActaContrato) => {
    actaContratoService.create(data)
      .then((response) => {
        setNewActaContrato(defaultActaContrato) // Limpiar el formulario
        fetchActasContrato()  // Actualizar la lista de actas de contrato
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el acta de contrato", error)
      })
  }

  // Actualizar un acta de contrato
  const updateActaContrato = (id: number, data: ActaContrato) => {
    actaContratoService.update(id, data)
      .then((response) => {
        setEditedActaContrato(defaultActaContrato) // Limpiar el formulario
        fetchActasContrato()  // Actualizar la lista de actas de contrato
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el acta de contrato", error)
      })
  }

  // Eliminar un acta de contrato
  const deleteActaContrato = (id: number) => {
    actaContratoService.remove(id)
      .then((response) => {
        setDeleteActaContratoId(defaultActaContrato.id) // Limpiar el input de eliminación
        fetchActasContrato()  // Actualizar la lista de actas de contrato
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el acta de contrato", error)
      })
  }

  return (
    <>
      {/* Listado de Actas de Contrato */}
      <div className="card mx-20 my-10">
        
        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Actas de Contrato
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
                  <th className='min-w-150px rounded-start ps-5'>Acta de Contrato</th>
                  <th className='min-w-150px'>Descripción</th>
                  <th className='min-w-150px'>Documento</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { actasContrato.map((actaContrato) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="fs-6 fw-bold mb-1">{actaContrato.nombre}</span>
                        <span className="badge badge-light-primary fs-8">
                          {contratos.find((contrato) => contrato.id === actaContrato.contratoId)?.nombre}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="d-block fs-7 min-w-200px">{actaContrato.descripcion}</span>
                    </td>
                    <td>
                      <button className="btn btn-light-primary d-flex align-items-center gap-1 fs-7">
                        <KTIcon iconName="file" className="fs-3" />
                        {actaContrato.documento}
                      </button>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchActaContrato(actaContrato.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteActaContrato(actaContrato.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Acta de Contrato */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Acta de Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={newActaContrato.contratoId}
                  onChange={(e) => setNewActaContrato({ ...newActaContrato, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Contrato</option>
                  {contratos.map((contrato) => (
                    <option value={contrato.id}>{contrato.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={newActaContrato.nombre}
                  onChange={(e) => setNewActaContrato({ ...newActaContrato, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={newActaContrato.descripcion}
                  onChange={(e) => setNewActaContrato({ ...newActaContrato, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={newActaContrato.documento}
                  onChange={(e) => setNewActaContrato({ ...newActaContrato, documento: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createActaContrato(newActaContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Acta de Contrato */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Acta de Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={editedActaContrato.contratoId}
                  onChange={(e) => setEditedActaContrato({ ...editedActaContrato, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Contrato</option>
                  {contratos.map((contrato) => (
                    <option value={contrato.id}>{contrato.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={editedActaContrato.nombre}
                  onChange={(e) => setEditedActaContrato({ ...editedActaContrato, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={editedActaContrato.descripcion}
                  onChange={(e) => setEditedActaContrato({ ...editedActaContrato, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={editedActaContrato.documento}
                  onChange={(e) => setEditedActaContrato({ ...editedActaContrato, documento: e.target.value })}  // TODO: ERROR - No se puede editar el documento
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateActaContrato(editedActaContrato.id, editedActaContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}