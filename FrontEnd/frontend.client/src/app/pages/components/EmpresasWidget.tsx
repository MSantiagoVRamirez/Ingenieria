import { useState, useEffect } from "react"
import { Empresa } from "../../interfaces/Empresa"
import empresaService from "../../services/empresaService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function EmpresasWidget() {

  const defaultEmpresa: Empresa = {
    id: 0,
    nombre: "",
    nit: ""
  }
  const [empresas, setEmpresas] = useState<Empresa[]>([])
  const [newEmpresa, setNewEmpresa] = useState<Empresa>(defaultEmpresa)
  const [editedEmpresa, setEditedEmpresa] = useState<Empresa>(defaultEmpresa)
  const [deleteEmpresaId, setDeleteEmpresaId] = useState<number>(defaultEmpresa.id)

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todas las empresas
  const fetchEmpresas = () => {
    empresaService.getAll()
      .then((response) => {
        setEmpresas(response.data)  // Llenar la lista de empresas
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las empresas", error)
      })
  }

  // Obtener todas las empresas cada vez que se renderiza el componente
  useEffect(() => {
    fetchEmpresas()
  }, [])

  // Obtener una sola empresa (para editar)
  const fetchEmpresa = (id: number) => {
    empresaService.get(id)
      .then((response) => {
        setEditedEmpresa(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la empresa", error)
      })
  }

  // Crear una empresa
  const createEmpresa = (data: Empresa) => {
    empresaService.create(data)
      .then((response) => {
        setNewEmpresa(defaultEmpresa) // Limpiar el formulario
        fetchEmpresas()  // Actualizar la lista de empresas
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la empresa", error)
      })
  }

  // Actualizar una empresa
  const updateEmpresa = (id: number, data: Empresa) => {
    empresaService.update(id, data)
      .then((response) => {
        setEditedEmpresa(defaultEmpresa) // Limpiar el formulario
        fetchEmpresas()  // Actualizar la lista de empresas
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la empresa", error)
      })
  }

  // Eliminar una empresa
  const deleteEmpresa = (id: number) => {
    empresaService.remove(id)
      .then((response) => {
        setDeleteEmpresaId(defaultEmpresa.id) // Limpiar el input de eliminación
        fetchEmpresas()  // Actualizar la lista de empresas
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la empresa", error)
      })
  }

  return (
    <>
      {/* Listado de Empresas */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Empresas
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
          { empresas.map((empresa) => (
            <div className="d-flex gap-2" key={empresa.id}>
              <span className="bullet bullet-vertical h-40px bg-primary"></span>
              <div className="flex-grow-1 mx-3">
                <span className="text-gray-800 fw-bold fs-6">
                  { empresa.nombre }
                </span>
                <div className="d-block mt-1">
                  <span className="text-gray-600 fs-7">
                    { empresa.nit }
                  </span>
                </div>
              </div>
              <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchEmpresa(empresa.id)}>
                <KTIcon iconName="pencil" className="fs-3" />
              </button>
              <button className="btn btn-icon btn-bg-light btn-active-light-danger" onClick={() => deleteEmpresa(empresa.id)}>
                <KTIcon iconName="trash" className="fs-3" />
              </button>
            </div>
          ))}
        </div>

        {/* Formulario de Creación de Empresa */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Empresa</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre de la empresa"
                  value={newEmpresa.nombre}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> NIT </label>
                <input
                  type="text"
                  placeholder="NIT de la empresa"
                  value={newEmpresa.nit}
                  onChange={(e) => setNewEmpresa({ ...newEmpresa, nit: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createEmpresa(newEmpresa)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Empresa */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Empresa</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  placeholder="Nombre de la empresa"
                  value={editedEmpresa.nombre}
                  onChange={(e) => setEditedEmpresa({ ...editedEmpresa, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> NIT </label>
                <input
                  type="text"
                  placeholder="NIT de la empresa"
                  value={editedEmpresa.nit}
                  onChange={(e) => setEditedEmpresa({ ...editedEmpresa, nit: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateEmpresa(editedEmpresa.id, editedEmpresa)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}