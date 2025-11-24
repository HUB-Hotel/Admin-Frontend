const AdminBookingFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="예약번호 또는 고객명"
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
          <option value="전체">전체</option>
          <option value="확정">확정</option>
          <option value="대기">대기</option>
          <option value="완료">완료</option>
          <option value="취소">취소</option>
        </select>
      </div>
      <div className="filter-group">
        <label>시작일</label>
        <input
          type="date"
          value={filters.startDate || ""}
          onChange={(e) => onFilterChange({ startDate: e.target.value })}
        />
      </div>
      <div className="filter-group">
        <label>종료일</label>
        <input
          type="date"
          value={filters.endDate || ""}
          onChange={(e) => onFilterChange({ endDate: e.target.value })}
        />
      </div>
      <button className="btn btn-primary" onClick={onSearch}>
        검색
      </button>
    </div>
  );
};

export default AdminBookingFilter;
