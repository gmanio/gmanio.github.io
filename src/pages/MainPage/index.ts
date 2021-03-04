import React from 'react';
import withHeader from '../../hocs/withHeader';

const MainPage = React.lazy(() => import(/* webpackChunkName: "MainPage" */'./MainPage'));

export default withHeader(MainPage);