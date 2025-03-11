export interface ODS {
  id: number
  nombre: string
  descripcion: string
  valorInicial: number
  duracion: number
  fechaInicio: string
  fechaFin: string
  fechaInicioSuspension: string
  fechaFinSuspension: string
  valorActual: number
  estado: boolean
  supervisorId: number
  solicitanteId: number
  recurso: string
  plantaSistema: string
  conexoObra: string
  proyectoId: number
  troncalId: number
  contratoId: number
  ampliacionContratoId: number
}
