import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import { MemberConfirmationModal } from "../../components/ui/modal/ModalConfirmationRegister";
import { COURSES, EDUCATION_LEVELS, GENDERS, MARITAL_STATUS, MINISTRIES, TALENTS } from "../../types/Options";
import toast from "react-hot-toast";
import { createMemberSchema } from "../../utils/member.schema";

import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateMember } from "../../useQuery/useCreateMember";
import z from "zod";

export default function FormElements() {
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [pendingData, setPendingData] =
    useState<CreateMemberFormData | null>(
      null
    );

  type CreateMemberFormData = z.infer<typeof createMemberSchema>;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateMemberFormData>({
    resolver: zodResolver(createMemberSchema) as Resolver<CreateMemberFormData>,
    defaultValues: {
      bautizado: false,
      cobertura: false,
      cursos: [],
      talentos_json: [],
      ministerios_json: [],
    },
  });

  const mutation =
    useCreateMember();

  const onSubmit = (
    data: CreateMemberFormData
  ) => {
    setPendingData(data);
    setIsModalOpen(true);
  };

  const handleConfirm = () => {
    if (!pendingData) return;

    mutation.mutate(pendingData, {
      onSuccess: () => {
        toast.success(
          'Miembro registrado correctamente'
        );

        reset();

        setPendingData(null);

        setIsModalOpen(false);
      },
    });
  };
  return (
    <div>
      <PageMeta
        title="Iglesia Ebenezer Principe de Paz Chalco MX - Dashboard"
        description="This is React.js Form Elements  Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle="Formulario de Registro para Nueva Cobertura" />
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-8"
          >
            {/* INFORMACIÓN PERSONAL */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Información Personal
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Datos generales del miembro.
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <input
                    placeholder="Nombres"
                    {...register('nombres')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    placeholder="Apellido Paterno"
                    {...register('apellido_paterno')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    placeholder="Apellido Materno"
                    {...register('apellido_materno')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    type="number"
                    placeholder="Edad"
                    {...register('edad')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    type="date"
                    {...register('fecha_nacimiento')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    placeholder="CURP"
                    {...register('curp')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                {errors.nombres && (
                  <p className="mt-3 text-sm font-medium text-red-500">
                    {errors.nombres.message}
                  </p>
                )}
              </div>
            </section>

            {/* DETALLES ECLESIÁSTICOS */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Detalles Eclesiásticos
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Información ministerial y académica.
                </p>
              </div>

              <div className="space-y-6 p-6">
                <div className="flex flex-wrap gap-4">
                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50">
                    <input
                      type="checkbox"
                      {...register('bautizado')}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Bautizado
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 px-4 py-3 transition hover:border-indigo-300 hover:bg-indigo-50">
                    <input
                      type="checkbox"
                      {...register('cobertura')}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-slate-700">
                      Cobertura
                    </span>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                  <select
                    {...register('nivel_academico')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="">Seleccione</option>

                    {EDUCATION_LEVELS.map(item => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>

                  <input
                    type="date"
                    {...register('fecha_conversion')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    placeholder="Ocupación"
                    {...register('ocupacion')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />

                  <input
                    placeholder="Iglesia anterior"
                    {...register('iglesia_anterior')}
                    className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>

                <textarea
                  {...register('razon_salida')}
                  rows={4}
                  placeholder="Razón de salida"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </section>

            {/* CURSOS */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Cursos
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-3 lg:grid-cols-4">
                {COURSES.map(course => (
                  <label
                    key={course}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      value={course}
                      {...register('cursos')}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-sm text-slate-700">
                      {course}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* TALENTOS */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Talentos
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-3 lg:grid-cols-4">
                {TALENTS.map(talent => (
                  <label
                    key={talent}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      value={talent}
                      {...register('talentos_json')}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-sm text-slate-700">
                      {talent}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* MINISTERIOS */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Ministerios
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3 p-6 md:grid-cols-3 lg:grid-cols-4">
                {MINISTRIES.map(ministry => (
                  <label
                    key={ministry}
                    className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all hover:border-indigo-300 hover:bg-indigo-50"
                  >
                    <input
                      type="checkbox"
                      value={ministry}
                      {...register('ministerios_json')}
                      className="h-4 w-4 rounded border-slate-300 text-indigo-600"
                    />
                    <span className="text-sm text-slate-700">
                      {ministry}
                    </span>
                  </label>
                ))}
              </div>
            </section>

            {/* CONTACTO */}

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="border-b border-slate-100 px-6 py-4">
                <h2 className="text-lg font-semibold text-slate-900">
                  Contacto y Datos Médicos
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2 xl:grid-cols-3">
                <input
                  placeholder="Correo"
                  {...register('correo')}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <input
                  placeholder="Teléfono"
                  {...register('telefono')}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <input
                  placeholder="Tipo de sangre"
                  {...register('tipo_sangre')}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                />

                <select
                  {...register('estado_civil')}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Seleccione</option>

                  {MARITAL_STATUS.map(status => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>

                <select
                  {...register('genero')}
                  className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 shadow-sm transition-all focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                >
                  <option value="">Seleccione</option>

                  {GENDERS.map(gender => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>
            </section>

            <div className="flex justify-end">
              <button
                disabled={mutation.isPending}
                className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-indigo-700 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {mutation.isPending
                  ? 'Registrando...'
                  : 'Registrar Miembro'}
              </button>
            </div>
          </form>

          <MemberConfirmationModal
            open={isModalOpen}
            loading={mutation.isPending}
            onCancel={() =>
              setIsModalOpen(false)
            }
            onConfirm={handleConfirm}
            memberName={`${watch(
              'nombres'
            )} ${watch(
              'apellido_paterno'
            )}`}
          />
        </>
      </div>
    </div>
  );
}
