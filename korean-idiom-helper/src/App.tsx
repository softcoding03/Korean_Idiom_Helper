import React, { useState } from 'react';

interface IdiomRecommendation {
  idiom: string;
  koreanName: string;
  meaning: string;
  background: string;
}

interface ApiResponse {
  recommendations: IdiomRecommendation[];
}

function App() {
  const [situation, setSituation] = useState('');
  const [recommendations, setRecommendations] = useState<IdiomRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!situation.trim()) return;

    setLoading(true);
    setError('');
    setRecommendations([]);

    try {
      const prompt = `당신은 한국어 사자성어 전문가입니다. 사용자가 다음과 같은 상황을 설명했습니다: "${situation}"

      이 상황에 적절한 사자성어를 추천해주세요. 다음 기준을 엄격히 따라주세요:

      **핵심 기준:**
      - 사용자의 상황과 사자성어의 의미가 최대한 일치해야 함
      - 단순히 비슷한 느낌이 아니라, 구체적인 상황과 의미가 연결되어야 함
      - 사용자가 처한 구체적인 상황, 감정, 행동과 사자성어의 뜻이 간접적으로라도 관련되어야 함

      **추천 규칙:**
      - 3개까지 추천해주세요.
      - 가장 적합한 사자성어를 우선적으로 추천
      - 상황이 모호하더라도 가장 관련성 높은 사자성어만 추천

      **각 사자성어마다 다음 정보를 포함:**
      - 사자성어 한글 표기(예: 고진감래)
      - 사자성어 한자어 표기(예: 苦尽甘来)
      - 뜻/의미 (사용자 상황과의 연결점을 명확히 설명)
      - 배경/유래 (2-3줄 이내로 간략하게)

      **응답 형식:**
      {
        "recommendations": [
          {
            "idiom": "사자성어 한자어 표기",
            "koreanName": "사자성어 한글 표기",
            "meaning": "뜻과 의미 (사용자 상황과의 구체적인 연결점 포함)",
            "background": "배경과 유래 설명"
          }
        ]
      }

      **중요:** 사용자의 상황과 사자성어의 의미가 정확히 일치하는 것만 추천하세요. 단순히 비슷한 느낌이 아니라 구체적으로 연결되는 사자성어를 찾아주세요.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: "system", 
              content: "당신은 한국 전통 사자성어를 정확하게 아는 전문가입니다. 존재하지 않는 사자성어는 절대 만들지 마세요."
            },
            {
              role: "user", 
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.2
        })
      });

      if (!response.ok) {
        throw new Error('API 요청 실패');
      }

      const data = await response.json();
      const result = data.choices[0].message.content;
      const parsedData: ApiResponse = JSON.parse(result);
      
      if (parsedData.recommendations && parsedData.recommendations.length > 0) {
        setRecommendations(parsedData.recommendations);
      } else {
        setError('적절한 사자성어를 찾지 못했습니다. 다른 상황을 설명해주세요.');
      }
    } catch (err) {
      console.error('API 호출 오류:', err);
      setError('사자성어 추천 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  const handleNewRecommendation = () => {
    setRecommendations([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-neutral-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-light text-neutral-900 mb-3">사자성어 추천기</h1>
          <p className="text-neutral-600 font-light">상황을 설명하면 맞는 사자성어를 추천해드립니다</p>
        </header>

        <form onSubmit={handleSubmit} className="mb-12">
          <div className="mb-6">
            <label htmlFor="situation" className="block text-sm font-medium text-neutral-700 mb-3">
              상황 설명
            </label>
            <textarea
              id="situation"
              value={situation}
              onChange={(e) => setSituation(e.target.value)}
              placeholder="예: 친구와 헤어지는 상황, 어려운 일을 극복했을 때, 열심히 공부하는 상황..."
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 focus:border-neutral-400 resize-none bg-white"
              rows={4}
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !situation.trim()}
            className="w-full bg-neutral-900 text-white py-3 px-6 rounded-lg hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
          >
            {loading ? '추천 중...' : '사자성어 추천받기'}
          </button>
        </form>

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900"></div>
            <p className="mt-3 text-neutral-600">사자성어를 찾고 있습니다...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-light text-neutral-900">추천 사자성어</h2>
              <button
                onClick={handleNewRecommendation}
                className="text-neutral-600 hover:text-neutral-900 text-sm font-medium transition-colors duration-200"
              >
                다른 추천 보기
              </button>
            </div>
            
            <div className="space-y-6">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-white border border-neutral-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow duration-200">
                  <div className="mb-4">
                    <h3 className="text-2xl font-medium text-neutral-900 mb-2">{rec.koreanName}</h3>
                    <p className="text-lg text-neutral-600 font-light">{rec.idiom}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-neutral-800 leading-relaxed">{rec.meaning}</p>
                    <p className="text-sm text-neutral-600 leading-relaxed">{rec.background}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
