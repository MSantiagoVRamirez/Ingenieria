
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
// import {getUserByToken} from '../core/_requests'
import {login} from '../core/_requests'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {useAuth} from '../core/Auth'

const loginSchema = Yup.object().shape({
  usuario: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Se requiere Usuario'),
  password: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Se requiere Contraseña'),
})

const initialValues = {
  usuario: 'santiago',
  password: '123456789',
}
// const initialValues = {
//   email: 'admin@demo.com',
//   password: 'demo',
// }

/*
  Formik+YUP+Typescript:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
  https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
*/

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        login(values.usuario, values.password)
          .then(
            (response) => {
              setCurrentUser(response.data)
            }
          )
      } catch (error) {
        console.error(error)
        setStatus('Los datos de inicio de sesión son incorrectos')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })
  
  // const formik = useFormik({
  //   initialValues,
  //   validationSchema: loginSchema,
  //   onSubmit: async (values, {setStatus, setSubmitting}) => {
  //     setLoading(true)
  //     try {
  //       const {data: auth} = await login(values.email, values.password)
  //       saveAuth(auth)
  //       const {data: user} = await getUserByToken(auth.api_token)
  //       setCurrentUser(user)
  //     } catch (error) {
  //       console.error(error)
  //       saveAuth(undefined)
  //       setStatus('The login details are incorrect')
  //       setSubmitting(false)
  //       setLoading(false)
  //     }
  //   },
  // })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        <h1 className='text-gray-900 fw-bolder mb-3'>Iniciar Sesión</h1>
        <div className='text-gray-500 fw-semibold fs-6'>Sistema de gestión de contratos y ODS</div>
      </div>
      {/* begin::Heading */}

      {/* begin::Login options */}
      {/* <div className='row g-3 mb-9'> */}
        {/* begin::Col */}
        {/* <div className='col-md-6'> */}
          {/* begin::Google link */}
          {/* <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          > */}
            {/* <img
              alt='Logo'
              src={toAbsoluteUrl('media/svg/brand-logos/google-icon.svg')}
              className='h-15px me-3'
            /> */}
            {/* Sign in with Google */}
          {/* </a> */}
          {/* end::Google link */}
        {/* </div> */}
        {/* end::Col */}

        {/* begin::Col */}
        {/* <div className='col-md-6'> */}
          {/* begin::Google link */}
          {/* <a
            href='#'
            className='btn btn-flex btn-outline btn-text-gray-700 btn-active-color-primary bg-state-light flex-center text-nowrap w-100'
          > */}
            {/* <img
              alt='Logo'
              src={toAbsoluteUrl('media/svg/brand-logos/apple-black.svg')}
              className='theme-light-show h-15px me-3'
            /> */}
            {/* <img
              alt='Logo'
              src={toAbsoluteUrl('media/svg/brand-logos/apple-black-dark.svg')}
              className='theme-dark-show h-15px me-3'
            /> */}
            {/* Sign in with Apple */}
          {/* </a> */}
          {/* end::Google link */}
        {/* </div> */}
        {/* end::Col */}
      {/* </div> */}
      {/* end::Login options */}

      {/* begin::Separator */}
      {/* <div className='separator separator-content my-14'> */}
        {/* <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span> */}
      {/* </div> */}
      {/* end::Separator */}

      {formik.status ? (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      ) : (
        <div className='mb-10 bg-light-info p-8 rounded'>
          <div className='text-info'>
            Use account <strong>santiago</strong> and password <strong>123456789</strong> to
            continue.
            {/* TODO: Cambiar por: Por favor ingrese su nombre de usuario y contraseña */}
          </div>
        </div>
      )}

      {/* begin::Form group Usuario */}
      <div className='fv-row mb-8'>
        <label className='form-label fs-6 fw-bolder text-gray-900'>Usuario</label>
        <input
          placeholder='Usuario'
          {...formik.getFieldProps('usuario')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.usuario && formik.errors.usuario},
            {
              'is-valid': formik.touched.usuario && !formik.errors.usuario,
            }
          )}
          type='text'
          name='usuario'
          autoComplete='off'
        />
        {formik.touched.usuario && formik.errors.usuario && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.usuario}</span>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='fv-row mb-3'>
        <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Contraseña</label>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Wrapper */}
      <div className='d-flex flex-stack flex-wrap gap-3 fs-base fw-semibold mb-8'>
        <div />

        {/* begin::Link */}
        <Link to='/auth/forgot-password' className='link-primary'>
          Olvidaste tu contraseña?
          {/* TODO: Si no reconoce la contraseña, ponerle un mensaje de contacte con el administrador para que le ponga una contraseña por defecto 12345 y luego al ingresar de nuevo lo oblige a cambiar contraseña */}
          {/* if contraseña == 12345 -> Obliga a cambiar contraseña */}
          {/* TODO: En el perfil del usurio debe haber un boton de restablecer contraseña que pone la contraseña 12345 por defecto de nuevo */}
        </Link>
        {/* end::Link */}
      </div>
      {/* end::Wrapper */}

      {/* begin::Action */}
      <div className='d-grid mb-10'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-primary'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Entrar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Cargando...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
      {/* end::Action */}

      <div className='text-gray-500 text-center fw-semibold fs-6'>
        Aún no tienes una cuenta?{' '}
        <Link to='/auth/registration' className='link-primary'>
          Registrarse
        </Link>
      </div>
    </form>
  )
}
