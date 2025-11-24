const AdminCouponTable = ({ coupons = [], onDelete }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>쿠폰명</th>
            <th>할인율/금액</th>
            <th>유효기간</th>
            <th>사용 가능 횟수</th>
            <th>사용 횟수</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {coupons.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", padding: "2rem" }}>
                등록된 쿠폰이 없습니다.
              </td>
            </tr>
          ) : (
            coupons.map((coupon) => (
              <tr key={coupon.id}>
                <td>{coupon.id}</td>
                <td>{coupon.name}</td>
                <td>
                  {coupon.discountType === "percent"
                    ? `${coupon.discountValue}%`
                    : `${coupon.discountValue}원`}
                </td>
                <td>
                  {coupon.startDate} ~ {coupon.endDate}
                </td>
                <td>{coupon.maxUses}</td>
                <td>{coupon.usedCount || 0}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                    onClick={() => onDelete && onDelete(coupon.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCouponTable;
