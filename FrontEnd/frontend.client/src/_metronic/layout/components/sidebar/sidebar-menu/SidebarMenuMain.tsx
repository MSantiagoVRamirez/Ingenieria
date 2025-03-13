import {useIntl} from 'react-intl'
import {KTIcon} from '../../../../helpers'
import {SidebarMenuItemWithSub} from './SidebarMenuItemWithSub'
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  const intl = useIntl()

  return (
    <>
      {/* <SidebarMenuItem
        to='/dashboard'
        icon='element-11'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      /> */}
      <SidebarMenuItem
        to='/home'
        icon='element-11'
        title='home'
        fontIcon='bi-app-indicator'
      />
      <SidebarMenuItemWithSub to='/seguridad' title='Seguridad' icon='shield' fontIcon='bi-shield'>
        <SidebarMenuItem to="seguridad/roles-widget" title="Roles" />
        <SidebarMenuItem to="seguridad/modulos-widget" title="Modulos" />
        <SidebarMenuItem to="seguridad/permisos-widget" title="Permisos" />
        <SidebarMenuItem to="seguridad/empresas-widget" title="Empresas" />
        <SidebarMenuItem to="seguridad/usuarios-widget" title="Usuarios" />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/contratos-ods' title='Contratos y ODS' icon='file' fontIcon='bi-file'>
        <SidebarMenuItem to="contratos-ods/proyectos-widget" title="Proyectos" />
        <SidebarMenuItem to="contratos-ods/contratos-widget" title="Contratos" />
        <SidebarMenuItem to="contratos-ods/actas-contrato-widget" title="Actas de Contrato" />
        <SidebarMenuItem to="contratos-ods/ampliaciones-contrato-widget" title="Ampliaciones de Contrato" />
        <SidebarMenuItem to="contratos-ods/troncales-widget" title="Troncales" />
        <SidebarMenuItem to="contratos-ods/ordenes-servicio-widget" title="Ordenes de Servicio" />
        <SidebarMenuItem to="contratos-ods/actas-ods-widget" title="Actas de ODS" />
        <SidebarMenuItem to="contratos-ods/ordenes-cambio-widget" title="Ordenes de Cambio" />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/talleres-hallazgos' title='Talleres y Hallazgos' icon='calendar' fontIcon='bi-calendar'>
        <SidebarMenuItem to="talleres-hallazgos/tipos-taller-widget" title="Tipos de Taller" />
        <SidebarMenuItem to="talleres-hallazgos/talleres-widget" title="Talleres" />
        <SidebarMenuItem to="talleres-hallazgos/hallazgos-widget" title="Hallazgos" />
        <SidebarMenuItem to="talleres-hallazgos/acciones-cierre-widget" title="Acciones de Cierre" />
      </SidebarMenuItemWithSub>
      {/* <SidebarMenuItem to='/builder' icon='switch' title='Layout Builder' fontIcon='bi-layers' />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Crafted</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/crafted/pages'
        title='Pages'
        fontIcon='bi-archive'
        icon='element-plus'
      >
        <SidebarMenuItemWithSub to='/crafted/pages/profile' title='Profile' hasBullet={true}>
          <SidebarMenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
          <SidebarMenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
          <SidebarMenuItem
            to='/crafted/pages/profile/campaigns'
            title='Campaigns'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/documents'
            title='Documents'
            hasBullet={true}
          />
          <SidebarMenuItem
            to='/crafted/pages/profile/connections'
            title='Connections'
            hasBullet={true}
          />
        </SidebarMenuItemWithSub>

        <SidebarMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <SidebarMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <SidebarMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </SidebarMenuItemWithSub>
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/accounts'
        title='Accounts'
        icon='profile-circle'
        fontIcon='bi-person'
      >
        <SidebarMenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
        <SidebarMenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub to='/error' title='Errors' fontIcon='bi-sticky' icon='cross-circle'>
        <SidebarMenuItem to='/error/404' title='Error 404' hasBullet={true} />
        <SidebarMenuItem to='/error/500' title='Error 500' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItemWithSub
        to='/crafted/widgets'
        title='Widgets'
        icon='element-7'
        fontIcon='bi-layers'
      >
        <SidebarMenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
        <SidebarMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <SidebarMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='message-text-2'
      >
        <SidebarMenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
        <SidebarMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </SidebarMenuItemWithSub>
      <SidebarMenuItem
        to='/apps/user-management/users'
        icon='abstract-28'
        title='User management'
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <a
          target='_blank'
          className='menu-link'
          href={import.meta.env.VITE_APP_PREVIEW_DOCS_URL + '/changelog'}
        >
          <span className='menu-icon'>
            <KTIcon iconName='code' className='fs-2' />
          </span>
          <span className='menu-title'>Changelog {import.meta.env.VITE_APP_VERSION}</span>
        </a>
      </div> */}
    </>
  )
}

export {SidebarMenuMain}
