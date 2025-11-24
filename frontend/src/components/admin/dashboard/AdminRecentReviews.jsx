import { Link } from "react-router-dom";

const AdminRecentReviews = ({ reviews = [] }) => {
  const recentReviews = reviews.length > 0 
    ? reviews 
    : [
        {
          id: 1,
          hotelName: "서울 그랜드 호텔",
          author: "홍길동",
          rating: 5,
          content: "정말 좋은 호텔이었습니다...",
          createdAt: "2025-11-10",
        },
        {
          id: 2,
          hotelName: "부산 해변 리조트",
          author: "김영희",
          rating: 4,
          content: "바다 전망이 정말 아름답습니다...",
          createdAt: "2025-11-12",
        },
        {
          id: 3,
          hotelName: "제주 힐링 펜션",
          author: "박철수",
          rating: 3,
          content: "별로였습니다...",
          createdAt: "2025-11-13",
        },
      ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#fbbf24" : "#d1d5db", fontSize: "0.875rem" }}>
        ★
      </span>
    ));
  };

  return (
    <div className="recent-section">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
        <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "#0f172a" }}>최근 리뷰</h4>
        <Link to="/admin/reviews" style={{ fontSize: "0.875rem", color: "#7FD8BE", textDecoration: "none" }}>
          전체보기 →
        </Link>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>호텔명</th>
              <th>작성자</th>
              <th>평점</th>
              <th>내용</th>
            </tr>
          </thead>
          <tbody>
            {recentReviews.map((review) => (
              <tr key={review.id}>
                <td>{review.hotelName}</td>
                <td>{review.author}</td>
                <td>{renderStars(review.rating)}</td>
                <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  <Link
                    to={`/admin/reviews/${review.id}`}
                    style={{ color: "#7FD8BE", textDecoration: "underline" }}
                  >
                    {review.content}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminRecentReviews;

