import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateGuard } from "../Guards/PrivateGuard";
import { AuthLayout } from "../Layouts/AuthLayout";
import { DashboardLayout } from "../Layouts/DashboardLayout";
import { ROUTES } from "./routes";

import { CoreLoginPage } from "../../Core/Auth/Pages/CoreLoginPage";
import { MasterLoginPage } from "../../Platform/Auth/Pages/MasterLoginPage";
import { ResetPasswordPage } from "../../Platform/Auth/Pages/ResetPasswordPage";

import { DashboardPage as CoreDashboardPage } from "../../Core/Dashboard/Pages/DashboardPage";
import { DashboardPage as PlatformDashboardPage } from "../../Platform/Dashboard/Pages/DashboardPage";

import { EmpresasPage } from "../../Platform/Empresas/Pages/EmpresasPage";
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
          <Route path={ROUTES.AUTH.CORE_LOGIN} element={<CoreLoginPage />} />
          <Route
            path={ROUTES.AUTH.MASTER_LOGIN}
            element={<MasterLoginPage />}
          />
          <Route
            path={ROUTES.AUTH.MASTER_RESET_PASSWORD}
            element={<ResetPasswordPage />}
          />
        </Route>

        <Route element={<PrivateGuard />}>
          <Route element={<DashboardLayout />}>
            <Route
              path={ROUTES.CORE.DASHBOARD}
              element={<CoreDashboardPage />}
            />

            <Route
              path={ROUTES.PLATFORM.DASHBOARD}
              element={<PlatformDashboardPage />}
            />

            <Route path={ROUTES.CORE.EMPRESAS} element={<EmpresasPage />} />
            <Route
              path={ROUTES.CORE.USUARIOS_PLATAFORMA}
              element={<UsuariosPlataformaPage />}
            />
            <Route
              path={ROUTES.CORE.MODULOS_CATALOGO}
              element={<ModulosCatalogoPage />}
            />
            <Route
              path={ROUTES.CORE.MODULOS_EMPRESA}
              element={<ModulosEmpresaPage />}
            />
            <Route
              path={ROUTES.CORE.DOMINIOS_EMPRESA}
              element={<DominiosEmpresaPage />}
            />
            <Route
              path={ROUTES.CORE.BASES_DATOS_EMPRESA}
              element={<BasesDatosEmpresaPage />}
            />
          </Route>
        </Route>

        <Route
          path="/"
          element={<Navigate to={ROUTES.AUTH.CORE_LOGIN} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={ROUTES.AUTH.CORE_LOGIN} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};
