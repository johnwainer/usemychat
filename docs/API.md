# API y Funciones de Base de Datos

## Funciones de Supabase

### Funciones de Autenticación y Roles

#### `is_admin(user_id UUID)`
Verifica si un usuario tiene rol de administrador.

**Parámetros:**
- `user_id`: UUID del usuario a verificar

**Retorna:** `BOOLEAN`

**Ejemplo:**
```sql
SELECT is_admin(auth.uid());
```

**Uso en RLS:**
```sql
CREATE POLICY "Admins can view all"
  ON table_name FOR SELECT
  USING (is_admin(auth.uid()));
```

---

### Funciones del Sistema de Equipos

#### `is_team_member(check_user_id UUID, owner_id UUID)`
Verifica si un usuario es miembro activo de un equipo.

**Parámetros:**
- `check_user_id`: UUID del usuario a verificar
- `owner_id`: UUID del propietario del workspace

**Retorna:** `BOOLEAN`

**Ejemplo:**
```sql
SELECT is_team_member(auth.uid(), 'workspace-owner-uuid');
```

---

#### `has_team_role(check_user_id UUID, owner_id UUID, required_role team_role)`
Verifica si un usuario tiene un rol específico en un equipo.

**Parámetros:**
- `check_user_id`: UUID del usuario a verificar
- `owner_id`: UUID del propietario del workspace
- `required_role`: Rol requerido ('owner', 'admin', 'supervisor', 'agent', 'viewer')

**Retorna:** `BOOLEAN`

**Ejemplo:**
```sql
SELECT has_team_role(auth.uid(), 'workspace-owner-uuid', 'admin');
```

---

#### `can_manage_team(check_user_id UUID, owner_id UUID)`
Verifica si un usuario puede gestionar el equipo (owner o admin).

**Parámetros:**
- `check_user_id`: UUID del usuario a verificar
- `owner_id`: UUID del propietario del workspace

**Retorna:** `BOOLEAN`

**Ejemplo:**
```sql
SELECT can_manage_team(auth.uid(), 'workspace-owner-uuid');
```

---

#### `get_team_role(check_user_id UUID, owner_id UUID)`
Obtiene el rol de un usuario en un equipo.

**Parámetros:**
- `check_user_id`: UUID del usuario
- `owner_id`: UUID del propietario del workspace

**Retorna:** `team_role` (enum)

**Ejemplo:**
```sql
SELECT get_team_role(auth.uid(), 'workspace-owner-uuid');
```

---

## Tablas Principales

### `profiles`
Perfiles de usuario con información extendida.

**Columnas:**
- `id` (UUID, PK): ID del usuario (referencia a auth.users)
- `email` (TEXT): Email del usuario
- `full_name` (TEXT): Nombre completo
- `role` (TEXT): 'admin' o 'client'
- `status` (TEXT): 'active', 'inactive', 'suspended'
- `phone` (TEXT): Teléfono
- `company` (TEXT): Empresa
- `avatar_url` (TEXT): URL del avatar
- `created_at` (TIMESTAMPTZ): Fecha de creación
- `updated_at` (TIMESTAMPTZ): Última actualización

**RLS Policies:**
- SELECT: Usuarios pueden ver su propio perfil, admins ven todos
- UPDATE: Usuarios pueden actualizar su propio perfil, admins pueden actualizar todos
- INSERT: Automático via trigger en auth.users
- DELETE: Solo admins

---

### `contacts`
Sistema CRM de contactos.

**Columnas:**
- `id` (UUID, PK): ID del contacto
- `user_id` (UUID, FK): Propietario del contacto
- `assigned_to` (UUID, FK): Agente asignado
- `name` (TEXT): Nombre del contacto
- `email` (TEXT): Email
- `phone` (TEXT): Teléfono
- `company` (TEXT): Empresa
- `job_title` (TEXT): Cargo
- `website` (TEXT): Sitio web
- `address` (TEXT): Dirección
- `city` (TEXT): Ciudad
- `country` (TEXT): País
- `lifecycle_stage` (TEXT): Etapa del ciclo de vida
- `lead_score` (INTEGER): Puntuación del lead (0-100)
- `tags` (TEXT[]): Etiquetas
- `notes` (TEXT): Notas
- `social_media` (JSONB): Redes sociales
- `created_at` (TIMESTAMPTZ): Fecha de creación
- `updated_at` (TIMESTAMPTZ): Última actualización

**Lifecycle Stages:**
- `lead`: Lead inicial
- `mql`: Marketing Qualified Lead
- `sql`: Sales Qualified Lead
- `opportunity`: Oportunidad
- `customer`: Cliente
- `evangelist`: Evangelista
- `other`: Otro

**RLS Policies:**
- SELECT: Propietario, asignado, admins, miembros del equipo (según rol)
- INSERT: Propietario, admins, miembros del equipo
- UPDATE: Propietario, asignado, admins, supervisores
- DELETE: Propietario, admins

---

### `contact_interactions`
Historial de interacciones con contactos.

**Columnas:**
- `id` (UUID, PK): ID de la interacción
- `contact_id` (UUID, FK): ID del contacto
- `user_id` (UUID, FK): Propietario del contacto
- `created_by` (UUID, FK): Usuario que creó la interacción
- `type` (TEXT): Tipo de interacción
- `direction` (TEXT): Dirección (inbound/outbound)
- `subject` (TEXT): Asunto
- `description` (TEXT): Descripción
- `duration_minutes` (INTEGER): Duración en minutos
- `outcome` (TEXT): Resultado
- `sentiment` (TEXT): Sentimiento
- `next_action` (TEXT): Próxima acción
- `next_action_date` (DATE): Fecha de próxima acción
- `created_at` (TIMESTAMPTZ): Fecha de creación

**Tipos de Interacción:**
- `call`: Llamada telefónica
- `email`: Email
- `meeting`: Reunión
- `note`: Nota
- `message`: Mensaje

**Dirección:**
- `inbound`: Entrante
- `outbound`: Saliente

**Sentimiento:**
- `positive`: Positivo
- `neutral`: Neutral
- `negative`: Negativo

**RLS Policies:**
- SELECT: Usuarios con acceso al contacto
- INSERT: Usuarios con acceso al contacto
- UPDATE: Creador, propietario, admins, supervisores
- DELETE: Propietario, admins

---

### `team_members`
Miembros del equipo por workspace.

**Columnas:**
- `id` (UUID, PK): ID del miembro
- `user_id` (UUID, FK): ID del usuario
- `workspace_owner_id` (UUID, FK): ID del propietario del workspace
- `role` (team_role): Rol del miembro
- `email` (TEXT): Email del miembro
- `full_name` (TEXT): Nombre completo
- `avatar_url` (TEXT): URL del avatar
- `is_active` (BOOLEAN): Estado activo
- `last_active_at` (TIMESTAMPTZ): Última actividad
- `invited_by` (UUID, FK): Quien invitó
- `invited_at` (TIMESTAMPTZ): Fecha de invitación
- `joined_at` (TIMESTAMPTZ): Fecha de unión
- `created_at` (TIMESTAMPTZ): Fecha de creación
- `updated_at` (TIMESTAMPTZ): Última actualización

**Roles (team_role enum):**
- `owner`: Propietario
- `admin`: Administrador
- `supervisor`: Supervisor
- `agent`: Agente
- `viewer`: Observador

**RLS Policies:**
- SELECT: Propietario, miembros del equipo
- INSERT: Propietario, admins
- UPDATE: Propietario, admins
- DELETE: Propietario, admins

---

### `team_invitations`
Invitaciones pendientes al equipo.

**Columnas:**
- `id` (UUID, PK): ID de la invitación
- `workspace_owner_id` (UUID, FK): ID del propietario del workspace
- `email` (TEXT): Email del invitado
- `role` (team_role): Rol asignado
- `invited_by` (UUID, FK): Quien invitó
- `token` (TEXT, UNIQUE): Token único de invitación
- `expires_at` (TIMESTAMPTZ): Fecha de expiración
- `accepted_at` (TIMESTAMPTZ): Fecha de aceptación
- `created_at` (TIMESTAMPTZ): Fecha de creación
- `updated_at` (TIMESTAMPTZ): Última actualización

**RLS Policies:**
- SELECT: Propietario, admins
- INSERT: Propietario, admins
- UPDATE: Propietario, admins
- DELETE: Propietario, admins

---

### `team_permissions`
Permisos granulares por miembro.

**Columnas:**
- `id` (UUID, PK): ID del permiso
- `team_member_id` (UUID, FK): ID del miembro
- `permission_key` (TEXT): Clave del permiso
- `granted` (BOOLEAN): Permiso otorgado
- `created_at` (TIMESTAMPTZ): Fecha de creación
- `updated_at` (TIMESTAMPTZ): Última actualización

**RLS Policies:**
- SELECT: Propietario, el propio miembro
- INSERT/UPDATE/DELETE: Propietario, admins

---

## Queries Comunes

### Obtener contactos con información del agente asignado

```sql
SELECT 
  c.*,
  p.full_name as assigned_agent_name,
  p.email as assigned_agent_email
FROM contacts c
LEFT JOIN profiles p ON c.assigned_to = p.id
WHERE c.user_id = auth.uid()
ORDER BY c.created_at DESC;
```

### Obtener interacciones de un contacto con información del creador

```sql
SELECT 
  ci.*,
  p.full_name as created_by_name
FROM contact_interactions ci
LEFT JOIN profiles p ON ci.created_by = p.id
WHERE ci.contact_id = 'contact-uuid'
ORDER BY ci.created_at DESC;
```

### Obtener miembros del equipo con estadísticas

```sql
SELECT 
  tm.*,
  COUNT(DISTINCT c.id) as assigned_contacts,
  COUNT(DISTINCT ci.id) as total_interactions
FROM team_members tm
LEFT JOIN contacts c ON c.assigned_to = tm.user_id
LEFT JOIN contact_interactions ci ON ci.created_by = tm.user_id
WHERE tm.workspace_owner_id = auth.uid()
GROUP BY tm.id
ORDER BY tm.created_at DESC;
```

### Verificar permisos de un usuario

```sql
SELECT 
  CASE 
    WHEN auth.uid() = 'workspace-owner-uuid' THEN 'owner'
    ELSE get_team_role(auth.uid(), 'workspace-owner-uuid')
  END as user_role,
  is_admin(auth.uid()) as is_system_admin,
  can_manage_team(auth.uid(), 'workspace-owner-uuid') as can_manage;
```

---

## Triggers

### `handle_new_user`
Crea automáticamente un perfil cuando se registra un nuevo usuario.

**Tabla:** `auth.users`
**Evento:** `AFTER INSERT`

---

### `trigger_set_timestamp`
Actualiza automáticamente el campo `updated_at`.

**Tablas:** `profiles`, `contacts`, `contact_interactions`, `team_members`
**Evento:** `BEFORE UPDATE`

---

## Índices

### Índices en `contacts`
- `idx_contacts_user_id`: user_id
- `idx_contacts_assigned_to`: assigned_to
- `idx_contacts_email`: email
- `idx_contacts_lifecycle_stage`: lifecycle_stage

### Índices en `contact_interactions`
- `idx_contact_interactions_contact_id`: contact_id
- `idx_contact_interactions_user_id`: user_id
- `idx_contact_interactions_created_by`: created_by
- `idx_contact_interactions_type`: type

### Índices en `team_members`
- `idx_team_members_workspace`: workspace_owner_id
- `idx_team_members_user`: user_id
- `idx_team_members_role`: role

### Índices en `team_invitations`
- `idx_team_invitations_workspace`: workspace_owner_id
- `idx_team_invitations_email`: email
- `idx_team_invitations_token`: token

---

## Ejemplos de Uso en Cliente

### Verificar si el usuario puede gestionar el equipo

```typescript
const { data, error } = await supabase
  .rpc('can_manage_team', {
    check_user_id: user.id,
    owner_id: workspaceOwnerId
  });

if (data) {
  // Usuario puede gestionar el equipo
}
```

### Obtener rol del usuario

```typescript
const { data: role, error } = await supabase
  .rpc('get_team_role', {
    check_user_id: user.id,
    owner_id: workspaceOwnerId
  });

console.log('User role:', role); // 'admin', 'agent', etc.
```

### Crear contacto con asignación

```typescript
const { data, error } = await supabase
  .from('contacts')
  .insert({
    user_id: workspaceOwnerId,
    assigned_to: agentUserId,
    name: 'John Doe',
    email: 'john@example.com',
    // ... otros campos
  });
```

### Crear interacción

```typescript
const { data, error } = await supabase
  .from('contact_interactions')
  .insert({
    contact_id: contactId,
    user_id: workspaceOwnerId,
    created_by: currentUserId,
    type: 'call',
    direction: 'outbound',
    subject: 'Follow-up call',
    description: 'Discussed pricing options',
    duration_minutes: 15,
    outcome: 'positive',
    sentiment: 'positive'
  });
```

---

## Notas de Seguridad

1. **Nunca exponer service_role_key** en el cliente
2. **Usar anon_key** para operaciones del cliente
3. **Confiar en RLS** para seguridad de datos
4. **Validar inputs** antes de insertar en la base de datos
5. **Usar funciones SECURITY DEFINER** con cuidado

---

**Última actualización**: Enero 2024
