export interface ChatMessage {
  type: 'user' | 'ai';
  content: string;
}

const questions = [
  '투자할 때 가장 중요하게 생각하시는 것은 무엇인가요? (수익률, 안정성, 성장 가능성 등)',
  '주식시장의 급격한 하락에 어떻게 대응하시나요?',
  '선호하는 투자 기간은 어느 정도인가요? (단기, 중기, 장기)',
  '월 평균 투자 가능 금액은 어느 정도인가요?',
  '새로운 투자 기회에 대해 어떤 태도를 가지고 계신가요?'
];

let currentQuestion = 0;

export function getAIResponse(userInput: string): string {
  const response = questions[currentQuestion];
  currentQuestion = (currentQuestion + 1) % questions.length;
  return response;
}

export function getInvestmentProfile(): string {
  return `투자 성향: 중위험-중수익 성향 (Balanced Investor)

주요 특징:
• 안정성과 수익성의 균형을 추구하는 합리적인 투자자
• 리스크 관리에 신중하며 장기적인 성장을 선호
• 분산 투자를 통한 포트폴리오 관리를 중요시

추천 투자 전략:
1. 주식과 채권의 균형 잡힌 포트폴리오 구성 (60:40 비율 권장)
2. 우량 기업 중심의 가치투자
3. 정기적인 리밸런싱을 통한 리스크 관리

투자 시 고려사항:
• 정기적인 투자를 통한 달러코스트 평균화 전략 활용
• 긴급자금 확보를 통한 안정적인 투자 유지
• 시장 변동성에 따른 단계적 자산 배분 조정`;
}