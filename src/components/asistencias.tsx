// App.tsx
import { JSX, useMemo, useState } from "react";

/* =========================================================
   TYPES
========================================================= */

type EstadoAsistencia = "presente" | "ausente" | "tarde";

interface Asistencia {
    id: string;
    nombreCompleto: string;
    fecha: string;
    estado: EstadoAsistencia;
    cobertura: boolean;
}

/* =========================================================
   MOCK DATA
========================================================= */

const asistenciasIniciales: Asistencia[] = [
    {
        id: "1",
        nombreCompleto: "Juan Pérez",
        fecha: "2026-05-30",
        estado: "presente",
        cobertura: true,
    },
    {
        id: "2",
        nombreCompleto: "María López",
        fecha: "2026-05-30",
        estado: "tarde",
        cobertura: false,
    },
    {
        id: "3",
        nombreCompleto: "Carlos Hernández",
        fecha: "2026-05-30",
        estado: "ausente",
        cobertura: false,
    },
    {
        id: "4",
        nombreCompleto: "Ana Martínez",
        fecha: "2026-05-30",
        estado: "presente",
        cobertura: true,
    },
    {
        id: "5",
        nombreCompleto: "Luis Ramírez",
        fecha: "2026-05-30",
        estado: "presente",
        cobertura: false,
    },
];

/* =========================================================
   HELPERS
========================================================= */

const formatearFecha = (fecha: Date): string => {
    return new Intl.DateTimeFormat("es-MX", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(fecha);
};

const obtenerDiaActual = (): number => {
    return new Date().getDay();
};

// Solo domingos (0) y jueves (4)
const esDiaPermitido = (): boolean => {
    const dia = obtenerDiaActual();
    return dia === 0 || dia === 4;
};

const badgeStyles: Record<EstadoAsistencia, string> = {
    presente:
        "bg-green-100 text-green-700 border border-green-200",
    ausente:
        "bg-red-100 text-red-700 border border-red-200",
    tarde:
        "bg-yellow-100 text-yellow-700 border border-yellow-200",
};

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */

export default function AppAsistencias(): JSX.Element {
    const [asistencias, setAsistencias] = useState<Asistencia[]>(
        asistenciasIniciales
    );

    const [busqueda, setBusqueda] = useState<string>("");
    const [filtroEstado, setFiltroEstado] = useState<
        "todos" | EstadoAsistencia
    >("todos");

    const puedeTomarAsistencia = esDiaPermitido();

    /* =========================================================
       FILTROS MEMOIZADOS
    ========================================================= */

    const asistenciasFiltradas = useMemo(() => {
        return asistencias.filter((asistencia) => {
            const coincideBusqueda =
                asistencia.nombreCompleto
                    .toLowerCase()
                    .includes(busqueda.toLowerCase());

            const coincideEstado =
                filtroEstado === "todos"
                    ? true
                    : asistencia.estado === filtroEstado;

            return coincideBusqueda && coincideEstado;
        });
    }, [asistencias, busqueda, filtroEstado]);

    /* =========================================================
       RESUMEN
    ========================================================= */

    const resumen = useMemo(() => {
        return {
            total: asistencias.length,
            presentes: asistencias.filter(
                (item) => item.estado === "presente"
            ).length,
            ausentes: asistencias.filter(
                (item) => item.estado === "ausente"
            ).length,
            tardes: asistencias.filter(
                (item) => item.estado === "tarde"
            ).length,
        };
    }, [asistencias]);

    /* =========================================================
       CAMBIAR ESTADO
    ========================================================= */

    const cambiarEstado = (
        id: string,
        nuevoEstado: EstadoAsistencia
    ): void => {
        if (!puedeTomarAsistencia) {
            alert(
                "Solo se puede tomar asistencia los domingos y jueves."
            );
            return;
        }

        setAsistencias((prev) =>
            prev.map((asistencia) =>
                asistencia.id === id
                    ? {
                        ...asistencia,
                        estado: nuevoEstado,
                    }
                    : asistencia
            )
        );
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* =====================================================
          HEADER
      ====================================================== */}

            <header className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Control de Asistencias
                            </h1>

                            <p className="text-sm text-gray-500 mt-1 capitalize">
                                {formatearFecha(new Date())}
                            </p>

                            {!puedeTomarAsistencia && (
                                <p className="mt-2 text-sm font-medium text-red-600">
                                    Hoy no está habilitada la toma de asistencia.
                                </p>
                            )}
                        </div>

                        {/* Cards resumen */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <ResumenCard
                                titulo="Total"
                                valor={resumen.total}
                            />

                            <ResumenCard
                                titulo="Presentes"
                                valor={resumen.presentes}
                            />

                            <ResumenCard
                                titulo="Ausentes"
                                valor={resumen.ausentes}
                            />

                            <ResumenCard
                                titulo="Tardes"
                                valor={resumen.tardes}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* =====================================================
          CONTENIDO
      ====================================================== */}

            <main className="max-w-7xl mx-auto px-4 py-6">
                {/* ===================================================
            BUSQUEDA Y FILTROS
        ==================================================== */}

                <section className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Busqueda */}
                        <div className="flex-1">
                            <label
                                htmlFor="buscar"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Buscar hermano
                            </label>

                            <input
                                id="buscar"
                                type="text"
                                placeholder="Buscar por nombre..."
                                value={busqueda}
                                onChange={(e) =>
                                    setBusqueda(e.target.value)
                                }
                                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
                            />
                        </div>

                        {/* Filtro */}
                        <div className="w-full md:w-64">
                            <label
                                htmlFor="estado"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Filtrar estado
                            </label>

                            <select
                                id="estado"
                                value={filtroEstado}
                                onChange={(e) =>
                                    setFiltroEstado(
                                        e.target.value as
                                        | "todos"
                                        | EstadoAsistencia
                                    )
                                }
                                className="
                  w-full
                  rounded-xl
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-sm
                  outline-none
                  transition
                  focus:border-blue-500
                  focus:ring-2
                  focus:ring-blue-200
                "
                            >
                                <option value="todos">Todos</option>
                                <option value="presente">
                                    Presentes
                                </option>
                                <option value="ausente">
                                    Ausentes
                                </option>
                                <option value="tarde">Tardes</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* ===================================================
            TABLA DESKTOP
        ==================================================== */}

                <section className="hidden md:block">
                    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                        <table className="min-w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Nombre
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Fecha
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Estado
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Cobertura
                                    </th>

                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                                        Acciones
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {asistenciasFiltradas.map((asistencia) => (
                                    <tr
                                        key={asistencia.id}
                                        className="border-b border-gray-100 hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800">
                                            {asistencia.nombreCompleto}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {asistencia.fecha}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span
                                                className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-semibold
                          capitalize
                          ${badgeStyles[asistencia.estado]}
                        `}
                                            >
                                                {asistencia.estado}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {asistencia.cobertura
                                                ? "Sí"
                                                : "No"}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-2">
                                                <EstadoButton
                                                    texto="Presente"
                                                    onClick={() =>
                                                        cambiarEstado(
                                                            asistencia.id,
                                                            "presente"
                                                        )
                                                    }
                                                />

                                                <EstadoButton
                                                    texto="Tarde"
                                                    onClick={() =>
                                                        cambiarEstado(
                                                            asistencia.id,
                                                            "tarde"
                                                        )
                                                    }
                                                />

                                                <EstadoButton
                                                    texto="Ausente"
                                                    onClick={() =>
                                                        cambiarEstado(
                                                            asistencia.id,
                                                            "ausente"
                                                        )
                                                    }
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {asistenciasFiltradas.length === 0 && (
                            <div className="p-8 text-center text-gray-500">
                                No se encontraron resultados.
                            </div>
                        )}
                    </div>
                </section>

                {/* ===================================================
            MOBILE CARDS
        ==================================================== */}

                <section className="md:hidden space-y-4">
                    {asistenciasFiltradas.map((asistencia) => (
                        <div
                            key={asistencia.id}
                            className="
                rounded-2xl
                border
                border-gray-200
                bg-white
                p-4
                shadow-sm
              "
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-base font-semibold text-gray-800">
                                        {asistencia.nombreCompleto}
                                    </h3>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {asistencia.fecha}
                                    </p>
                                </div>

                                <span
                                    className={`
                    inline-flex
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-semibold
                    capitalize
                    ${badgeStyles[asistencia.estado]}
                  `}
                                >
                                    {asistencia.estado}
                                </span>
                            </div>

                            <div className="mt-4">
                                <p className="text-sm text-gray-600">
                                    Cobertura:{" "}
                                    <span className="font-medium">
                                        {asistencia.cobertura
                                            ? "Sí"
                                            : "No"}
                                    </span>
                                </p>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-2">
                                <EstadoButton
                                    texto="Presente"
                                    onClick={() =>
                                        cambiarEstado(
                                            asistencia.id,
                                            "presente"
                                        )
                                    }
                                />

                                <EstadoButton
                                    texto="Tarde"
                                    onClick={() =>
                                        cambiarEstado(
                                            asistencia.id,
                                            "tarde"
                                        )
                                    }
                                />

                                <EstadoButton
                                    texto="Ausente"
                                    onClick={() =>
                                        cambiarEstado(
                                            asistencia.id,
                                            "ausente"
                                        )
                                    }
                                />
                            </div>
                        </div>
                    ))}

                    {asistenciasFiltradas.length === 0 && (
                        <div className="bg-white rounded-2xl p-6 text-center text-gray-500 border border-gray-200">
                            No se encontraron resultados.
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}

/* =========================================================
   COMPONENTE CARD RESUMEN
========================================================= */

interface ResumenCardProps {
    titulo: string;
    valor: number;
}

function ResumenCard({
    titulo,
    valor,
}: ResumenCardProps): JSX.Element {
    return (
        <div
            className="
        bg-gray-50
        border
        border-gray-200
        rounded-2xl
        px-4
        py-3
        min-w-[100px]
      "
        >
            <p className="text-xs text-gray-500">
                {titulo}
            </p>

            <h3 className="text-xl font-bold text-gray-800 mt-1">
                {valor}
            </h3>
        </div>
    );
}

/* =========================================================
   BOTONES DE ESTADO
========================================================= */

interface EstadoButtonProps {
    texto: string;
    onClick: () => void;
}

function EstadoButton({
    texto,
    onClick,
}: EstadoButtonProps): JSX.Element {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        rounded-xl
        border
        border-gray-300
        bg-white
        px-3
        py-2
        text-xs
        font-medium
        text-gray-700
        transition
        hover:bg-gray-100
        focus:outline-none
        focus:ring-2
        focus:ring-blue-300
      "
        >
            {texto}
        </button>
    );
}