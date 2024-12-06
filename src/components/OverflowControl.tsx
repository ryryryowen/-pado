'use client';

import React from 'react';
import { useParams } from 'next/navigation';

const OverflowControl = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const isMovieDetailPage = params?.id !== undefined;

  return (
    <div style={{ overflow: isMovieDetailPage ? 'hidden' : 'visible' }}>
      {children}
    </div>
  );
};

export default OverflowControl; 