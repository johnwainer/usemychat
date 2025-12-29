# Sistema de Gestión de Equipos

## Descripción General

El sistema de gestión de equipos permite a los clientes agregar miembros ilimitados a su workspace con diferentes roles y permisos. Cada miembro puede tener acceso específico según su rol.

## Roles Disponibles

### 1. **Owner (Propietario)**
- **Acceso**: Completo
- **Permisos**:
  - Gestionar facturación
  - Eliminar workspace
  - Todas las funciones de Admin
- **Nota**: Solo puede haber un propietario por workspace (el creador de la cuenta)

### 2. **Admin (Administrador)**
- **Acceso**: Casi completo
- **Permisos**:
  - Gestionar miembros del equipo (invitar, editar roles, eliminar)
  - Acceso a todas las configuraciones
  - Ver y gestionar todos los contactos
  - Ver y gestionar todas las conversaciones
  - Acceso a estadísticas completas

### 3. **Supervisor**
- **Acceso**: Supervisión y gestión de agentes
- **Permisos**:
  - Ver todas las conversaciones
  - Gestionar agentes (asignar conversaciones)
  - Ver estadísticas del equipo
  - Ver todos los contactos
  - No puede gestionar miembros del equipo

### 4. **Agent (Agente)**
- **Acceso**: Operativo
- **Permisos**:
  - Manejar conversaciones asignadas
  - Ver y editar contactos asignados
  - Crear interacciones con contactos
  - Ver estadísticas propias
  - No puede ver conversaciones de otros agentes

### 5. **Viewer (Observador)**
- **Acceso**: Solo lectura
- **Permisos**:
  - Ver conversaciones (sin responder)
  - Ver contactos (sin editar)
  - Ver reportes y estadísticas
  - No puede realizar acciones

## Funcionalidades

### Para Propietarios y Administradores

#### Invitar Miembros
1. Ir a **Dashboard → Equipo**
2. Hacer clic en **"Invitar Miembro"**
3. Ingresar el email del nuevo miembro
4. Seleccionar el rol apropiado
5. Hacer clic en **"Enviar Invitación"**

#### Gestionar Invitaciones
- Ver invitaciones pendientes
- Copiar enlace de invitación para compartir
- Cancelar invitaciones no aceptadas
- Las invitaciones expiran en 7 días

#### Gestionar Miembros
- Ver lista completa de miembros
- Cambiar roles de miembros existentes
- Desactivar o eliminar miembros
- Ver última actividad de cada miembro
- Filtrar por rol o buscar por nombre/email

### Para Miembros Invitados

#### Aceptar Invitación
1. Recibir email con enlace de invitación
2. Hacer clic en el enlace
3. Iniciar sesión o crear cuenta (debe usar el email invitado)
4. Revisar los detalles de la invitación
5. Hacer clic en **"Aceptar Invitación"**
6. Acceder al dashboard con los permisos del rol asignado

## Estructura de Base de Datos

### Tablas Principales

#### `team_members`
- Almacena todos los miembros del equipo
- Campos: user_id, workspace_owner_id, role, email, full_name, is_active, etc.

#### `team_invitations`
- Almacena invitaciones pendientes
- Campos: email, role, token, expires_at, accepted_at, etc.

#### `team_permissions`
- Permisos granulares adicionales (para futuras expansiones)
- Permite personalizar permisos específicos por miembro

### Funciones de Base de Datos

- `is_team_member()`: Verifica si un usuario es miembro del equipo
- `has_team_role()`: Verifica si un usuario tiene un rol específico
- `can_manage_team()`: Verifica si un usuario puede gestionar el equipo
- `get_team_role()`: Obtiene el rol de un usuario en un workspace

## Políticas de Seguridad (RLS)

### Contactos
- Los miembros del equipo pueden ver contactos del workspace
- Los agentes solo ven contactos asignados a ellos
- Supervisores y admins ven todos los contactos

### Interacciones
- Los miembros del equipo pueden crear interacciones
- Todos los miembros pueden ver interacciones de contactos accesibles
- Solo admins y supervisores pueden eliminar interacciones

### Conversaciones
- Los agentes solo ven conversaciones asignadas
- Supervisores y admins ven todas las conversaciones
- Viewers tienen acceso de solo lectura

## Migraciones SQL

### Aplicar Migraciones

Para aplicar las migraciones en Supabase:

1. Ir a **Supabase Dashboard → SQL Editor**
2. Ejecutar en orden:
   - `20240125000000_fix_contact_interactions_rls.sql`
   - `20240125000001_create_team_system.sql`

O usar el CLI de Supabase:
```bash
npx supabase db push
```

## Rutas de la Aplicación

- `/dashboard/team` - Gestión de equipo (solo propietarios y admins)
- `/team/join/[token]` - Aceptar invitación al equipo

## Características Adicionales

### Asignación de Contactos
- Los contactos pueden ser asignados a agentes específicos
- Campo `assigned_to` en la tabla `contacts`
- Los agentes solo ven sus contactos asignados

### Tracking de Actividad
- `last_active_at` registra la última actividad del miembro
- `joined_at` registra cuándo el miembro aceptó la invitación
- Útil para reportes y gestión del equipo

### Seguridad
- Tokens únicos para cada invitación
- Expiración automática de invitaciones (7 días)
- Validación de email en aceptación de invitaciones
- RLS policies para proteger datos entre equipos

## Próximas Mejoras

- [ ] Notificaciones por email al enviar invitaciones
- [ ] Dashboard de actividad del equipo
- [ ] Permisos granulares personalizables
- [ ] Límites de miembros según plan de suscripción
- [ ] Historial de cambios de roles
- [ ] Integración con sistema de notificaciones en tiempo real
- [ ] Reportes de productividad por agente
- [ ] Asignación automática de conversaciones

## Soporte

Para cualquier problema o pregunta sobre el sistema de equipos, contactar al administrador del sistema.
