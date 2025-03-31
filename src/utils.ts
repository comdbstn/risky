export interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

const questions = [
  '부동산 투자 경험이 있으신가요? 있다면 어떤 유형의 부동산에 투자하셨나요?',
  '부동산 투자시 가장 중요하게 생각하는 요소는 무엇인가요? (입지, 임대수익, 시세차익 등)',
  '선호하는 투자 기간은 어느 정도인가요? (단기 시세차익, 장기 임대수익 등)',
  '월 평균 투자 가능 금액은 어느 정도인가요?',
  '부동산 유형 중 어떤 것에 관심이 있으신가요? (아파트, 오피스텔, 상가 등)'
];

let currentQuestion = 0;

export function getAIResponse(userInput: string): string {
  const response = questions[currentQuestion];
  currentQuestion = (currentQuestion + 1) % questions.length;
  return response;
}

export function getInvestmentProfile(): string {
  return `투자 성향: 중위험-중수익 부동산 투자자 (Balanced Real Estate Investor)

주요 특징:
• 안정성과 수익성의 균형을 추구하는 부동산 투자자
• 임대 수익과 자산 가치 상승의 균형을 중시
• 위치와 입지 조건을 중요하게 고려하는 신중한 투자 스타일

추천 부동산 투자 유형:
1. 아파트 투자: 역세권 중소형 아파트 (전/월세 수익률 안정적)
2. 오피스텔 투자: 대학가 인근 소형 오피스텔 (젊은 수요층 확보 가능)
3. 상가 투자: 주거 밀집 지역의 1층 상가 (안정적인 임대 수익)

투자 시 고려사항:
• 대출 금리 변동에 따른 리스크 관리 필요
• 임대차 보호법 등 관련 법규 숙지 권장
• 입지와 교통 편의성 중심의 물건 선정 전략 추천`;
}