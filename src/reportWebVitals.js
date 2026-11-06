const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then((vitals) => {
      if (vitals.onCLS) {
        vitals.onCLS(onPerfEntry);
        if (vitals.onINP) vitals.onINP(onPerfEntry);
        vitals.onFCP(onPerfEntry);
        vitals.onLCP(onPerfEntry);
        vitals.onTTFB(onPerfEntry);
      } else if (vitals.getCLS) {
        vitals.getCLS(onPerfEntry);
        if (vitals.getFID) vitals.getFID(onPerfEntry);
        vitals.getFCP(onPerfEntry);
        vitals.getLCP(onPerfEntry);
        vitals.getTTFB(onPerfEntry);
      }
    });
  }
};

export default reportWebVitals;
