import React from 'react';
// import withHeaders from '../../hocs/withHeader';

const MainPage = React.lazy(() => import(/* webpackChunkName: "MainPage" */'./MainPage'));

export default MainPage;