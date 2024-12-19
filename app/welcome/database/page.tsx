import Pagination from '@/app/ui/components/pagination';
import { TableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { Metadata } from 'next';
import ClientSideExcelFilters from '@/app/ui/components/client-side-excel-filters';
import AuthWrapper from '@/components/authWrapper';
import { ActionEnum, ModuleEnum } from '@/app/lib/enums/authActionModule';
import { ExcelExportActionButton } from '@/app/ui/components/excel-export-action-button';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import DatabasePromotionTableWrapper from '@/app/ui/database/database-promotion-table-wrapper';

export const metadata: Metadata = {
  title: 'Base de datos',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const params = await props.searchParams;
  const query = params?.query || '';
  const currentPage = Number(params?.page || 1);
  return (
    <div className="w-full">
      <div className="w-full text-xl">Exportar participaciones a Excel</div>
      <Suspense
        key={query + currentPage}
        fallback={<TableSkeleton titles={['Promoción']} />}
      >
        <ClientSideExcelFilters
          exportAllButton={
            <AuthWrapper
              module={ModuleEnum.DATABASE}
              action={ActionEnum.EXPORT_ALL_PARTICIPANT_BY_PREMISE}
              fallbackComponent={
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="">
                        <Button disabled> Exportar todo </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        No cuenta con los permisos necesarios para exportar
                        todos las participaciones por local.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              }
            >
              <ExcelExportActionButton
                className="bg-blue-600 hover:bg-blue-800"
                id="exportAllParticipant"
                showDialogs={true}
                errorMessage="Error al generar el archivo"
              >
                Exportar todo
              </ExcelExportActionButton>
            </AuthWrapper>
          }
        >
          <AuthWrapper
            module={ModuleEnum.PROMOTION}
            action={ActionEnum.READ}
            fallbackComponent={
              <div className="my-4 rounded border border-orange-400 bg-red-100 p-4 text-orange-700">
                No cuenta con los permisos necesarios para ver promociones.
              </div>
            }
          >
            <DatabasePromotionTableWrapper searchParams={params}></DatabasePromotionTableWrapper>
          </AuthWrapper>
        </ClientSideExcelFilters>
      </Suspense>
    </div>
  );
}
