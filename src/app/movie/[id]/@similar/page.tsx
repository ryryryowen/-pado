import React from "react";

const SimilarVideos = async ({
  searchParams,
}: {
  searchParams: Promise<{ route: string }>;
}) => {
  if ((await searchParams).route !== "similar") {
    return null;
  }
  return <div>similar</div>;
};

export default SimilarVideos;
