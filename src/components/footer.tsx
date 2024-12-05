import React from "react";
import style from "./footer.module.css";

const Footer = () => {
  return (
    <div className={style.container}>
      <div className={style.footerinfo}>
        <div className={style.footerinfomain}>
          <div>공지사항</div>
          <div>[업데이트] 12월 1주 프로그램 리스트</div>
        </div>
      </div>
      <div className={style.footermain}>
        <div className={style.footermenu}>
          <div>회사소개</div>
          <div>서비스 소개</div>
          <div>이용약관</div>
          <div>
            <b>개인정보 처리방침</b>
          </div>
          <div>고객센터</div>
          <div>이벤트</div>
        </div>
        <div className={style.footerdesc}>
          <div>
            콘텐츠웨이브 주식회사 | 대표이사 이태현 | 고객센터 1599-3709 (평일
            09:00~18:00 / 점심시간 12:00~13:00 / 주말 및 공휴일 휴무)
          </div>
          <div>
            사업자등록번호 220-88-38020 | 호스팅서비스제공자 : 마이크로소프트
            유한회사, 구글클라우드코리아 유한회사, 아마존웹서비시즈코리아
            유한회사
          </div>
          <div>
            통신판매업 신고번호 : 제 2021-서울영등포-0585호 | 통신판매업 정보
            공개 : http://www.ftc.go.kr/bizCommPop.do?wrkr_no=220-88-38020
          </div>
          <div>
            서울특별시 영등포구 여의나루로 60 포스트타워 19층전자우편주소 :
            helpdesk@wavve.com
          </div>
        </div>
        <div className={style.footercopy}>
          Copyright© 콘텐츠웨이브(주) All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default Footer;
