const AdminReviewFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="호텔명 또는 작성자"
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="filter-group">
        <label>평점</label>
        <select
          value={filters.rating || "전체"}
          onChange={(e) => onFilterChange({ rating: e.target.value })}
        >
          <option value="전체">전체</option>
          <option value="5">5점</option>
          <option value="4">4점</option>
          <option value="3">3점</option>
          <option value="2">2점</option>
          <option value="1">1점</option>
        </select>
      </div>
      <div className="filter-group">
        <label>신고 여부</label>
        <select
          value={filters.reported || "전체"}
          onChange={(e) => onFilterChange({ reported: e.target.value })}
        >
          <option value="전체">전체</option>
          <option value="신고됨">신고됨</option>
          <option value="신고안됨">신고안됨</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onSearch}>
        검색
      </button>
    </div>
  );
};

export default AdminReviewFilter;
