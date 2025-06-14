# 🎬 PADO - 영화 정보 및 리뷰 플랫폼

![PADO 메인 이미지](https://pado-ott.vercel.app/logowhite.png)

## 📋 프로젝트 정보

- **개발 기간**: 2024.11 ~ 2024.12
- **팀원**: 해오름(PM), 전진우(상세 모달 담당), 송채영(로그인 담당), 김준영(검색페이지 담당), 강혜정(서류, 헤더,푸터 담당)
- **배포 주소**: [https://ott-project-pado.vercel.app](https://pado-ott.vercel.app)

## 🎯 프로젝트 소개

### 목적 및 용도

PADO는 사용자들이 영화 정보를 검색하고, 리뷰를 작성하며, 다양한 영화 콘텐츠를 탐색할 수 있는 웹 애플리케이션입니다. TMDB API를 활용하여 최신 영화 정보를 제공하고, 사용자 참여형 리뷰 시스템을 통해 커뮤니티 경험을 제공합니다.

### 기술 스택

#### 프론트엔드
![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)

#### 백엔드
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

#### 기타 도구
![TMDB API](https://img.shields.io/badge/TMDB_API-01B4E4?style=for-the-badge&logo=themoviedatabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## ✨ 주요 기능

### 1. 병렬 라우트를 활용한 영화 상세 페이지

Next.js의 App Router와 병렬 라우트 기능을 활용하여 영화 상세 정보, 리뷰, 유사 영화 추천을 동시에 로드하는 효율적인 UI를 구현했습니다.

```typescript
// app/movie/[id]/page.tsx
const DetailModal = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ route: string }>;
}) => {
  const urls = [
    `${process.env.NEXT_PUBLIC_TMDB_BASE_PATH}/movie/${
      (await params).id
    }?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
    `${process.env.NEXT_PUBLIC_TMDB_BASE_PATH}/movie/${
      (await params).id
    }/videos?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=ko-KR`,
  ];

  const responses = urls.map((url) =>
    fetch(url).then((response) => response.json())
  );

  const [data, trailerData] = (await Promise.all(responses)) as [
    IMovieData,
    ITrailerResults
  ];

  let routeSwitcher;
  switch ((await searchParams).route) {
    case "reviews":
      routeSwitcher = "reviews";
      break;
    case "similar":
      routeSwitcher = "similar";
      break;
    default:
      routeSwitcher = "null";
  }

  return (
//...
```

### 2. 서버 액션을 활용한 리뷰 시스템

Next.js의 서버 액션(Server Actions)을 활용하여 사용자 리뷰를 처리하는 효율적인 시스템을 구현했습니다.

```typescript
// actions/create-review-action.ts
'use server'

import { revalidateTag } from 'next/cache';
import { v4 as uuidv4 } from 'uuid';

export async function createReview(
  movieId: string,
  content: string,
  ratings: number
) {
  try {
    const response = await fetch(`${process.env.API_URL}/api/movie/${movieId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: uuidv4(),
        content,
        ratings,
        likes: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create review');
    }

    // 리뷰 캐시 갱신
    revalidateTag(`review-${movieId}`);
    
    return { success: true };
  } catch (error) {
    console.error('Error creating review:', error);
    return { success: false, error: 'Failed to create review' };
  }
}
```

## 📂 프로젝트 아키텍처

### 폴더 구조

```
OTT_Project_Pado/
├── src/
│   ├── actions/           # 서버 액션
│   ├── app/               # Next.js App Router
│   │   ├── api/           # API 라우트
│   │   ├── login/         # 로그인 페이지
│   │   ├── movie/         # 영화 상세 페이지
│   │   │   └── [id]/      # 동적 라우팅
│   │   │       ├── @reviews/  # 병렬 라우트 - 리뷰
│   │   │       └── @similar/  # 병렬 라우트 - 유사 영화
│   │   └── search/        # 검색 페이지
│   └── components/        # 재사용 가능한 컴포넌트
└── public/                # 정적 파일
```

## 🚀 프로젝트 설치 및 사용 방법

```bash
# 저장소 클론
git clone https://github.com/ryryryowen/-pado.git

# 의존성 설치
cd OTT_Project_Pado
npm install

# 개발 서버 실행
npm run dev
```

## 💡 배운 점

### 기술적 측면

- **Next.js App Router**: 최신 Next.js의 App Router와 병렬 라우트 기능을 활용한 효율적인 페이지 구성 방법을 학습했습니다.
- **서버 액션**: 클라이언트-서버 간 상호작용을 간소화하는 서버 액션의 활용법을 익혔습니다.
- **데이터 캐싱 전략**: Next.js의 캐싱 메커니즘을 활용한 효율적인 데이터 관리 방법을 배웠습니다.

### 디자인 측면

- **영화 플랫폼 UI/UX**: 사용자 친화적인 영화 정보 플랫폼의 디자인 패턴을 연구했습니다.
- **반응형 디자인**: 다양한 디바이스에서 최적의 사용자 경험을 제공하기 위한 반응형 디자인 기법을 적용했습니다.
