import { useState, useEffect } from "react";

import { Empresa } from "../../interfaces/Empresa";
import { Contrato } from "../../interfaces/Contrato";
import { ActaContrato } from "../../interfaces/ActaContrato";
import { AmpliacionContrato } from "../../interfaces/AmpliacionContrato";
import { ODS } from "../../interfaces/ODS";

import empresaService from "../../services/empresaService";
import contratoService from "../../services/contratoService";
import actaContratoService from "../../services/actaContratoService";
import ampliacionContratoService from "../../services/ampliacionContratoService";
import odsService from "../../services/odsService";

export function ContratosGallery() {

  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [currentEmpresa, setCurrentEmpresa] = useState<Empresa | null>( null );
  const [contratos, setContratos] = useState<Contrato[]>([]);
  const [actasContrato, setActasContrato] = useState<ActaContrato[]>([]);
  const [ampliacionesContrato, setAmpliacionesContrato] = useState<AmpliacionContrato[]>([]);
  const [ordenesServicio, setOrdenesServicio] = useState<ODS[]>([]);

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

  const getOrdenesServicio = () => {
    odsService.getAll().then((response) => {
      setOrdenesServicio(response.data);
    });
  }

  useEffect(() => {
    getEmpresas();
    getContratos();
    getActasContrato();
    getAmpliacionesContrato();
    getOrdenesServicio();
  }, []);

  const gridStyle = {
    marginTop: '10px',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '20px'
  };

  return (
    <div className="container d-flex flex-column gap-3 p-10">
      <h1>Contratos</h1>
      <select
        className="form-select"
        value={currentEmpresa?.id}
        onChange={(e) => {
          setCurrentEmpresa(empresas.find((empresa) => empresa.id === parseInt(e.target.value)) || null);
        }}
      >
        <option value="">Seleccione una empresa</option>
        { empresas.map((empresa) => (
          <option key={empresa.id} value={empresa.id}>{empresa.nombre}</option>
        ))}
      </select>
      <div style={ gridStyle }>
        { contratos.filter((contrato) => currentEmpresa ? contrato.empresaId === currentEmpresa.id : true).map((contrato) => (
          <div key={contrato.id} className="card p-5">
            <h5>{contrato.nombre}</h5>
            <p className="text-primary fw-bold">
              { contrato.valor.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }) }
              <span className="text-muted"> / { contrato.duracion } años</span>
            </p>
            <p className="m-0">
              { empresas.find((empresa) => empresa.id === contrato.empresaId)?.nombre }
              <p className="text-primary">{ contrato.nombreContratista }</p>
            </p>
            <p>
              Fechas
              <p className="text-primary">
                { contrato.fechaInicio }
                <span className="text-muted"> / { contrato.fechaFin }</span>
              </p>
            </p>
            <p className="badge badge-light-primary">
              { actasContrato.filter(acta => acta.contratoId === contrato.id).length } Actas de Contrato
            </p>
            <p className="badge badge-light-warning">
              { ampliacionesContrato.filter(ampliacion => ampliacion.contratoId === contrato.id).length } Ampliaciones de Contrato
            </p>
            <p className="badge badge-light-info">
              { ordenesServicio.filter(ods => ods.contratoId === contrato.id).length } Ordenes de Servicio
            </p>
            <button className="btn btn-light btn-sm">Ver Detalles</button>
          </div>
        ))}
      </div>
    </div>
  );
}