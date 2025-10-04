import React from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const PetCardSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
      <Skeleton height={192} />
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Skeleton width="60%" height={24} />
          <Skeleton width="30%" height={20} />
        </div>
        <Skeleton width="80%" height={16} className="mb-3" />
        <Skeleton count={2} height={14} className="mb-4" />
        <div className="flex gap-2 mb-4">
          <Skeleton width={80} height={20} />
          <Skeleton width={70} height={20} />
          <Skeleton width={90} height={20} />
        </div>
        <div className="flex gap-2">
          <Skeleton height={40} className="flex-1" />
          <Skeleton height={40} className="flex-1" />
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const PetDetailSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <Skeleton height={400} className="rounded-2xl mb-4" />
          <div className="flex gap-2">
            <Skeleton height={80} width={80} className="rounded-lg" />
            <Skeleton height={80} width={80} className="rounded-lg" />
            <Skeleton height={80} width={80} className="rounded-lg" />
          </div>
        </div>
        <div>
          <Skeleton width="70%" height={36} className="mb-4" />
          <Skeleton width="50%" height={20} className="mb-6" />
          <Skeleton count={3} height={16} className="mb-6" />
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
            <Skeleton height={60} />
          </div>
          <Skeleton height={48} className="mb-4" />
          <Skeleton height={48} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const NavbarSkeleton = () => (
  <SkeletonTheme baseColor="#f9fafb" highlightColor="#f3f4f6">
    <div className="bg-white shadow-lg sticky top-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Skeleton width={150} height={32} />
        <div className="hidden md:flex gap-6">
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
          <Skeleton width={60} height={20} />
        </div>
        <div className="flex gap-3">
          <Skeleton width={80} height={32} />
          <Skeleton width={100} height={32} />
        </div>
      </div>
    </div>
  </SkeletonTheme>
);

export const PageSkeleton = () => (
  <SkeletonTheme baseColor="#f3f4f6" highlightColor="#e5e7eb">
    <div className="min-h-screen p-6">
      <Skeleton width="40%" height={48} className="mx-auto mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {Array.from({ length: 6 }).map((_, i) => (
          <PetCardSkeleton key={i} />
        ))}
      </div>
    </div>
  </SkeletonTheme>
);
