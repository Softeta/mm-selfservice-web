/*
  Explore configuration options docs https://tailwindcss.com/docs/configuration#configuration-options
  Or check the default configuration https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
*/

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './b2c-authentication-templates/**/*.html'
  ],
  theme: {
    fontFamily: {
      poppins: ['Open Sans', 'sans-serif'],
      serif: ['Vollkorn', 'serif']
    },
    maxWidth: {
      'candidate-profile-form': '30rem',
      'content-container': '56.25rem'
    },
    maxHeight: {
      'photo-crop-container': 'calc(100vh - 12.5rem)'
    },
    extend: {
      width: {
        'content-container': '56.25rem'
      },
      height: {
        header: '5rem',
        'content-with-header': 'calc(100vh - 5rem)',
        'prev-next-menu': '5rem',
        'candidate-profile-progress-bar': '0.5rem',
        'settings-only-menu': '5rem'
      },
      spacing: {
        'scroll-bar-correction': '0.1rem',
        'settings-only-menu': '5rem',
        'prev-next-menu': '5rem'
      },
      fontSize: {
        '2xs': ['0.563rem', '1.063rem'],
        xs: ['0.688rem', '1rem'],
        base: ['0.8125rem', '1.125rem'],
        md: ['1rem', '1.25rem'],
        lg: ['1.25rem', '1.25rem'],
        xl: ['2.375rem', '2.75rem'],
        '2xl': ['2.5rem', '3rem'],
        '3xl': ['4rem', '5rem']
      },
      colors: {
        cathedral: '#ACABA9', // https://icolorpalette.com/color/acaba9
        'smart-white': '#F9F7F2', // https://icolorpalette.com/color/F9F7F2
        'foggy-day': '#E8E4DD', // https://icolorpalette.com/color/E8E4DD
        'early-evening': '#CAC6BF', // https://icolorpalette.com/color/CAC6BF
        'mine-shaft': '#303030',
        'spring-wood': '#F5F1EA',
        'blue-ribbon': '#393838',
        nobel: '#B4B4B4',
        'satin-linen': '#EDE9E1',
        'sunset-orange': '#F54343',
        emerald: '#F6EA09',
        'ship-gray': '#39383E',
        white: '#FFFFFF',
        'dusty-gray': '#9b9b9b',
        scorpion: '#606060',
        'pastel-grey': '#D7D1C8',
        orange: '#F6EA09',
        bluebonnet: '#27262b',
        'pearl-bush': '#EDE8DF',
        mercury: '#E5E5E5',
        'dodger-blue': '#303030',
        zircon: '#FFEBC3',
        pippin: '#FFE5E7',
        pampas: '#ECE8E2',
        red: '#FF000D',
        'egg-white': '#FFEBC3',
        'spanish-gray': '#959595',
        selection: {
          tab: {
            normal: '#959595',
            active: '#FFFFFF'
          }
        },
        slider: {
          bar: {
            normal: '#E7E3DD',
            selected: '#868E96'
          },
          dot: '#959595'
        }
      },
      backgroundColor: {
        selection: {
          tab: {
            active: '#393838'
          }
        }
      },
      borderColor: {
        list: {
          separator: '#D3C4B9'
        },
        selection: {
          tab: '#959595'
        }
      },
      divideColor: {
        selection: {
          tab: '#959595'
        }
      }
    }
  },
  plugins: []
}
