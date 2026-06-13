import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserEbenezer, updateUserEbenezer } from "../../../api/DevEbenezerApi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../ui/table";
import Badge from "../../ui/badge/Badge";
import Alert from "../../ui/alert/Alert";
import { TrashBinIcon } from "../../../icons";
import { Member } from "../../../types/UserEbenzer";
import toast from "react-hot-toast";
import { EyeIcon } from "lucide-react";

export default function BasicTableOne() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Configruacion de la Modal de Confirmación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const queryClient = useQueryClient();

  const recordsPerPage = 10;

  const { data, isLoading, isError } = useQuery({
    queryFn: getUserEbenezer,
    queryKey: ["userEbenezer"],
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps, @typescript-eslint/no-explicit-any
  const members: Member[] = (data as any)?.data || [];

  // Función para eliminar miembro
  const toggleCoverageMutation = useMutation({
    mutationFn: (memberId: number) => updateUserEbenezer(memberId),
    onSuccess: () => {
      toast.success("Cobertura actualizada exitosamente.");
      queryClient.invalidateQueries({
        queryKey: ["userEbenezer"],
      });

      setShowDeleteModal(false);
      setSelectedMember(null);
    },

    onError: () => {
      toast.error("Error al actualizar la cobertura. Inténtalo de nuevo.");
    }

  });

  // Mostar Modal de Confirmación para eliminar Member
  const handleDisableMember = (member: Member) => {
    setSelectedMember(member);
    setShowDeleteModal(true);
  }

  // Confirmar eliminación de Member
  const confirmDisableMember = () => {
    if (!selectedMember) return;
    toggleCoverageMutation.mutate(selectedMember.id);
  }

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

  const totalPages = Math.ceil(filteredMembers.length / recordsPerPage);

  const paginatedMembers = useMemo(() => {
    const startIndex = (currentPage - 1) * recordsPerPage;
    return filteredMembers.slice(
      startIndex,
      startIndex + recordsPerPage
    );
  }, [filteredMembers, currentPage]);

  if (isLoading) return (
    <Alert
      variant="info"
      title="Cargando datos..."
      message="Esto puede demorar un momento."
      showLink={false}
    />
  );

  if (isError)
    return (
      <Alert
        variant="error"
        title="Error Message"
        message="Be cautious when performing this action."
        showLink={false}
      />
    );

  const getVisiblePages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    pages.push(1);

    const startPage = Math.max(2, currentPage - 2);
    const endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        {/* Bloque Herramientas */}
        <div className="flex flex-wrap items-center gap-3 m-5">
          {/* Buscador */}
          <div className="relative min-w-[300px] flex-1 sm:flex-initial">
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
            onClick={() => toast.error('No se ha implementado la función de descarga.')}
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
            onClick={() => toast.error('No se ha implementado la función de descarga.')}
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
                Datos Completos
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
              <TableCell
                isHeader
                className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
            {paginatedMembers.map((member) => (
              <TableRow
                key={member.id}
                className={
                  !member.cobertura
                    ? "bg-red-50 dark:bg-red-500/10"
                    : ""
                }
              >
                {/* Nombre */}
                <TableCell
                  className={`px-5 py-4 text-start ${!member.cobertura
                    ? "text-red-700 dark:text-red-300"
                    : ""
                    }`}
                >
                  <div>
                    <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {member.nombres} {member.apellido_paterno}{" "}
                      {member.apellido_materno}
                    </span>

                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {member.correo} / {member.telefono} / Edad: {member.edad}
                    </span>
                    <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                      {member.nivel_academico} / E. Civil: {member.estado_civil} / Ocupación: {member.ocupacion}
                    </span>
                  </div>
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

                {/* Acciones */}
                <TableCell className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-white/10 rounded-lg">
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => handleDisableMember(member)}
                      className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-white/10 rounded-lg"
                      title="Deshabilitar Miembro"
                    >
                      <TrashBinIcon />
                    </button>
                  </div>
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

            {getVisiblePages().map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-500"
                >
                  ...
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(Number(page))}
                  className={`px-3 py-1 text-sm rounded-lg border ${currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-300"
                    }`}
                >
                  {page}
                </button>
              )
            )}

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

        {showDeleteModal && selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Deshabilitar miembro
              </h3>

              <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                ¿Deseas deshabilitar a:
              </p>

              <p className="mt-2 font-medium text-gray-900 dark:text-white">
                {selectedMember.nombres}{" "}
                {selectedMember.apellido_paterno}{" "}
                {selectedMember.apellido_materno}
              </p>

              <p className="mt-3 text-sm text-red-600">
                Esta acción cambiará la cobertura a FALSE.
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedMember(null);
                  }}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
                >
                  Cancelar
                </button>

                <button
                  onClick={confirmDisableMember}
                  disabled={toggleCoverageMutation.isPending}
                  className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:opacity-50"
                >
                  {toggleCoverageMutation.isPending
                    ? "Procesando..."
                    : "Deshabilitar"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}