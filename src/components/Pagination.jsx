import ReactPaginate from "react-paginate";

const Pagination = ({
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
}) => {
  const handlePageClick = (event) => {
    onPageChange(event.selected + 1); // react-paginate uses 0-based index
  };

  return (
    <div className="flex justify-center items-center py-5">
      <span className="pr-5 text-md text-gray-400">
        共 {totalResults} 筆結果
      </span>
      <ReactPaginate
        forcePage={currentPage - 1}
        pageCount={totalPages}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        onPageChange={handlePageClick}
        containerClassName="flex gap-2 text-white"
        pageLinkClassName="flex w-9 h-9 items-center justify-center px-3 py-1 rounded bg-gray-700 hover:bg-blue-500"
        activeLinkClassName="!bg-blue-500 !text-white"
        previousLinkClassName="flex h-9 items-center  px-3 py-1 rounded bg-gray-700"
        nextLinkClassName="flex h-9 items-center px-3 py-1 rounded bg-gray-700"
        breakLinkClassName="px-3 py-1 text-gray-400 h-20"
        previousLabel="上一頁"
        nextLabel="下一頁"
        breakLabel="..."
      />
    </div>
  );
};

export default Pagination;
