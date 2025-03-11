import { useState, useEffect } from "react"
import { Contrato } from "../../interfaces/Contrato"
import { Empresa } from "../../interfaces/Empresa"
import contratoService from "../../services/contratoService"
import empresaService from "../../services/empresaService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function ContratosWidget() {
  
  const defaultContrato: Contrato = {
    id: 0,
    numero: '',
    objeto: '',
    nombre: '',
    empresaId: 0,
    nombreContratista: '',
    numeroDocumentoContratista: '',
    correoContratista: '',
    telefonoContratista: '',
    valor: 0,
    duracion: 0,
    fechaInicio: '',
    fechaFin: ''
  }
  const [contratos, setContratos] = useState<Contrato[]>([])
  const [newContrato, setNewContrato] = useState<Contrato>(defaultContrato)
  const [editedContrato, setEditedContrato] = useState<Contrato>(defaultContrato)
  const [deleteContratoId, setDeleteContratoId] = useState<number>(defaultContrato.id)
  
  const [empresas, setEmpresas] = useState<Empresa[]>([])

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
  
  // Obtener todos los contratos cada vez que se renderiza el componente
  useEffect(() => {
    fetchEmpresas()  // Obtener todas las empresas
    fetchContratos()  // Obtener todos los contratos
  }, [])

  // Obtener un solo contrato (para editar)
  const fetchContrato = (id: number) => {
    contratoService.get(id)
      .then((response) => {
        setEditedContrato(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener el contrato", error)
      })
  }

  // Crear un contrato
  const createContrato = (data: Contrato) => {
    contratoService.create(data)
      .then((response) => {
        setNewContrato(defaultContrato) // Limpiar el formulario
        fetchContratos()  // Actualizar la lista de contratos
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear el contrato", error)
      })
  }

  // Actualizar un contrato
  const updateContrato = (id: number, data: Contrato) => {
    contratoService.update(id, data)
      .then((response) => {
        setEditedContrato(defaultContrato) // Limpiar el formulario
        fetchContratos()  // Actualizar la lista de contratos
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar el contrato", error
        )
      })
  }

  // Eliminar un contrato
  const deleteContrato = (id: number) => {
    contratoService.remove(id)
      .then((response) => {
        setDeleteContratoId(defaultContrato.id) // Limpiar el input de eliminación
        fetchContratos()  // Actualizar la lista de contratos
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar el contrato", error)
      })
  }

  return (
    <>
      {/* Listado de Contratos */}
      <div className="card mx-20 my-10">

        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Contratos
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
                  <th className='min-w-150px rounded-start ps-5'>Contrato - Empresa</th>
                  <th className='min-w-150px'>Contratista</th>
                  <th className='min-w-150px'>Valor</th>
                  <th className='min-w-150px'>Duración</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { contratos.map((contrato) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-80px bg-primary"></span>
                      <div className="d-flex flex-column gap-1">
                        <span className="fw-bold fs-6">{contrato.numero}</span>
                        <span className="badge badge-light-primary fs-8" style={{ width: 'fit-content' }}>
                          {empresas.find(empresa => empresa.id === contrato.empresaId)?.nombre}
                        </span>
                        <span className="fs-7">{contrato.nombre}</span>
                        <span className="text-muted fs-7">{contrato.objeto}</span>
                      </div>
                    </td>
                    <td>
                      <span className="d-block fs-7 mb-1">{contrato.nombreContratista}</span>
                      <span className="text-muted d-block fs-7">CC {contrato.numeroDocumentoContratista}</span>
                      <span className="text-muted d-block fs-7">{contrato.correoContratista}</span>
                      <span className="text-muted d-block fs-7">{contrato.telefonoContratista}</span>
                    </td>
                    <td>
                      <span className="text-primary d-block fw-bold fs-6">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(contrato.valor)}
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-primary fw-bold fs-6">{contrato.duracion} años</span>
                      <span className="d-block fs-7">{contrato.fechaInicio}</span>
                      <span className="d-block text-muted fs-7">{contrato.fechaFin}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchContrato(contrato.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteContrato(contrato.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Contrato */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Número </label>
                <input
                  type="text"
                  value={newContrato.numero}
                  onChange={(e) => setNewContrato({ ...newContrato, numero: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Objeto </label>
                <input
                  type="text"
                  value={newContrato.objeto}
                  onChange={(e) => setNewContrato({ ...newContrato, objeto: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={newContrato.nombre}
                  onChange={(e) => setNewContrato({ ...newContrato, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Empresa </label>
                <select
                  value={newContrato.empresaId}
                  onChange={(e) => setNewContrato({ ...newContrato, empresaId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre del Contratista </label>
                <input
                  type="text"
                  value={newContrato.nombreContratista}
                  onChange={(e) => setNewContrato({ ...newContrato, nombreContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Número de Documento del Contratista </label>
                <input
                  type="text"
                  value={newContrato.numeroDocumentoContratista}
                  onChange={(e) => setNewContrato({ ...newContrato, numeroDocumentoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Correo del Contratista </label>
                <input
                  type="email"
                  value={newContrato.correoContratista}
                  onChange={(e) => setNewContrato({ ...newContrato, correoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Teléfono del Contratista </label>
                <input
                  type="text"
                  value={newContrato.telefonoContratista}
                  onChange={(e) => setNewContrato({ ...newContrato, telefonoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={newContrato.valor}
                  onChange={(e) => setNewContrato({ ...newContrato, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={newContrato.duracion}
                  onChange={(e) => setNewContrato({ ...newContrato, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={newContrato.fechaInicio}
                  onChange={(e) => setNewContrato({ ...newContrato, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={newContrato.fechaFin}
                  onChange={(e) => setNewContrato({ ...newContrato, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createContrato(newContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Contrato */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Contrato</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Número </label>
                <input
                  type="text"
                  value={editedContrato.numero}
                  onChange={(e) => setEditedContrato({ ...editedContrato, numero: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Objeto </label>
                <input
                  type="text"
                  value={editedContrato.objeto}
                  onChange={(e) => setEditedContrato({ ...editedContrato, objeto: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre </label>
                <input
                  type="text"
                  value={editedContrato.nombre}
                  onChange={(e) => setEditedContrato({ ...editedContrato, nombre: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Empresa </label>
                <select
                  value={editedContrato.empresaId}
                  onChange={(e) => setEditedContrato({ ...editedContrato, empresaId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una empresa</option>
                  {empresas.map((empresa) => (
                    <option key={empresa.id} value={empresa.id}>
                      {empresa.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Nombre del Contratista </label>
                <input
                  type="text"
                  value={editedContrato.nombreContratista}
                  onChange={(e) => setEditedContrato({ ...editedContrato, nombreContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Número de Documento del Contratista </label>
                <input
                  type="text"
                  value={editedContrato.numeroDocumentoContratista}
                  onChange={(e) => setEditedContrato({ ...editedContrato, numeroDocumentoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Correo del Contratista </label>
                <input
                  type="email"
                  value={editedContrato.correoContratista}
                  onChange={(e) => setEditedContrato({ ...editedContrato, correoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Teléfono del Contratista </label>
                <input
                  type="text"
                  value={editedContrato.telefonoContratista}
                  onChange={(e) => setEditedContrato({ ...editedContrato, telefonoContratista: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={editedContrato.valor}
                  onChange={(e) => setEditedContrato({ ...editedContrato, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={editedContrato.duracion}
                  onChange={(e) => setEditedContrato({ ...editedContrato, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={editedContrato.fechaInicio}
                  onChange={(e) => setEditedContrato({ ...editedContrato, fechaInicio: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={editedContrato.fechaFin}
                  onChange={(e) => setEditedContrato({ ...editedContrato, fechaFin: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateContrato(editedContrato.id, editedContrato)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}