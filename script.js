document.addEventListener('DOMContentLoaded', () => {

    // --- Menu Mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menu.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (menu.classList.contains('active')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
    }

    // Fechar menu ao clicar em um link
    document.querySelectorAll('#menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            if (icon) icon.classList.replace('fa-times', 'fa-bars');
        });
    });

    // --- Modais de Serviços ---
    const modals = document.querySelectorAll('.modal');
    const btnsSaibaMais = document.querySelectorAll('.btn-saiba-mais');
    const closeButtons = document.querySelectorAll('.close');

    btnsSaibaMais.forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Impede scroll
            }
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const modal = btn.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Fechar modal ao clicar fora do conteúdo
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // --- Botão Voltar ao Topo ---
    const backToTop = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('show');
        } else {
            backToTop.classList.remove('show');
        }
    });

    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- Formulário de Contato (Simulação) ---
    const form = document.getElementById('form-contato');
    const formStatus = document.getElementById('form-status');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simula envio
            formStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            formStatus.style.color = '#0077b6';

            setTimeout(() => {
                formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Mensagem enviada com sucesso! Entraremos em contato em breve.';
                formStatus.style.color = '#00b4d8';
                form.reset();

                setTimeout(() => {
                    formStatus.innerHTML = '';
                }, 5000);
            }, 1500);
        });
    }

    // --- Animação de Scroll Suave para Links Internos ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Animação de Entrada (Fade In) para Cards ---
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.servico-card, .stat-box, .info-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});
