import type { Empresa } from "../Types/empresa.types";
import { EstadoEmpresaBadge } from "./EstadoEmpresaBadge";
import { EmpresaInfoItem } from "./EmpresaInfoItem";

interface EmpresaDetailPanelProps {
  empresa: Empresa;
  changingStatus: boolean;
  onEditar: (empresa: Empresa) => void;
  onToggleActiva: (empresa: Empresa) => void;
}

export const EmpresaDetailPanel = ({
  empresa,
  changingStatus,
  onEditar,
  onToggleActiva,
}: EmpresaDetailPanelProps) => {
  const detailRows = [
    { label: "Código", value: empresa.codigoEmpresa },
    { label: "Nombre comercial", value: empresa.nombreComercial },
    { label: "Razón social", value: empresa.razonSocial },
    { label: "Rubro", value: empresa.rubro },
    { label: "Moneda", value: empresa.moneda },
    { label: "WhatsApp", value: empresa.whatsAppContacto },
    { label: "Email", value: empresa.emailContacto },
    { label: "Color primario", value: empresa.colorPrimario },
    { label: "Color secundario", value: empresa.colorSecundario },
    { label: "Logo public id", value: empresa.logoPublicId },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4 rounded-2xl bg-[var(--color-card-hover)] p-5">
        <div>
          <h4 className="text-xl font-semibold text-[var(--color-text)]">
            {empresa.nombreComercial}
          </h4>
          <p className="mt-1 text-sm text-[var(--color-text-soft)]">
            {empresa.codigoEmpresa}
          </p>
        </div>

        <EstadoEmpresaBadge activa={empresa.activa} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {detailRows.map((item) => (
          <EmpresaInfoItem
            key={item.label}
            label={item.label}
            value={item.value}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="button"
          onClick={() => onEditar(empresa)}
          className="rounded-xl bg-[var(--color-text)] px-4 py-2.5 text-sm font-semibold text-white transition hover:opacity-95"
        >
          Editar empresa
        </button>

        <button
          type="button"
          onClick={() => onToggleActiva(empresa)}
          disabled={changingStatus}
          className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${
            empresa.activa
              ? "bg-red-50 text-red-700 ring-1 ring-red-200 hover:bg-red-100"
              : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
          }`}
        >
          {changingStatus
            ? "Procesando..."
            : empresa.activa
              ? "Desactivar"
              : "Activar"}
        </button>
      </div>
    </div>
  );
};
