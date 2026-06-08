import {
  Edit3,
  Mail,
  Phone,
  Calendar,
  User,
  Heart,
  Church,
  GraduationCap,
  Sparkles,
  Shield,
} from "lucide-react";

export interface Member {
  id: number;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  edad: number;
  curp: string;
  fecha_nacimiento: string;
  bautizado: boolean;
  nivel_academico: string;
  fecha_conversion: string;
  ocupacion: string;
  cursos: string[];
  iglesia_anterior: string;
  razon_salida: string;
  talentos_json: string[];
  correo: string;
  telefono: string;
  tipo_sangre: string;
  estado_civil: string;
  genero: string;
  created_at: string;
  ministerios_json: string[];
  cobertura: boolean;
}

interface MemberProfileDashboardProps {
  member: Member;
  onEdit?: () => void;
}

export default function MemberProfileDashboard({
  member,
  onEdit,
}: MemberProfileDashboardProps) {
  const fullName = `${member.nombres} ${member.apellido_paterno} ${member.apellido_materno}`;

  const initials = `${member.nombres?.[0] ?? ""}${member.apellido_paterno?.[0] ?? ""
    }`;

  const isEmptyValue = (value?: string) => {
    if (!value) return true;

    return (
      value.trim() === "" ||
      value.toLowerCase() === "no hay" ||
      value.toLowerCase() === "null"
    );
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(date));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HEADER */}
        <div className="rounded-3xl border border-slate-200/60 bg-white shadow-sm">
          <div className="flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-500 text-2xl font-bold text-white shadow-sm">
                {initials}
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">
                  {fullName}
                </h1>

                <div className="mt-2 flex flex-wrap gap-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail size={16} />
                    {member.correo}
                  </div>

                  <div className="flex items-center gap-2">
                    <Phone size={16} />
                    {member.telefono}
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${member.cobertura
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                        : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
                      }`}
                  >
                    <Shield size={14} className="mr-1" />
                    {member.cobertura
                      ? "Bajo Cobertura"
                      : "Sin Cobertura"}
                  </span>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${member.bautizado
                        ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200"
                        : "bg-slate-100 text-slate-600 ring-1 ring-slate-200"
                      }`}
                  >
                    {member.bautizado
                      ? "Bautizado"
                      : "No Bautizado"}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onEdit}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <Edit3 size={16} />
              Editar Perfil
            </button>
          </div>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* INFORMACIÓN PERSONAL */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-4">
            <div className="mb-5 flex items-center gap-2">
              <User className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-900">
                Información Personal
              </h2>
            </div>

            <div className="space-y-4">
              <InfoRow label="Edad" value={`${member.edad} años`} />

              <InfoRow label="Género" value={member.genero} />

              <InfoRow
                label="Estado Civil"
                value={member.estado_civil}
              />

              <InfoRow
                label="Fecha Nacimiento"
                value={formatDate(member.fecha_nacimiento)}
              />

              <InfoRow
                label="Nivel Académico"
                value={member.nivel_academico}
              />

              <InfoRow
                label="Ocupación"
                value={member.ocupacion}
              />

              <InfoRow
                label="CURP"
                value={member.curp || "No registrada"}
                muted={!member.curp}
              />

              <InfoRow
                label="Tipo de Sangre"
                value={member.tipo_sangre || "No registrado"}
                muted={!member.tipo_sangre}
              />
            </div>
          </div>

          {/* INFORMACIÓN ECLESIÁSTICA */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-4">
            <div className="mb-5 flex items-center gap-2">
              <Church className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-900">
                Información Eclesiástica
              </h2>
            </div>

            <div className="space-y-4">
              <InfoRow
                label="Fecha de Conversión"
                value={formatDate(member.fecha_conversion)}
              />

              <InfoRow
                label="Bautizado"
                value={member.bautizado ? "Sí" : "No"}
              />

              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                  Iglesia Anterior
                </p>

                {isEmptyValue(member.iglesia_anterior) ? (
                  <EmptyState text="Sin iglesia anterior registrada" />
                ) : (
                  <p className="font-medium text-slate-800">
                    {member.iglesia_anterior}
                  </p>
                )}
              </div>

              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
                  Razón de Salida
                </p>

                {isEmptyValue(member.razon_salida) ? (
                  <EmptyState text="No aplica" />
                ) : (
                  <p className="font-medium text-slate-800">
                    {member.razon_salida}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* TALENTOS */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-4">
            <div className="mb-5 flex items-center gap-2">
              <Sparkles className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-900">
                Talentos y Habilidades
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {member.talentos_json.map((talent) => (
                <span
                  key={talent}
                  className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-xs font-medium text-indigo-700"
                >
                  {talent}
                </span>
              ))}
            </div>
          </div>

          {/* MINISTERIOS */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-6">
            <div className="mb-5 flex items-center gap-2">
              <Heart className="text-indigo-600" size={20} />
              <h2 className="text-lg font-semibold text-slate-900">
                Ministerios Activos
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {member.ministerios_json.map((ministerio) => (
                <span
                  key={ministerio}
                  className="inline-flex items-center rounded-md bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700"
                >
                  {ministerio}
                </span>
              ))}
            </div>
          </div>

          {/* CURSOS */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-6">
            <div className="mb-5 flex items-center gap-2">
              <GraduationCap
                className="text-indigo-600"
                size={20}
              />
              <h2 className="text-lg font-semibold text-slate-900">
                Cursos Completados
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {member.cursos.map((curso) => (
                <span
                  key={curso}
                  className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700"
                >
                  {curso}
                </span>
              ))}
            </div>
          </div>

          {/* INFORMACIÓN DEL SISTEMA */}
          <div className="rounded-3xl border border-slate-200/60 bg-white p-6 shadow-sm xl:col-span-12">
            <div className="flex items-center gap-2">
              <Calendar
                className="text-indigo-600"
                size={20}
              />

              <h2 className="text-lg font-semibold text-slate-900">
                Información de Registro
              </h2>
            </div>

            <p className="mt-4 text-sm text-slate-600">
              Miembro registrado el{" "}
              <span className="font-medium text-slate-900">
                {formatDate(member.created_at)}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
  muted?: boolean;
}

function InfoRow({
  label,
  value,
  muted = false,
}: InfoRowProps) {
  return (
    <div>
      <p className="mb-1 text-xs uppercase tracking-wide text-slate-400">
        {label}
      </p>

      <p
        className={`font-medium ${muted ? "text-slate-400" : "text-slate-800"
          }`}
      >
        {value}
      </p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
      {text}
    </div>
  );
}