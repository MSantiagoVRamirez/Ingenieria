import { useState, useEffect } from "react"
import { AccionCierre } from "../../interfaces/AccionCierre"
import { Hallazgo } from "../../interfaces/Hallazgo"
import { Usuario } from "../../interfaces/Usuario"
import accionCierreService from "../../services/accionCierreService"
import hallazgoService from "../../services/hallazgoService"
import usuarioService from "../../services/usuarioService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function AccionesCierreWidget() {

  const defaultAccionCierre: AccionCierre = {
    id: 0,
    hallazgoId: 0,
    descripcion: '',
    responsableId: 0,
    fechaCierre: '',
    documento: ''
  }
  const [accionesCierre, setAccionesCierre] = useState<AccionCierre[]>([])
  const [newAccionCierre, setNewAccionCierre] = useState<AccionCierre>(defaultAccionCierre)
  const [editedAccionCierre, setEditedAccionCierre] = useState<AccionCierre>(defaultAccionCierre)
  const [deleteAccionCierreId, setDeleteAccionCierreId] = useState<number>(defaultAccionCierre.id)

  const [hallazgos, setHallazgos] = useState<Hallazgo[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todos los hallazgos
  const fetchHallazgos = () => {
    hallazgoService.getAll()
      .then((response) => {
        setHallazgos(response.data)  // Llenar la lista de hallazgos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los hallazgos", error)
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

  // Obtener todas las acciones de cierre
  const fetchAccionesCierre = () => {
    accionCierreService.getAll()
      .then((response) => {
        setAccionesCierre(response.data)  // Llenar la lista de acciones de cierre
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las acciones de cierre", error)
      })
  }

  // Obtener todas las acciones de cierre cada vez que se renderiza el componente
  useEffect(() => {
    fetchHallazgos()  // Obtener todos los hallazgos
    fetchUsuarios()  // Obtener todos los usuarios
    fetchAccionesCierre()  // Obtener todas las acciones de cierre
  }, [])

  // Obtener una sola acción de cierre (para editar)
  const fetchAccionCierre = (id: number) => {
    accionCierreService.get(id)
      .then((response) => {
        setEditedAccionCierre(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la acción de cierre", error)
      })
  }

  // Crear una acción de cierre
  const createAccionCierre = (data: AccionCierre) => {
    accionCierreService.create(data)
      .then((response) => {
        setNewAccionCierre(defaultAccionCierre) // Limpiar el formulario
        fetchAccionesCierre()  // Actualizar la lista de acciones de cierre
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la acción de cierre", error)
      })
  }

  // Actualizar una acción de cierre
  const updateAccionCierre = (id: number, data: AccionCierre) => {
    accionCierreService.update(id, data)
      .then((response) => {
        setEditedAccionCierre(defaultAccionCierre) // Limpiar el formulario
        fetchAccionesCierre()  // Actualizar la lista de acciones de cierre
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la acción de cierre", error)
      })
  }

  // Eliminar una acción de cierre
  const deleteAccionCierre = (id: number) => {
    accionCierreService.remove(id)
      .then((response) => {
        setDeleteAccionCierreId(defaultAccionCierre.id) // Limpiar el input de eliminación
        fetchAccionesCierre()  // Actualizar la lista de acciones de cierre
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la acción de cierre", error)
      })
  }

  return (
    <>
      {/* Listado de Acciones de Cierre */}
      <div className="card mx-20 my-10">
        
        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Acciones de Cierre
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
                  <th className='min-w-150px rounded-start ps-5'>Hallazgo</th>
                  <th className='min-w-150px'>Descripción</th>
                  <th className='min-w-150px'>Responsable</th>
                  <th className='min-w-150px'>Fecha de Cierre</th>
                  <th className='min-w-150px'>Documento</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { accionesCierre.map((accionCierre) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <span className="fs-7">{hallazgos.find((hallazgo) => hallazgo.id === accionCierre.hallazgoId)?.descripcion}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7">{accionCierre.descripcion}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === accionCierre.responsableId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === accionCierre.responsableId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === accionCierre.responsableId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-primary fs-7">{accionCierre.fechaCierre}</span>
                    </td>
                    <td>
                      <button className="btn btn-light-primary d-flex align-items-center gap-1 fs-7">
                        <KTIcon iconName="file" className="fs-3" />
                        {accionCierre.documento}
                      </button>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchAccionCierre(accionCierre.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteAccionCierre(accionCierre.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Acción de Cierre */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Acción de Cierre</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Hallazgo </label>
                <select
                  value={newAccionCierre.hallazgoId}
                  onChange={(e) => setNewAccionCierre({ ...newAccionCierre, hallazgoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Hallazgo</option>
                  {hallazgos.map((hallazgo) => (
                    <option value={hallazgo.id}>{hallazgo.descripcion}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={newAccionCierre.descripcion}
                  onChange={(e) => setNewAccionCierre({ ...newAccionCierre, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable </label>
                <select
                  value={newAccionCierre.responsableId}
                  onChange={(e) => setNewAccionCierre({ ...newAccionCierre, responsableId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Responsable</option>
                  {usuarios.map((usuario) => (
                    <option value={usuario.id}>{usuario.usuario}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre </label>
                <input
                  type="date"
                  value={newAccionCierre.fechaCierre}
                  onChange={(e) => setNewAccionCierre({ ...newAccionCierre, fechaCierre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={newAccionCierre.documento}
                  onChange={(e) => setNewAccionCierre({ ...newAccionCierre, documento: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createAccionCierre(newAccionCierre)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Acción de Cierre */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Acción de Cierre</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Hallazgo </label>
                <select
                  value={editedAccionCierre.hallazgoId}
                  onChange={(e) => setEditedAccionCierre({ ...editedAccionCierre, hallazgoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Hallazgo</option>
                  {hallazgos.map((hallazgo) => (
                    <option value={hallazgo.id}>{hallazgo.descripcion}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={editedAccionCierre.descripcion}
                  onChange={(e) => setEditedAccionCierre({ ...editedAccionCierre, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable </label>
                <select
                  value={editedAccionCierre.responsableId}
                  onChange={(e) => setEditedAccionCierre({ ...editedAccionCierre, responsableId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar Responsable</option>
                  {usuarios.map((usuario) => (
                    <option value={usuario.id}>{usuario.usuario}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre </label>
                <input
                  type="date"
                  value={editedAccionCierre.fechaCierre}
                  onChange={(e) => setEditedAccionCierre({ ...editedAccionCierre, fechaCierre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="file"
                  value={editedAccionCierre.documento}
                  onChange={(e) => setEditedAccionCierre({ ...editedAccionCierre, documento: e.target.value })}  // TODO: ERROR - No se puede editar el documento
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateAccionCierre(editedAccionCierre.id, editedAccionCierre)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}