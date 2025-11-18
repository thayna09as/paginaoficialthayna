const defaultConfig = {
      page_title: "Thayna",
      carousel_title: "Thayna",
      primary_color: "#6A2FC7",
      secondary_color: "#ffffff",
      text_color: "#6A2FC7",
      font_family: "Georgia",
      font_size: 16
    };

    let config = { ...defaultConfig };
    let currentSlide = 0;
    const totalSlides = 6;

    // Criar estrelas
    function createStars() {
      const starsContainer = document.getElementById('stars');
      // Corrigir para evitar recriar estrelas se já existirem
      if (starsContainer.children.length > 0) return; 

      const starCount = 60;
      
      for (let i = 0; i < starCount; i++) {
        const star = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        star.setAttribute('class', 'star');
        star.setAttribute('width', Math.random() * 20 + 10);
        star.setAttribute('height', Math.random() * 20 + 10);
        star.setAttribute('viewBox', '0 0 24 24');
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z');
        
        star.appendChild(path);
        starsContainer.appendChild(star);
      }
    }

    createStars();

    // Toggle Menu
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');

    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });

    // Navegação do Menu
    const menuItems = document.querySelectorAll('.menu-item');
    const pages = document.querySelectorAll('.page');

    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        const targetPage = this.getAttribute('data-page');
        
        menuItems.forEach(mi => mi.classList.remove('active'));
        pages.forEach(p => p.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(targetPage).classList.add('active');
        
        // Fechar menu após seleção
        sidebar.classList.remove('open');
      });
    });

    // Carrossel
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const currentSlideSpan = document.getElementById('current-slide');

    function showSlide(index) {
      // Garantir que os elementos existem antes de tentar usá-los
      if (slides.length > 0 && currentSlideSpan) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        currentSlideSpan.textContent = index + 1;
      }
    }

    // Adicionar verificação se os botões existem
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
      });

      nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
      });
    }

    // Chamar showSlide para garantir que o estado inicial está correto
    showSlide(currentSlide);


    // Element SDK
    async function onConfigChange(newConfig) {
      // Atualizar a config global
      config = { ...defaultConfig, ...newConfig };

      const baseFont = config.font_family;
      const baseFontStack = `${baseFont}, Georgia, 'Times New Roman', serif`;
      const baseSize = config.font_size;
      const primaryColor = config.primary_color;
      const secondaryColor = config.secondary_color;
      const textColor = config.text_color;

      document.body.style.fontFamily = baseFontStack;
      document.body.style.fontSize = `${baseSize}px`;

      document.getElementById('page-title').textContent = config.page_title;
      document.getElementById('carousel-title').textContent = config.carousel_title;

      document.querySelector('.sidebar').style.background = primaryColor;
      document.body.style.background = secondaryColor;
      
      const carouselSlides = document.querySelectorAll('.carousel-slide');
      carouselSlides.forEach(slide => {
        slide.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`;
      });

      const galleryItems = document.querySelectorAll('.gallery-item');
      galleryItems.forEach(item => {
        item.style.background = `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}cc 100%)`;
      });

      const socialIcons = document.querySelectorAll('.social-icon path, .social-icon circle, .social-icon rect');
      socialIcons.forEach(icon => {
        if (icon.hasAttribute('stroke')) {
          icon.setAttribute('stroke', primaryColor);
        }
        if (icon.hasAttribute('fill') && icon.getAttribute('fill') !== 'none') {
          icon.setAttribute('fill', primaryColor);
        }
      });

      const carouselTitle = document.querySelector('.carousel-title');
      if (carouselTitle) {
        carouselTitle.style.color = textColor;
        carouselTitle.style.fontSize = `${baseSize * 3.5}px`;
      }

      document.querySelector('.sidebar h1').style.fontSize = `${baseSize * 1.75}px`;
      document.querySelectorAll('.menu-item').forEach(item => {
        item.style.fontSize = `${baseSize * 1.125}px`;
      });
    }

    function mapToCapabilities(configData) {
      // Usar configData para garantir que estamos com os dados mais recentes
      return {
        recolorables: [
          {
            get: () => configData.primary_color || defaultConfig.primary_color,
            set: (value) => {
              window.elementSdk.setConfig({ primary_color: value });
            }
          },
          {
            get: () => configData.secondary_color || defaultConfig.secondary_color,
            set: (value) => {
              window.elementSdk.setConfig({ secondary_color: value });
            }
          },
          {
            get: () => configData.text_color || defaultConfig.text_color,
            set: (value) => {
              window.elementSdk.setConfig({ text_color: value });
            }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => configData.font_family || defaultConfig.font_family,
          set: (value) => {
            window.elementSdk.setConfig({ font_family: value });
          }
        },
        fontSizeable: {
  S       get: () => configData.font_size || defaultConfig.font_size,
          set: (value) => {
            window.elementSdk.setConfig({ font_size: value });
          }
        }
      };
    }

    function mapToEditPanelValues(configData) {
      return new Map([
        ["page_title", configData.page_title || defaultConfig.page_title],
        ["carousel_title", configData.carousel_title || defaultConfig.carousel_title]
      ]);
    }

    if (window.elementSdk) {
      window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
      });
    }