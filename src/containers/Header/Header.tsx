import React from 'react';

const Header: React.FC = () => {
  const handleAddHomeIconButton = () => {
    navigator.share({
      title: document.title,
      text: 'Hello World',
      url: 'https://developer.mozilla.org',
    });
  };

  return (
    <>
      <h1>Header</h1>
      <button onClick={handleAddHomeIconButton}>added home</button>
    </>
  );
};

export default Header;
