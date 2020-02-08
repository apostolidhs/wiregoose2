export default {
  global: {
    font: {
      family: "'Noto Sans', sans-serif"
    },
    colors: {brand: '#1a73e8', focus: '#F8F8F8'},
    breakpoints: {
      small: {
        value: 768,
        borderSize: {
          xsmall: '1px',
          small: '2px',
          medium: '4px',
          large: '6px',
          xlarge: '12px'
        },
        edgeSize: {
          none: '0px',
          hair: '1px',
          xxsmall: '2px',
          xsmall: '3px',
          small: '6px',
          medium: '12px',
          large: '24px',
          xlarge: '48px'
        },
        size: {
          xxsmall: '24px',
          xsmall: '48px',
          small: '96px',
          medium: '192px',
          large: '384px',
          xlarge: '768px',
          full: '100%'
        }
      }
    },
    edgeSize: {
      responsiveBreakpoint: null
    }
  },
  tab: {
    margin: {
      bottom: 'none'
    },
    pad: {
      bottom: 'small',
      horizontal: 'small'
    },
    border: {
      side: 'bottom',
      size: 'small',
      color: 'none',
      active: {
        color: {
          dark: 'white',
          light: 'black'
        }
      },
      hover: {
        color: {
          dark: 'white',
          light: 'black'
        }
      }
    }
  },
  heading: {
    responsiveBreakpoint: null
  },
  box: {
    responsiveBreakpoint: null
  }
};
