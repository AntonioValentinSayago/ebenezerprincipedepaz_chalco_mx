import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserEbenezer } from "../../../api/DevEbenezerApi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Alert from "../../ui/alert/Alert";

interface Member {
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

export default function BasicTableOne() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryFn: getUserEbenezer,
    queryKey: ["userEbenezer"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any
  const members: Member[] = (data as any)?.data || [];

  // Filtro búsqueda
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const fullName =
        `${member.nombres} ${member.apellido_paterno} ${member.apellido_materno}`.toLowerCase();

      return (
        fullName.includes(search.toLowerCase()) ||
        member.correo?.toLowerCase().includes(search.toLowerCase()) ||
        member.telefono?.includes(search)
      );
    });
  }, [members, search]);


  // Paginación
  const totalPages = Math.ceil(filteredMembers.length / recordsPerPage);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredMembers.slice(
      startIndex,
      startIndex + recordsPerPage
    );
  }, [filteredMembers, currentPage]);

  if (isLoading) return "Cargando...";

  if (isError)
    return (
      <Alert
        variant="error"
        title="Error Message"
        message="Be cautious when performing this action."
        showLink={false}
      />
    );




  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Bloque Herramientas */}
        <div className="flex flex-wrap items-center gap-3 m-5">
          {/* Buscador */}
          <div className="relative min-w-[200px] flex-1 sm:flex-initial">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Buscar hermano..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
            />
          </div>

          {/* PDF */}
          <button
            onClick={(e) => console.log(e.target)}
            title="Descargar PDF"
            className="inline-flex items-center justify-center p-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-500 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
            PDF
          </button>

          {/* Excel */}
          <button
            onClick={(e) => console.log(e.target)}
            title="Descargar Excel"
            className="inline-flex items-center justify-center p-2 text-sm font-medium text-green-600 bg-green-50 rounded-lg hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-green-500/10 dark:text-green-400 dark:hover:bg-green-500/20"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            EXCEL
          </button>
        </div>

        <Table>
          {/* HEADER */}
          <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
            <TableRow>
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Nombre Completo
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Edad
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Género
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Estado Civil
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Ocupación
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Teléfono
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Correo
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Bautizado
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Ministerios
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Cursos
              </TableCell>

              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Cobertura
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedMembers.map((member) => (
              <TableRow key={member.id}>
                {/* Nombre */}
                <TableCell className="px-5 py-4 text-start">
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {member.nombres} {member.apellido_paterno}{" "}
                      {member.apellido_materno}
                    </span>

                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {member.nivel_academico}
                    </span>
                  </div>
                </TableCell>

                {/* Edad */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.edad} años
                </TableCell>

                {/* Género */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.genero}
                </TableCell>

                {/* Estado civil */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.estado_civil}
                </TableCell>

                {/* Ocupación */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.ocupacion}
                </TableCell>

                {/* Teléfono */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.telefono}
                </TableCell>

                {/* Correo */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  {member.correo}
                </TableCell>

                {/* Bautizado */}
                <TableCell className="px-4 py-3">
                  <Badge
                    size="sm"
                    color={member.bautizado ? "success" : "error"}
                  >
                    {member.bautizado ? "Sí" : "No"}
                  </Badge>
                </TableCell>

                {/* Ministerios */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  <div className="flex flex-wrap gap-1">
                    {member.ministerios_json?.map((ministerio, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded-md"
                      >
                        {ministerio}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Cursos */}
                <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                  <div className="flex flex-wrap gap-1">
                    {member.cursos?.map((curso, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-md"
                      >
                        {curso}
                      </span>
                    ))}
                  </div>
                </TableCell>

                {/* Cobertura */}
                <TableCell className="px-4 py-3">
                  <Badge
                    size="sm"
                    color={member.cobertura ? "success" : "warning"}
                  >
                    {member.cobertura ? "Activa" : "No"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* PAGINACIÓN */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-gray-100 dark:border-white/[0.05]">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Mostrando {(currentPage - 1) * recordsPerPage + 1} -{" "}
            {Math.min(
              currentPage * recordsPerPage,
              filteredMembers.length
            )}{" "}
            de {filteredMembers.length} registros
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => Math.max(prev - 1, 1))
              }
              className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
            >
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-3 py-1 text-sm rounded-lg border ${currentPage === index + 1
                  ? "bg-blue-600 text-white border-blue-600"
                  : "border-gray-300"
                  }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(prev + 1, totalPages)
                )
              }
              className="px-3 py-1 text-sm border rounded-lg disabled:opacity-50"
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}