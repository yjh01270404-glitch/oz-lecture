import React from 'react'

// React.memo: props가 바뀌지 않으면 리렌더링 생략
const Child = React.memo(({ handleClick }) => {
  console.log('[Child] 렌더링됨')

  return (
    <div style={{
      marginTop: '12px',
      padding: '12px 16px',
      backgroundColor: '#f0fdf4',
      borderRadius: '6px',
      border: '1px solid #86efac',
    }}>
      <p style={{ margin: 0, fontWeight: 'bold', color: '#166534' }}>
        ✅ Child 컴포넌트 (React.memo 적용)
      </p>
      <p style={{ margin: '6px 0 8px', fontSize: '13px', color: '#555' }}>
        콘솔에서 리렌더링 횟수를 확인하세요
      </p>
      <button
        onClick={handleClick}
        style={{
          padding: '6px 14px',
          backgroundColor: '#16a34a',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
        }}
      >
        Child에서 카운트 증가
      </button>
    </div>
  )
})

Child.displayName = 'Child'

export default Child
