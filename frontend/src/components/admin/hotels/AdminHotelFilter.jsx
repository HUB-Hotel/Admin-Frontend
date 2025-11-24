const AdminHotelFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="호텔명 검색"
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="filter-group">
        <label>상태</label>
        <select
          value={filters.status || "전체"}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="전체">상태 전체</option>
          <option value="승인">승인</option>
          <option value="승인대기">승인대기</option>
          <option value="거부">거부</option>
        </select>
      </div>
      <div className="filter-group">
        <label>지역</label>
        <select
          value={filters.region || "전체"}
          onChange={(e) => onFilterChange({ region: e.target.value })}
        >
          <option value="전체">지역 전체</option>
          <option value="seoul">서울</option>
          <option value="busan">부산</option>
          <option value="jeju">제주</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onSearch}>
        검색
      </button>
    </div>
  );
};

export default AdminHotelFilter;
