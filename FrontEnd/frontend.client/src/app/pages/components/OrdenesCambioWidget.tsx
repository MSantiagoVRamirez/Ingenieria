import { useState, useEffect } from "react"
import { OrdenCambio } from "../../interfaces/OrdenCambio"
import { ODS } from "../../interfaces/ODS"
import ordenCambioService from "../../services/ordenCambioService"
import odsService from "../../services/odsService"
import { KTIcon } from "../../../_metronic/helpers"
import { Dropdown1 } from "../../../_metronic/partials"

export function OrdenesCambioWidget() {

  const defaultOrdenCambio: OrdenCambio = {
    id: 0,
    odsId: 0,
    fechaInicioAmpliacion: '',
    fechaFinAmpliacion: '',
    valor: 0,
    duracion: 0
  }
  const [ordenesCambio, setOrdenesCambio] = useState<OrdenCambio[]>([])
  const [newOrdenCambio, setNewOrdenCambio] = useState<OrdenCambio>(defaultOrdenCambio)
  const [editedOrdenCambio, setEditedOrdenCambio] = useState<OrdenCambio>(defaultOrdenCambio)
  const [deleteOrdenCambioId, setDeleteOrdenCambioId] = useState<number>(defaultOrdenCambio.id)

  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([])

  const [showCreateForm, setShowCreateForm] = useState(false)
  const [showEditForm, setShowEditForm] = useState(false)

  // Obtener todas las órdenes de servicio
  const fetchOrdenesServicio = () => {
    odsService.getAll()
    .then((response) => {
      setOrdenesServicio(response.data)  // Llenar la lista de órdenes de servicio
    })
    .catch((error) => {
      console.error("Hubo un error al obtener las órdenes de servicio", error)
    })
  }

  // Obtener todas las ordenes de cambio
  const fetchOrdenesCambio = () => {
    ordenCambioService.getAll()
      .then((response) => {
        setOrdenesCambio(response.data)  // Llenar la lista de ordenes de cambio
      })
      .catch((error) => {
        console.error("Hubo un error al obtener las ordenes de cambio", error)
      })
  }

  // Obtener todas las ordenes de cambio cada vez que se renderiza el componente
  useEffect(() => {
    fetchOrdenesServicio()  // Obtener todas las órdenes de servicio
    fetchOrdenesCambio()  // Obtener todas las ordenes de cambio
  }, [])

  // Obtener una sola orden de cambio (para editar)
  const fetchOrdenCambio = (id: number) => {
    ordenCambioService.get(id)
      .then((response) => {
        setEditedOrdenCambio(response.data)  // Llenar el formulario de edición
        setShowEditForm(true)  // Mostrar el formulario de edición
      })
      .catch((error) => {
        console.error("Hubo un error al obtener la orden de cambio", error)
      })
  }

  // Crear una orden de cambio
  const createOrdenCambio = (data: OrdenCambio) => {
    ordenCambioService.create(data)
      .then((response) => {
        setNewOrdenCambio(defaultOrdenCambio) // Limpiar el formulario
        fetchOrdenesCambio()  // Actualizar la lista de ordenes de cambio
        setShowCreateForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al crear la orden de cambio", error)
      })
  }

  // Actualizar una orden de cambio
  const updateOrdenCambio = (id: number, data: OrdenCambio) => {
    ordenCambioService.update(id, data)
      .then((response) => {
        setEditedOrdenCambio(defaultOrdenCambio) // Limpiar el formulario
        fetchOrdenesCambio()  // Actualizar la lista de ordenes de cambio
        setShowEditForm(false)  // Ocultar el formulario
      })
      .catch((error) => {
        console.error("Hubo un error al actualizar la orden de cambio", error)
      })
  }

  // Eliminar una orden de cambio
  const deleteOrdenCambio = (id: number) => {
    ordenCambioService.remove(id)
      .then((response) => {
        setDeleteOrdenCambioId(defaultOrdenCambio.id) // Limpiar el input de eliminación
        fetchOrdenesCambio()  // Actualizar la lista de ordenes de cambio
      })
      .catch((error) => {
        console.error("Hubo un error al eliminar la orden de cambio", error)
      })
  }

  return (
    <>
      {/* Listado de Ordenes de Cambio */}
      <div className="card mx-20 my-10">
        
        {/* Header */}
        <div className="card-header">
          <div className="card-title fw-bold fs-2">
            Ordenes de Cambio
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
                  <th className='min-w-150px rounded-start ps-5'>Orden de Servicio</th>
                  <th className='min-w-150px'>Valor</th>
                  <th className='min-w-150px'>Duración</th>
                  <th className='min-w-150px text-end rounded-end pe-5'>Acciones</th>
                </tr>
              </thead>
              {/* Table Body */}
              <tbody>
                { ordenesCambio.map((ordenCambio) => (
                  <tr>
                    <td className="d-flex align-items-center gap-3">
                      <span className="bullet bullet-vertical h-40px bg-primary"></span>
                      <div className="d-flex justify-content-start flex-column">
                        <span className="fs-6 fw-bold mb-1">
                          {ordenesServicio.find((ordenServicio) => ordenServicio.id === ordenCambio.odsId)?.nombre}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span className="text-primary d-block fw-bold fs-6">
                        {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(ordenCambio.valor)}
                      </span>
                    </td>
                    <td>
                      <span className="d-block text-primary fw-bold fs-6">{ordenCambio.duracion} años</span>
                      <span className="d-block fs-7">{ordenCambio.fechaInicioAmpliacion}</span>
                      <span className="d-block text-muted fs-7">{ordenCambio.fechaFinAmpliacion}</span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-icon btn-bg-light btn-active-light-primary" onClick={() => fetchOrdenCambio(ordenCambio.id)}>
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-icon btn-bg-light btn-active-light-danger ms-3" onClick={() => deleteOrdenCambio(ordenCambio.id)}>
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Formulario de Creación de Orden de Cambio */}
        { showCreateForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Agregar Orden de Cambio</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Orden de Servicio </label>
                <select
                  value={newOrdenCambio.odsId}
                  onChange={(e) => setNewOrdenCambio({ ...newOrdenCambio, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una orden de servicio</option>
                  {ordenesServicio.map((ordenServicio) => (
                    <option value={ordenServicio.id}>{ordenServicio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={newOrdenCambio.fechaInicioAmpliacion}
                  onChange={(e) => setNewOrdenCambio({ ...newOrdenCambio, fechaInicioAmpliacion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={newOrdenCambio.fechaFinAmpliacion}
                  onChange={(e) => setNewOrdenCambio({ ...newOrdenCambio, fechaFinAmpliacion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={newOrdenCambio.valor}
                  onChange={(e) => setNewOrdenCambio({ ...newOrdenCambio, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={newOrdenCambio.duracion}
                  onChange={(e) => setNewOrdenCambio({ ...newOrdenCambio, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => createOrdenCambio(newOrdenCambio)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowCreateForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}

        {/* Formulario de Edición de Orden de Cambio */}
        { showEditForm && (
          <div className="card w-300px position-absolute z-index-1 end-0 top-0 m-5 shadow">
            <div className="card-header">
              <div className="card-title">Editar Orden de Cambio</div>
            </div>
            <div className="card-body d-flex flex-column gap-3">
              <div className="form-group">
                <label className="form-label required"> Orden de Servicio </label>
                <select
                  value={editedOrdenCambio.odsId}
                  onChange={(e) => setEditedOrdenCambio({ ...editedOrdenCambio, odsId: parseInt(e.target.value) })}
                  className="form-select"
                >
                  <option value="">Seleccione una orden de servicio</option>
                  {ordenesServicio.map((ordenServicio) => (
                    <option value={ordenServicio.id}>{ordenServicio.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Inicio </label>
                <input
                  type="date"
                  value={editedOrdenCambio.fechaInicioAmpliacion}
                  onChange={(e) => setEditedOrdenCambio({ ...editedOrdenCambio, fechaInicioAmpliacion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Fecha de Fin </label>
                <input
                  type="date"
                  value={editedOrdenCambio.fechaFinAmpliacion}
                  onChange={(e) => setEditedOrdenCambio({ ...editedOrdenCambio, fechaFinAmpliacion: e.target.value })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Valor </label>
                <input
                  type="number"
                  value={editedOrdenCambio.valor}
                  onChange={(e) => setEditedOrdenCambio({ ...editedOrdenCambio, valor: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label className="form-label required"> Duración </label>
                <input
                  type="number"
                  value={editedOrdenCambio.duracion}
                  onChange={(e) => setEditedOrdenCambio({ ...editedOrdenCambio, duracion: parseInt(e.target.value) })}
                  className="form-control"
                />
              </div>
              <div className="form-group d-flex gap-3">
                <button className="btn btn-primary" onClick={() => updateOrdenCambio(editedOrdenCambio.id, editedOrdenCambio)}> Guardar </button>
                <button className="btn btn-outline btn-active-light" onClick={() => setShowEditForm(false)}> Cancelar </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}