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
    <div className="flex justify-center items-center gap-3 mt-12 animate-fade-in">
      <button
        onClick={() => onPageChange(pagination.page - 1)}
        disabled={!pagination.hasPrev}
        className="btn btn-secondary btn-sm disabled:opacity-40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <div className="flex gap-2">
        {pagination.page > 3 && (
          <>
            <button
              onClick={() => onPageChange(1)}
              className="px-4 py-2 rounded-xl font-semibold bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              1
            </button>
            {pagination.page > 4 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
          </>
        )}

        {getPageNumbers().map((pageNum) => (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum)}
            className={`px-4 py-2 rounded-xl font-semibold transition-all ${
              pagination.page === pageNum
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg shadow-primary-500/30'
                : 'bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50'
            }`}
          >
            {pageNum}
          </button>
        ))}

        {pagination.page < pagination.pages - 2 && (
          <>
            {pagination.page < pagination.pages - 3 && (
              <span className="px-2 py-2 text-gray-400">...</span>
            )}
            <button
              onClick={() => onPageChange(pagination.pages)}
              className="px-4 py-2 rounded-xl font-semibold bg-white border-2 border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              {pagination.pages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => onPageChange(pagination.page + 1)}
        disabled={!pagination.hasNext}
        className="btn btn-secondary btn-sm disabled:opacity-40"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export default Pagination
