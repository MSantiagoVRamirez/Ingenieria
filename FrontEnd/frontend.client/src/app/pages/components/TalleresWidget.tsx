import { useState, useEffect } from "react"
import { Taller } from "../../interfaces/Taller"
import { ODS } from "../../interfaces/ODS"
import { TipoTaller } from "../../interfaces/TipoTaller"
import { Usuario } from "../../interfaces/Usuario"
import { Proyecto } from "../../interfaces/Proyecto"
import tallerService from "../../services/tallerService"
import odsService from "../../services/odsService"
import tipoTallerService from "../../services/tipoTallerService"
import usuarioService from "../../services/usuarioService"
import proyectoService from "../../services/proyectoService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function TalleresWidget() {

  const defaultTaller: Taller = {
    id: 0,
    odsId: 0,
    tipoId: 0,
    fecha: '',
    consultorId: 0,
    proyectoId: 0,
    liderProyectoId: 0,
    ejerciciosPrevios: '',
    avanceTipo1: '',
    avanceTipo2: '',
    avanceTipo3: ''
  }
  const [talleres, setTalleres] = useState<Taller[]>([])
  const [newTaller, setNewTaller] = useState<Taller>(defaultTaller)
  const [editedTaller, setEditedTaller] = useState<Taller>(defaultTaller)
  const [deleteTallerId, setDeleteTallerId] = useState<number>(defaultTaller.id)
  
  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([])
  const [tiposTaller, setTiposTaller] = useState<TipoTaller[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [proyectos, setProyectos] = useState<Proyecto[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

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
  
  // Obtener todos los talleres cada vez que se renderiza el componente
  useEffect(() => {
    fetchOrdenesServicio()  // Obtener todas las ordenes de servicio
    fetchTiposTaller()  // Obtener todos los tipos de taller
    fetchUsuarios()  // Obtener todos los usuarios
    fetchProyectos()  // Obtener todos los proyectos
    fetchTalleres()  // Obtener todos los talleres
  }, [])

  // Obtener un solo taller (para editar)
  const fetchTaller = (id: number) => {
    tallerService.get(id)
      .then((response) => {
        setEditedTaller(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el taller", error)
      })
  }

  // Crear un taller
  const createTaller = (data: Taller) => {
    tallerService.create(data)
      .then((response) => {
        setNewTaller(defaultTaller) // Limpiar el formulario
        fetchTalleres()  // Actualizar la lista de talleres
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el taller", error)
      })
  }

  // Actualizar un taller
  const updateTaller = (id: number, data: Taller) => {
    tallerService.update(id, data)
      .then((response) => {
        setEditedTaller(defaultTaller) // Limpiar el formulario
        fetchTalleres()  // Actualizar la lista de talleres
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el taller", error)
      })
  }

  // Eliminar un taller
  const deleteTaller = (id: number) => {
    tallerService.remove(id)
      .then((response) => {
        setDeleteTallerId(defaultTaller.id) // Limpiar el input de eliminación
        fetchTalleres()  // Actualizar la lista de talleres
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el taller", error)
      })
  }

  return (
    <>
      {/* Listado de Talleres */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Talleres
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
                  <th className='min-w-150px'>Tipo</th>
                  <th className='min-w-150px'>Fecha</th>
                  <th className='min-w-150px'>Consultor</th>
                  <th className='min-w-200px'>Proyecto</th>
                  <th className='min-w-150px'>Líder de Proyecto</th>
                  <th className='min-w-150px'>Ejercicios Previos</th>
                  <th className='min-w-250px'>Avances</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { talleres.map((taller) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-60px bg-primary"></span>
                      <div className="d-flex flex-column">
                        <span className="d-block fs-7 mb-1">{ordenesServicio.find(ods => ods.id === taller.odsId)?.nombre}</span>
                        <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>{ordenesServicio.find(ods => ods.id === taller.odsId)?.descripcion}</span>
                      </div>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {tiposTaller.find(tipoTaller => tipoTaller.id === taller.tipoId)?.nombre}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {tiposTaller.find(tipoTaller => tipoTaller.id === taller.tipoId)?.descripcion}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-primary fs-7 mb-1">{taller.fecha}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === taller.consultorId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === taller.consultorId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === taller.consultorId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {proyectos.find(proyecto => proyecto.id === taller.proyectoId)?.nombre}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {proyectos.find(proyecto => proyecto.id === taller.proyectoId)?.descripcion}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">
                        {usuarios.find(usuario => usuario.id === taller.liderProyectoId)?.usuario}
                      </span>
                      <span className="d-block text-muted fs-7" style={{ width: 'fit-content' }}>
                        {usuarios.find(usuario => usuario.id === taller.liderProyectoId)?.nombres
                        + ' ' + usuarios.find(usuario => usuario.id === taller.liderProyectoId)?.apellidos}
                      </span>
                    </td>
                    <td>
                      <span className="d-block fs-7">{taller.ejerciciosPrevios}</span>
                    </td>
                    <td>
                      <span className="d-block fs-7">
                        <span className="text-primary fs-7">Tipo 1 - </span>
                        {taller.avanceTipo1}
                      </span>
                      <span className="d-block fs-7">
                        <span className="text-primary fs-7">Tipo 2 - </span>
                        {taller.avanceTipo2}
                      </span>
                      <span className="d-block fs-7">
                        <span className="text-primary fs-7">Tipo 3 - </span>
                        {taller.avanceTipo3}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchTaller(taller.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteTaller(taller.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Taller */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Taller</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> ODS </label>
                <select
                  value={newTaller.odsId}
                  onChange={(e) => setNewTaller({ ...newTaller, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una ODS</option>
                  {ordenesServicio.map((ods) => (
                    <option key={ods.id} value={ods.id}>
                      {ods.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Tipo </label>
                <select
                  value={newTaller.tipoId}
                  onChange={(e) => setNewTaller({ ...newTaller, tipoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un tipo</option>
                  {tiposTaller.map((tipoTaller) => (
                    <option key={tipoTaller.id} value={tipoTaller.id}>
                      {tipoTaller.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha </label>
                <input
                  type="date"
                  value={newTaller.fecha}
                  onChange={(e) => setNewTaller({ ...newTaller, fecha: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Consultor </label>
                <select
                  value={newTaller.consultorId}
                  onChange={(e) => setNewTaller({ ...newTaller, consultorId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un consultor</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Proyecto </label>
                <select
                  value={newTaller.proyectoId}
                  onChange={(e) => setNewTaller({ ...newTaller, proyectoId: parseInt(e.target.value) })}
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
                <label className="form-label required"> Líder de Proyecto </label>
                <select
                  value={newTaller.liderProyectoId}
                  onChange={(e) => setNewTaller({ ...newTaller, liderProyectoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un líder de proyecto</option>
                  {usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.usuario}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Ejercicios Previos </label>
                <input
                  type="text"
                  value={newTaller.ejerciciosPrevios}
                  onChange={(e) => setNewTaller({ ...newTaller, ejerciciosPrevios: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 1 </label>
                <input
                  type="text"
                  value={newTaller.avanceTipo1}
                  onChange={(e) => setNewTaller({ ...newTaller, avanceTipo1: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 2 </label>
                <input
                  type="text"
                  value={newTaller.avanceTipo2}
                  onChange={(e) => setNewTaller({ ...newTaller, avanceTipo2: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 3 </label>
                <input
                  type="text"
                  value={newTaller.avanceTipo3}
                  onChange={(e) => setNewTaller({ ...newTaller, avanceTipo3: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createTaller(newTaller)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Taller */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Taller</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> ODS </label>
                <select
                  value={editedTaller.odsId}
                  onChange={(e) => setEditedTaller({ ...editedTaller, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una ODS</option>
                  {ordenesServicio.map((ods) => (
                    <option key={ods.id} value={ods.id}>
                      {ods.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Tipo </label>
                <select
                  value={editedTaller.tipoId}
                  onChange={(e) => setEditedTaller({ ...editedTaller, tipoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un tipo</option>
                  {tiposTaller.map((tipoTaller) => (
                    <option key={tipoTaller.id} value={tipoTaller.id}>
                      {tipoTaller.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha </label>
                <input
                  type="date"
                  value={editedTaller.fecha}
                  onChange={(e) => setEditedTaller({ ...editedTaller, fecha: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Consultor </label>
                <select
                  value={editedTaller.consultorId}
                  onChange={(e) => setEditedTaller({ ...editedTaller, consultorId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un consultor</option>
                  {
                    usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.usuario}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Proyecto </label>
                <select
                  value={editedTaller.proyectoId}
                  onChange={(e) => setEditedTaller({ ...editedTaller, proyectoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un proyecto</option>
                  {
                    proyectos.map((proyecto) => (
                      <option key={proyecto.id} value={proyecto.id}>
                        {proyecto.nombre}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Líder de Proyecto </label>
                <select
                  value={editedTaller.liderProyectoId}
                  onChange={(e) => setEditedTaller({ ...editedTaller, liderProyectoId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione un líder de proyecto</option>
                  {
                    usuarios.map((usuario) => (
                      <option key={usuario.id} value={usuario.id}>
                        {usuario.usuario}
                      </option>
                    ))
                  }
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Ejercicios Previos </label>
                <input
                  type="text"
                  value={editedTaller.ejerciciosPrevios}
                  onChange={(e) => setEditedTaller({ ...editedTaller, ejerciciosPrevios: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 1 </label>
                <input
                  type="text"
                  value={editedTaller.avanceTipo1}
                  onChange={(e) => setEditedTaller({ ...editedTaller, avanceTipo1: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 2 </label>
                <input
                  type="text"
                  value={editedTaller.avanceTipo2}
                  onChange={(e) => setEditedTaller({ ...editedTaller, avanceTipo2: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Avance Tipo 3 </label>
                <input
                  type="text"
                  value={editedTaller.avanceTipo3}
                  onChange={(e) => setEditedTaller({ ...editedTaller, avanceTipo3: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateTaller(editedTaller.id, editedTaller)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}