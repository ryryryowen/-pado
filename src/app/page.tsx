import Link from "next/link"; // next/link 모듈 임포트
import styles from "./page.module.css"; // 스타일시트 임포트

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Hello </h1>
      <p>Welcome to the Pado homepage!</p>
      <Link href="/search">
        <button className={styles.button}>Go to Search Page</button>
      </Link>
    </div>
  );
}
