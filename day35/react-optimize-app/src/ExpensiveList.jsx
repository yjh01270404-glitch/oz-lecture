import React from 'react'

// React.lazy로 지연 로딩되는 무거운 컴포넌트
function ExpensiveList() {
  // 1~200 목록 렌더링 (무거운 컴포넌트 시뮬레이션)
  const items = Array.from({ length: 200 }, (_, i) => `항목 ${i + 1}`)

  return (
    <div>
      <p style={{ margin: '0 0 8px', fontSize: '13px', color: '#666' }}>
        💡 이 컴포넌트는 React.lazy로 지연 로딩됩니다. 처음 렌더링 시에만 불러옵니다.
      </p>
      <div style={{
        height: '160px',
        overflowY: 'auto',
        border: '1px solid #e5e7eb',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: '#f9fafb',
      }}>
        {items.map((item) => (
          <div key={item} style={{
            padding: '4px 8px',
            borderBottom: '1px solid #f3f4f6',
            fontSize: '13px',
            color: '#374151',
          }}>
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ExpensiveList
