import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layout/AdminLayout";
import AdminLoginPage from "../pages/auth/AdminLoginPage";
import AdminSignupPage from "../pages/auth/AdminSignupPage";
import AdminForgotPasswordPage from "../pages/auth/AdminForgotPasswordPage";
import AdminKakaoCompletePage from "../pages/auth/AdminKakaoCompletePage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminBookingListPage from "../pages/admin/AdminBookingListPage";
import AdminBookingDetailPage from "../pages/admin/AdminBookingDetailPage";
import AdminRoomListPage from "../pages/admin/AdminRoomListPage";
import AdminRoomCreatePage from "../pages/admin/AdminRoomCreatePage";
import AdminRoomEditPage from "../pages/admin/AdminRoomEditPage";
import AdminStatisticsPage from "../pages/admin/AdminStatisticsPage";
import AdminReviewListPage from "../pages/admin/AdminReviewListPage";
import AdminReviewDetailPage from "../pages/admin/AdminReviewDetailPage";
import AdminSettingsPage from "../pages/admin/AdminSettingsPage";
import AdminMyProfilePage from "../pages/admin/AdminMyProfilePage";

const adminRoutes = [
  {
    path: "/business/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/business/signup",
    element: <AdminSignupPage />,
  },
  {
    path: "/business/forgot-password",
    element: <AdminForgotPasswordPage />,
  },
  {
    path: "/business/kakao/complete",
    element: <AdminKakaoCompletePage />,
  },
  {
    path: "/business",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/business/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <AdminDashboardPage />,
      },
      {
        path: "bookings",
        element: <AdminBookingListPage />,
      },
      {
        path: "bookings/:id",
        element: <AdminBookingDetailPage />,
      },
      {
        path: "rooms",
        element: <AdminRoomListPage />,
      },
      {
        path: "rooms/create",
        element: <AdminRoomCreatePage />,
      },
      {
        path: "rooms/:id/edit",
        element: <AdminRoomEditPage />,
      },
      {
        path: "statistics",
        element: <AdminStatisticsPage />,
      },
      {
        path: "reviews",
        element: <AdminReviewListPage />,
      },
      {
        path: "reviews/:id",
        element: <AdminReviewDetailPage />,
      },
      {
        path: "settings",
        element: <AdminSettingsPage />,
      },
      {
        path: "profile",
        element: <AdminMyProfilePage />,
      },
    ],
  },
];

export default adminRoutes;

