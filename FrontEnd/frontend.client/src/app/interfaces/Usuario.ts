export interface Usuario {
  id: number
  usuario: string
  password: string
  confirmPassword: string
  nombres: string
  apellidos: string
  correo: string
  telefono: string
  fechaCreacion: string
  fechaExpiracion: string
  empresaId: number
  rolId: number
}
