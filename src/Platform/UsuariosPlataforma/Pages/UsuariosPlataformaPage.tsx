import { useEffect, useState } from "react";
import { AlertMessage } from "../../../Shared/Components/ui/AlertMessage";
import { EmptyState } from "../../../Shared/Components/ui/EmptyState";
import { SectionCard } from "../../../Shared/Components/ui/SectionCard";
import { UsuarioPlataformaCard } from "../Components/UsuarioPlataformaCard";
import { UsuarioPlataformaPanel } from "../Components/UsuarioPlataformaPanel";
import { UsuariosPlataformaHeader } from "../Components/UsuariosPlataformaHeader";
import { useUsuariosPlataforma } from "../Hooks/useUsuariosPlataforma";
import { usuarioPlataformaService } from "../Services/usuario-plataforma.service";
import type {
  ActualizarUsuarioPlataformaRequest,
  CambiarClaveUsuarioPlataformaRequest,
  CrearUsuarioPlataformaRequest,
  RolPlataforma,
  UsuarioPlataforma,
} from "../Types/usuario-plataforma.types";

type Mode = "list" | "detail" | "create" | "edit" | "password";

const createInitialForm = (): CrearUsuarioPlataformaRequest => ({
  nombre: "",
  usuario: "",
  email: "",
  clave: "",
  rol: "",
});

const editInitialForm = (): ActualizarUsuarioPlataformaRequest => ({
  nombre: "",
  usuario: "",
  email: "",
  rol: "",
});

const passwordInitialForm = (): CambiarClaveUsuarioPlataformaRequest => ({
  nuevaClave: "",
  confirmarNuevaClave: "",
});

export const UsuariosPlataformaPage = () => {
  const { usuarios, loading, error, filtroActivo, setFiltroActivo, recargar } =
    useUsuariosPlataforma();

  const [mode, setMode] = useState<Mode>("list");
  const [selectedUsuario, setSelectedUsuario] =
    useState<UsuarioPlataforma | null>(null);

  const [createForm, setCreateForm] =
    useState<CrearUsuarioPlataformaRequest>(createInitialForm());
  const [editForm, setEditForm] =
    useState<ActualizarUsuarioPlataformaRequest>(editInitialForm());
  const [passwordForm, setPasswordForm] =
    useState<CambiarClaveUsuarioPlataformaRequest>(passwordInitialForm());

  const [roles, setRoles] = useState<RolPlataforma[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(false);

  const [savingCreate, setSavingCreate] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [changingStatusId, setChangingStatusId] = useState<number | null>(null);

  const [panelError, setPanelError] = useState<string | null>(null);
  const [panelSuccess, setPanelSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!panelSuccess) return;

    const timeout = setTimeout(() => {
      setPanelSuccess(null);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [panelSuccess]);

  useEffect(() => {
    if (!panelError) return;

    const timeout = setTimeout(() => {
      setPanelError(null);
    }, 4500);

    return () => clearTimeout(timeout);
  }, [panelError]);

  useEffect(() => {
    const cargarRoles = async () => {
      try {
        setLoadingRoles(true);
        const data = await usuarioPlataformaService.getRoles();
        setRoles(data);
      } catch (error) {
        console.error("Error al obtener roles:", error);
        showPanelError("No se pudieron cargar los roles disponibles.");
      } finally {
        setLoadingRoles(false);
      }
    };

    void cargarRoles();
  }, []);

  const clearPanelMessages = () => {
    setPanelError(null);
    setPanelSuccess(null);
  };

  const showPanelError = (message: string) => {
    setPanelSuccess(null);
    setPanelError(message);
  };

  const showPanelSuccess = (message: string) => {
    setPanelError(null);
    setPanelSuccess(message);
  };

  const openCreate = () => {
    clearPanelMessages();
    setSelectedUsuario(null);
    setCreateForm(createInitialForm());
    setMode("create");
  };

  const openDetail = async (usuario: UsuarioPlataforma) => {
    clearPanelMessages();

    try {
      const detalle = await usuarioPlataformaService.getById(
        usuario.usuarioPlataformaId,
      );

      setSelectedUsuario(detalle);
      setMode("detail");
    } catch (error) {
      console.error("Error al obtener detalle:", error);
      showPanelError("No se pudo obtener el detalle del usuario.");
    }
  };

  const openEdit = async (usuario: UsuarioPlataforma) => {
    clearPanelMessages();

    try {
      const detalle = await usuarioPlataformaService.getById(
        usuario.usuarioPlataformaId,
      );

      setSelectedUsuario(detalle);
      setEditForm({
        nombre: detalle.nombre ?? "",
        usuario: detalle.usuario ?? "",
        email: detalle.email ?? "",
        rol: detalle.rol ?? "",
      });
      setMode("edit");
    } catch (error) {
      console.error("Error al obtener usuario para edición:", error);
      showPanelError("No se pudo cargar el usuario para edición.");
    }
  };

  const openPassword = async (usuario: UsuarioPlataforma) => {
    clearPanelMessages();

    try {
      const detalle = await usuarioPlataformaService.getById(
        usuario.usuarioPlataformaId,
      );

      setSelectedUsuario(detalle);
      setPasswordForm(passwordInitialForm());
      setMode("password");
    } catch (error) {
      console.error("Error al obtener usuario para cambio de clave:", error);
      showPanelError("No se pudo cargar el usuario para cambiar la clave.");
    }
  };

  const closePanel = () => {
    setMode("list");
    setSelectedUsuario(null);
    setPanelError(null);
  };

  const handleCreateSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!createForm.rol) {
      showPanelError("Debes seleccionar un rol.");
      return;
    }

    try {
      setSavingCreate(true);
      clearPanelMessages();

      await usuarioPlataformaService.create(createForm);
      await recargar();

      setCreateForm(createInitialForm());
      setMode("list");
      showPanelSuccess("Usuario de plataforma creado correctamente.");
    } catch (error) {
      console.error("Error al crear usuario:", error);
      showPanelError("No se pudo crear el usuario de plataforma.");
    } finally {
      setSavingCreate(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUsuario) return;

    if (!editForm.rol) {
      showPanelError("Debes seleccionar un rol.");
      return;
    }

    try {
      setSavingEdit(true);
      clearPanelMessages();

      await usuarioPlataformaService.update(
        selectedUsuario.usuarioPlataformaId,
        editForm,
      );

      const detalleActualizado = await usuarioPlataformaService.getById(
        selectedUsuario.usuarioPlataformaId,
      );

      setSelectedUsuario(detalleActualizado);
      await recargar();
      setMode("detail");
      showPanelSuccess("Usuario de plataforma actualizado correctamente.");
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      showPanelError("No se pudo actualizar el usuario de plataforma.");
    } finally {
      setSavingEdit(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedUsuario) return;

    if (passwordForm.nuevaClave !== passwordForm.confirmarNuevaClave) {
      showPanelError("La confirmación de clave no coincide.");
      return;
    }

    try {
      setSavingPassword(true);
      clearPanelMessages();

      await usuarioPlataformaService.cambiarClave(
        selectedUsuario.usuarioPlataformaId,
        passwordForm,
      );

      setPasswordForm(passwordInitialForm());
      setMode("detail");
      showPanelSuccess("Clave actualizada correctamente.");
    } catch (error) {
      console.error("Error al cambiar clave:", error);
      showPanelError("No se pudo actualizar la clave del usuario.");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleToggleActivo = async (usuario: UsuarioPlataforma) => {
    try {
      setChangingStatusId(usuario.usuarioPlataformaId);
      clearPanelMessages();

      await usuarioPlataformaService.setActivo(
        usuario.usuarioPlataformaId,
        !usuario.activo,
      );

      await recargar();

      if (
        selectedUsuario &&
        selectedUsuario.usuarioPlataformaId === usuario.usuarioPlataformaId
      ) {
        const detalleActualizado = await usuarioPlataformaService.getById(
          usuario.usuarioPlataformaId,
        );
        setSelectedUsuario(detalleActualizado);
      }

      showPanelSuccess(
        usuario.activo
          ? "Usuario desactivado correctamente."
          : "Usuario activado correctamente.",
      );
    } catch (error) {
      console.error("Error al cambiar estado:", error);
      showPanelError("No se pudo cambiar el estado del usuario.");
    } finally {
      setChangingStatusId(null);
    }
  };

  return (
    <div className="space-y-6">
      <UsuariosPlataformaHeader
        filtroActivo={filtroActivo}
        onChangeFiltro={setFiltroActivo}
        onNuevoUsuario={openCreate}
        onRecargar={() => void recargar()}
      />

      <div className="space-y-3">
        {panelSuccess && (
          <AlertMessage
            message={panelSuccess}
            variant="success"
            onClose={() => setPanelSuccess(null)}
          />
        )}

        {panelError && (
          <AlertMessage
            message={panelError}
            variant="error"
            onClose={() => setPanelError(null)}
          />
        )}
      </div>

      <SectionCard>
        <div className="space-y-4">
          {loading && (
            <AlertMessage
              message="Cargando usuarios de plataforma..."
              variant="info"
            />
          )}

          {!loading && error && (
            <AlertMessage message={error} variant="error" />
          )}

          {!loading && !error && usuarios.length === 0 && (
            <EmptyState
              title="No hay usuarios para mostrar"
              description="Todavía no existen usuarios de plataforma para el filtro seleccionado."
              actionLabel="Crear usuario"
              onAction={openCreate}
            />
          )}

          {!loading && !error && usuarios.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {usuarios.map((usuario) => (
                <UsuarioPlataformaCard
                  key={usuario.usuarioPlataformaId}
                  usuario={usuario}
                  changingStatus={
                    changingStatusId === usuario.usuarioPlataformaId
                  }
                  onVerDetalle={(item) => void openDetail(item)}
                  onEditar={(item) => void openEdit(item)}
                  onCambiarClave={(item) => void openPassword(item)}
                  onToggleActivo={(item) => void handleToggleActivo(item)}
                />
              ))}
            </div>
          )}
        </div>
      </SectionCard>

      <UsuarioPlataformaPanel
        mode={mode}
        selectedUsuario={selectedUsuario}
        changingStatus={
          changingStatusId === selectedUsuario?.usuarioPlataformaId
        }
        createForm={createForm}
        editForm={editForm}
        passwordForm={passwordForm}
        roles={roles}
        loadingRoles={loadingRoles}
        savingCreate={savingCreate}
        savingEdit={savingEdit}
        savingPassword={savingPassword}
        onClose={closePanel}
        onEditFromDetail={(usuario) => void openEdit(usuario)}
        onPasswordFromDetail={(usuario) => void openPassword(usuario)}
        onToggleActivo={(usuario) => void handleToggleActivo(usuario)}
        onCreateChange={(field, value) =>
          setCreateForm((prev) => ({ ...prev, [field]: value }))
        }
        onEditChange={(field, value) =>
          setEditForm((prev) => ({ ...prev, [field]: value }))
        }
        onPasswordChange={(field, value) =>
          setPasswordForm((prev) => ({ ...prev, [field]: value }))
        }
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
        onPasswordSubmit={handlePasswordSubmit}
      />
    </div>
  );
};
