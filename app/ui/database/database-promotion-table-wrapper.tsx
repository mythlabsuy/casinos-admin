import React from 'react';
import DatabasePromotionsTable from './database-promotion-table';
import { fetchFilteredData, getPagesAmount } from '@/app/lib/data/generic';
import Pagination from '../components/pagination';

export default async function DatabasePromotionTableWrapper(props: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const params = props.searchParams;
  const currentPage = Number(params?.page || 1);

  const pageSearchParams = new URLSearchParams({ show_all: 'true' });
  const dataList: any = await fetchFilteredData({
    path: 'promotion/',
    query: '',
    currentPage: currentPage,
    urlParams: pageSearchParams,
    addPremiseQuery: true,
  });
  const data = dataList['promotions'];
  const totalPages = getPagesAmount(dataList['count']);

  return (
    <>
      <DatabasePromotionsTable data={data} />
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}