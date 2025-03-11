export interface Permiso {
  id: number
  rolId: number
  moduloId: number
  leer: boolean
  editar: boolean
  consultar: boolean
  insertar: boolean
  eliminar: boolean
  exportar: boolean
  importar: boolean
}
