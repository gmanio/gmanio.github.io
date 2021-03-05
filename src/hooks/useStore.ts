import * as React from 'react';
import { StoreContext } from '../stores';

export const useStores = () => React.useContext(StoreContext);