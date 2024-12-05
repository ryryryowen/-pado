import ProtectedRoute from "@/components/ProtectedRoute";
import React from "react";

const Page = () => {
  return (
    <ProtectedRoute>
      <div>TEST</div>
    </ProtectedRoute>
  );
};

export default Page;
