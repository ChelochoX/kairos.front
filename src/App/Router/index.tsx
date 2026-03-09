import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateGuard } from "../Guards/PrivateGuard";
import { AuthLayout } from "../Layouts/AuthLayout";
import { DashboardLayout } from "../Layouts/DashboardLayout";

import { LoginPage } from "../../Platform/Auth/Pages/LoginPage";
import { DashboardPage } from "../../Platform/Dashboard/Pages/DashboardPage";

import { EmpresasPage } from "../../Platform/Empresas/Pages/EmpresasPage";
import { CrearEmpresaPage } from "../../Platform/Empresas/Pages/CrearEmpresaPage";

import { UsuariosPlataformaPage } from "../../Platform/UsuariosPlataforma/Pages/UsuariosPlataformaPage";
import { ModulosCatalogoPage } from "../../Platform/ModulosCatalogo/Pages/ModulosCatalogoPage";
import { ModulosEmpresaPage } from "../../Platform/ModulosEmpresa/Pages/ModulosEmpresaPage";
import { DominiosEmpresaPage } from "../../Platform/DominiosEmpresa/Pages/DominiosEmpresaPage";
import { BasesDatosEmpresaPage } from "../../Platform/BasesDatosEmpresa/Pages/BasesDatosEmpresaPage";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/empresas" element={<EmpresasPage />} />
            <Route
              path="/dashboard/empresas/nueva"
              element={<CrearEmpresaPage />}
            />
            <Route
              path="/dashboard/usuarios-plataforma"
              element={<UsuariosPlataformaPage />}
            />
            <Route
              path="/dashboard/modulos-catalogo"
              element={<ModulosCatalogoPage />}
            />
            <Route
              path="/dashboard/modulos-empresa"
              element={<ModulosEmpresaPage />}
            />
            <Route
              path="/dashboard/dominios-empresa"
              element={<DominiosEmpresaPage />}
            />
            <Route
              path="/dashboard/bases-datos-empresa"
              element={<BasesDatosEmpresaPage />}
            />
          </Route>
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
