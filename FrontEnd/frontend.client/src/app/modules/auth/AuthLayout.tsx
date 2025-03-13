
import {useEffect} from 'react'
import {Outlet, Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'

import logoTop from '../../../app/assets/images/utilityCenitTop.png'
import logoBottom from '../../../app/assets/images/utilityCenitEcopetrol.png'
import utilityLeft from '../../../app/assets/images/utilityCenit10.png'
import utilityCenter from '../../../app/assets/images/utilityCenit13.png'
import utilityRight from '../../../app/assets/images/utilityCenit5.png'

const AuthLayout = () => {
  useEffect(() => {
    const root = document.getElementById('root')
    if (root) {
      root.style.height = '100%'
    }
    return () => {
      if (root) {
        root.style.height = 'auto'
      }
    }
  }, [])

  return (
    <div className='d-flex flex-column flex-lg-row flex-column-fluid h-100'>
      {/* begin::Body */}
      <div className='d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1'>
        {/* begin::Form */}
        <div className='d-flex flex-center flex-column flex-lg-row-fluid'>
          {/* begin::Wrapper */}
          <div className='w-lg-500px p-10'>
            <Outlet />
            {/* Define el estado actual del Router de este modulo */}
            {/* Se debe definir en el componente principal del modulo */}
            {/* En esta parte se renderiza la subruta actual de este modulo */}
            {/* Todas las subrutas están definidas en el componente AuthPage */}
          </div>
          {/* end::Wrapper */}
        </div>
        {/* end::Form */}

        {/* begin::Footer */}
        {/* <div className='d-flex flex-center flex-wrap px-5'> */}
          {/* begin::Links */}
          {/* <div className='d-flex fw-semibold text-primary fs-base'> */}
            {/* <a href='#' className='px-5' target='_blank'> */}
              {/* Terms */}
            {/* </a> */}

            {/* <a href='#' className='px-5' target='_blank'> */}
              {/* Plans */}
            {/* </a> */}

            {/* <a href='#' className='px-5' target='_blank'> */}
              {/* Contact Us */}
            {/* </a> */}
          {/* </div> */}
          {/* end::Links */}
        {/* </div> */}
        {/* end::Footer */}
      </div>
      {/* end::Body */}

      {/* TODO: Modificar el Aside de acuerdo a Cenit */}
      {/* begin::Aside */}
      <div
        className='d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2'
        style={{background: 'linear-gradient(225deg, #028cfd, #010043)'}}
      >
        {/* begin::Content */}
        <div className='d-flex flex-column flex-center w-100'>
          {/* begin::Logo */}
          {/* <Link to='/' className='mb-12'>
            <img alt='Logo' src={toAbsoluteUrl('media/logos/custom-1.png')} className='h-75px' />
          </Link> */}
          {/* end::Logo */}

          {/* begin::logoTop */}
          <div className='d-flex w-100'>
            <img
              className='w-100px'
              src={logoTop}
              alt=''
            />
          </div>
          {/* end::logoTop */}

          {/* begin::groupImages */}
          <div className='d-flex flex-center w-100 my-20'>
            <img
              className='h-300px mt-0'
              src={utilityLeft}
              alt=''
            />
            <img
              className='h-350px'
              style={{
                marginLeft: '25px',
                marginRight: '20px',
              }}
              src={utilityCenter}
              alt=''
            />
            <img
              className='h-300px mb-7'
              src={utilityRight}
              alt=''
            />
          </div>
          {/* end::groupImages */}

          {/* begin::Image */}
          {/* <img
            className='mx-auto w-275px w-md-50 w-xl-500px mb-10 mb-lg-20'
            src={toAbsoluteUrl('media/misc/auth-screens.png')}
            alt=''
          /> */}
          {/* end::Image */}

          {/* begin::Title */}
          <h1 className='text-white fs-2qx fw-bolder text-center mb-5'>
            CENIT
          </h1>
          {/* end::Title */}

          {/* begin::Text */}
          <div className='text-white fs-base text-center mb-20'>
            Sistema de gestión de contratos y ordenes de servicio
          </div>
          {/* end::Text */}

          {/* begin::logoBottom */}
          <div className='d-flex flex-end w-100'>
            <img
              className='w-200px'
              src={logoBottom}
              alt=''
            />
          </div>
          {/* end::logoBottom */}
        </div>
        {/* end::Content */}
      </div>
      {/* end::Aside */}
    </div>
  )
}

export {AuthLayout}
