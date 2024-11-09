import React from 'react';

const PlayersLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>Players Section</h1>
      {children}
    </div>
  );
};

export default PlayersLayout;