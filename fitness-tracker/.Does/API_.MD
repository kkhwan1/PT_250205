# API 문서

## 인증 (Authentication)

### 1. 로그인
- **엔드포인트**: POST /api/auth/login
- **설명**: 사용자 로그인 처리
- **요청 본문**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **응답**:
  ```json
  {
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "USER" | "TRAINER" | "ADMIN"
    },
    "token": "string"
  }
  ```

### 2. 회원가입
- **엔드포인트**: POST /api/auth/register
- **설명**: 새로운 사용자 등록
- **요청 본문**:
  ```json
  {
    "email": "string",
    "password": "string",
    "name": "string",
    "role": "USER" | "TRAINER"
  }
  ```
- **응답**:
  ```json
  {
    "message": "회원가입이 완료되었습니다.",
    "user": {
      "id": "string",
      "email": "string",
      "name": "string",
      "role": "string"
    }
  }
  ```

### 3. 비밀번호 재설정 요청
- **엔드포인트**: POST /api/auth/reset-password
- **설명**: 비밀번호 재설정 이메일 발송
- **요청 본문**:
  ```json
  {
    "email": "string"
  }
  ```
- **응답**:
  ```json
  {
    "message": "비밀번호 재설정 링크가 이메일로 전송되었습니다."
  }
  ```

### 4. 비밀번호 재설정
- **엔드포인트**: POST /api/auth/reset-password/reset
- **설명**: 새로운 비밀번호 설정
- **요청 본문**:
  ```json
  {
    "token": "string",
    "password": "string"
  }
  ```
- **응답**:
  ```json
  {
    "message": "비밀번호가 성공적으로 변경되었습니다."
  }
  ```

## 에러 응답 형식
```json
{
  "error": "에러 메시지"
}
```

## 인증 요구사항
- 모든 API는 HTTPS를 통해 통신
- 인증이 필요한 엔드포인트는 Authorization 헤더에 Bearer 토큰 포함
- 토큰 만료 시간: 1시간
- 비밀번호 재설정 토큰 만료 시간: 1시간

## 보안 정책
- 비밀번호 요구사항:
  - 최소 6자 이상
  - 영문 대/소문자, 숫자, 특수문자 포함
- 로그인 시도 제한: 5회
- API 요청 제한: 분당 100회

## Workouts API

### 1. 운동 목록 조회
- **엔드포인트**: GET /api/workouts
- **설명**: 운동 목록을 페이지네이션과 필터링하여 조회
- **쿼리 파라미터**:
  ```
  page: number (기본값: 1)
  limit: number (기본값: 10)
  sort: string (예: "createdAt:desc")
  filter: string (예: "type:strength")
  ```
- **응답**:
  ```json
  {
    "data": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "description": "string",
        "difficulty": "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
        "createdAt": "string",
        "updatedAt": "string"
      }
    ],
    "meta": {
      "total": number,
      "page": number,
      "limit": number,
      "totalPages": number
    }
  }
  ```

### 2. 운동 생성
- **엔드포인트**: POST /api/workouts
- **설명**: 새로운 운동 계획 생성
- **요청 본문**:
  ```json
  {
    "name": "string",
    "type": "string",
    "description": "string",
    "difficulty": "BEGINNER" | "INTERMEDIATE" | "ADVANCED",
    "exercises": [
      {
        "name": "string",
        "sets": number,
        "reps": number,
        "weight": number
      }
    ]
  }
  ```
- **응답**:
  ```json
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "description": "string",
    "difficulty": "string",
    "exercises": array,
    "createdAt": "string"
  }
  ```

### 3. 운동 로그 기록
- **엔드포인트**: POST /api/workouts/:id/logs
- **설명**: 특정 운동의 수행 기록 추가
- **요청 본문**:
  ```json
  {
    "date": "string",
    "duration": number,
    "exercises": [
      {
        "exerciseId": "string",
        "sets": [
          {
            "reps": number,
            "weight": number,
            "completed": boolean
          }
        ]
      }
    ]
  }
  ```
- **응답**:
  ```json
  {
    "id": "string",
    "workoutId": "string",
    "date": "string",
    "duration": number,
    "exercises": array,
    "createdAt": "string"
  }
  ```

### 보안 요구사항
- 모든 Workouts API는 인증이 필요합니다
- Rate Limiting: 사용자당 분당 30요청으로 제한
- 운동 생성 및 수정은 TRAINER 또는 ADMIN 권한 필요

## API 테스트 환경
### 1. 설정
- Jest + SWC 기반 테스트 환경
- node-mocks-http로 HTTP 요청/응답 모킹
- node-fetch로 Web API 객체 모킹

### 2. 테스트 구조
```typescript
// API 테스트 예시
describe('Workouts API', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET /api/workouts', () => {
    it('운동 목록을 페이지네이션과 함께 반환해야 함', async () => {
      // 테스트 코드...
    })
  })
})
```

### 3. 모킹 설정
```javascript
// jest.setup.js
// Web API 모킹
global.Request = nodeFetch.Request
global.Response = nodeFetch.Response
global.Headers = nodeFetch.Headers

// Next.js 모킹
global.NextResponse = NextResponse
global.NextRequest = NextRequest
```

### 4. 알려진 이슈
- Response.json 함수 undefined 문제
  ```javascript
  // 임시 해결방안
  const mockJson = jest.fn()
  global.Response.prototype.json = mockJson
  ```

## API 엔드포인트