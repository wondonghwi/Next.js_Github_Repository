import React, { useState } from 'react';
import Link from 'next/link';

const App = () => {
  const [user, setUser] = useState('');

  return (
    <div>
      <label>
        username
        <input value={user} onChange={e => setUser(e.target.value)} />
      </label>
      <p>{user} 깃허브 검색하기</p>
      <Link href={`/users/${user}`}>
        <a>검색하기</a>
      </Link>
    </div>
  );
};

export default App;
