import { useState, useEffect } from "react"
import { ODS } from "../../interfaces/ODS"
import { Usuario } from "../../interfaces/Usuario"
import { Proyecto } from "../../interfaces/Proyecto"
import { Troncal } from "../../interfaces/Troncal"
import { Contrato } from "../../interfaces/Contrato"
import { AmpliacionContrato } from "../../interfaces/AmpliacionContrato"
import odsService from "../../services/odsService"
import usuarioService from "../../services/usuarioService"
import proyectoService from "../../services/proyectoService"
import troncalService from "../../services/troncalService"
import contratoService from "../../services/contratoService"
import ampliacionContratoService from "../../services/ampliacionContratoService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function OrdenesServicioWidget() {
  
  const defaultODS: ODS = {
    id: 0,
    nombre: '',
    descripcion: '',
    valorInicial: 0,
    duracion: 0,
    fechaInicio: '',
    fechaFin: '',
    fechaInicioSuspension: '',
    fechaFinSuspension: '',
    valorActual: 0,
    estado: false,
    supervisorId: 0,
    solicitanteId: 0,
    recurso: '',
    plantaSistema: '',
    conexoObra: '',
    proyectoId: 0,
    troncalId: 0,
    contratoId: 0,
    ampliacionContratoId: 0
  }
  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([])
  const [newODS, setNewODS] = useState<ODS>(defaultODS)
  const [editedODS, setEditedODS] = useState<ODS>(defaultODS)
  const [deleteODSId, setDeleteODSId] = useState<number>(defaultODS.id)
  
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [troncales, setTroncales] = useState<Troncal[]>([])
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [ampliacionesContrato, setAmpliacionesContrato] = useState<AmpliacionContrato[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

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

  // Obtener todos los proyectos
  const fetchProyectos = () => {
    proyectoService.getAll()
      .then((response) => {
        setProyectos(response.data)  // Llenar la lista de proyectos
      })
      .catch((error) => {
        console.error("Hubo un error al obtener los proyectos", error)
      })
  }

  // Obtener todas las troncales
  const fetchTroncales = () => {
    troncalService.getAll()
      .then((response) => {
        setTroncales(response.data)  // Llenar la lista de troncales
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las troncales", error)
      })
  }

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

  // Obtener todas las ordenes de servicio
  const fetchOrdenesServicio = () => {
    odsService.getAll()
      .then((response) => {
        setOrdenesServicio(response.data)  // Llenar la lista de ordenes de servicio
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las ordenes de servicio", error)
      })
  }
  
  // Obtener todas las ordenes de servicio cada vez que se renderiza el componente
  useEffect(() => {
    fetchUsuarios()  // Obtener todos los usuarios
    fetchProyectos()  // Obtener todos los proyectos
    fetchTroncales()  // Obtener todas las troncales
    fetchContratos()  // Obtener todos los contratos
    fetchAmpliacionesContrato()  // Obtener todas las ampliaciones de contrato
    fetchOrdenesServicio()  // Obtener todas las ordenes de servicio
  }, [])

  // Obtener una sola orden de servicio (para editar)
  const fetchODS = (id: number) => {
    odsService.get(id)
      .then((response) => {
        setEditedODS(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la orden de servicio", error)
      })
  }

  // Crear una orden de servicio
  const createODS = (data: ODS) => {
    odsService.create(data)
      .then((response) => {
        setNewODS(defaultODS) // Limpiar el formulario
        fetchOrdenesServicio()  // Actualizar la lista de ordenes de servicio
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la orden de servicio", error)
      })
  }

  // Actualizar una orden de servicio
  const updateODS = (id: number, data: ODS) => {
    odsService.update(id, data)
      .then((response) => {
        setEditedODS(defaultODS) // Limpiar el formulario
        fetchOrdenesServicio()  // Actualizar la lista de ordenes de servicio
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la orden de servicio", error
        )
      })
  }

  // Eliminar una orden de servicio
  const deleteODS = (id: number) => {
    odsService.remove(id)
      .then((response) => {
        setDeleteODSId(defaultODS.id) // Limpiar el input de eliminación
        fetchOrdenesServicio()  // Actualizar la lista de ordenes de servicio
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la orden de servicio", error)
      })
  }

  return (
    <>
      {/* Listado de Ordenes de Servicio */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Ordenes de Servicio
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
                  <th className='min-w-250px rounded-start ps-5'>ODS</th>
                  <th className='min-w-100px'>Estado</th>
                  <th className='min-w-150px'>Supervisor</th>
                  <th className='min-w-150px'>Solicitante</th>
                  <th className='min-w-150px'>Contrato - Ampliación</th>
                  <th className='min-w-150px'>Proyecto - Troncal</th>
                  <th className='min-w-150px'>Valor Inicial - Actual</th>
                  <th className='min-w-150px'>Duración</th>
                  <th className='min-w-150px'>Fechas de Suspensión</th>
                  <th className='min-w-200px'>Adicionales</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { ordenesServicio.map((ods) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-60px bg-primary"></span>
                      <div className="d-flex flex-column">
                        <span className="fw-bold fs-6">{ods.nombre}</span>
                        <span className="text-muted fs-7">{ods.descripcion}</span>
                      </div>
                    </td>
                    <td>
                      <span className={`badge badge-light-${ods.estado ? 'success' : 'danger'} fs-7`}>
                        {ods.estado ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === ods.supervisorId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === ods.supervisorId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === ods.supervisorId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === ods.solicitanteId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === ods.solicitanteId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === ods.solicitanteId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {contratos.find(contrato => contrato.id === ods.contratoId)?.nombre}
                      </span>
                      <span className="badge badge-light-primary fs-7" style={{ width: 'fit-content' }}>
                        {ampliacionesContrato.find(ampliacionContrato => ampliacionContrato.id === ods.ampliacionContratoId)?.id}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {proyectos.find(proyecto => proyecto.id === ods.proyectoId)?.nombre}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {troncales.find(troncal => troncal.id === ods.troncalId)?.nombre}
                      </span>
                    </td>
                    <td>
                      <span className="text-primary d-block fw-bold fs-6">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(ods.valorInicial)}
                      </span>
                      <span className="text-muted d-block fs-7">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(ods.valorActual)}
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-primary fw-bold fs-6">{ods.duracion} años</span>
                      <span className="d-block fs-7">{ods.fechaInicio}</span>
                      <span className="d-block text-muted fs-7">{ods.fechaFin}</span>
                    </td>
                    <td>
                      <span className="d-block text-danger fs-7">{ods.fechaInicioSuspension}</span>
                      <span className="d-block text-muted fs-7">{ods.fechaFinSuspension}</span>
                    </td>
                    <td>
                      <span className="d-block text-muted fs-7">{ods.recurso}</span>
                      <span className="d-block text-muted fs-7">{ods.plantaSistema}</span>
                      <span className="d-block text-muted fs-7">{ods.conexoObra}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchODS(ods.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteODS(ods.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Orden de Servicio */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Orden de Servicio</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={newODS.nombre}
                  onChange={(e) => setNewODS({ ...newODS, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={newODS.descripcion}
                  onChange={(e) => setNewODS({ ...newODS, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor Inicial </label>
                <input
                  type="number"
                  value={newODS.valorInicial}
                  onChange={(e) => setNewODS({ ...newODS, valorInicial: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={newODS.duracion}
                  onChange={(e) => setNewODS({ ...newODS, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={newODS.fechaInicio}
                  onChange={(e) => setNewODS({ ...newODS, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={newODS.fechaFin}
                  onChange={(e) => setNewODS({ ...newODS, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label"> Fecha de Inicio de Suspensión </label>
                <input
                  type="date"
                  value={newODS.fechaInicioSuspension}
                  onChange={(e) => setNewODS({ ...newODS, fechaInicioSuspension: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label"> Fecha de Fin de Suspensión </label>
                <input
                  type="date"
                  value={newODS.fechaFinSuspension}
                  onChange={(e) => setNewODS({ ...newODS, fechaFinSuspension: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor Actual </label>
                <input
                  type="number"
                  value={newODS.valorActual}
                  onChange={(e) => setNewODS({ ...newODS, valorActual: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Estado </label>
                <select
                  value={newODS.estado ? 1 : 0}
                  onChange={(e) => setNewODS({ ...newODS, estado: e.target.value === '1' })}
                  className="form-select"
                >
                  <option value="0">Inactivo</option>
                  <option value="1">Activo</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Supervisor </label>
                <select
                  value={newODS.supervisorId}
                  onChange={(e) => setNewODS({ ...newODS, supervisorId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un supervisor</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Solicitante </label>
                <select
                  value={newODS.solicitanteId}
                  onChange={(e) => setNewODS({ ...newODS, solicitanteId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un solicitante</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Recurso </label>
                <input
                  type="text"
                  value={newODS.recurso}
                  onChange={(e) => setNewODS({ ...newODS, recurso: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Planta/Sistema </label>
                <input
                  type="text"
                  value={newODS.plantaSistema}
                  onChange={(e) => setNewODS({ ...newODS, plantaSistema: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Conexo/Obra </label>
                <input
                  type="text"
                  value={newODS.conexoObra}
                  onChange={(e) => setNewODS({ ...newODS, conexoObra: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Proyecto </label>
                <select
                  value={newODS.proyectoId}
                  onChange={(e) => setNewODS({ ...newODS, proyectoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un proyecto</option>
                  {proyectos.map((proyecto) => (
                    <option key={proyecto.id} value={proyecto.id}>
                      {proyecto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Troncal </label>
                <select
                  value={newODS.troncalId}
                  onChange={(e) => setNewODS({ ...newODS, troncalId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una troncal</option>
                  {troncales.map((troncal) => (
                    <option key={troncal.id} value={troncal.id}>
                      {troncal.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={newODS.contratoId}
                  onChange={(e) => setNewODS({ ...newODS, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un contrato</option>
                  {contratos.map((contrato) => (
                    <option key={contrato.id} value={contrato.id}>
                      {contrato.numero}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Ampliación de Contrato </label>
                <select
                  value={newODS.ampliacionContratoId}
                  onChange={(e) => setNewODS({ ...newODS, ampliacionContratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una ampliación de contrato</option>
                  {ampliacionesContrato.map((ampliacionContrato) => (
                    <option key={ampliacionContrato.id} value={ampliacionContrato.id}>
                      {contratos.find(contrato => contrato.id === ampliacionContrato.contratoId)?.numero}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createODS(newODS)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Orden de Servicio */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Orden de Servicio</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={editedODS.nombre}
                  onChange={(e) => setEditedODS({ ...editedODS, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  value={editedODS.descripcion}
                  onChange={(e) => setEditedODS({ ...editedODS, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor Inicial </label>
                <input
                  type="number"
                  value={editedODS.valorInicial}
                  onChange={(e) => setEditedODS({ ...editedODS, valorInicial: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={editedODS.duracion}
                  onChange={(e) => setEditedODS({ ...editedODS, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={editedODS.fechaInicio}
                  onChange={(e) => setEditedODS({ ...editedODS, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={editedODS.fechaFin}
                  onChange={(e) => setEditedODS({ ...editedODS, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label"> Fecha de Inicio de Suspensión </label>
                <input
                  type="date"
                  value={editedODS.fechaInicioSuspension}
                  onChange={(e) => setEditedODS({ ...editedODS, fechaInicioSuspension: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label"> Fecha de Fin de Suspensión </label>
                <input
                  type="date"
                  value={editedODS.fechaFinSuspension}
                  onChange={(e) => setEditedODS({ ...editedODS, fechaFinSuspension: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor Actual </label>
                <input
                  type="number"
                  value={editedODS.valorActual}
                  onChange={(e) => setEditedODS({ ...editedODS, valorActual: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Estado </label>
                <select
                  value={editedODS.estado ? 1 : 0}
                  onChange={(e) => setEditedODS({ ...editedODS, estado: e.target.value === '1' })}
                  className="form-select"
                >
                  <option value="0">Inactivo</option>
                  <option value="1">Activo</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Supervisor </label>
                <select
                  value={editedODS.supervisorId}
                  onChange={(e) => setEditedODS({ ...editedODS, supervisorId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un supervisor</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Solicitante </label>
                <select
                  value={editedODS.solicitanteId}
                  onChange={(e) => setEditedODS({ ...editedODS, solicitanteId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un solicitante</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Recurso </label>
                <input
                  type="text"
                  value={editedODS.recurso}
                  onChange={(e) => setEditedODS({ ...editedODS, recurso: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Planta/Sistema </label>
                <input
                  type="text"
                  value={editedODS.plantaSistema}
                  onChange={(e) => setEditedODS({ ...editedODS, plantaSistema: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Conexo/Obra </label>
                <input
                  type="text"
                  value={editedODS.conexoObra}
                  onChange={(e) => setEditedODS({ ...editedODS, conexoObra: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Proyecto </label>
                <select
                  value={editedODS.proyectoId}
                  onChange={(e) => setEditedODS({ ...editedODS, proyectoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un proyecto</option>
                  {proyectos.map((proyecto) => (
                    <option key={proyecto.id} value={proyecto.id}>
                      {proyecto.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Troncal </label>
                <select
                  value={editedODS.troncalId}
                  onChange={(e) => setEditedODS({ ...editedODS, troncalId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una troncal</option>
                  {troncales.map((troncal) => (
                    <option key={troncal.id} value={troncal.id}>
                      {troncal.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Contrato </label>
                <select
                  value={editedODS.contratoId}
                  onChange={(e) => setEditedODS({ ...editedODS, contratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un contrato</option>
                  {contratos.map((contrato) => (
                    <option key={contrato.id} value={contrato.id}>
                      {contrato.numero}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Ampliación de Contrato </label>
                <select
                  value={editedODS.ampliacionContratoId}
                  onChange={(e) => setEditedODS({ ...editedODS, ampliacionContratoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una ampliación de contrato</option>
                  {ampliacionesContrato.map((ampliacionContrato) => (
                    <option key={ampliacionContrato.id} value={ampliacionContrato.id}>
                      {contratos.find(contrato => contrato.id === ampliacionContrato.contratoId)?.numero}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateODS(editedODS.id, editedODS)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}