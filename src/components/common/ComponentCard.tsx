import React from 'react';
import { getDateFormat } from '../../utils/getDateFormat';

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  onSearch?: (value: string) => void; // Callback opcional para el buscador
  onDownloadPDF?: () => void; // Callback opcional para PDF
  onDownloadExcel?: () => void; // Callback opcional para Excel
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className="px-6 py-5">
        {/* Contenedor Flex para alinear Título (Izquierda) y Herramientas (Derecha) */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Bloque del Título */}
          <div>
            <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
              {title}
            </h3>
            {desc && (
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {desc}
              </p>
            )}
          </div>

          {/* Bloque de Herramientas: Buscador + Botones */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Buscador */}
            <h2
              className="text-xl font-semibold text-gray-800 dark:text-white/90"
              x-text="pageName"
            >
              {getDateFormat(new Date())}
            </h2>

          </div>

        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
