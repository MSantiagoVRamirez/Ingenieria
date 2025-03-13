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
      <MenuItem title='My Page' to='/my-page' />  {/* new page added */}
      <MenuInnerWithSub title='Classes' to='/classes' menuPlacement='bottom-start' menuTrigger='click'>
        <MenuItem title='Roles' to='classes/roles-widget' />
        <MenuItem title='Modulos' to='classes/modulos-widget' />
        <MenuItem title='Permisos' to='classes/permisos-widget' />
        <MenuItem title='Empresas' to='classes/empresas-widget' />
        <MenuItem title='Usuarios' to='classes/usuarios-widget' />
        <MenuItem title='Proyectos' to='classes/proyectos-widget' />
        <MenuItem title='Contratos' to='classes/contratos-widget' />
        <MenuItem title='Actas de Contrato' to='classes/actas-contratos-widget' />
        <MenuItem title='Ampliaciones de Contrato' to='classes/ampliaciones-contrato-widget' />
        <MenuItem title='Troncales' to='classes/troncales-widget' />
        <MenuItem title='Ordenes de Servicio' to='classes/ordenes-servicio-widget' />
        <MenuItem title='Actas de ODS' to='classes/actas-ods-widget' />
        <MenuItem title='Ordenes de Cambio' to='classes/ordenes-cambio-widget' />
        <MenuItem title='Tipos de Taller' to='classes/tipos-taller-widget' />
        <MenuItem title='Talleres' to='classes/talleres-widget' />
        <MenuItem title='Hallazgos' to='classes/hallazgos-widget' />
        <MenuItem title='Acciones de Cierre' to='classes/acciones-cierre-widget' />
        <MenuItem title='Contratos Gallery' to='classes/contratos-gallery' />
      </MenuInnerWithSub>
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
