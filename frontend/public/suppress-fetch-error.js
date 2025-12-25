// Global error suppression script - runs before React
(function() {
  'use strict';
  
  // Store original functions
  const originalError = console.error;
  const originalWarn = console.warn;
  const originalLog = console.log;
  
  // Override console.error
  console.error = function(...args) {
    const message = args.map(arg => 
      typeof arg === 'string' ? arg : 
      arg?.message || 
      arg?.toString() || 
      String(arg)
    ).join(' ');
    
    if (
      message.includes('Failed to fetch') ||
      message.includes('fetch') ||
      (args[0] && typeof args[0] === 'string' && args[0].includes('Failed to fetch'))
    ) {
      // Completely suppress
      return;
    }
    originalError.apply(console, args);
  };
  
  // Override console.warn
  console.warn = function(...args) {
    const message = args.map(arg => 
      typeof arg === 'string' ? arg : 
      arg?.message || 
      arg?.toString() || 
      String(arg)
    ).join(' ');
    
    // Suppress various warnings
    if (
      message.includes('Failed to fetch') ||
      message.includes('fetch') ||
      message.includes('Lit is in dev mode') ||
      message.includes('dev mode') ||
      message.includes('Not recommended for production') ||
      message.includes('preloaded using link preload but not used') ||
      message.includes('preload') ||
      (args[0] && typeof args[0] === 'string' && (
        args[0].includes('Failed to fetch') ||
        args[0].includes('Lit is in dev mode') ||
        args[0].includes('preload')
      ))
    ) {
      // Completely suppress
      return;
    }
    originalWarn.apply(console, args);
  };
  
  // Override console.log to suppress certain logs
  console.log = function(...args) {
    const message = args.map(arg => 
      typeof arg === 'string' ? arg : 
      arg?.message || 
      arg?.toString() || 
      String(arg)
    ).join(' ');
    
    // Suppress cancelled logs (normal behavior)
    if (
      message.includes('cancelled') ||
      (args[0] && typeof args[0] === 'string' && args[0].includes('cancelled'))
    ) {
      // Suppress cancelled logs
      return;
    }
    originalLog.apply(console, args);
  };
  
  // Global error handler
  window.addEventListener('error', function(event) {
    const errorMessage = event.message || String(event.error || '');
    const target = event.target;
    const isResourceError = target && (target.tagName === 'IMG' || target.tagName === 'SCRIPT' || target.tagName === 'LINK');
    const targetSrc = target?.src || target?.href || '';
    const filename = targetSrc.split('/').pop() || '';
    
    // Suppress various errors
    if (
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('fetch') ||
      errorMessage.includes('ERR_BLOCKED_BY_RESPONSE') ||
      errorMessage.includes('NotSameOriginAfterDefaultedToSameOriginByCoep') ||
      targetSrc.includes('cca-lite.coinbase.com') ||
      targetSrc.includes('coinbase.com') ||
      filename === 'amp' ||
      filename === 'metrics' ||
      (isResourceError && (
        (target.src && target.src.includes('icon.png')) ||
        (target.href && target.href.includes('icon.png'))
      ))
    ) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Global unhandled rejection handler
  window.addEventListener('unhandledrejection', function(event) {
    const errorMessage = 
      event.reason?.message ||
      String(event.reason || '') ||
      String(event);
    if (
      errorMessage.includes('Failed to fetch') ||
      errorMessage.includes('fetch')
    ) {
      event.preventDefault();
      return false;
    }
  }, true);
})();

