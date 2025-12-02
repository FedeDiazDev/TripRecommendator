export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {          
          white: '#FFFFFF',
                              
          black1: '#0a0a0a', 
                              
          black2: '#0f0f11', 
                              
          black3: '#151515', 
                              
          black4: '#1a1a1a', 
          
          gray1: 'rgba(255, 255, 255, 0.1)',
          gray2: 'rgba(255, 255, 255, 0.2)',
                    
          textMuted: 'rgba(255, 255, 255, 0.6)', 
        }
      },
      fontFamily: {        
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'], 
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}