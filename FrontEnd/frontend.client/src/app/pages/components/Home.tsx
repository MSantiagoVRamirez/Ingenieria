import { FC, useState, useEffect } from 'react'
import { Content } from '../../../_metronic/layout/components/content'

import { Rol } from '../../interfaces/Rol'
import authService from '../../services/authService'
import rolService2 from '../../services/rolService2'

const Home: FC = () => {
  const [roles, setRoles] = useState<Rol[]>([]);

  const login = () => {
    authService.login('santiago', '123456789').then((response) => {
      console.log(response.data);
    });
  }

  const getRoles = () => {
    rolService2.getAll().then((response) => {
      console.log(response.data);
      setRoles(response.data);
    });
  }

  useEffect(() => {
      login();
    }, []);
  
  return (
    <>
      <Content>
        <button className="btn btn-primary" onClick={getRoles}>Get Roles</button>
        <div className="d-flex gap-3">
          <h1>Lista de Roles</h1>
          <div>
            { roles.map(rol => <p key={rol.id}>{rol.nombre}</p>) }
          </div>
        </div>
      </Content>
    </>
    )
}

export {Home}
