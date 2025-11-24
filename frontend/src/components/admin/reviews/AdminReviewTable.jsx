import { Link } from "react-router-dom";

const AdminReviewTable = ({ reviews = [], onDelete }) => {
  const defaultReviews = [
    {
      id: 1,
      hotelName: "서울 그랜드 호텔",
      author: "홍길동",
      rating: 5,
      content: "정말 좋은 호텔이었습니다. 직원분들도 친절하고 시설도 깨끗했어요....",
      reported: false,
      createdAt: "2025-11-10",
    },
    {
      id: 2,
      hotelName: "부산 해변 리조트",
      author: "김영희",
      rating: 4,
      content: "바다 전망이 정말 아름답습니다. 다만 주차가 조금 불편했어요....",
      reported: false,
      createdAt: "2025-11-12",
    },
    {
      id: 3,
      hotelName: "제주 힐링 펜션",
      author: "박철수",
      rating: 3,
      content: "별로였습니다.....",
      reported: true,
      createdAt: "2025-11-13",
    },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#fbbf24" : "#d1d5db" }}>
        ★
      </span>
    ));
  };

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>호텔명</th>
            <th>작성자</th>
            <th>평점</th>
            <th>내용</th>
            <th>신고</th>
            <th>작성일</th>
            <th>작업</th>
          </tr>
        </thead>
        <tbody>
          {displayReviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{review.hotelName}</td>
              <td>{review.author}</td>
              <td>{renderStars(review.rating)}</td>
              <td style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }}>
                {review.content}
              </td>
              <td>{review.reported ? "신고됨" : "-"}</td>
              <td>{review.createdAt}</td>
              <td>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Link
                    to={`/admin/reviews/${review.id}`}
                    className="btn btn-primary"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                  >
                    상세
                  </Link>
                  <button
                    className="btn btn-danger"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                    onClick={() => onDelete && onDelete(review.id)}
                  >
                    삭제
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReviewTable;
