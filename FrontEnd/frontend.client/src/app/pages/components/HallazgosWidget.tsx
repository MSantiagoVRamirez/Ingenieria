import { useState, useEffect } from "react"
import { Hallazgo } from "../../interfaces/Hallazgo"
import { Taller } from "../../interfaces/Taller"
import { Usuario } from "../../interfaces/Usuario"
import hallazgoService from "../../services/hallazgoService"
import tallerService from "../../services/tallerService"
import usuarioService from "../../services/usuarioService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function HallazgosWidget() {
  
  const defaultHallazgo: Hallazgo = {
    id: 0,
    recomendaciones: '',
    tallerId: 0,
    disciplinaTaller: '',
    tipoCategoria: '',
    responsableAccionId: 0,
    descripcion: '',
    fechaCierrePlaneada: '',
    fechaCierreReal: '',
    documento: '',
    responsableVerificacionId: 0,
    diasRetraso: 0,
    estado: false
  }
  const [hallazgos, setHallazgos] = useState<Hallazgo[]>([])
  const [newHallazgo, setNewHallazgo] = useState<Hallazgo>(defaultHallazgo)
  const [editedHallazgo, setEditedHallazgo] = useState<Hallazgo>(defaultHallazgo)
  const [deleteHallazgoId, setDeleteHallazgoId] = useState<number>(defaultHallazgo.id)
  
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todos los talleres
  const fetchTalleres = () => {
    tallerService.getAll()
      .then((response) => {
        setTalleres(response.data)  // Llenar la lista de talleres
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los talleres", error)
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
  
  // Obtener todos los hallazgos cada vez que se renderiza el componente
  useEffect(() => {
    fetchTalleres()  // Obtener todos los talleres
    fetchUsuarios()  // Obtener todos los usuarios
    fetchHallazgos()  // Obtener todos los hallazgos
  }, [])

  // Obtener un solo hallazgo (para editar)
  const fetchHallazgo = (id: number) => {
    hallazgoService.get(id)
      .then((response) => {
        setEditedHallazgo(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el hallazgo", error)
      })
  }

  // Crear un hallazgo
  const createHallazgo = (data: Hallazgo) => {
    hallazgoService.create(data)
      .then((response) => {
        setNewHallazgo(defaultHallazgo) // Limpiar el formulario
        fetchHallazgos()  // Actualizar la lista de hallazgos
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el hallazgo", error)
      })
  }

  // Actualizar un hallazgo
  const updateHallazgo = (id: number, data: Hallazgo) => {
    hallazgoService.update(id, data)
      .then((response) => {
        setEditedHallazgo(defaultHallazgo) // Limpiar el formulario
        fetchHallazgos()  // Actualizar la lista de hallazgos
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el hallazgo", error)
      })
  }

  // Eliminar un hallazgo
  const deleteHallazgo = (id: number) => {
    hallazgoService.remove(id)
      .then((response) => {
        setDeleteHallazgoId(defaultHallazgo.id) // Limpiar el input de eliminación
        fetchHallazgos()  // Actualizar la lista de hallazgos
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el hallazgo", error
        )
      })
  }

  return (
    <>
      {/* Listado de Hallazgos */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Hallazgos
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
                  <th className='min-w-150px rounded-start ps-5'>Taller</th>
                  <th className='min-w-100px'>Estado</th>
                  <th className='min-w-100px'>Días de Retraso</th>
                  <th className='min-w-150px'>Recomendaciones</th>
                  <th className='min-w-150px'>Descripción</th>
                  <th className='min-w-150px'>Responsable de Acción</th>
                  <th className='min-w-150px'>Responsable de Verificación</th>
                  <th className='min-w-150px'>Fechas de Cierre Planeada - Real</th>
                  <th className='min-w-150px'>Documento</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { hallazgos.map((hallazgo) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-60px bg-primary"></span>
                      <div className="d-flex flex-column">
                        <span className="badge badge-light-primary fs-7" style={{ width: 'fit-content' }}>
                          {talleres.find(taller => taller.id === hallazgo.tallerId)?.proyectoId}
                        </span>
                        <span className="d-block fs-7">{hallazgo.disciplinaTaller}</span>
                        <span className="d-block text-muted fs-7">{hallazgo.tipoCategoria}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-light-${hallazgo.estado ? 'success' : 'danger'} fs-7`}>
                        {hallazgo.estado ? 'Abierto' : 'Cerrado'}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-danger fw-bold fs-7">{hallazgo.diasRetraso} días</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{hallazgo.recomendaciones}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{hallazgo.descripcion}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === hallazgo.responsableAccionId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === hallazgo.responsableAccionId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === hallazgo.responsableAccionId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === hallazgo.responsableVerificacionId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === hallazgo.responsableVerificacionId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === hallazgo.responsableVerificacionId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-danger fs-7">{hallazgo.fechaCierrePlaneada}</span>
                      <span className="d-block text-muted fs-7">{hallazgo.fechaCierreReal}</span>
                    </td>
                    <td>
                      <button className="btn btn-light-primary d-flex align-items-center gap-1 fs-7">
                        <KTIcon iconName="file" className="fs-3" />
                        {hallazgo.documento}
                      </button>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchHallazgo(hallazgo.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteHallazgo(hallazgo.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Hallazgo */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Hallazgo</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Recomendaciones </label>
                <input
                  type="text"
                  value={newHallazgo.recomendaciones}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, recomendaciones: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Taller </label>
                <select
                  value={newHallazgo.tallerId}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, tallerId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un taller</option>
                  {talleres.map((taller) => (
                    <option key={taller.id} value={taller.id}>
                      {taller.fecha}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Disciplina </label>
                <input
                  type="text"
                  value={newHallazgo.disciplinaTaller}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, disciplinaTaller: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Tipo de Categoría </label>
                <input
                  type="text"
                  value={newHallazgo.tipoCategoria}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, tipoCategoria: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable de Acción </label>
                <select
                  value={newHallazgo.responsableAccionId}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, responsableAccionId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un responsable de acción</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={newHallazgo.descripcion}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre Planeada </label>
                <input
                  type="date"
                  value={newHallazgo.fechaCierrePlaneada}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, fechaCierrePlaneada: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre Real </label>
                <input
                  type="date"
                  value={newHallazgo.fechaCierreReal}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, fechaCierreReal: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="text"
                  value={newHallazgo.documento}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, documento: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable de Verificación </label>
                <select
                  value={newHallazgo.responsableVerificacionId}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, responsableVerificacionId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un responsable de verificación</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Días de Retraso </label>
                <input
                  type="number"
                  value={newHallazgo.diasRetraso}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, diasRetraso: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Estado </label>
                <input
                  type="checkbox"
                  checked={newHallazgo.estado}
                  onChange={(e) => setNewHallazgo({ ...newHallazgo, estado: e.target.checked })}
                  className="form-check-input"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createHallazgo(newHallazgo)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Hallazgo */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Hallazgo</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Recomendaciones </label>
                <input
                  type="text"
                  value={editedHallazgo.recomendaciones}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, recomendaciones: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Taller </label>
                <select
                  value={editedHallazgo.tallerId}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, tallerId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un taller</option>
                  {talleres.map((taller) => (
                    <option key={taller.id} value={taller.id}>
                      {taller.fecha}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Disciplina </label>
                <input
                  type="text"
                  value={editedHallazgo.disciplinaTaller}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, disciplinaTaller: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Tipo de Categoría </label>
                <input
                  type="text"
                  value={editedHallazgo.tipoCategoria}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, tipoCategoria: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable de Acción </label>
                <select
                  value={editedHallazgo.responsableAccionId}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, responsableAccionId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un responsable de acción</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={editedHallazgo.descripcion}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre Planeada </label>
                <input
                  type="date"
                  value={editedHallazgo.fechaCierrePlaneada}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, fechaCierrePlaneada: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Cierre Real </label>
                <input
                  type="date"
                  value={editedHallazgo.fechaCierreReal}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, fechaCierreReal: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Documento </label>
                <input
                  type="text"
                  value={editedHallazgo.documento}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, documento: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Responsable de Verificación </label>
                <select
                  value={editedHallazgo.responsableVerificacionId}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, responsableVerificacionId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un responsable de verificación</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Días de Retraso </label>
                <input
                  type="number"
                  value={editedHallazgo.diasRetraso}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, diasRetraso: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Estado </label>
                <input
                  type="checkbox"
                  checked={editedHallazgo.estado}
                  onChange={(e) => setEditedHallazgo({ ...editedHallazgo, estado: e.target.checked })}
                  className="form-check-input"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateHallazgo(editedHallazgo.id, editedHallazgo)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}