import { useState, useEffect } from "react"
import { Proyecto } from "../../interfaces/Proyecto"
import { Usuario } from "../../interfaces/Usuario"
import proyectoService from "../../services/proyectoService"
import usuarioService from "../../services/usuarioService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function ProyectosWidget() {

  const defaultProyecto: Proyecto = {
    id: 0,
    nombre: "",
    liderId: 0,
    descripcion: ""
  }
  const [proyectos, setProyectos] = useState<Proyecto[]>([])
  const [newProyecto, setNewProyecto] = useState<Proyecto>(defaultProyecto)
  const [editedProyecto, setEditedProyecto] = useState<Proyecto>(defaultProyecto)
  const [deleteProyectoId, setDeleteProyectoId] = useState<number>(defaultProyecto.id)

  const [usuarios, setUsuarios] = useState<Usuario[]>([])

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

  // Obtener todos los proyectos cada vez que se renderiza el componente
  useEffect(() => {
    fetchUsuarios()  // Obtener todos los usuarios
    fetchProyectos()  // Obtener todos los proyectos
  }, [])

  // Obtener un solo proyecto (para editar)
  const fetchProyecto = (id: number) => {
    proyectoService.get(id)
      .then((response) => {
        setEditedProyecto(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el proyecto", error)
      })
  }

  // Crear un proyecto
  const createProyecto = (data: Proyecto) => {
    proyectoService.create(data)
      .then((response) => {
        setNewProyecto(defaultProyecto) // Limpiar el formulario
        fetchProyectos()  // Actualizar la lista de proyectos
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el proyecto", error)
      })
  }

  // Actualizar un proyecto
  const updateProyecto = (id: number, data: Proyecto) => {
    proyectoService.update(id, data)
      .then((response) => {
        setEditedProyecto(defaultProyecto) // Limpiar el formulario
        fetchProyectos()  // Actualizar la lista de proyectos
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el proyecto", error
        )
      })
  }

  // Eliminar un proyecto
  const deleteProyecto = (id: number) => {
    proyectoService.remove(id)
      .then((response) => {
        setDeleteProyectoId(defaultProyecto.id) // Limpiar el input de eliminación
        fetchProyectos()  // Actualizar la lista de proyectos
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el proyecto", error)
      })
  }

  return (
    <>
      {/* Listado de Proyectos */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Proyectos
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
          { proyectos.map((proyecto) => (
            <div className="d-flex gap-2" key={proyecto.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="d-flex flex-column gap-1 mx-3">
                <span className="text-muted fs-8 fw-bold">
                  Líder
                </span>
                <span className="badge badge-light-primary fs-7 fw-bold">
                  { usuarios.find(usuario => usuario.id === proyecto.liderId)?.usuario }
                </span>
              </div>
              <div className="flex-grow-1">
                <span className="text-gray-800 fw-bold d-block fs-6">
                  { proyecto.nombre }
                </span>
                <span className="text-gray-600 fs-7">
                  { proyecto.descripcion }
                </span>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchProyecto(proyecto.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteProyecto(proyecto.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Proyecto */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Proyecto</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  value={newProyecto.nombre}
                  onChange={(e) => setNewProyecto({ ...newProyecto, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Líder </label>
                <select
                  value={newProyecto.liderId}
                  onChange={(e) => setNewProyecto({ ...newProyecto, liderId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar un líder</option>
                  { usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>{ usuario.usuario }</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  placeholder="Descripción del proyecto"
                  value={newProyecto.descripcion}
                  onChange={(e) => setNewProyecto({ ...newProyecto, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createProyecto(newProyecto)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Proyecto */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Proyecto</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre del proyecto"
                  value={editedProyecto.nombre}
                  onChange={(e) => setEditedProyecto({ ...editedProyecto, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Líder </label>
                <select
                  value={editedProyecto.liderId}
                  onChange={(e) => setEditedProyecto({ ...editedProyecto, liderId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccionar un líder</option>
                  { usuarios.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>{ usuario.usuario }</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Descripción </label>
                <input
                  type="text"
                  placeholder="Descripción del proyecto"
                  value={editedProyecto.descripcion}
                  onChange={(e) => setEditedProyecto({ ...editedProyecto, descripcion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateProyecto(editedProyecto.id, editedProyecto)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}