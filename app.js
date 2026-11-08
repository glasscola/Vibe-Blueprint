(()=>{
 const root=document.getElementById('vibe-planner');
 const $=selector=>root.querySelector(selector);
 const groups=[
  {id:'security',name:'고객 정보·보안',items:[
   ['encrypt','고객 정보 암호화','개인정보를 전송하거나 보관할 때 보호해요.','수집할 개인정보를 최소화하고, 필요한 개인정보의 전송에는 HTTPS를 사용하며 저장 시 적절한 암호화와 별도 키 관리를 적용하세요.'],
   ['login','로그인·로그아웃','사용자별 계정으로 서비스를 이용해요.','검증된 인증 방식으로 로그인과 로그아웃, 세션 만료를 구현하세요.'],
   ['password','비밀번호 안전하게 보관','비밀번호 원문을 저장하지 않아요.','비밀번호를 직접 관리해야 한다면 검증된 비밀번호 해싱과 개별 솔트를 사용하세요. 원문 저장이나 복호화 가능한 암호화를 사용하지 마세요.'],
   ['permissions','사용자별 접근 권한','내 자료와 다른 사람의 자료를 구분해요.','사용자·관리자 권한을 구분하고 서버에서 자료의 소유권과 접근 권한을 검증하세요.'],
   ['secrets','API 키·비밀 정보 보호','비밀 키가 화면이나 공개 코드에 드러나지 않게 해요.','비밀 API 키는 서버의 비밀 관리 기능으로 보관하고 브라우저 코드, 저장소, 로그에 노출하지 마세요.'],
   ['validation','잘못된 입력 검사','이상한 값이나 위험한 입력을 걸러내요.','입력 형식과 길이를 검증하고 서버에서도 재검증하세요. 화면 출력 시 적절한 이스케이프를 적용하세요.']
  ]},
  {id:'storage',name:'저장·복구',items:[
   ['autosave','임시 저장·자동 저장','작성 중인 내용을 중간에 저장해요.','입력 내용을 적절한 간격으로 임시 저장하고 저장 성공·실패를 구분해 안내하세요.'],
   ['resume','새로고침 후 이어쓰기','창을 다시 열어도 작성 내용을 복원해요.','같은 브라우저에서 새로고침·재방문 시 작성 내용을 복원하세요. 저장 위치와 데이터가 지워지는 조건을 안내하세요.'],
   ['filebackup','파일로 저장·불러오기','내 내용을 파일로 내려받고 다시 가져와요.','사용자가 데이터를 파일로 내보내고 다시 가져올 수 있게 하세요. 가져오는 파일의 형식·버전을 확인하고 기존 내용 덮어쓰기를 안내하세요.'],
   ['backup','자동 백업·복원','데이터가 손상돼도 복구할 수 있게 해요.','저장 데이터의 주기적 백업과 복원 절차를 마련하고 실제 복원 가능 여부를 확인하세요.'],
   ['history','수정 기록·되돌리기','이전 내용을 확인하고 되돌릴 수 있어요.','수정 이력을 남기고 이전 상태 복원과 실수로 삭제한 내용의 복구를 제공하세요.'],
   ['sync','여러 기기에서 이어쓰기','PC와 휴대폰에서 같은 내용을 이어서 써요.','사용자를 식별하는 방식과 공유 저장소를 정하고 여러 기기에서 동기화하세요. 동시 수정 시 충돌을 처리하세요.']
  ]},
  {id:'performance',name:'파일 구조·속도',items:[
   ['modules','기능별로 파일 나누기','코드를 기능별로 정리해 수정하기 쉽게 해요.','코드를 화면·기능·공통 로직별 파일로 나누고 책임을 명확히 하세요. 파일 분리 자체를 성능 개선으로 간주하지 마세요.'],
   ['lazy','필요한 코드만 불러오기','처음부터 모든 코드를 읽지 않게 해요.','실제로 필요한 화면과 기능의 코드만 먼저 불러오도록 번들 분할과 지연 로딩을 적용하고 효과를 확인하세요.'],
   ['pagination','많은 자료 나눠 불러오기','자료를 조금씩 불러와 부담을 줄여요.','대량 목록은 페이지 단위 또는 필요한 범위로 조회하고, 무제한 일괄 다운로드를 피하세요.'],
   ['images','이미지·파일 용량 줄이기','큰 이미지 때문에 화면이 느려지지 않게 해요.','용도에 맞는 이미지 크기·포맷·압축을 적용하고 화면 밖의 무거운 자원은 필요한 시점에 불러오세요.'],
   ['cache','반복 요청 줄이기','같은 자료를 매번 다시 불러오지 않아요.','적절한 캐시와 요청 병합으로 반복 조회를 줄이고 갱신 시점을 정하세요. 사용자별 비공개 데이터가 섞이지 않도록 하세요.'],
   ['ratelimit','요청 폭주·과부하 줄이기','너무 많은 요청이 몰릴 때를 대비해요.','서버 요청 빈도와 동시 처리량을 제한하고 무거운 작업은 필요한 경우 대기열로 처리하세요. 실제 부하를 측정하세요.']
  ]},
  {id:'usability',name:'사용 편의',items:[
   ['loading','로딩·진행 상황 표시','처리 중인지 바로 알 수 있게 해요.','시간이 걸리는 작업에 로딩·진행 상태를 표시하고 완료·실패 상태를 구분하세요.'],
   ['retry','오류 안내·다시 시도','실패했을 때 이유와 다음 행동을 알려줘요.','사용자가 이해할 수 있는 오류 안내와 안전한 재시도를 제공하세요. 오류 시 기존 입력을 유지하세요.'],
   ['duplicate','버튼 중복 실행 방지','여러 번 눌러도 작업이 겹치지 않게 해요.','처리 중 중복 클릭을 막고 중복 요청이 데이터나 결제를 중복 생성하지 않도록 서버에서도 처리하세요.'],
   ['unsaved','저장 전 나가기 안내','작성 내용을 잃기 전에 알려줘요.','저장되지 않은 변경이 있을 때 화면 이동이나 닫기 전에 안내하고, 지원되지 않는 환경은 저장·복구로 보완하세요.'],
   ['search','검색·정렬·필터','원하는 내용을 빠르게 찾을 수 있어요.','자료의 성격에 맞는 검색·정렬·필터와 검색 결과가 없을 때의 안내를 구현하세요.'],
   ['accessibility','키보드·읽기 편한 화면','마우스 없이도 사용하고 글자를 편하게 읽어요.','키보드 조작, 보이는 포커스, 명확한 입력 이름, 충분한 색 대비와 화면 확대를 지원하세요.']
  ]},
  {id:'ai',name:'AI에게 맡길 작업 방식',items:[
   ['research','부족한 자료 인터넷 조사','필요한 최신 정보와 공식 문서를 찾아와요.','구현에 필요한 정보가 부족하거나 최신 확인이 필요하면 인터넷에서 공식 문서와 신뢰할 수 있는 자료를 조사하고 출처를 남기세요. 검색 도구가 없다면 그 사실과 확인이 필요한 부분을 알려주세요.'],
   ['questions','중요한 미정 사항 질문','결과에 큰 영향을 주는 내용부터 확인해요.','기획이 모호해 결과가 크게 달라지는 부분은 구체적인 질문으로 확인하고, 나머지 가정은 명시하세요.'],
   ['existing','기존 기능 유지','추가 작업 중 잘 되던 기능을 지켜요.','기존 코드와 동작을 먼저 확인하고 요청한 변경과 관련 없는 기능·데이터를 보존하세요.'],
   ['reuse','기존 코드·구성요소 재사용','이미 있는 기능을 중복해서 만들지 않아요.','기존 구성요소와 유틸리티를 찾아 재사용하고 불필요한 중복 구현을 줄이세요.'],
   ['tests','직접 실행해서 확인','만든 기능이 실제로 동작하는지 확인해요.','변경에 맞는 빌드·검사·테스트와 핵심 사용자 동작을 실행하세요. 실패를 수정하고 실제 결과와 미확인 항목을 알려주세요.'],
   ['explain','수정 내용 쉽게 설명','무엇을 바꿨는지 초보자도 이해하게 해요.','변경한 내용, 이유, 사용법, 직접 확인할 방법을 쉬운 한국어로 설명하세요.']
  ]},
  {id:'operations',name:'운영·관리',items:[
   ['admin','관리자 화면','등록된 내용과 사용자 상태를 관리해요.','관리 대상에 맞는 관리자 화면을 제공하고 관리자 접근 권한을 서버에서 확인하세요.'],
   ['notifications','필요한 알림 보내기','중요한 처리 결과를 사용자에게 알려줘요.','필요한 이벤트의 알림을 제공하고 채널·수신 설정·중복 알림 방지를 구성하세요. 유료 외부 채널은 적용 전에 선택을 확인하세요.'],
   ['logs','오류 기록 남기기','문제 발생 위치와 원인을 찾기 쉽게 해요.','오류 원인과 요청 흐름을 추적할 수 있게 기록하되 비밀번호·비밀 키·불필요한 개인정보는 로그에 남기지 마세요.'],
   ['rollback','이전 배포로 되돌리기','업데이트에 문제가 생기면 복구해요.','변경 이력을 관리하고 이전 배포로 복구할 방법을 마련하세요. 데이터 변경이 있으면 별도의 복구 계획도 확인하세요.'],
   ['budget','사용량·비용 알림','예상보다 비용이 커지기 전에 알려줘요.','외부 API·저장소·서버의 사용량과 비용을 확인하고 사용자가 정한 예산에 대한 알림·제한을 구성하세요.'],
   ['upload','업로드 파일 검사','너무 크거나 허용하지 않는 파일을 걸러요.','업로드 파일 크기·형식·실제 내용을 서버에서 확인하고 접근 권한과 안전한 저장 경로를 적용하세요.']
  ]}
 ];
 const catalogue = {"version":1,"reviewedAt":"2026-11-08","extensions":[{"id":"mobile","name":"모바일·설치형 앱","aliases":["앱","모바일","휴대폰","스마트폰","아이폰","안드로이드","app","mobile","pwa"],"common":["accessibility","resume"],"items":[["오프라인에서 사용","인터넷이 끊겨도 주요 내용을 확인해요.","오프라인에서 사용할 기능과 저장 범위를 정하고 연결 복구 시 동기화·충돌 처리를 구현하세요."],["홈 화면에 설치","웹사이트를 앱처럼 바로 열어요.","웹 프로젝트라면 PWA 설치 요건과 매니페스트를 구성하고 브라우저별 설치 지원 차이를 안내하세요."],["푸시 알림","앱을 열지 않아도 필요한 소식을 받아요.","알림 권한을 적절한 시점에 요청하고 수신 설정과 지원되지 않는 환경의 대안을 제공하세요.","기기 권한·푸시 서비스 확인"],["카메라·사진 선택","사진을 찍거나 앨범에서 가져와요.","사진 촬영·선택과 미리보기를 제공하고 권한 거부·파일 크기·회전 방향을 처리하세요.","카메라·사진 권한 확인"],["현재 위치 사용","주변 장소나 이동 경로를 보여줘요.","필요한 때 위치 권한을 요청하고 거부 시 직접 위치 입력을 제공하세요. 위치 저장 범위도 정하세요.","위치 권한 확인"],["공유 메뉴로 보내기","다른 앱으로 링크나 파일을 공유해요.","플랫폼의 공유 기능을 사용하고 지원되지 않으면 복사·다운로드를 제공하세요."],["백그라운드·재실행 복원","다른 앱을 쓰고 돌아와도 이어서 사용해요.","앱이 중단·종료됐다 다시 열릴 때 필요한 화면과 작성 상태를 복원하세요."],["앱 업데이트 안내","새 버전으로 바뀌어도 작성 내용을 지켜요.","업데이트가 있을 때 안내하고 저장 중인 내용을 보존한 뒤 안전하게 새 버전을 적용하세요."]]},{"id":"collaboration","name":"공유·팀 협업","aliases":["협업","팀","공동","공유","team"],"common":["login","permissions","sync"],"items":[["팀원 초대","함께 작업할 사람을 초대해요.","초대 링크의 유효기간·회수와 팀 가입·탈퇴를 구현하세요."],["보기·편집 권한 나누기","사람마다 할 수 있는 일을 정해요.","소유자·편집자·열람자 권한을 구분하고 서버에서 적용하세요."],["댓글·멘션","자료 옆에서 의견을 주고받아요.","항목별 댓글과 사용자 멘션을 제공하고 수정·삭제 권한을 적용하세요."],["동시 수정 충돌 처리","서로의 수정 내용을 잃지 않아요.","동시에 변경된 자료를 감지하고 병합 또는 버전 선택으로 충돌을 해결하세요."],["공개 링크·공유 해제","필요한 자료만 외부에 보여줘요.","자료별 공개 범위와 공유 링크 회수를 제공하고 검색 노출 여부를 구분하세요."],["팀 활동 기록","누가 무엇을 바꿨는지 확인해요.","팀 내 주요 변경의 작성자·시각·내용을 기록하고 개인정보 노출을 줄이세요."]]},{"id":"content","name":"검색 노출·콘텐츠","aliases":["seo","검색노출","다국어","번역","콘텐츠"],"common":["images","accessibility"],"items":[["검색 결과 제목·설명","검색에서 페이지 내용을 알아보기 쉬워요.","공개 페이지에 내용별 제목·설명·적절한 메타데이터를 제공하세요."],["링크 공유 미리보기","메신저에 보낼 때 제목과 이미지가 보여요.","공개 링크에 적절한 공유 제목·설명·대표 이미지를 설정하세요."],["사이트맵·검색 제외","공개할 페이지와 숨길 페이지를 구분해요.","공개 페이지 사이트맵과 검색 크롤링 설정을 구성하세요. 비공개 자료는 접근 권한으로 보호하세요."],["다국어·언어 선택","다른 언어로도 내용을 볼 수 있어요.","문구·날짜·숫자 표시를 언어별로 관리하고 사용자가 언어를 바꿀 수 있게 하세요."],["맞춤 404·빈 화면","내용이 없어도 다음 행동을 찾을 수 있어요.","없는 주소와 빈 목록에 원인 안내와 유용한 다음 행동을 제공하세요."],["방문·사용 흐름 통계","어떤 화면을 사용하는지 파악해요.","필요한 사용 지표만 수집하고 개인정보·동의 요구사항을 확인하세요. 민감한 입력 내용을 추적하지 마세요.","통계 도구·수집 범위 확인"]]}],"profiles":[{"id":"expense","name":"가계부","aliases":["가계부","지출","수입지출","용돈","소비기록","예산관리","budget","expense"],"reason":"돈을 기록하고, 어디에 썼는지 돌아보는 흐름에 맞춘 추천이에요.","common":["autosave","resume","filebackup","encrypt","validation","search"],"sources":["https://actualbudget.org/docs/reports/","https://actualbudget.org/docs/schedules/"],"items":[["수입·지출 입력","금액·날짜·메모를 빠르게 기록해요.","수입·지출의 금액·날짜·메모 입력과 수정·삭제를 구현하고 금액 계산 오차를 방지하세요."],["카테고리 분류","식비·교통비 등 어디에 썼는지 나눠요.","수입·지출 카테고리를 추가·수정하고 거래를 분류할 수 있게 하세요."],["월별 합계·잔액","이번 달 들어오고 나간 돈을 확인해요.","월별 수입·지출·차액을 계산하고 기간 변경과 이전 달 비교를 제공하세요."],["월 예산·사용률","정해둔 예산을 얼마나 썼는지 보여줘요.","월 전체 및 카테고리별 예산과 실제 지출의 사용률을 표시하세요."],["반복 지출·구독 관리","매달 나가는 고정비를 빠뜨리지 않아요.","고정 수입·지출의 반복 주기를 설정하고 예정 내역을 표시하며 중복 등록을 방지하세요."],["계좌·카드별 구분","어느 계좌나 카드로 썼는지 확인해요.","계좌·카드를 직접 등록하고 거래와 연결하세요. 계좌 간 이체를 소비로 중복 계산하지 마세요."],["소비 그래프","분야별·기간별 소비 흐름을 살펴봐요.","카테고리별 지출과 기간별 추이를 그래프로 표시하고 숫자 목록도 제공하세요."],["영수증 첨부","지출 기록에 영수증을 함께 보관해요.","거래별 영수증 사진·파일 첨부와 미리보기를 제공하고 접근 권한을 적용하세요.","파일 저장 공간 필요"],["내역 파일 가져오기","이미 정리한 거래를 다시 입력하지 않아요.","CSV 거래 내역의 열·날짜·통화를 매핑하고 미리보기와 중복 검사 후 가져오세요."],["환불·취소 반영","취소한 결제 때문에 합계가 틀리지 않아요.","원거래와 연결한 환불·부분 환불·취소를 기록하고 합계에 올바르게 반영하세요."],["저축 목표","목표 금액까지 얼마나 모았는지 보여줘요.","사용자가 정한 저축 목표 금액·기한·누적액과 진행률을 표시하세요."],["금융기관 자동 연동","거래 내역을 외부 서비스에서 가져와요.","이용 가능한 공식 금융 연동 서비스와 권한·동의·동기화 주기를 확인한 뒤 연동하세요. 금융 로그인 정보를 직접 수집하지 마세요.","외부 서비스·권한·비용 확인"]]},{"id":"todo","name":"할 일·일정","aliases":["할일","투두","todo","일정","플래너","스케줄"],"reason":"해야 할 일을 정리하고, 놓치지 않도록 돕는 기능이에요.","common":["autosave","resume","notifications","search"],"sources":["https://www.todoist.com/help/todoist/features/introduction-to-recurring-dates-YUYVJJAV"],"items":[["할 일 추가·완료","해야 할 일과 끝낸 일을 구분해요.","할 일의 등록·수정·완료·완료 취소를 제공하세요."],["마감일·시간","언제까지 해야 하는지 정해요.","날짜·시간·시간대를 저장하고 오늘·예정·기한 초과 목록을 제공하세요."],["반복 일정","매일·매주 하는 일을 다시 만들어요.","반복 주기와 종료 조건을 설정하고 한 번만 변경 또는 전체 변경을 구분하세요."],["우선순위","중요한 일을 먼저 볼 수 있어요.","우선순위 설정과 우선순위별 정렬·필터를 제공하세요."],["하위 할 일","큰 작업을 작은 단계로 나눠요.","하위 작업과 완료 진행률을 제공하고 부모·자식 완료 규칙을 정하세요."],["달력 보기","한 달이나 한 주의 일정을 한눈에 봐요.","주간·월간 달력과 날짜별 할 일 목록을 동기화하세요."],["칸반 보드","할 일·진행 중·완료로 나눠요.","작업 상태별 보드와 상태 이동을 제공하고 키보드로도 변경 가능하게 하세요."],["완료 기록","끝낸 일을 기간별로 돌아봐요.","완료 시각과 완료 기록을 보존하고 기간별 완료 개수를 보여주세요."]]},{"id":"habit","name":"습관·루틴","aliases":["습관","루틴","habit","챌린지"],"reason":"꾸준히 실천하고 기록을 돌아보는 데 도움이 되는 기능이에요.","common":["autosave","notifications","resume"],"items":[["습관 만들기","실천할 행동과 목표를 정해요.","습관 이름·목표 횟수·시작일을 설정하고 수정할 수 있게 하세요."],["요일별 반복","평일이나 원하는 요일만 체크해요.","매일·특정 요일·주당 횟수 등 실천 주기를 설정하세요."],["실천 체크","오늘 한 행동을 간단히 표시해요.","날짜별 실천 체크·취소와 과거 기록 수정을 제공하세요."],["연속 기록","얼마나 꾸준히 이어왔는지 보여줘요.","사용자 시간대와 목표 주기에 맞춰 연속 달성 기록을 계산하세요."],["달성 달력","잘 이어간 날을 한눈에 봐요.","날짜별 달성 상태를 달력과 텍스트로 표시하세요."],["주간 달성률","이번 주 실천 정도를 돌아봐요.","예정 횟수 대비 실천 횟수와 주간·월간 추이를 보여주세요."],["쉬는 날 설정","여행이나 휴식 기간을 반영해요.","일시 중지·휴식일이 연속 기록에 미치는 규칙을 정하고 안내하세요."],["목표 배지","달성한 목표를 기념해요.","사용자가 이해할 수 있는 달성 기준과 배지 획득 기록을 제공하세요."]]},{"id":"study","name":"공부·암기","aliases":["공부","학습","암기","단어장","플래시카드","study","flashcard"],"reason":"학습 자료를 모으고 반복해서 확인하는 흐름에 맞춘 기능이에요.","common":["autosave","resume","filebackup","search"],"items":[["단어·학습 카드","질문과 답을 카드로 만들어요.","앞면·뒷면 학습 카드의 생성·수정·묶음 관리를 제공하세요."],["카드 뒤집기","답을 보기 전에 스스로 생각해요.","질문을 먼저 보여주고 사용자가 요청할 때 답을 공개하세요."],["복습 일정","잊기 전에 다시 확인해요.","복습 결과에 따른 다음 복습 일정을 정하고 오늘 복습할 목록을 제공하세요."],["오답 노트","틀린 문제를 모아서 다시 풀어요.","오답과 사용자의 메모를 모으고 재도전 결과를 저장하세요."],["학습 타이머","집중한 시간을 기록해요.","집중·휴식 타이머와 일시정지·재개, 실제 학습 시간 기록을 제공하세요."],["과목·단원별 정리","학습 자료를 찾기 쉽게 나눠요.","과목·단원·태그별 분류와 이동·검색을 제공하세요."],["진도·정답률","어디까지 공부했는지 돌아봐요.","학습량·정답률·복습 기록을 기간과 과목별로 보여주세요."],["자료 일괄 가져오기","기존 단어장을 빠르게 옮겨요.","표 형식 학습 자료를 검증·미리보기 후 카드로 가져오세요."]]},{"id":"notes","name":"메모·자료 정리","aliases":["메모","노트","자료정리","위키","북마크","note","wiki"],"reason":"생각과 자료를 저장하고 나중에 다시 찾는 기능이에요.","common":["autosave","history","search","filebackup"],"items":[["서식 있는 메모","제목·목록·강조를 넣어 정리해요.","제목·목록·링크 등 기본 서식과 안전한 미리보기를 제공하세요."],["폴더·태그","자료를 여러 기준으로 분류해요.","폴더 계층과 다중 태그를 제공하고 자료 이동을 지원하세요."],["즐겨찾기·고정","자주 쓰는 메모를 빨리 열어요.","즐겨찾기와 상단 고정을 제공하고 사용자가 순서를 바꾸게 하세요."],["메모 사이 연결","관련 자료를 서로 이어줘요.","다른 메모로 연결하는 링크와 연결된 메모 목록을 제공하세요."],["첨부 자료","사진·문서를 메모에 붙여요.","메모별 첨부와 파일 미리보기를 제공하고 업로드 제한을 적용하세요."],["메모 템플릿","반복해서 쓰는 형식을 저장해요.","메모 양식을 저장하고 복제해 새 메모를 작성하게 하세요."],["휴지통","잘못 지운 메모를 복원해요.","삭제 후 보관 기간과 복원·영구 삭제 동작을 구분하세요."],["링크 보관함","유용한 웹 주소를 모아둬요.","URL·제목·설명을 저장하고 중복 주소를 안내하세요."]]},{"id":"diary","name":"일기·기록","aliases":["일기","감정기록","다이어리","diary","journal"],"reason":"개인 기록을 편하게 남기고 다시 읽기 위한 기능이에요.","common":["autosave","encrypt","filebackup","resume"],"items":[["날짜별 일기","날짜를 골라 기록을 남겨요.","날짜별 일기의 작성·수정과 과거 날짜 기록을 제공하세요."],["감정 표시","그날의 기분을 간단히 남겨요.","사용자가 고른 감정을 날짜별로 저장하고 직접 추가할 수 있게 하세요."],["사진과 기록","사진을 글과 함께 모아둬요.","일기에 사진과 설명을 첨부하고 순서를 변경할 수 있게 하세요."],["기록 달력","기록한 날을 찾아볼 수 있어요.","일기 유무와 감정 표시를 달력에 나타내고 해당 기록으로 이동하세요."],["작성 질문","무엇을 쓸지 떠올리는 데 도움을 줘요.","선택 가능한 작성 질문을 제공하고 자유 작성도 허용하세요."],["키워드로 찾기","오래된 기록도 다시 찾아요.","본문·태그·날짜 조건으로 일기를 검색하세요."],["나만 보기 설정","개인 기록의 공개 범위를 정해요.","기본 공개 범위를 비공개로 두고 공유할 때 대상을 명확히 선택하게 하세요."],["지난 기록 돌아보기","예전의 같은 날짜 기록을 보여줘요.","과거 같은 날짜의 기록을 선택적으로 보여주고 이 기능을 끌 수 있게 하세요."]]},{"id":"portfolio","name":"포트폴리오·소개","aliases":["포트폴리오","자기소개","이력서","소개페이지","랜딩","portfolio","landing"],"reason":"나와 작업물을 소개하고 연락으로 연결하는 기능이에요.","common":["images","accessibility","content_1","content_2"],"items":[["소개 영역","내가 하는 일을 짧게 전달해요.","소개 문구·프로필·주요 행동 버튼을 명확하게 배치하세요."],["작업물 갤러리","완성한 프로젝트를 보여줘요.","작업물의 썸네일·제목·설명과 상세 페이지를 제공하세요."],["프로젝트 상세 설명","역할과 결과를 함께 설명해요.","각 프로젝트의 목적·역할·과정·결과·관련 링크를 정리하세요."],["분야별 작업물 보기","관심 분야의 작업을 찾아봐요.","분야·기술·제작 연도 등 선택한 기준으로 작업물을 필터링하세요."],["이력서 다운로드","방문자가 이력서를 저장해요.","사용자가 제공한 이력서를 내려받게 하고 파일 형식·갱신일을 표시하세요."],["연락·문의 폼","방문자가 메시지를 보낼 수 있어요.","연락처·메시지 입력과 전송 결과를 제공하고 스팸을 제한하세요.","메일 또는 문의 저장 서비스 확인"],["외부 프로필 연결","GitHub·SNS 등으로 이어줘요.","등록한 외부 프로필 링크를 표시하고 잘못된 링크를 확인하세요."],["후기·경력 정리","실제 경험과 피드백을 보여줘요.","사용자가 제공한 실제 경력·후기를 표시하고 허위 내용을 생성하지 마세요."]]},{"id":"blog","name":"블로그·게시글","aliases":["블로그","게시글","뉴스레터","매거진","blog","article"],"reason":"글을 작성하고 발행하며 독자가 찾아보게 하는 기능이에요.","common":["autosave","search","content_1","content_2","content_3"],"items":[["글 작성·수정","본문을 작성하고 다듬어요.","글 편집과 미리보기, 수정·삭제를 제공하세요."],["초안·발행 구분","작성 중인 글을 공개하지 않아요.","초안·발행·비공개 상태를 구분하고 공개 시점을 관리하세요."],["카테고리·태그","주제별로 글을 찾을 수 있어요.","글의 카테고리·태그와 해당 목록 페이지를 제공하세요."],["대표 이미지","글의 내용을 시각적으로 보여줘요.","대표 이미지 등록·대체 텍스트와 적절한 이미지 크기를 지원하세요."],["예약 발행","정한 시각에 글을 공개해요.","시간대가 명확한 예약 발행과 변경·취소를 구현하세요.","서버 예약 작업 필요"],["댓글 관리","독자의 의견을 받고 관리해요.","댓글 작성·삭제·신고와 스팸 관리 권한을 제공하세요."],["구독·새 글 알림","새 글 소식을 받아볼 수 있어요.","구독 확인·해지와 새 글 알림을 제공하세요.","메일 서비스·발송 비용 확인"],["관련 글 추천","다른 글도 이어서 읽게 해요.","태그·카테고리를 기준으로 관련 글을 보여주고 중복을 줄이세요."]]},{"id":"shop","name":"쇼핑몰","aliases":["쇼핑몰","온라인판매","상품판매","스토어","쇼핑","shop","commerce","store"],"reason":"상품 확인부터 주문·배송까지 이어지는 기능이에요.","common":["login","permissions","secrets","duplicate","validation","logs"],"sources":["https://docs.stripe.com/payments/checkout"],"items":[["상품 목록·상세","사진과 가격·설명을 확인해요.","상품 목록과 상세 정보·가격·판매 상태를 제공하세요."],["옵션·수량 선택","색상·크기와 구매 수량을 골라요.","상품 옵션별 가격·재고와 구매 가능 수량을 검증하세요."],["장바구니","구매할 상품을 모아서 확인해요.","장바구니 추가·수량 변경·삭제와 최신 가격·재고 재검증을 구현하세요."],["결제 연결","안전한 결제 화면에서 결제해요.","지원되는 결제사의 공식 결제 기능과 서버 검증을 사용하세요. 카드 정보를 직접 저장하지 마세요.","결제사 계약·서버·수수료 확인"],["주문 내역·상태","주문이 어디까지 진행됐는지 봐요.","주문 생성·결제·준비·배송·완료 상태와 상태 변경 기록을 관리하세요."],["재고 관리","품절 상품이 판매되지 않게 해요.","주문과 취소에 따른 재고 예약·차감을 처리하고 동시 주문 충돌을 방지하세요."],["배송지·배송 조회","받을 주소와 배송 상황을 확인해요.","배송지 입력·수정과 송장 정보를 제공하고 주문 정보 접근을 제한하세요.","실시간 조회는 배송 서비스 연동 확인"],["취소·환불","주문 취소와 환불 상태를 안내해요.","취소·반품 요청과 결제사 환불 결과·재고 복구를 일관되게 처리하세요."],["쿠폰·할인","사용 가능한 할인을 적용해요.","할인 조건·기한·중복 적용·사용 횟수를 서버에서 검증하세요."],["상품 후기","구매자의 사용 후기를 모아요.","구매 여부 확인과 후기 작성·수정·신고·관리 기능을 제공하세요."]]},{"id":"booking","name":"예약·상담","aliases":["예약","상담","미용실","레슨","booking","appointment"],"reason":"가능한 시간을 보여주고 겹치지 않게 예약을 받는 기능이에요.","common":["duplicate","notifications","permissions","validation"],"sources":["https://cal.com/faq"],"items":[["예약 가능한 시간","날짜와 빈 시간을 골라요.","운영 시간·휴무·기존 예약을 반영한 예약 가능 시간을 보여주세요."],["서비스·담당자 선택","원하는 서비스와 담당자를 골라요.","서비스별 소요 시간과 담당자 일정을 예약 시간에 반영하세요."],["중복 예약 방지","같은 자리를 동시에 예약하지 않아요.","서버에서 예약 가능 여부를 다시 확인하고 동시 요청을 원자적으로 처리하세요."],["예약 확인·알림","예약 내용과 예정 시간을 알려줘요.","예약 확정과 예정 알림을 보내고 중복 발송을 방지하세요."],["예약 변경·취소","예약 시간을 바꾸거나 취소해요.","변경·취소 가능 시간과 권한을 적용하고 빈 시간을 다시 반영하세요."],["준비 시간·예약 제한","예약 사이 휴식과 준비 시간을 확보해요.","예약 전후 준비 시간과 하루 예약 수·최소 사전 예약 시간을 적용하세요."],["대기자 명단","빈자리가 나면 안내받아요.","대기 순서·연락·응답 기한을 관리하고 만료 시 다음 대기자에게 안내하세요."],["캘린더 연결","개인 일정과 예약을 함께 봐요.","사용자가 허용한 캘린더와 일정을 동기화하고 취소·시간대 변환을 처리하세요.","외부 캘린더 권한·연동 필요"]]},{"id":"community","name":"커뮤니티","aliases":["커뮤니티","게시판","동호회","포럼","community","forum"],"reason":"글과 의견을 주고받고 함께 이용할 규칙을 운영하는 기능이에요.","common":["login","permissions","ratelimit","upload","search"],"items":[["게시판·글쓰기","주제별로 이야기를 나눠요.","게시판별 글 작성·편집·삭제와 작성자 권한을 제공하세요."],["댓글·답글","게시글에 의견을 이어가요.","댓글과 답글의 작성·수정·삭제를 지원하세요."],["좋아요·북마크","마음에 드는 글을 표시해요.","좋아요 중복을 막고 개인 북마크 목록을 제공하세요."],["사용자 프로필","작성자의 소개와 활동을 봐요.","프로필 공개 범위와 게시글·활동 내역을 제공하세요."],["신고·차단","불편한 콘텐츠와 사용자를 관리해요.","신고 접수·처리와 사용자 차단을 제공하고 차단 범위를 일관되게 적용하세요."],["운영자 관리","공지와 게시판 규칙을 관리해요.","운영자에게 공지·숨김·이용 제한 기능을 제공하고 조치 기록을 남기세요."],["관심 주제 구독","원하는 게시판의 소식을 받아요.","주제별 구독과 알림 설정을 제공하세요."],["새 활동 알림","내 글의 댓글이나 답글을 알려줘요.","내 게시글·댓글에 대한 활동 알림과 읽음 상태를 제공하세요."]]},{"id":"crm","name":"고객·업무 관리","aliases":["고객관리","crm","영업","문의관리","상담기록"],"reason":"고객 정보와 다음 연락할 일을 함께 정리하는 기능이에요.","common":["encrypt","permissions","history","search","backup"],"items":[["고객 정보 카드","연락처와 관련 정보를 모아봐요.","필요한 최소 고객 정보와 수정·삭제를 제공하고 접근 권한을 적용하세요."],["상담·연락 기록","언제 어떤 이야기를 했는지 남겨요.","고객별 상담 내용·일시·담당자를 기록하세요."],["진행 단계","문의부터 완료까지 상태를 관리해요.","업무 단계와 이동 규칙을 설정하고 단계 변경 기록을 남기세요."],["후속 연락 일정","다음 연락할 일을 놓치지 않아요.","고객별 후속 연락 날짜·담당자·완료 상태를 관리하세요."],["고객 태그·분류","관심사나 상태별로 고객을 묶어요.","고객 태그와 조건별 목록을 제공하세요."],["중복 고객 확인","같은 고객이 여러 번 등록되지 않아요.","연락처 등 기준으로 중복 후보를 표시하고 확인 후 병합하세요."],["담당자 배정","팀원이 맡은 고객을 구분해요.","담당자 변경과 접근 범위·인수인계 기록을 제공하세요."],["문의 폼 연결","접수된 문의를 업무로 이어줘요.","문의 접수 내용을 고객·업무와 연결하고 스팸·중복을 처리하세요."]]},{"id":"inventory","name":"재고·물품 관리","aliases":["재고","물품","창고","대여","inventory","stock"],"reason":"물건의 수량과 이동·대여 상태를 관리하는 기능이에요.","common":["permissions","history","filebackup","search"],"items":[["물품 등록","이름·규격·사진을 정리해요.","물품의 식별 코드·이름·규격·사진을 관리하세요."],["입고·출고 기록","수량이 늘고 줄어든 이유를 남겨요.","입출고 수량·일시·사유를 기록하고 재고를 일관되게 계산하세요."],["재고 부족 알림","부족해지기 전에 확인해요.","물품별 최소 수량과 부족 알림을 제공하세요."],["보관 위치","물건이 어디에 있는지 찾아요.","창고·구역·선반별 위치와 물품 이동을 관리하세요."],["바코드·QR 인식","스캔해서 물품을 바로 찾아요.","코드 스캔과 직접 코드 입력을 제공하고 중복 코드를 검사하세요.","카메라 또는 스캐너 지원 확인"],["대여·반납","누가 빌렸고 언제 돌려주는지 봐요.","대여자·반납 예정일·실제 반납과 연체 상태를 기록하세요."],["재고 실사","실제 수량과 기록을 비교해요.","실사 수량과 시스템 수량의 차이를 확인한 뒤 조정하고 기록하세요."],["유통기한 관리","기한이 가까운 물품을 확인해요.","입고 묶음별 유통기한과 임박 목록을 제공하세요."]]},{"id":"travel","name":"여행·장소","aliases":["여행","여행계획","맛집","장소","지도","travel","trip"],"reason":"가고 싶은 장소와 날짜별 일정을 정리하는 기능이에요.","common":["filebackup","autosave","mobile_1","collaboration_5"],"items":[["여행 일정","날짜별 방문 계획을 정리해요.","여행 기간과 날짜별 일정의 순서·시각·메모를 관리하세요."],["장소 저장","가고 싶은 장소를 모아둬요.","장소명·주소·링크·메모와 방문 여부를 저장하세요."],["지도에서 보기","저장한 장소의 위치를 한눈에 봐요.","장소 좌표를 지도에 표시하고 지도 서비스 조건과 비용을 확인하세요.","지도 API·사용 조건 확인"],["이동 시간 확인","일정 사이 이동을 고려해요.","지원되는 경로 서비스로 이동 시간과 수단을 확인하고 추정값임을 표시하세요.","경로 API·비용 확인"],["여행 경비","예산과 실제 지출을 정리해요.","여행별 예산·지출과 통화를 관리하고 환율 적용 시점을 명시하세요."],["준비물 체크","챙길 물건을 빠뜨리지 않아요.","여행별 준비물과 체크 상태를 저장하고 목록 복제를 제공하세요."],["예약 자료 모음","숙소·교통 예약을 한곳에서 봐요.","예약 메모·일시·첨부 자료를 정리하고 민감한 예약 정보의 접근을 제한하세요."],["동행자 일정 공유","함께 가는 사람과 계획을 맞춰요.","동행자별 보기·편집 권한과 변경 기록을 제공하세요."]]},{"id":"recipe","name":"레시피·식단","aliases":["레시피","요리","식단","장보기","recipe","meal"],"reason":"요리법과 식사 계획을 장보기까지 연결하는 기능이에요.","common":["search","filebackup","images","autosave"],"sources":["https://mealie.io/documentation/getting-started/features/"],"items":[["레시피 등록","재료와 조리 순서를 정리해요.","레시피의 재료·분량·조리 순서·사진을 저장하세요."],["인분 바꾸기","먹을 인원에 맞게 재료량을 조정해요.","기준 인분 대비 재료량을 계산하고 단위와 반올림 기준을 표시하세요."],["주간 식단표","요일별 식사 계획을 세워요.","요일·식사 시간별 레시피를 배치하고 변경할 수 있게 하세요."],["장보기 목록","필요한 재료를 목록으로 모아요.","선택한 레시피 재료를 장보기 목록에 모으고 같은 단위의 재료를 합치세요."],["보유 재료","집에 있는 재료를 확인해요.","보유 재료와 수량을 관리하고 장보기 목록에서 반영하세요."],["조리 타이머","요리 단계별 시간을 놓치지 않아요.","여러 조리 타이머의 이름·남은 시간·일시정지를 제공하세요."],["식재료 제외 필터","원하지 않는 재료를 제외해요.","사용자가 지정한 제외 재료로 레시피를 필터링하고 입력 정보의 한계를 안내하세요."],["즐겨찾기·요리 메모","다음 요리 때 참고할 내용을 남겨요.","레시피별 즐겨찾기와 개인 조리 메모를 제공하세요."]]},{"id":"fitness","name":"운동 기록","aliases":["운동","헬스","러닝","홈트","fitness","workout"],"reason":"직접 정한 운동과 수행 기록을 관리하는 기능이에요.","common":["autosave","resume","filebackup","encrypt"],"items":[["운동 종목 관리","내가 하는 운동을 등록해요.","운동명과 기록 단위를 관리하고 사용자 정의 종목을 허용하세요."],["세트·횟수·중량","수행한 운동을 자세히 남겨요.","세트별 횟수·중량·메모 입력과 수정을 제공하세요."],["운동 루틴","반복할 운동 구성을 저장해요.","사용자가 정한 운동 순서를 루틴으로 저장·복제하세요."],["휴식 타이머","세트 사이 쉬는 시간을 확인해요.","휴식 타이머와 알림·일시정지·종료를 제공하세요."],["운동 달력","운동한 날짜와 내용을 돌아봐요.","날짜별 운동 기록과 월간 횟수를 표시하세요."],["기록 변화 그래프","내 운동 기록의 변화를 봐요.","선택한 기록의 기간별 변화와 원본 수치를 보여주세요."],["개인 최고 기록","종목별 기록 달성을 확인해요.","종목·단위별 개인 최고 기록과 달성 날짜를 계산하세요."],["기록 요약 공유","원하는 운동 결과만 공유해요.","사용자가 선택한 운동 기록을 공유 가능한 요약으로 만들고 공개 범위를 확인하세요."]]},{"id":"aiassistant","name":"AI 챗봇·도우미","aliases":["챗봇","ai도우미","ai챗","상담봇","chatbot","assistant"],"reason":"대화를 제공하면서 자료·비용·오류를 함께 관리하는 기능이에요.","common":["secrets","ratelimit","budget","logs","retry"],"items":[["대화 입력·응답","질문하고 답을 이어서 받아요.","대화 메시지와 응답 상태를 관리하고 실패 시 재시도·중단을 제공하세요.","AI API·서버·호출 비용 확인"],["대화방·기록","주제별 대화를 나눠 보관해요.","대화방 생성·이름 변경·삭제와 사용자별 접근 권한을 적용하세요."],["응답 실시간 표시","답이 완성되기 전부터 읽어요.","지원되는 API의 스트리밍 응답과 중단·부분 실패 처리를 구현하세요."],["자료 첨부·질문","내 자료를 바탕으로 물어봐요.","자료 크기·형식·접근 권한을 확인하고 자료 내용을 근거로 답변하게 하세요.","파일 처리·추가 비용 확인"],["근거·출처 표시","답이 어떤 자료에서 나왔는지 봐요.","실제로 사용한 자료의 근거 위치·링크를 표시하고 없는 출처를 만들지 마세요."],["대화 설정","말투나 답변 길이를 정해요.","말투·답변 길이 등 사용자 설정을 저장하고 모델 입력에 반영하세요."],["응답 평가","도움이 된 답인지 표시해요.","응답 평가와 선택적 피드백을 수집하고 개인정보 입력을 최소화하세요."],["사용량 한도","예상하지 못한 호출 비용을 줄여요.","사용자별 호출량·동시 요청·입력 길이 제한과 사용량 안내를 제공하세요."]]},{"id":"directory","name":"정보 모음·비교","aliases":["정보모음","디렉터리","비교사이트","링크모음","directory","comparison"],"reason":"여러 정보를 한곳에 모아 조건별로 찾고 비교하는 기능이에요.","common":["search","content_1","content_2","research"],"items":[["항목 등록","비교할 정보를 일정한 형식으로 모아요.","항목별 이름·설명·분류·출처 URL을 구조화해 저장하세요."],["조건별 필터","내 기준에 맞는 항목을 찾아요.","주요 속성별 필터와 적용 조건 초기화를 제공하세요."],["나란히 비교","선택한 항목의 차이를 한눈에 봐요.","선택 항목을 같은 기준의 비교표로 보여주고 누락 정보는 미확인으로 표시하세요."],["즐겨찾기 목록","관심 있는 정보를 모아둬요.","사용자별 즐겨찾기와 목록 내보내기를 제공하세요."],["정보 갱신일","언제 확인한 정보인지 알려줘요.","출처와 최종 확인 날짜를 항목별로 표시하세요."],["오류 제보","잘못되거나 오래된 내용을 알려요.","항목별 오류 제보와 운영자 확인·수정 흐름을 제공하세요."],["새 항목 제안","사용자가 정보를 추가로 제안해요.","사용자 제안을 접수하고 검토 후 공개하세요."],["정렬 기준 설명","추천 순서의 기준을 알 수 있어요.","정렬·추천에 사용하는 기준을 설명하고 다른 정렬 방식도 제공하세요."]]},{"id":"event","name":"행사·모임","aliases":["행사","모임","이벤트","참가신청","event","meetup"],"reason":"행사를 소개하고 참가자와 참석 상태를 관리하는 기능이에요.","common":["notifications","duplicate","permissions","validation"],"items":[["행사 소개","일시·장소·내용을 안내해요.","행사의 날짜·시간대·장소·설명·연락처를 표시하세요."],["참가 신청","참가자가 필요한 정보를 남겨요.","필요한 최소 신청 정보와 신청 완료 확인을 제공하세요."],["정원·대기 신청","자리가 차면 대기자로 관리해요.","정원을 서버에서 검증하고 대기 순서와 빈자리 전환을 처리하세요."],["참가 취소","불참을 알리고 자리를 돌려줘요.","본인 신청 확인과 취소·정원 복구를 제공하세요."],["입장·출석 확인","현장에서 참가자를 확인해요.","참가 확인 코드 또는 QR로 중복 입장을 방지하고 출석을 기록하세요."],["프로그램 시간표","진행 순서를 한눈에 봐요.","세션별 시간·장소·담당자와 시간표 변경 안내를 제공하세요."],["공지 전달","변경된 내용을 참가자에게 알려줘요.","참가자 대상 공지와 발송 결과를 관리하세요.","메일·메시지 채널 확인"],["행사 후 설문","참가자의 의견을 모아요.","설문 응답과 집계를 제공하고 익명 여부를 명확히 안내하세요."]]},{"id":"game","name":"게임 공통","aliases":["게임","game","미니게임","아케이드","액션","러너"],"reason":"게임을 시작하고 플레이한 뒤 다시 도전하는 공통 흐름이에요.","common":["resume","loading","accessibility","tests"],"sources":["https://docs.godotengine.org/en/stable/getting_started/first_2d_game/","https://docs.godotengine.org/en/stable/tutorials/io/saving_games.html"],"items":[["시작·설명 화면","조작법을 알고 게임을 시작해요.","시작 화면과 핵심 조작 안내·플레이 시작 동작을 구현하세요."],["키보드·터치 조작","사용 기기에 맞춰 플레이해요.","대상 기기에 맞는 입력 방식과 키 변경 또는 터치 조작을 제공하세요."],["점수·최고 기록","이번 점수와 이전 기록을 비교해요.","점수 규칙과 종료 시 최고 기록 저장을 구현하세요."],["일시정지·다시 시작","중간에 멈추거나 새로 도전해요.","일시정지·재개·재시작 시 타이머와 게임 상태를 일관되게 처리하세요."],["세이브·이어하기","게임을 닫아도 진행을 이어가요.","저장할 진행 상태를 정하고 세이브·복원·버전 변경을 처리하세요."],["효과음·음량 설정","소리를 켜고 끌 수 있어요.","배경음·효과음의 음량·음소거와 설정 저장을 제공하세요."],["난이도 선택","나에게 맞는 난도로 즐겨요.","난이도에 따른 규칙을 명확히 하고 플레이 균형을 확인하세요."],["온라인 순위표","다른 사람의 기록과 비교해요.","순위표와 기록 제출 검증·조작 방지·닉네임 관리를 구현하세요.","서버·기록 검증 필요"]]},{"id":"quiz","name":"퀴즈·상식 게임","aliases":["퀴즈","상식","ox","quiz","객관식"],"reason":"문제를 내고 답을 확인하며 결과를 돌아보는 기능이에요.","common":["game_1","game_3","game_4","game_6","validation"],"items":[["문제·정답 관리","문제와 보기·해설을 등록해요.","문제·보기·정답·해설과 출처를 구조화해 관리하세요."],["정답 판정","답을 고르면 결과를 알려줘요.","답 제출 후 정오답 판정과 점수를 계산하고 중복 제출을 막으세요."],["문제 순서 섞기","매번 다른 순서로 풀어요.","중복 없이 문제를 뽑고 필요한 경우 보기 순서도 섞으세요."],["제한 시간","정한 시간 안에 답을 골라요.","문제별 또는 전체 제한 시간과 시간 초과 처리를 구현하세요."],["주제·난이도 선택","관심 있는 문제를 골라요.","주제·난이도별 문제 구성과 충분한 문제 수 확인을 제공하세요."],["결과·해설","맞힌 이유와 틀린 이유를 확인해요.","완료 후 점수·정오답·해설을 보여주세요."],["오답 다시 풀기","틀린 문제만 다시 도전해요.","오답 목록을 저장하고 오답만 재출제하세요."],["일일 퀴즈","날마다 정해진 문제에 도전해요.","기준 시간대를 정해 날짜별 문제와 참여 기록을 관리하세요."]]},{"id":"puzzle","name":"퍼즐·보드 게임","aliases":["퍼즐","보드게임","스도쿠","숫자게임","2048","puzzle"],"reason":"규칙에 맞게 조작하고 풀이 과정을 관리하는 기능이에요.","common":["game_1","game_4","game_5","game_7","tests"],"items":[["게임판·규칙","현재 판과 가능한 행동을 보여줘요.","게임판 상태·허용 행동·규칙 검증을 분리해 구현하세요."],["이동·선택 조작","원하는 칸이나 조각을 움직여요.","마우스·터치·키보드 입력을 동일한 게임 규칙으로 처리하세요."],["성공·실패 판정","문제를 풀었는지 정확히 확인해요.","성공·실패·더 이상 이동 불가 조건을 검증하세요."],["힌트","막힐 때 다음 방향을 알려줘요.","실제 규칙에 맞는 힌트를 제공하고 사용 횟수 규칙을 표시하세요."],["한 수 되돌리기","실수한 움직임을 되돌려요.","상태 이력을 보관하고 실행 취소·다시 실행을 제공하세요."],["단계별 문제","여러 퍼즐을 골라 풀어요.","스테이지별 문제·완료 여부·잠금 조건을 관리하세요."],["풀이 시간·이동 수","나의 해결 기록을 남겨요.","일시정지 규칙을 반영한 풀이 시간과 이동 수를 기록하세요."],["풀 수 있는 문제 생성","정답이 없는 판을 피할 수 있어요.","문제 생성 후 해결 가능성을 검사하고 필요하면 해의 유일성도 확인하세요."]]},{"id":"clicker","name":"클리커·방치형 게임","aliases":["클리커","클릭게임","방치형","키우기","idle","clicker"],"reason":"자원을 모으고 성장시키는 반복 플레이에 맞춘 기능이에요.","common":["game_1","game_4","game_5","game_6","tests"],"items":[["클릭으로 자원 획득","누를 때마다 자원이 쌓여요.","입력에 따른 자원 획득과 숫자 범위·표시를 처리하세요."],["자동 생산","시간이 지나면 자원이 늘어요.","경과 시간에 따른 자동 생산량과 중단·재개 시 계산을 구현하세요."],["업그레이드 구매","모은 자원으로 효율을 높여요.","업그레이드 가격·효과·구매 가능 여부와 중복 요청을 검증하세요."],["잠금 해제","성장에 따라 새로운 요소가 열려요.","정해진 조건의 잠금 해제와 설명을 제공하세요."],["오프라인 보상","게임을 닫은 동안의 진행을 반영해요.","마지막 저장 시각과 보상 상한을 기준으로 오프라인 진행을 계산하고 시간 조작 대책을 정하세요."],["성장 곡선","너무 빠르거나 막히는 구간을 조정해요.","생산량·비용의 성장 규칙을 분리하고 플레이 시간을 기준으로 균형을 확인하세요."],["업적·목표","다음에 달성할 것을 보여줘요.","목표 조건·달성 기록·보상을 관리하고 중복 지급을 방지하세요."],["환생·다시 성장","진행을 초기화하고 새 보너스를 얻어요.","초기화 대상과 유지되는 보너스를 안내하고 확인 후 진행을 초기화하세요."]]},{"id":"rpg","name":"RPG·스토리 게임","aliases":["rpg","롤플레잉","스토리게임","어드벤처","캐릭터육성"],"reason":"캐릭터·아이템·이야기의 진행을 관리하는 기능이에요.","common":["game_1","game_4","game_5","game_6","tests"],"items":[["캐릭터 능력치","체력·레벨 등 상태를 관리해요.","캐릭터 능력치와 변경 규칙·표시를 일관되게 구현하세요."],["아이템·인벤토리","획득한 물건을 보관하고 사용해요.","아이템 획득·보관·사용·버리기와 수량 검증을 구현하세요."],["장비·효과","장착한 물건의 효과를 반영해요.","장착 조건과 능력치 변화를 관리하고 중복 효과 적용을 방지하세요."],["대화·선택지","이야기 속에서 선택해요.","대화 분기·선택 조건·결과를 데이터로 관리하세요."],["퀘스트·진행 상태","해야 할 일과 완료 조건을 보여줘요.","퀘스트 시작·진행·완료와 보상 중복 지급 방지를 구현하세요."],["장소 이동","여러 공간을 오가며 진행해요.","장소 이동 조건과 전환 시 캐릭터·진행 상태 보존을 구현하세요."],["전투·행동 규칙","정해진 규칙으로 행동 결과를 계산해요.","선택한 전투 방식의 행동 순서·피해·승패·상태 효과를 검증하세요."],["여러 저장 슬롯","진행 기록을 나눠 보관해요.","슬롯별 저장 시각·진행 요약·불러오기와 덮어쓰기 확인을 제공하세요."]]}]};
for (const section of ["extensions","profiles"]) { for (const definition of catalogue[section]) { groups.push({...definition,kind:section === "profiles" ? "profile" : "common",items:definition.items.map((item,index)=>[definition.id+"_"+(index+1),...item])}); } }

 function normalizeFeatureQuery(text) {
  return String(text || '').normalize('NFKC').toLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');
}
function computeFeatureRecommendations(query, view, groups, selectedIds) {
  const trimmed = String(query || '').trim();
  const normalized = normalizeFeatureQuery(trimmed);
  const all = groups.flatMap(group => group.items);
  const knownIds = new Set(all.map(item => item[0]));
  const selectedSet = new Set([...selectedIds].filter(id => knownIds.has(id)));
  const matches = groups.filter(group => (group.aliases || []).some(alias => {
    if (!normalized) return false;
    if (/^[a-z0-9 ]+$/i.test(alias)) {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('\\b' + escaped + '\\b', 'i').test(trimmed);
    }
    return normalized.includes(normalizeFeatureQuery(alias));
  }));
  const directIds = new Set(normalized ? all.filter(item => normalizeFeatureQuery(item[1] + ' ' + item[2]).includes(normalized)).map(item => item[0]) : []);
  const relatedIds = new Set(matches.flatMap(group => group.common || []).filter(id => knownIds.has(id)));
  let visibleIds;
  if (view === 'selected') visibleIds = selectedSet;
  else if (view === 'all' && !normalized) visibleIds = knownIds;
  else if (view === 'recommended' && !normalized) visibleIds = new Set(groups.filter(group => group.kind !== 'profile').flatMap(group => group.items.map(item => item[0])));
  else {
    visibleIds = new Set([...matches.flatMap(group => group.items.map(item => item[0])), ...(view === 'recommended' && matches.length ? [] : directIds)]);
    if (view === 'recommended') relatedIds.forEach(id => visibleIds.add(id));
  }
  const matchedIds = new Set(matches.map(group => group.id));
  const visibleGroups = groups.filter(group => group.items.some(item => visibleIds.has(item[0])));
  if (view === 'recommended' && normalized) visibleGroups.sort((a, b) => Number(matchedIds.has(b.id)) - Number(matchedIds.has(a.id)));
  return { visibleIds, visibleGroups, matches, directIds, relatedIds, total: all.length, query: trimmed, view };
}
function initFeatureRecommender({ root, groups, getSelected, changeSelected, onUpdate, onSave }) {
  const find = selector => root.querySelector(selector);
  const make = (tag, cls, text) => {
    const element = document.createElement(tag);
    if (cls) element.className = cls;
    if (text !== undefined) element.textContent = text;
    return element;
  };
  const input = find('#vp-feature-search');
  const list = find('#vp-features');
  const inputs = new Map();
  const counts = new Map();
  const groupState = new Map();
  let query = '', view = 'recommended', signature = '', current = null, composing = false;
  const typeGroups = groups.filter(group => group.kind === 'profile');
  find('#vp-types-label').textContent = '프로젝트 유형 ' + typeGroups.length + '개 둘러보기';
  const chips = find('#vp-type-chips');
  for (const group of typeGroups) {
    const button = make('button', 'vp-type-chip cursor-interaction', group.name);
    button.type = 'button';
    button.dataset.query = group.aliases[0];
    button.addEventListener('click', () => search(group.aliases[0], true));
    chips.append(button);
  }
  root.querySelectorAll('[data-quick-query]').forEach(button => {
    button.addEventListener('click', () => search(button.dataset.quickQuery, true));
  });
  function search(text, autoSelect = false) {
    query = String(text).slice(0, 120);
    input.value = query;
    view = 'recommended';
    find('#vp-feature-copy-status').textContent = '';
    let added = 0;
    if (autoSelect) {
      const next = new Set(getSelected());
      const recommendations = computeFeatureRecommendations(query, view, groups, next);
      recommendations.visibleIds.forEach(id => { if (!next.has(id)) { next.add(id); added += 1; } });
      changeSelected(next);
    }
    onUpdate(); onSave();
    if (autoSelect) find('#vp-feature-copy-status').textContent = added
      ? query + ' 추천 기능 ' + added + '개를 추가로 체크했어요. 기존 선택은 유지됩니다.'
      : query + ' 추천 기능이 이미 모두 체크되어 있어요.';
  }
  input.addEventListener('compositionstart', () => { composing = true; });
  input.addEventListener('compositionend', () => { composing = false; search(input.value); });
  input.addEventListener('input', event => { if (!composing && !event.isComposing) search(input.value); });
  root.querySelectorAll('[data-feature-view]').forEach(button => {
    button.addEventListener('click', () => { view = button.dataset.featureView; onUpdate(); onSave(); });
  });
  find('#vp-use-idea').addEventListener('click', () => {
    const idea = root.querySelector('[data-key="idea"]').value.trim();
    const name = root.querySelector('[data-key="name"]').value.trim();
    search((idea || name).slice(0, 120));
  });
  find('#vp-select-visible').addEventListener('click', () => {
    const next = new Set(getSelected());
    current.visibleIds.forEach(id => next.add(id));
    changeSelected(next); onUpdate(); onSave();
    find('#vp-feature-copy-status').textContent = '현재 목록의 ' + current.visibleIds.size + '개 항목을 선택했어요.';
  });
  find('#vp-select-none').addEventListener('click', () => {
    changeSelected(new Set()); onUpdate(); onSave();
    find('#vp-feature-copy-status').textContent = '선택한 기능을 모두 해제했어요.';
  });
  function render() {
    current = computeFeatureRecommendations(query, view, groups, getSelected());
    const selected = getSelected();
    root.querySelectorAll('[data-feature-view]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.featureView === view));
      if (button.dataset.featureView === 'selected') button.textContent = '선택한 기능 ' + selected.size;
    });
    find('#vp-feature-count').textContent = selected.size + ' / ' + current.total + '개 선택 · 개수 제한 없음';
    find('#vp-select-visible').disabled = current.visibleIds.size === 0;
    find('#vp-select-visible').textContent = view === 'selected' ? '선택 목록 유지' : '현재 목록 모두 선택';
    find('#vp-select-visible').hidden = view === 'selected';
    const names = current.matches.map(group => group.name);
    let heading, explanation;
    if (view === 'selected') {
      heading = '선택한 기능 ' + selected.size + '개';
      explanation = '검색어와 관계없이 지금까지 선택한 항목을 모았어요.';
    } else if (!query.trim()) {
      heading = view === 'all' ? '전체 기능 ' + current.total + '개' : '먼저 살펴볼 공통 기능';
      explanation = view === 'all' ? '분류를 펼쳐 원하는 기능을 고르세요.' : '가계부·예약 앱·퍼즐 게임처럼 검색하면 관련 기능을 추천해요.';
    } else if (names.length) {
      heading = names.join(' + ') + (view === 'all' ? ' 검색 결과' : ' 추천 기능');
      explanation = view === 'all' ? '검색에 맞는 기능 ' + current.visibleIds.size + '개를 찾았어요.' : '용도에 맞는 기능과 함께 고려할 공통 기능 ' + current.visibleIds.size + '개예요. 원하는 항목만 체크하세요.';
    } else if (current.visibleIds.size) {
      heading = '기능 검색 결과 ' + current.visibleIds.size + '개';
      explanation = '기능 이름과 설명에서 검색어에 맞는 항목을 찾았어요.';
    } else {
      heading = '일치하는 추천을 찾지 못했어요';
      explanation = '다른 표현이나 아래 유형을 선택해보세요. 목록에 없는 기능은 직접 추가할 수 있어요.';
    }
    find('#vp-results-title').textContent = heading;
    find('#vp-results-description').textContent = explanation;
    const nextSignature = view + '|' + query + '|' + [...current.visibleIds].join(',');
    if (signature !== nextSignature) {
      const focusedId = document.activeElement?.dataset?.feature;
      list.replaceChildren(); inputs.clear(); counts.clear(); signature = nextSignature;
      current.visibleGroups.forEach((group, index) => {
        const items = group.items.filter(item => current.visibleIds.has(item[0]));
        const details = make('details', 'vp-group');
        const stateKey = view + ':' + query + ':' + group.id;
        details.open = groupState.has(stateKey) ? groupState.get(stateKey) : index === 0 || view === 'selected';
        details.addEventListener('toggle', () => { if (details.isConnected) groupState.set(stateKey, details.open); });
        const summary = make('summary', 'cursor-interaction', group.name);
        const count = make('span', 'vp-group-count'); counts.set(group.id, { count, items }); summary.append(count); details.append(summary);
        if (group.reason) details.append(make('p', 'vp-feature-reason', group.reason));
        const checks = make('div', 'vp-checks');
        items.forEach(item => {
          const [id, label, hint, , note] = item;
          const wrap = make('label', 'vp-check');
          const checkbox = make('input'); checkbox.type = 'checkbox'; checkbox.dataset.feature = id;
          const body = make('span', 'vp-feature-body');
          const line = make('span', 'vp-feature-name', label);
          if (view === 'recommended' && current.relatedIds.has(id) && !current.matches.some(group => group.items.some(item => item[0] === id))) line.append(make('span', 'vp-feature-badge', '함께 고려'));
          body.append(line, make('small', null, hint));
          if (note) body.append(make('small', 'vp-feature-note', note));
          wrap.append(checkbox, body); checks.append(wrap); inputs.set(id, checkbox);
          checkbox.addEventListener('change', () => {
            const next = new Set(getSelected());
            checkbox.checked ? next.add(id) : next.delete(id);
            changeSelected(next); onUpdate(); onSave();
          });
        });
        details.append(checks);
        if (group.sources?.length) {
          const source = make('a', 'vp-feature-source', '참고한 공식 기능 안내');
          source.href = group.sources[0]; source.target = '_blank'; source.rel = 'noopener noreferrer'; details.append(source);
        }
        list.append(details);
      });
      if (focusedId && inputs.has(focusedId)) inputs.get(focusedId).focus();
    }
    inputs.forEach((checkbox, id) => { checkbox.checked = selected.has(id); });
    counts.forEach(({ count, items }) => { count.textContent = items.filter(item => selected.has(item[0])).length + ' / ' + items.length; });
  }
  return {
    render,
    snapshot: () => ({ query, view }),
    restore: saved => {
      if (!saved || typeof saved !== 'object') return;
      query = typeof saved.query === 'string' ? saved.query.slice(0, 120) : '';
      input.value = query;
      if (['recommended', 'all', 'selected'].includes(saved.view)) view = saved.view;
    }
  };
}

 const styleDefs=[['document','차분한 문서형','넓은 여백 · 내용에 집중',''],['service','깔끔한 서비스형','분명한 버튼 · 간결한 구성','vp-mini-service'],['cards','생동감 있는 카드형','카드 묶음 · 시각적인 구분','vp-mini-cards'],['dashboard','정보 중심 대시보드','목록·표 · 정보를 한눈에','vp-mini-dashboard']];
 const designDefs=[['sidebar','왼쪽 사이드 메뉴'],['topnav','상단 메뉴'],['cards','카드 형태로 배치'],['whitespace','넓은 여백'],['rounded','둥근 모서리'],['fixedaction','주요 버튼 고정'],['darkmode','다크 모드 전환'],['motion','부드러운 화면 전환'],['bigtext','크고 읽기 쉬운 글자'],['icons','아이콘과 글자 함께'],['table','표·목록 중심'],['bottomnav','모바일 하단 메뉴']];
 const baseColors=[['화이트','#FFFFFF'],['안개','#F7F8FA'],['크림','#FFF5E6'],['민트','#EEF8F0'],['블루','#EEF3FF'],['차콜','#20252C']];
 const accentColors=[['블루','#386AF4'],['그린','#23875B'],['코랄','#DD5C45'],['퍼플','#8152CC'],['앰버','#A66B08'],['차콜','#303844']];
 const flat=groups.flatMap(g=>g.items);
 const names=['기획 구상','사용자·기기','추가할 기능','화면·디자인','명령 프롬프트'];
 const keys=['name','idea','mode','notes','audience','device','platform','environment','customFeatures','customDesign'];
 const fields=Object.fromEntries(keys.map(k=>[k,$('[data-key="'+k+'"]')]));
 const answers=Object.fromEntries(keys.map(k=>[k,fields[k].value]));
 let step=2,selected=new Set(),designSelected=new Set(),style='document',base='#F7F8FA',accent='#386AF4';
 const make=(tag,cls,text)=>{const n=document.createElement(tag);if(cls)n.className=cls;if(text!==undefined)n.textContent=text;return n;};
 const designInputs=new Map(),styleButtons=new Map();
 const recommender=initFeatureRecommender({root,groups,getSelected:()=>selected,changeSelected:value=>{selected=value;},onUpdate:update,onSave:save});
 styleDefs.forEach(([id,label,hint,cls])=>{
  const button=make('button','vp-style cursor-interaction');button.type='button';button.dataset.style=id;button.setAttribute('aria-pressed','false');
  const mini=make('div','vp-mini '+cls);mini.setAttribute('aria-hidden','true');mini.append(make('b'),make('i'),make('i'),make('i'));
  button.append(mini,make('span',null,label),make('small',null,hint));$('#vp-styles').append(button);styleButtons.set(id,button);
  button.addEventListener('click',()=>{style=id;update();save();});
 });
 designDefs.forEach(([id,label])=>{
  const wrap=make('label','vp-check');const check=make('input');check.type='checkbox';check.dataset.design=id;wrap.append(check,make('span',null,label));$('#vp-design-choices').append(wrap);designInputs.set(id,check);
  check.addEventListener('change',()=>{check.checked?designSelected.add(id):designSelected.delete(id);update();save();});
 });
 const swatchButtons={base:[],accent:[]};
 for(const [kind,palette] of [['base',baseColors],['accent',accentColors]]){
  palette.forEach(([label,color])=>{
   const b=make('button','vp-swatch cursor-interaction');b.type='button';b.dataset.color=color;b.setAttribute('aria-label',label+' '+color);b.setAttribute('aria-pressed','false');
   const dot=make('span','vp-dot');dot.style.background=color;dot.setAttribute('aria-hidden','true');b.append(dot,make('span',null,label));$('#vp-'+kind+'-swatches').append(b);swatchButtons[kind].push(b);
   b.addEventListener('click',()=>setColor(kind,color));
  });
  $('#vp-'+kind+'-picker').addEventListener('input',e=>setColor(kind,e.target.value));
  $('#vp-'+kind+'-hex').addEventListener('input',e=>{
   const value=e.target.value.trim();const valid=/^#[0-9a-f]{6}$/i.test(value);
   $('#vp-'+kind+'-error').hidden=valid;e.target.setAttribute('aria-invalid',String(!valid));
   if(valid)setColor(kind,value);
  });
 }
 function setColor(kind,value){
  if(kind==='base')base=value.toUpperCase();else accent=value.toUpperCase();
  $('#vp-'+kind+'-error').hidden=true;$('#vp-'+kind+'-hex').setAttribute('aria-invalid','false');update();save();
 }
 function ink(hex){
  const c=hex.slice(1).match(/../g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
  const lum=.2126*c[0]+.7152*c[1]+.0722*c[2];return (lum+.05)/.05>=1.05/(lum+.05)?'#000000':'#FFFFFF';
 }
 function applySaved(saved){
  const content=saved?.modelContent;
  if(!['vibe-planner-v2','vibe-planner-v3'].includes(content?.kind))return;
  keys.forEach(k=>{const v=content.answers?.[k];if(typeof v==='string'){fields[k].value=v.slice(0,fields[k].maxLength>0?fields[k].maxLength:500);answers[k]=fields[k].value;}});
  selected=new Set((Array.isArray(content.features)?content.features:[]).filter(id=>flat.some(item=>item[0]===id)));
  designSelected=new Set((Array.isArray(content.designElements)?content.designElements:[]).filter(id=>designInputs.has(id)));
  if(styleButtons.has(content.style))style=content.style;
  if(/^#[0-9a-f]{6}$/i.test(content.base||''))base=content.base.toUpperCase();
  if(/^#[0-9a-f]{6}$/i.test(content.accent||''))accent=content.accent.toUpperCase();
  const nextStep=saved.privateContent?.step;if(content.kind==='vibe-planner-v3'&&Number.isInteger(nextStep)&&nextStep>=0&&nextStep<5)step=nextStep;
  recommender.restore(saved.privateContent?.recommendation);
 }
 function save(){
  try { localStorage.setItem('vibe-blueprint-draft', JSON.stringify({modelContent:{kind:'vibe-planner-v3',answers:{...answers},features:[...selected],designElements:[...designSelected],style,base,accent},privateContent:{step,recommendation:recommender.snapshot()}})); } catch {}
 }
 const value=k=>answers[k].trim()||'미정';
 function buildPrompt(){
  const lines=['아래 기획과 선택한 요구사항을 바탕으로 프로젝트를 구현하거나 수정해주세요.','특정 AI 도구에 종속된 명령어 대신 현재 작업 환경에 맞는 방법을 사용해주세요.','','## 프로젝트 기획','프로젝트 이름: '+value('name'),'요청 작업: '+value('mode'),'기획 내용: '+value('idea')];
  if(answers.notes.trim())lines.push('추가 전달사항: '+answers.notes.trim());
  lines.push('','## 사용자와 실행 환경','사용자: '+value('audience'),'사용 기기: '+value('device'),'만들 형태: '+value('platform'));
  if(answers.environment.trim())lines.push('추가 환경 조건: '+answers.environment.trim());
  lines.push('','## 선택한 기능과 작업 방식');
  if(!selected.size)lines.push('추가 체크 항목은 선택하지 않았습니다. 기획에 적은 기능을 기준으로 작업해주세요.');
  groups.forEach(g=>{
   const chosen=g.items.filter(item=>selected.has(item[0]));
   if(chosen.length){lines.push('','### '+g.name);chosen.forEach(item=>lines.push('- '+item[1]+': '+item[3]+(item[4]?' [연결 조건: '+item[4]+']':'')));}
  });
  if(answers.customFeatures.trim())lines.push('','직접 추가한 기능:',''+answers.customFeatures.trim());
  const currentStyle=styleDefs.find(x=>x[0]===style);
  lines.push('','## 화면과 디자인','디자인 스타일: '+currentStyle[1]+' — '+currentStyle[2],'베이스 색(배경): '+base,'포인트 색(버튼·강조): '+accent,'텍스트와 상호작용 요소의 대비를 확보하고 선택한 기기에 맞춰 배치해주세요.');
  const elements=designDefs.filter(x=>designSelected.has(x[0]));
  if(elements.length){lines.push('원하는 화면 요소:');elements.forEach(x=>lines.push('- '+x[1]));}else lines.push('추가 화면 요소: 별도 선택 없음');
  if(answers.customDesign.trim())lines.push('직접 추가한 디자인 요청:',answers.customDesign.trim());
  lines.push('','## 작업 요청','1. 기존 프로젝트가 있다면 관련 구조와 코드를 먼저 확인하고, 요청한 변경에 맞게 작업해주세요.','2. 선택한 요구사항과 직접 작성한 내용을 빠뜨리지 말고 반영해주세요. 체크하지 않은 부가 기능을 임의로 늘리지 마세요.','3. 필요한 기반 기능이나 서로 충돌하는 조건이 있다면 이유와 해결 방법을 설명해주세요. 미정 내용을 확정 사실처럼 다루지 마세요.','4. 선택 여부와 관계없이 구현에 필요한 기본 보안과 데이터 보호 원칙은 지켜주세요.','5. 작업 결과와 사용 방법을 알려주고, 실제로 확인한 내용과 아직 확인하지 못한 내용을 구분해주세요.');
  return lines.join('\n');
 }
 function fitOutput(){if(step===4){const box=$('#vp-output');box.style.height='auto';box.style.height=(box.scrollHeight+4)+'px';}}
 function update(){
  root.querySelectorAll('[data-panel]').forEach(n=>n.hidden=Number(n.dataset.panel)!==step);
  root.querySelectorAll('[data-step]').forEach(n=>{if(Number(n.dataset.step)===step)n.setAttribute('aria-current','step');else n.removeAttribute('aria-current');});
  $('#vp-position').textContent=(step+1)+' / 5 · '+names[step];$('#vp-prev').disabled=step===0;$('#vp-next').hidden=step===4;
  $('#vp-next').textContent=step===3?'명령 프롬프트 보기':'다음 · '+(names[step+1]||'');
  recommender.render();designInputs.forEach((n,id)=>n.checked=designSelected.has(id));
  styleButtons.forEach((n,id)=>n.setAttribute('aria-pressed',String(id===style)));
  for(const kind of ['base','accent']){
   const color=kind==='base'?base:accent;swatchButtons[kind].forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.color===color)));
   $('#vp-'+kind+'-picker').value=color;
   if($('#vp-'+kind+'-hex').getAttribute('aria-invalid')!=='true')$('#vp-'+kind+'-hex').value=color;
  }
  root.style.setProperty('--sample-base',base);root.style.setProperty('--sample-ink',ink(base));root.style.setProperty('--sample-accent',accent);root.style.setProperty('--sample-on',ink(accent));
  const currentStyle=styleDefs.find(x=>x[0]===style);$('#vp-sample-layout').className='vp-mini '+currentStyle[3];
  $('#vp-sample-name').textContent=answers.name.trim()||'내 프로젝트';$('#vp-summary-mode').textContent=value('mode');
  $('#vp-summary-audience').textContent=value('audience')+'\n'+value('device');
  const chosenNames=flat.filter(x=>selected.has(x[0])).map(x=>x[1]);
  const selectedGroups=groups.map(g=>[g.name,g.items.filter(x=>selected.has(x[0])).length]).filter(x=>x[1]);
  $('#vp-summary-features').textContent=chosenNames.length<=6?(chosenNames.join('\n')||'선택한 추가 항목 없음'):selectedGroups.map(([name,count])=>name+' '+count+'개').join('\n');
  if(answers.customFeatures.trim())$('#vp-summary-features').textContent+='\n직접 작성한 기능 포함';
  $('#vp-summary-design').textContent=currentStyle[1]+'\n베이스 '+base+'\n포인트 '+accent+'\n화면 요소 '+designSelected.size+'개'+(answers.customDesign.trim()?' · 직접 요청 포함':'');
  const prompt=buildPrompt();if($('#vp-output').value!==prompt){$('#vp-output').value=prompt;$('#vp-copy-status').textContent='';}
  requestAnimationFrame(fitOutput);
 }
 function go(index){step=Math.max(0,Math.min(4,index));update();save();}
 keys.forEach(k=>fields[k].addEventListener('input',()=>{answers[k]=fields[k].value;update();save();}));
 root.querySelectorAll('[data-step]').forEach(n=>n.addEventListener('click',()=>go(Number(n.dataset.step))));
 $('#vp-prev').addEventListener('click',()=>go(step-1));$('#vp-next').addEventListener('click',()=>go(step+1));
 $('#vp-select-output').addEventListener('click',()=>{$('#vp-output').focus();$('#vp-output').select();$('#vp-copy-status').textContent='전체 내용을 선택했어요. Ctrl+C 또는 ⌘C로 복사하세요.';});
 $('#vp-copy').addEventListener('click',async()=>{
  const prompt=$('#vp-output').value;let ok=false;
  try{if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(prompt);ok=true;}}catch{}
  if(!ok){const box=$('#vp-output');box.focus();box.select();try{ok=document.execCommand('copy');}catch{}}
  $('#vp-copy-status').textContent=ok?'명령 프롬프트를 복사했어요. AI 도구에 붙여넣으세요.':'자동 복사가 제한되어 있어요. 선택된 내용을 Ctrl+C 또는 ⌘C로 복사하세요.';
 });
 window.addEventListener('resize',fitOutput);
 try { applySaved(JSON.parse(localStorage.getItem('vibe-blueprint-draft'))); } catch {}
 update();
})();
