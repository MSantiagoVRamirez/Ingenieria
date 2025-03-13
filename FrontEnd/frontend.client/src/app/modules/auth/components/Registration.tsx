import {useState, useEffect} from 'react'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import clsx from 'clsx'
// import {getUserByToken} from '../core/_requests'
import {register} from '../core/_requests'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../_metronic/helpers'
import {PasswordMeterComponent} from '../../../../_metronic/assets/ts/components'
import {useAuth} from '../core/Auth'

const initialValues = {
  usuario: '',
  password: '',
  confirmPassword: '',
  nombres: '',
  apellidos: '',
  correo: '',
  telefono: ''
  // TODO: Añadir los campos de empresaId y rolId al valor inicial
}

// TODO: Ajustar las validaciones de cada uno de los campos del formulario de registro de acuerdo a la API
const registrationSchema = Yup.object().shape({
  usuario: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Usuario'),
  password: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Contraseña'),
  confirmPassword: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere confirmar Contraseña')
    .oneOf([Yup.ref('password')], "Contraseña y Confirmar Contraseña no cinciden"),  // this is used to compare two fields in the form
  nombres: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Nombres'),
  apellidos: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Apellidos'),
  correo: Yup.string()
    .email('Wrong email format')
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Correo'),
  telefono: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Se requiere Teléfono')
  // TODO: Añadir los campos de empresaId y rolId al formulario de registro
})

export function Registration() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()
  const formik = useFormik({
    initialValues,
    validationSchema: registrationSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await register(
          values.usuario,
          values.password,
          values.confirmPassword,
          values.nombres,
          values.apellidos,
          values.correo,
          values.telefono
        )
      } catch (error) {
        console.error(error)
        setStatus('Los detalles de registro son incorrectos')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  // export function Registration() {
  //   const [loading, setLoading] = useState(false)
  //   const {saveAuth, setCurrentUser} = useAuth()
  //   const formik = useFormik({
  //     initialValues,
  //     validationSchema: registrationSchema,
  //     onSubmit: async (values, {setStatus, setSubmitting}) => {
  //       setLoading(true)
  //       try {
  //         const {data: auth} = await register(
  //           values.firstname,
  //           values.lastname,
  //           values.email,
  //           values.password,
  //           values.changepassword,
  //           values.acceptTerms
  //         )
  //         saveAuth(auth)
  //         const {data: user} = await getUserByToken(auth.api_token)
  //         setCurrentUser(user)
  //       } catch (error) {
  //         console.error(error)
  //         saveAuth(undefined)
  //         setStatus('Los detalles de registro son incorrectos')
  //         setSubmitting(false)
  //         setLoading(false)
  //       }
  //     },
  //   })

  useEffect(() => {
    PasswordMeterComponent.bootstrap()
  }, [])

  return (
    <form
      className='form w-100 fv-plugins-bootstrap5 fv-plugins-framework'
      noValidate
      id='kt_login_signup_form'
      onSubmit={formik.handleSubmit}
    >
      {/* begin::Heading */}
      <div className='text-center mb-11'>
        {/* begin::Title */}
        <h1 className='text-gray-900 fw-bolder mb-3'>Registrarse</h1>
        {/* end::Title */}

        <div className='text-gray-500 fw-semibold fs-6'>Sistema de gestión de contratos y ODS</div>
      </div>
      {/* end::Heading */}

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

      {/* <div className='separator separator-content my-14'> */}
        {/* <span className='w-125px text-gray-500 fw-semibold fs-7'>Or with email</span> */}
      {/* </div> */}

      {formik.status && (
        <div className='mb-lg-15 alert alert-danger'>
          <div className='alert-text font-weight-bold'>{formik.status}</div>
        </div>
      )}

      {/* begin::Form group Nombres */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Nombres</label>
        <input
          placeholder='Nombres'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('nombres')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.nombres && formik.errors.nombres,
            },
            {
              'is-valid': formik.touched.nombres && !formik.errors.nombres,
            }
          )}
        />
        {formik.touched.nombres && formik.errors.nombres && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.nombres}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Apellidos */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Apellidos</label>
        <input
          placeholder='Apellidos'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('apellidos')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.apellidos && formik.errors.apellidos,
            },
            {
              'is-valid': formik.touched.apellidos && !formik.errors.apellidos,
            }
          )}
        />
        {formik.touched.apellidos && formik.errors.apellidos && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.apellidos}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Correo */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Correo</label>
        <input
          placeholder='Correo'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('correo')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.correo && formik.errors.correo},
            {
              'is-valid': formik.touched.correo && !formik.errors.correo,
            }
          )}
        />
        {formik.touched.correo && formik.errors.correo && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.correo}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Teléfono */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Teléfono</label>
        <input
          placeholder='Teléfono'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('telefono')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.telefono && formik.errors.telefono,
            },
            {
              'is-valid': formik.touched.telefono && !formik.errors.telefono,
            }
          )}
        />
        {formik.touched.telefono && formik.errors.telefono && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.telefono}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Firstname */}
      {/* <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>First Name</label>
        <input
          placeholder='First name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('firstname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.firstname && formik.errors.firstname,
            },
            {
              'is-valid': formik.touched.firstname && !formik.errors.firstname,
            }
          )}
        />
        {formik.touched.firstname && formik.errors.firstname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.firstname}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group Lastname */}
      {/* <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Last Name</label>
        <input
          placeholder='Last name'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('lastname')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.lastname && formik.errors.lastname,
            },
            {
              'is-valid': formik.touched.lastname && !formik.errors.lastname,
            }
          )}
        />
        {formik.touched.lastname && formik.errors.lastname && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.lastname}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group Email */}
      {/* <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Email</label>
        <input
          placeholder='Email'
          type='email'
          autoComplete='off'
          {...formik.getFieldProps('email')}
          className={clsx(
            'form-control bg-transparent',
            {'is-invalid': formik.touched.email && formik.errors.email},
            {
              'is-valid': formik.touched.email && !formik.errors.email,
            }
          )}
        />
        {formik.touched.email && formik.errors.email && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.email}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group Usuario */}
      <div className='fv-row mb-8'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Usuario</label>
        <input
          placeholder='Usuario'
          type='text'
          autoComplete='off'
          {...formik.getFieldProps('usuario')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.usuario && formik.errors.usuario,
            },
            {
              'is-valid': formik.touched.usuario && !formik.errors.usuario,
            }
          )}
        />
        {formik.touched.usuario && formik.errors.usuario && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.usuario}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group Password */}
      <div className='fv-row mb-8' data-kt-password-meter='true'>
        <div className='mb-1'>
          <label className='form-label fw-bolder text-gray-900 fs-6'>Contraseña</label>
          <div className='position-relative mb-3'>
            <input
              type='password'
              placeholder='Contraseña'
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
          {/* begin::Meter */}
          <div
            className='d-flex align-items-center mb-3'
            data-kt-password-meter-control='highlight'
          >
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2'></div>
            <div className='flex-grow-1 bg-secondary bg-active-success rounded h-5px'></div>
          </div>
          {/* end::Meter */}
        </div>
        <div className='text-muted'>
          Usar 8 o más caracteres con una combinación de letras, números y símbolos.
        </div>
      </div>
      {/* end::Form group */}

      {/* begin::Form group Confirm password */}
      <div className='fv-row mb-5'>
        <label className='form-label fw-bolder text-gray-900 fs-6'>Confirmar Contraseña</label>
        <input
          type='password'
          placeholder='Confirmar Contraseña'
          autoComplete='off'
          {...formik.getFieldProps('changepassword')}
          className={clsx(
            'form-control bg-transparent',
            {
              'is-invalid': formik.touched.confirmPassword && formik.errors.confirmPassword,
            },
            {
              'is-valid': formik.touched.confirmPassword && !formik.errors.confirmPassword,
            }
          )}
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.confirmPassword}</span>
            </div>
          </div>
        )}
      </div>
      {/* end::Form group */}

      {/* begin::Form group */}
      {/* <div className='fv-row mb-8'>
        <label className='form-check form-check-inline' htmlFor='kt_login_toc_agree'>
          <input
            className='form-check-input'
            type='checkbox'
            id='kt_login_toc_agree'
            {...formik.getFieldProps('acceptTerms')}
          />
          <span>
            I Accept the{' '}
            <a
              href='https://keenthemes.com/metronic/?page=faq'
              target='_blank'
              className='ms-1 link-primary'
            >
              Terms
            </a>
            .
          </span>
        </label>
        {formik.touched.acceptTerms && formik.errors.acceptTerms && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.acceptTerms}</span>
            </div>
          </div>
        )}
      </div> */}
      {/* end::Form group */}

      {/* begin::Form group */}
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_up_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          // disabled={formik.isSubmitting || !formik.isValid || !formik.values.acceptTerms}
          disabled={formik.isSubmitting || !formik.isValid }
        >
          {!loading && <span className='indicator-label'>Confirmar Registro</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Cargando...{' '}
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
        <Link to='/auth/login'>
          <button
            type='button'
            id='kt_login_signup_form_cancel_button'
            className='btn btn-lg btn-light-primary w-100 mb-5'
          >
            Cancelar
          </button>
        </Link>
      </div>
      {/* end::Form group */}
    </form>
  )
}
