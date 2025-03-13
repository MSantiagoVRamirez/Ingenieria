import {useIntl} from 'react-intl'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {MegaMenu} from './MegaMenu'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      {/* <MenuItem title='Dashboard' to='/dashboard' /> */}
      <MenuItem title='Home' to='/home' />
      <MenuInnerWithSub title='Seguridad' to='/seguridad' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem title='Roles' to='seguridad/roles-widget' />
        <MenuItem title='Modulos' to='seguridad/modulos-widget' />
        <MenuItem title='Permisos' to='seguridad/permisos-widget' />
        <MenuItem title='Empresas' to='seguridad/empresas-widget' />
        <MenuItem title='Usuarios' to='seguridad/usuarios-widget' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Contratos y ODS' to='/contratos-ods' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem title='Proyectos' to='contratos-ods/proyectos-widget' />
        <MenuItem title='Contratos' to='contratos-ods/contratos-widget' />
        <MenuItem title='Actas de Contrato' to='contratos-ods/actas-contratos-widget' />
        <MenuItem title='Ampliaciones de Contrato' to='contratos-ods/ampliaciones-contrato-widget' />
        <MenuItem title='Troncales' to='contratos-ods/troncales-widget' />
        <MenuItem title='Ordenes de Servicio' to='contratos-ods/ordenes-servicio-widget' />
        <MenuItem title='Actas de ODS' to='contratos-ods/actas-ods-widget' />
        <MenuItem title='Ordenes de Cambio' to='contratos-ods/ordenes-cambio-widget' />
      </MenuInnerWithSub>
      <MenuInnerWithSub title='Talleres y Hallazgos' to='/talleres-hallazgos' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem title='Tipos de Taller' to='talleres-hallazgos/tipos-taller-widget' />
        <MenuItem title='Talleres' to='talleres-hallazgos/talleres-widget' />
        <MenuItem title='Hallazgos' to='talleres-hallazgos/hallazgos-widget' />
        <MenuItem title='Acciones de Cierre' to='talleres-hallazgos/acciones-cierre-widget' />
      </MenuInnerWithSub>
      <MenuItem title='My Page' to='/my-page' />
      <MenuInnerWithSub title='Gallery' to='/gallery' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem title='Contratos' to='gallery/contratos-gallery' />
      </MenuInnerWithSub>
      {/* <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' /> */}
      {/* <MenuItem title='Layout Builder' to='/builder' /> */}
      {/* <MenuInnerWithSub
        title='Crafted'
        to='/crafted'
        menuPlacement='bottom-start'
        menuTrigger='click'
      > */}
        {/* PAGES */}
        {/* <MenuInnerWithSub
          title='Pages'
          to='/crafted/pages'
          fontIcon='bi-archive'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuInnerWithSub
            title='Profile'
            to='/crafted/pages/profile'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/profile/overview' title='Overview' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/projects' title='Projects' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/campaigns' title='Campaigns' hasBullet={true} />
            <MenuItem to='/crafted/pages/profile/documents' title='Documents' hasBullet={true} />
            <MenuItem
              to='/crafted/pages/profile/connections'
              title='Connections'
              hasBullet={true}
            />
          </MenuInnerWithSub>
          <MenuInnerWithSub
            title='Wizards'
            to='/crafted/pages/wizards'
            hasArrow={true}
            hasBullet={true}
            menuPlacement='right-start'
            menuTrigger={`{default:'click', lg: 'hover'}`}
          >
            <MenuItem to='/crafted/pages/wizards/horizontal' title='Horizontal' hasBullet={true} />
            <MenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
          </MenuInnerWithSub>
        </MenuInnerWithSub> */}

        {/* ACCOUNT */}
        {/* <MenuInnerWithSub
          title='Accounts'
          to='/crafted/accounts'
          fontIcon='bi-person'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/account/overview' title='Overview' hasBullet={true} />
          <MenuItem to='/crafted/account/settings' title='Settings' hasBullet={true} />
        </MenuInnerWithSub> */}

        {/* ERRORS */}
        {/* <MenuInnerWithSub
          title='Errors'
          to='/error'
          fontIcon='bi-sticky'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/error/404' title='Error 404' hasBullet={true} />
          <MenuItem to='/error/500' title='Error 500' hasBullet={true} />
        </MenuInnerWithSub> */}

        {/* Widgets */}
        {/* <MenuInnerWithSub
          title='Widgets'
          to='/crafted/widgets'
          fontIcon='bi-layers'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/crafted/widgets/lists' title='Lists' hasBullet={true} />
          <MenuItem to='/crafted/widgets/statistics' title='Statistics' hasBullet={true} />
          <MenuItem to='/crafted/widgets/charts' title='Charts' hasBullet={true} />
          <MenuItem to='/crafted/widgets/mixed' title='Mixed' hasBullet={true} />
          <MenuItem to='/crafted/widgets/tables' title='Tables' hasBullet={true} />
          <MenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
        </MenuInnerWithSub> */}
      {/* </MenuInnerWithSub> */}

      {/* <MenuInnerWithSub title='Apps' to='/apps' menuPlacement='bottom-start' menuTrigger='click'> */}
        {/* PAGES */}
        {/* <MenuInnerWithSub
          title='Chat'
          to='/apps/chat'
          icon='message-text-2'
          hasArrow={true}
          menuPlacement='right-start'
          menuTrigger={`{default:'click', lg: 'hover'}`}
        >
          <MenuItem to='/apps/chat/private-chat' title='Private Chat' hasBullet={true} />
          <MenuItem to='/apps/chat/group-chat' title='Group Chart' hasBullet={true} />
          <MenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
        </MenuInnerWithSub>
        <MenuItem icon='abstract-28' to='/apps/user-management/users' title='User management' /> */}
      {/* </MenuInnerWithSub> */}

      {/* <MenuInnerWithSub
        isMega={true}
        title='Layouts'
        to='/mega-menu'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        <MegaMenu />
      </MenuInnerWithSub> */}
    </>
  )
}
