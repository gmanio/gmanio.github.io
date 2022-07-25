import React, { Context, createContext, Dispatch, SetStateAction, useReducer } from 'react';

export type HomeContextState = {
  isPhase1TypeCompleted: boolean;
  isPhase2TypeCompleted: boolean;
};

export type HomeContextType = [HomeContext: Partial<HomeContextState>, setHomeContext: Dispatch<SetStateAction<Partial<HomeContextState>>>];

export const HomeContext: Context<HomeContextType> = createContext({} as HomeContextType);

export const HomeProvider = ({ children }: { children: React.ReactNode }) => {
  const initialState: Partial<HomeContextState> = {
    isPhase1TypeCompleted: false,
    isPhase2TypeCompleted: false,
  };

  const [HomeContext, setHomeContext]: any = useReducer(
    (state: Partial<HomeContextState>, action: Partial<HomeContextState>) => Object.assign({}, { ...state }, { ...action }),
    initialState
  );

  return <HomeContext.Provider value={[HomeContext, setHomeContext]}>{children}</HomeContext.Provider>;
};
