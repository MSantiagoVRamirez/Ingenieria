import { useState, useEffect } from "react"
import { ActaODS } from "../../interfaces/ActaODS"
import { ODS } from "../../interfaces/ODS"
import actaOdsService from "../../services/actaOdsService"
import odsService from "../../services/odsService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function ActasODSWidget() {

  const defaultActaODS: ActaODS = {
    id: 0,
    odsId: 0,
    nombre: '',
    descripcion: '',
    documento: ''
  }
  const [actasODS, setActasODS] = useState<ActaODS[]>([])
  const [newActaODS, setNewActaODS] = useState<ActaODS>(defaultActaODS)
  const [editedActaODS, setEditedActaODS] = useState<ActaODS>(defaultActaODS)
  const [deleteActaODSId, setDeleteActaODSId] = useState<number>(defaultActaODS.id)

  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todas las ODS
  const fetchODS = () => {
    odsService.getAll()
      .then((response) => {
        setOrdenesServicio(response.data)  // Llenar la lista de ODS
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las ODS", error)
      })
  }

  // Obtener todas las actas de ODS
  const fetchActasODS = () => {
    actaOdsService.getAll()
      .then((response) => {
        setActasODS(response.data)  // Llenar la lista de actas de ODS
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las actas de ODS", error)
      })
  }

  // Obtener todas las actas de ODS cada vez que se renderiza el componente
  useEffect(() => {
    fetchODS()  // Obtener todas las ODS
    fetchActasODS()  // Obtener todas las actas de ODS
  }, [])

  // Obtener una sola acta de ODS (para editar)
  const fetchActaODS = (id: number) => {
    actaOdsService.get(id)
      .then((response) => {
        setEditedActaODS(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el acta de ODS", error)
      })
  }

  // Crear un acta de ODS
  const createActaODS = (data: ActaODS) => {
    actaOdsService.create(data)
      .then((response) => {
        setNewActaODS(defaultActaODS) // Limpiar el formulario
        fetchActasODS()  // Actualizar la lista de actas de ODS
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el acta de ODS", error)
      })
  }

  // Actualizar un acta de ODS
  const updateActaODS = (id: number, data: ActaODS) => {
    actaOdsService.update(id, data)
      .then((response) => {
        setEditedActaODS(defaultActaODS) // Limpiar el formulario
        fetchActasODS()  // Actualizar la lista de actas de ODS
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el acta de ODS", error)
      })
  }

  // Eliminar un acta de ODS
  const deleteActaODS = (id: number) => {
    actaOdsService.remove(id)
      .then((response) => {
        setDeleteActaODSId(defaultActaODS.id) // Limpiar el input de eliminación
        fetchActasODS()  // Actualizar la lista de actas de ODS
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el acta de ODS", error)
      })
  }

  return (
    <>
      {/* Listado de Actas de ODS */}
      <div className="card mx-20 my-10">
        
        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Actas de ODS
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
                  <th className='min-w-150px rounded-start ps-5'>Acta de ODS</th>
                  <th className='min-w-150px'>Descripción</th>
                  <th className='min-w-150px'>Documento</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { actasODS.map((actaODS) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="fs-6 fw-bold mb-1">{actaODS.nombre}</span>
                        <span className="badge badge-light-primary fs-8">
                          {ordenesServicio.find((ods) => ods.id === actaODS.odsId)?.nombre}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="d-block fs-7 min-w-200px">{actaODS.descripcion}</span>
                    </td>
                    <td>
                      <button className="btn btn-light-primary d-flex align-items-center gap-1 fs-7">
                        <KTIcon iconName="file" className="fs-3" />
                        {actaODS.documento}
                      </button>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchActaODS(actaODS.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteActaODS(actaODS.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Acta de ODS */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Acta de ODS</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> ODS </label>
                <select
                  value={newActaODS.odsId}
                  onChange={(e) => setNewActaODS({ ...newActaODS, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar ODS</option>
                  {ordenesServicio.map((ods) => (
                    <option value={ods.id}>{ods.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={newActaODS.nombre}
                  onChange={(e) => setNewActaODS({ ...newActaODS, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={newActaODS.descripcion}
                  onChange={(e) => setNewActaODS({ ...newActaODS, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={newActaODS.documento}
                  onChange={(e) => setNewActaODS({ ...newActaODS, documento: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createActaODS(newActaODS)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Acta de ODS */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Acta de ODS</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> ODS </label>
                <select
                  value={editedActaODS.odsId}
                  onChange={(e) => setEditedActaODS({ ...editedActaODS, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar ODS</option>
                  {ordenesServicio.map((ods) => (
                    <option value={ods.id}>{ods.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={editedActaODS.nombre}
                  onChange={(e) => setEditedActaODS({ ...editedActaODS, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={editedActaODS.descripcion}
                  onChange={(e) => setEditedActaODS({ ...editedActaODS, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={editedActaODS.documento}
                  onChange={(e) => setEditedActaODS({ ...editedActaODS, documento: e.target.value })}  // TODO: ERROR - No se puede editar el documento
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateActaODS(editedActaODS.id, editedActaODS)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}