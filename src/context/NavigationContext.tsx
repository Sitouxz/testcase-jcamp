import React, { createContext, useState, useContext } from 'react';

const NavigationContext = createContext({});

export const NavigationProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const [navigationTitle, setNavigationTitle] = useState('Default Title');
  return (
    <NavigationContext.Provider value={{ navigationTitle, setNavigationTitle }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationTitle = () => useContext(NavigationContext);
