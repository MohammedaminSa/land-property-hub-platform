const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.pages <= 1) return null

  const getPageNumbers = () => {
    const pages = []
    const maxVisible = 5
    let start = Math.max(1, pagination.page - Math.floor(maxVisible / 2))
    let end = Math.min(pagination.pages, start + maxVisible - 1)

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      pages.push(i)
    }

    return pages
  }

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPrev}
        className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <div className="flex gap-2">
        {pagination.page > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              1
            </button>
            {pagination.page > 4 && <span className="px-2 py-2">...</span>}
          </>
        )}

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded ${
              pagination.page === pageNum
                ? 'bg-primary-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {pageNum}
          </button>
        ))}

        {pagination.page < pagination.pages - 2 && (
          <>
            {pagination.page < pagination.pages - 3 && <span className="px-2 py-2">...</span>}
            <button
              onClick={() => onPageChange(pagination.pages)}
              className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
            >
              {pagination.pages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNext}
        className="btn btn-outline disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  )
}

export default Pagination
