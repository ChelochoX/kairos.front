export interface ModuleCatalogItem {
  code: string;
  title: string;
  description: string;
  status: "Disponible" | "Próximamente";
}

export const CORE_MODULE_CATALOG: ModuleCatalogItem[] = [
  {
    code: "MARKETPLACE",
    title: "Marketplace",
    description:
      "Gestioná publicaciones, catálogos, productos y operaciones comerciales.",
    status: "Disponible",
  },
  {
    code: "ERP",
    title: "ERP",
    description:
      "Accedé a procesos internos, gestión administrativa y operaciones empresariales.",
    status: "Disponible",
  },
  {
    code: "CRM",
    title: "CRM",
    description: "Administrá clientes, oportunidades y seguimiento comercial.",
    status: "Próximamente",
  },
];
