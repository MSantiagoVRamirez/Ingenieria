export interface Hallazgo {
  id: number
  recomendaciones: string
  tallerId: number
  disciplinaTaller: string
  tipoCategoria: string
  responsableAccionId: number
  descripcion: string
  fechaCierrePlaneada: string
  fechaCierreReal: string
  documento: string
  responsableVerificacionId: number
  diasRetraso: number
  estado: boolean
}
