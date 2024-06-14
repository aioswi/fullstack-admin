export const animations = {
  animation: {
    'drip-expand': 'drip-expand 420ms linear',
    'spinner-ease-spin': 'spinner-spin 0.8s ease infinite',
    'spinner-linear-spin': 'spinner-spin 0.8s linear infinite',
    'appearance-in': 'appearance-in 250ms ease-out normal both',
    'appearance-out': 'appearance-out 60ms ease-in normal both',
    'indeterminate-bar':
      'indeterminate-bar 1.5s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite normal none running',
    'ripple': 'ripple 0.5s ease-out forwards',
    'spinner-rotate': 'spinner-rotate 1.28973s linear infinite', // https://codepen.io/shiwei93/pen/NWVxmqG
    'spinner-dash': 'spinner-dash 2s ease-in-out infinite',
    'fade-in': 'fade-in 0.4s cubic-bezier(0.36, 0.66, 0.4, 1)',
    'fade-out': 'fade-out 0.3s cubic-bezier(0.36, 0.6, 0.4, 1)',
    'modal-enter': 'modal-enter 0.4s cubic-bezier(0.16, 1.11, 0.3, 1)',
    'modal-exit': 'modal-exit 0.3s cubic-bezier(0.36, 0.66, 0.4, 1)',
  },
  keyframes: {
    'shimmer': {
      '100%': {
        transform: 'translateX(100%)',
      },
    },
    'spinner-spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
    'drip-expand': {
      '0%': {
        opacity: '0.2',
        transform: 'scale(0)',
      },
      '100%': {
        opacity: '0',
        transform: 'scale(2)',
      },
    },
    'appearance-in': {
      '0%': {
        opacity: '0',
        transform: 'translateZ(0)  scale(0.95)',
      },
      '60%': {
        opacity: '0.75',
        /* Avoid blurriness */
        backfaceVisibility: 'hidden',
        webkitFontSmoothing: 'antialiased',
        transform: 'translateZ(0) scale(1.05)',
      },
      '100%': {
        opacity: '1',
        transform: 'translateZ(0) scale(1)',
      },
    },
    'appearance-out': {
      '0%': {
        opacity: '1',
        transform: 'scale(1)',
      },
      '100%': {
        opacity: '0',
        transform: 'scale(0.85)',
      },
    },
    'indeterminate-bar': {
      '0%': {
        transform: 'translateX(-50%) scaleX(0.2)',
      },
      '100%': {
        transform: 'translateX(100%) scaleX(1)',
      },
    },
    'ripple': {
      '0%': {
        transform: 'scale(0)',
        opacity: '0.35',
      },
      '100%': {
        transform: 'scale(2)',
        opacity: '0',
      },
    },
    'spinner-rotate': {
      '100%': {
        transform: 'rotate(360deg)',
      },
    },
    'spinner-dash': {
      '0%': {
        strokeDasharray: '1, 200',
        strokeDashoffset: '0',
      },
      '50%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: '-35px',
      },
      '100%': {
        strokeDasharray: '89, 200',
        strokeDashoffset: '-124px',
      },
    },
    'fade-in': {
      '0%': {
        opacity: '0',
      },
      '100%': {
        opacity: '1',
      },
    },
    'fade-out': {
      '0%': {
        opacity: '1',
      },
      '100%': {
        opacity: '0',
      },
    },
    'modal-enter': {
      '0%': {
        opacity: '0',
        transform: 'scale(var(--scale-exit)) translateY(var(--slide-exit))',
      },
      '100%': {
        opacity: '1',
        transform: 'scale(var(--scale-enter)) translateY(var(--slide-enter))',
      },
    },
    'modal-exit': {
      '0%': {
        opacity: '1',
        transform: 'scale(var(--scale-enter)) translateY(var(--slide-enter))',
      },
      '100%': {
        opacity: '0',
        transform: 'scale(var(--scale-exit)) translateY(var(--slide-exit))',
      },
    },
  },
}
