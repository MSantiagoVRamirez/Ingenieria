import {lazy, FC, Suspense} from 'react'
import {Route, Routes, Navigate} from 'react-router-dom'
import {MasterLayout} from '../../_metronic/layout/MasterLayout'
import TopBarProgress from 'react-topbar-progress-indicator'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {MenuTestPage} from '../pages/MenuTestPage'
import {getCSSVariableValue} from '../../_metronic/assets/ts/_utils'
import {WithChildren} from '../../_metronic/helpers'
import BuilderPageWrapper from '../pages/layout-builder/BuilderPageWrapper'
import {MyPage} from '../pages/MyPage'
import { RolesWidget } from '../pages/components/RolesWidget'
import { ModulosWidget } from '../pages/components/ModulosWidget'
import { PermisosWidget } from '../pages/components/PermisosWidget'
import { EmpresasWidget } from '../pages/components/EmpresasWidget'
import { TroncalesWidget } from '../pages/components/TroncalesWidget'
import { TiposTallerWidget } from '../pages/components/TiposTallerWidget'
import { UsuariosWidget } from '../pages/components/UsuariosWidget'
import { ProyectosWidget } from '../pages/components/ProyectosWidget'
import { ContratosWidget } from '../pages/components/ContratosWidget'
import { ActasContratoWidget } from '../pages/components/ActasContratoWidget'
import { AmpliacionesContratoWidget } from '../pages/components/AmpliacionesContratoWidget'
import { OrdenesCambioWidget } from '../pages/components/OrdenesCambioWidget'
import { OrdenesServicioWidget } from '../pages/components/OrdenesServicioWidget'
import { ActasODSWidget } from '../pages/components/ActasODSWidget'
import { TalleresWidget } from '../pages/components/TalleresWidget'
import { HallazgosWidget } from '../pages/components/HallazgosWidget'
import { AccionesCierreWidget } from '../pages/components/AccionesCierreWidget'
import { ContratosGallery } from '../pages/components/ContratosGallery'

const PrivateRoutes = () => {
  const ProfilePage = lazy(() => import('../modules/profile/ProfilePage'))
  const WizardsPage = lazy(() => import('../modules/wizards/WizardsPage'))
  const AccountPage = lazy(() => import('../modules/accounts/AccountPage'))
  const WidgetsPage = lazy(() => import('../modules/widgets/WidgetsPage'))
  const ChatPage = lazy(() => import('../modules/apps/chat/ChatPage'))
  const UsersPage = lazy(() => import('../modules/apps/user-management/UsersPage'))

  return (
    <Routes>
      <Route element={<MasterLayout />}>
        {/* Redirect to Dashboard after success login/registartion */}
        <Route path='auth/*' element={<Navigate to='/dashboard' />} />
        {/* Pages */}
        <Route path="my-page" element={<MyPage />} />  {/* new page added */}
        <Route path="classes/roles-widget" element={<RolesWidget />} />
        <Route path="classes/modulos-widget" element={<ModulosWidget />} />
        <Route path="classes/permisos-widget" element={<PermisosWidget />} />
        <Route path="classes/empresas-widget" element={<EmpresasWidget />} />
        <Route path="classes/usuarios-widget" element={<UsuariosWidget />} />
        <Route path="classes/proyectos-widget" element={<ProyectosWidget />} />
        <Route path="classes/contratos-widget" element={<ContratosWidget />} />
        <Route path="classes/actas-contrato-widget" element={<ActasContratoWidget />} />
        <Route path="classes/ampliaciones-contrato-widget" element={<AmpliacionesContratoWidget />} />
        <Route path="classes/troncales-widget" element={<TroncalesWidget />} />
        <Route path="classes/ordenes-servicio-widget" element={<OrdenesServicioWidget />} />
        <Route path="classes/actas-ods-widget" element={<ActasODSWidget />} />
        <Route path="classes/ordenes-cambio-widget" element={<OrdenesCambioWidget />} />
        <Route path="classes/tipos-taller-widget" element={<TiposTallerWidget />} />
        <Route path="classes/talleres-widget" element={<TalleresWidget />} />
        <Route path="classes/hallazgos-widget" element={<HallazgosWidget />} />
        <Route path="classes/acciones-cierre-widget" element={<AccionesCierreWidget />} />

        <Route path="gallery/contratos-gallery" element={<ContratosGallery />} />

        <Route path='dashboard' element={<DashboardWrapper />} />
        <Route path='builder' element={<BuilderPageWrapper />} />
        <Route path='menu-test' element={<MenuTestPage />} />
        {/* Lazy Modules */}
        <Route
          path='crafted/pages/profile/*'
          element={
            <SuspensedView>
              <ProfilePage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/pages/wizards/*'
          element={
            <SuspensedView>
              <WizardsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/widgets/*'
          element={
            <SuspensedView>
              <WidgetsPage />
            </SuspensedView>
          }
        />
        <Route
          path='crafted/account/*'
          element={
            <SuspensedView>
              <AccountPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/chat/*'
          element={
            <SuspensedView>
              <ChatPage />
            </SuspensedView>
          }
        />
        <Route
          path='apps/user-management/*'
          element={
            <SuspensedView>
              <UsersPage />
            </SuspensedView>
          }
        />
        {/* Page Not Found */}
        <Route path='*' element={<Navigate to='/error/404' />} />
      </Route>
    </Routes>
  )
}

const SuspensedView: FC<WithChildren> = ({children}) => {
  const baseColor = getCSSVariableValue('--bs-primary')
  TopBarProgress.config({
    barColors: {
      '0': baseColor,
    },
    barThickness: 1,
    shadowBlur: 5,
  })
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>
}

export {PrivateRoutes}
