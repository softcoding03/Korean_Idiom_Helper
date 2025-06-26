# 사자성어 추천기 (Korean Idiom Helper)

사용자가 특정 상황을 입력하면 그 상황에 맞는 적절한 사자성어를 추천해주는 웹 애플리케이션입니다.

## 주요 기능

- **정확한 상황 매칭**: 사용자의 구체적인 상황과 의미가 정확히 일치하는 사자성어 추천
- **한글 이름 우선 표시**: 사자성어의 한글 이름을 먼저 표시하고 한자는 부가 정보로 제공
- **최대 3개 추천**: 상황에 가장 적합한 사자성어들을 우선적으로 추천
- **상세 정보 제공**: 각 사자성어의 한자, 한글 이름, 뜻, 배경/유래 정보 제공
- **미니멀한 디자인**: 세련된 모노톤 디자인으로 사용자가 내용에 집중할 수 있도록 설계
- **반응형 디자인**: 모바일/데스크톱 모든 기기에서 최적화된 사용자 경험

## 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 3.4.0
- **AI API**: OpenAI GPT-3.5-turbo
- **Build Tool**: Create React App

## 설치 및 실행

1. 프로젝트 클론
```bash
git clone <repository-url>
cd korean-idiom-helper
```

2. 의존성 설치
```bash
npm install
```

3. 환경변수 설정
프로젝트 루트에 `.env` 파일을 생성하고 OpenAI API 키를 설정하세요:
```
REACT_APP_OPENAI_API_KEY=your_openai_api_key_here
```

4. 개발 서버 실행
```bash
npm start
```

5. 브라우저에서 `http://localhost:3000` 접속

## 사용 방법

1. 텍스트 영역에 상황을 구체적으로 설명합니다
   - 예: "미래가 안보일때는 하루하루 그냥 열심히 하는게 답이다"
   - 예: "친구와 헤어지는 상황"
   - 예: "어려운 일을 극복했을 때"

2. "사자성어 추천받기" 버튼을 클릭합니다

3. 추천된 사자성어들을 확인합니다
   - 한글 이름 (큰 글씨)
   - 한자 (작은 글씨)
   - 뜻과 의미
   - 배경과 유래

4. "다른 추천 보기" 버튼으로 새로운 추천을 받을 수 있습니다

## 디자인 특징

- **모노톤 컬러 팔레트**: 중성적인 회색과 검정 톤으로 세련된 느낌
- **타이포그래피**: Light 폰트 웨이트로 모던한 느낌
- **여백과 간격**: 충분한 여백으로 시각적 여유 확보
- **호버 효과**: 부드러운 트랜지션으로 인터랙션 개선
- **카드 디자인**: 둥근 모서리와 미묘한 그림자로 깔끔한 레이아웃

## API 스펙

OpenAI GPT-3.5-turbo API를 사용하여 상황에 맞는 사자성어를 추천합니다.

### 요청 형식
```json
{
  "model": "gpt-3.5-turbo",
  "messages": [
    {
      "role": "user",
      "content": "사용자 상황 설명..."
    }
  ],
  "max_tokens": 1000,
  "temperature": 0.7
}
```

### 응답 형식
```json
{
  "recommendations": [
    {
      "idiom": "사자성어 한자",
      "koreanName": "사자성어 한글 이름",
      "meaning": "뜻과 의미 (사용자 상황과의 구체적인 연결점 포함)",
      "background": "배경과 유래 설명"
    }
  ]
}
```

## 배포

### Netlify 배포

1. 프로젝트 빌드
```bash
npm run build
```

2. Netlify에 배포
   - Netlify 대시보드에서 새 사이트 생성
   - GitHub 저장소 연결 또는 `build` 폴더 업로드

3. **환경변수 설정** (중요!)
   - Netlify 대시보드 → Site settings → Environment variables
   - 다음 환경변수 추가:
     - **Key**: `REACT_APP_OPENAI_API_KEY`
     - **Value**: `your_openai_api_key_here`
   - 변경사항 저장 후 재배포

### Vercel 배포
Vercel CLI를 사용하거나 GitHub 연동을 통해 자동 배포할 수 있습니다.
- Vercel 대시보드에서도 동일하게 환경변수 설정 필요

## 라이선스

MIT License

## 기여하기

이슈나 기능 제안은 GitHub Issues를 통해 제출해 주세요.
