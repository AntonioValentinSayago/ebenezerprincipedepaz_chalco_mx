import { X } from "lucide-react";
import { Usuario } from "../../types/UserEbenzer";

interface EditMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Usuario;
}

export default function EditMemberModal({
  isOpen,
  onClose,
  member,
}: EditMemberModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="absolute inset-x-4 top-8 mx-auto max-w-5xl">
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">
                Editar Miembro
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Actualiza la información personal y ministerial.
              </p>
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 hover:bg-slate-100 transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="max-h-[75vh] overflow-y-auto p-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Nombre */}
              <Field
                label="Nombre(s)"
                defaultValue={member.nombres}
              />

              <Field
                label="Apellido Paterno"
                defaultValue={member.apellido_paterno}
              />

              <Field
                label="Apellido Materno"
                defaultValue={member.apellido_materno}
              />

              <Field
                label="Correo"
                type="email"
                defaultValue={member.correo}
              />

              <Field
                label="Teléfono"
                defaultValue={member.telefono}
              />

              <Field
                label="Edad"
                type="number"
                disabled={true}
                defaultValue={member.edad}
              />

              <Field
                label="Ocupación"
                defaultValue={member.ocupacion}
              />

              <Field
                label="Nivel Académico"
                defaultValue={member.nivel_academico}
              />
            </div>

            {/* Información Eclesiástica */}
            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Información Eclesiástica
              </h3>

              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Fecha Conversión"
                  type="date"
                  defaultValue={member.fecha_conversion}
                />

                <Field
                  label="Iglesia Anterior"
                  defaultValue={member.iglesia_anterior}
                />
              </div>
            </div>

            {/* Talentos */}
            <div className="mt-10">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
                Talentos
              </h3>

              <textarea
                defaultValue={member.talentos_json.join(", ")}
                rows={4}
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 border-t border-slate-100 px-6 py-5">
            <button
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-slate-700 hover:bg-slate-50 transition"
            >
              Cancelar
            </button>

            <button className="rounded-xl bg-indigo-600 px-5 py-2.5 font-medium text-white hover:bg-indigo-700 transition">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
  disabled = false,
}: {
  label: string;
  defaultValue?: string | number;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700">
        {label}
      </label>

      <input
        type={type}
        defaultValue={defaultValue}
        disabled={disabled}
        className={`w-full rounded-xl border border-slate-200 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100  ${disabled ? "bg-slate-100 cursor-not-allowed" : "bg-white"}`}
      />
    </div>
  );
}