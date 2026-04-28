import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Loader from '../components/common/Loader';

// Lazy loading pages
const Home = lazy(() => import('../pages/Home'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader message="Loading Page..." />}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Catch-all route to redirect to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
