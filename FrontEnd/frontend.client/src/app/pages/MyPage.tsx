import { useState, useEffect } from "react";

import { Empresa } from "../interfaces/Empresa";
import { Contrato } from "../interfaces/Contrato";
import { ActaContrato } from "../interfaces/ActaContrato";
import { AmpliacionContrato } from "../interfaces/AmpliacionContrato";
import { Usuario } from "../interfaces/Usuario";
import { ODS } from "../interfaces/ODS";
import { ActaODS } from "../interfaces/ActaODS";
import { OrdenCambio } from "../interfaces/OrdenCambio";
import { Taller } from "../interfaces/Taller";

import { Rol } from "../interfaces/Rol";

import empresaService from "../services/empresaService";
import contratoService from "../services/contratoService";
import actaContratoService from "../services/actaContratoService";
import ampliacionContratoService from "../services/ampliacionContratoService";
import usuarioService from "../services/usuarioService";
import odsService from "../services/odsService";
import actaOdsService from "../services/actaOdsService";
import ordenCambioService from "../services/ordenCambioService";
import tallerService from "../services/tallerService";

import authService from "../services/authService";
import rolService2 from "../services/rolService2";

import { KTIcon } from "../../_metronic/helpers";

export function MyPage() {
  const contratoId = 1;

  const defaultContrato: Contrato = {
    id: 0,
    numero: '',
    objeto: '',
    nombre: '',
    empresaId: 0,
    nombreContratista: '',
    numeroDocumentoContratista: '',
    correoContratista: '',
    telefonoContratista: '',
    valor: 0,
    duracion: 0,
    fechaInicio: '',
    fechaFin: ''
  }
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [currentContrato, setCurrentContrato] = useState<Contrato>(defaultContrato);
  const [actasContrato, setActasContrato] = useState<ActaContrato[]>([]);
  const [ampliacionesContrato, setAmpliacionesContrato] = useState<AmpliacionContrato[]>([]);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([]);
  const [actasOds, setActasOds] = useState<ActaODS[]>([]);
  const [ordenesCambio, setOrdenesCambio] = useState<OrdenCambio[]>([]);
  const [talleres, setTalleres] = useState<Taller[]>([]);

  const [roles, setRoles] = useState<Rol[]>([]);

  const getEmpresas = () => {
    empresaService.getAll().then((response) => {
      setEmpresas(response.data);
    });
  }
  
  const getContratos = () => {
    contratoService.getAll().then((response) => {
      setContratos(response.data);
    });
  }

  const getActasContrato = () => {
    actaContratoService.getAll().then((response) => {
      setActasContrato(response.data);
    });
  }

  const getAmpliacionesContrato = () => {
    ampliacionContratoService.getAll().then((response) => {
      setAmpliacionesContrato(response.data);
    });
  }

  const getUsuarios = () => {
    usuarioService.getAll().then((response) => {
      setUsuarios(response.data);
    });
  }

  const getOrdenesServicio = () => {
    odsService.getAll().then((response) => {
      setOrdenesServicio(response.data);
    });
  }

  const getActasOds = () => {
    actaOdsService.getAll().then((response) => {
      setActasOds(response.data);
    });
  }

  const getOrdenesCambio = () => {
    ordenCambioService.getAll().then((response) => {
      setOrdenesCambio(response.data);
    });
  }

  const getTalleres = () => {
    tallerService.getAll().then((response) => {
      setTalleres(response.data);
    });
  }

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
    getEmpresas();
    getContratos();
    getActasContrato();
    getAmpliacionesContrato();
    getUsuarios();
    getOrdenesServicio();
    getActasOds();
    getOrdenesCambio();
    getTalleres();
  }, []);

  useEffect(() => {
    setCurrentContrato(contratos.find(contrato => contrato.id === contratoId) || defaultContrato);
  }, [contratos]);

  useEffect(() => {
    login();
  }, []);

  const gridStyle = {
    marginTop: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  const titleStyle = {
    width: 'fit-content',
    padding: '10px',
    borderRadius: '10px'
  };

  return (
    <div className="container d-flex flex-column gap-3 p-10">
      <button className="btn btn-primary" onClick={getRoles}>Get Roles</button>
      <div className="d-flex gap-3">
        <h1>Lista de Roles</h1>
        <div>
          { roles.map(rol => <p key={rol.id}>{rol.nombre}</p>) }
        </div>
      </div>
      <h1>{currentContrato.nombre}</h1>
      <p>
        {empresas.find(empresa => empresa.id === currentContrato.empresaId)?.nombre}
      </p>
      <p>
        <span className="fw-bold fs-6">Contrato número {currentContrato.numero} - </span>
        {currentContrato.objeto}
      </p>
      <table className="table gy-1" style={{ width: "fit-content" }}>
        <thead>
          <tr>
            <th></th>
            <th className="fw-bold fs-6">Información del Contrato</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-bold text-end">Valor</td>
            <td>{currentContrato.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Duración</td>
            <td>{ currentContrato.duracion } años</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Fecha de Inicio</td>
            <td>{ currentContrato.fechaInicio }</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Fecha de Fin</td>
            <td>{ currentContrato.fechaFin }</td>
          </tr>
        </tbody>
      </table>
      <table className="table gy-1" style={{ width: "fit-content" }}>
        <thead>
          <tr>
            <th></th>
            <th className="fw-bold fs-6">Datos del Contratista</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="fw-bold text-end">Nombre</td>
            <td>{ currentContrato.nombreContratista }</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Documento</td>
            <td>{ currentContrato.numeroDocumentoContratista }</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Correo</td>
            <td>{ currentContrato.correoContratista }</td>
          </tr>
          <tr>
            <td className="fw-bold text-end">Teléfono</td>
            <td>{ currentContrato.telefonoContratista }</td>
          </tr>
        </tbody>
      </table>
      <h3 className="bg-light-primary" style={ titleStyle }>Actas de Contrato</h3>
      <div style={ gridStyle }>
        {actasContrato.filter(acta => acta.contratoId === currentContrato.id).map(acta =>
          <div className="card p-5" key={acta.id}>
            <h5>{acta.nombre}</h5>
            <p>{acta.descripcion}</p>
            <button className="btn btn-light fs-7">
              <KTIcon iconName="file" className="fs-3" />
              {acta.documento}
            </button>
          </div>
        )}
      </div>
      <h3 className="mt-3 bg-light-warning" style={ titleStyle }>Ampliaciones de Contrato</h3>
      <div style={ gridStyle }>
        {ampliacionesContrato.filter(ampliacion => ampliacion.contratoId === currentContrato.id).map(ampliacion =>
          <div className="card p-5" key={ampliacion.id}>
            <p className="fw-bold">
              { ampliacion.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }
              <span className="text-muted"> / { ampliacion.duracion } años</span>
            </p>
            <p>
              Fechas
              <p className="text-primary">
                { ampliacion.fechaInicio }
                <span className="text-muted"> / { ampliacion.fechaFin }</span>
              </p>
            </p>
            <p className="badge badge-light-info">
              { ordenesServicio.filter(ods => ods.contratoId === ampliacion.id).length } Ordenes de Servicio
            </p>
            <button className="btn btn-light btn-sm">Ver Detalles</button>
          </div>
        )}
      </div>
      <h3 className="mt-3 bg-light-info" style={ titleStyle }>Ordenes de Servicio</h3>
      <div style={ gridStyle }>
        {ordenesServicio.filter(ods => ods.contratoId === currentContrato.id).map(ods =>
          <div className="card p-5" key={ods.id}>
            <h5>{ods.nombre}</h5>
            <p className="text-primary fw-bold">
              { ods.valorInicial.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }
              <span className="text-muted"> / { ods.duracion } años</span>
            </p>
            <p className={`badge ${ods.estado ? 'badge-light-success' : 'badge-light-danger'}`} style={{ width: 'fit-content' }}>
              { ods.estado ? 'Activa' : 'Inactiva' }
            </p>
            <p>
              <p className="m-0">
                Supervisor: <span className="text-primary">{ usuarios.find(usuario => usuario.id === ods.supervisorId)?.usuario }</span>
              </p>
              <p className="m-0">
                Solicitante: <span className="text-primary">{ usuarios.find(usuario => usuario.id === ods.solicitanteId)?.usuario }</span>
              </p>
            </p>
            <p>
              Fechas
              <p className="text-primary">
                { ods.fechaInicio }
                <span className="text-muted"> / { ods.fechaFin }</span>
              </p>
            </p><p className="badge badge-light-primary">
              { actasOds.filter(acta => acta.odsId === ods.id).length } Actas de ODS
            </p>
            <p className="badge badge-light-warning">
              { ordenesCambio.filter(ampliacion => ampliacion.odsId === ods.id).length } Ordenes de Cambio
            </p>
            <p className="badge badge-light-info">
              { talleres.filter(ods => ods.odsId === ods.id).length } Talleres
            </p>
            <button className="btn btn-light btn-sm">Ver Detalles</button>
          </div>
        )}
      </div>
    </div>
  );
}