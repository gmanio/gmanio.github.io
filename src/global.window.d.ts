declare global {
  interface Window {
    isMobile: boolean;
    serverData: {
      __mobx__data: unknown
    };
    dataLayer: {
    };
  }
}