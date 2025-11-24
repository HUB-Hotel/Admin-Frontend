const AdminUserFilter = ({ filters, onFilterChange, onSearch }) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>검색</label>
        <input
          type="text"
          placeholder="이름 또는 이메일"
          value={filters.search || ""}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>
      <div className="filter-group">
        <label>회원 유형</label>
        <select
          value={filters.memberType || "전체"}
          onChange={(e) => onFilterChange({ memberType: e.target.value })}
        >
          <option value="전체">전체</option>
          <option value="일반">일반</option>
          <option value="사업자">사업자</option>
        </select>
      </div>
      <div className="filter-group">
        <label>상태</label>
        <select
          value={filters.status || "전체"}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="전체">전체</option>
          <option value="활성">활성</option>
          <option value="비활성">비활성</option>
        </select>
      </div>
      <button className="btn btn-primary" onClick={onSearch}>
        검색
      </button>
    </div>
  );
};

export default AdminUserFilter;
