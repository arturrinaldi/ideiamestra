/**
 * IDEIA MESTRA - Interactive Web Application Logic
 * Comparison Slider, Portfolio Filters, Lightbox Modal & WhatsApp Configurator
 */

document.addEventListener('DOMContentLoaded', () => {

    /* ===================================================================
       1. INTERACTIVE BEFORE & AFTER COMPARISON SLIDER
       =================================================================== */
    const comparisonContainer = document.getElementById('comparisonContainer');
    const sliderClipper = document.getElementById('sliderClipper');
    const sliderHandle = document.getElementById('sliderHandle');
    const clippedImg = document.getElementById('clippedImg');

    if (comparisonContainer && sliderClipper && sliderHandle) {
        let isSliding = false;

        function updateSlider(clientX) {
            const rect = comparisonContainer.getBoundingClientRect();
            let offsetX = clientX - rect.left;
            offsetX = Math.max(0, Math.min(offsetX, rect.width));
            const percentage = (offsetX / rect.width) * 100;

            sliderClipper.style.width = `${percentage}%`;
            sliderHandle.style.left = `${percentage}%`;

            if (clippedImg) {
                clippedImg.style.width = `${rect.width}px`;
                clippedImg.style.height = `${rect.height}px`;
            }
        }

        function syncImageDimensions() {
            const rect = comparisonContainer.getBoundingClientRect();
            if (clippedImg) {
                clippedImg.style.width = `${rect.width}px`;
                clippedImg.style.height = `${rect.height}px`;
            }
        }
        window.addEventListener('resize', syncImageDimensions);
        window.addEventListener('load', syncImageDimensions);
        syncImageDimensions();

        comparisonContainer.addEventListener('mousedown', (e) => {
            isSliding = true;
            updateSlider(e.clientX);
        });

        window.addEventListener('mouseup', () => {
            isSliding = false;
        });

        window.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            updateSlider(e.clientX);
        });

        // Touch support
        comparisonContainer.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                isSliding = true;
                updateSlider(e.touches[0].clientX);
            }
        }, { passive: true });

        window.addEventListener('touchend', () => {
            isSliding = false;
        });

        window.addEventListener('touchmove', (e) => {
            if (!isSliding || e.touches.length !== 1) return;
            updateSlider(e.touches[0].clientX);
        }, { passive: true });
    }


    /* ===================================================================
       2. PORTFOLIO LIGHTBOX MODAL
       =================================================================== */
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    const portfolioModal = document.getElementById('portfolioModal');
    const modalBox = document.getElementById('modalBox');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const modalImg = document.getElementById('modalImg');
    const modalCtaBtn = document.getElementById('modalCtaBtn');

    // Open Modal when clicking any card
    portfolioCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            const img = card.querySelector('img')?.src || '';

            if (modalImg) modalImg.src = img;

            if (portfolioModal) {
                portfolioModal.classList.remove('hidden');
                setTimeout(() => {
                    portfolioModal.classList.remove('opacity-0');
                    if (modalBox) {
                        modalBox.classList.remove('scale-95');
                        modalBox.classList.add('scale-100');
                    }
                }, 10);
            }
        });
    });

    function closeModal() {
        if (!portfolioModal) return;
        portfolioModal.classList.add('opacity-0');
        if (modalBox) {
            modalBox.classList.remove('scale-100');
            modalBox.classList.add('scale-95');
        }
        setTimeout(() => {
            portfolioModal.classList.add('hidden');
        }, 300);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }
    if (portfolioModal) {
        portfolioModal.addEventListener('click', (e) => {
            if (e.target === portfolioModal) closeModal();
        });
    }
    if (modalCtaBtn) {
        modalCtaBtn.addEventListener('click', closeModal);
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });


    /* ===================================================================
       3. INTERACTIVE FORGE CONFIGURATOR & WHATSAPP GENERATOR
       =================================================================== */
    const forgeForm = document.getElementById('projectForgeForm');

    if (forgeForm) {
        forgeForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const projectType = document.querySelector('input[name="projectType"]:checked')?.value || 'Não informado';
            const projectScale = document.querySelector('input[name="projectScale"]:checked')?.value || 'Não informado';
            const projectFinish = document.querySelector('input[name="projectFinish"]:checked')?.value || 'Não informado';
            const clientName = document.getElementById('clientName')?.value.trim() || 'Cliente';
            const clientNotes = document.getElementById('clientNotes')?.value.trim() || 'Nenhum detalhe adicional';

            // Trigger Victory Confetti FX
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 110,
                    spread: 75,
                    origin: { y: 0.65 },
                    colors: ['#0EA5E9', '#38BDF8', '#2563EB', '#ffffff']
                });
            }

            // Construct WhatsApp Message
            const whatsappNumber = '5516997884274';
            const message = 
`✨ *NOVO PEDIDO DE PERSONALIZADO 3D - IDEIA MESTRA* ✨

Olá equipe da Ideia Mestra! Gostaria de fazer uma avaliação para criar uma peça 3D personalizada:

👤 *Nome:* ${clientName}
🎯 *Categoria:* ${projectType}
📏 *Tamanho Aproximado:* ${projectScale}
🎨 *Acabamento:* ${projectFinish}
📝 *Detalhes / Ideia:* ${clientNotes}

Estou com a foto de referência pronta para envio para gerarmos a Prova Visual 2D (o piloto). Como podemos prosseguir?`;

            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

            window.open(whatsappUrl, '_blank');
        });
    }


    /* ===================================================================
       4. FAQ ACCORDION INTERACTION
       =================================================================== */
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (questionBtn && answer) {
            questionBtn.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all others
                faqItems.forEach(other => {
                    other.classList.remove('active');
                    const otherAnswer = other.querySelector('.faq-answer');
                    if (otherAnswer) otherAnswer.classList.add('hidden');
                });

                if (!isActive) {
                    item.classList.add('active');
                    answer.classList.remove('hidden');
                }
            });
        }
    });


    /* ===================================================================
       5. MOBILE MENU DRAWER
       =================================================================== */
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    /* ===================================================================
       6. NAVBAR SCROLL EFFECT
       =================================================================== */
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 30) {
                navbar.classList.add('shadow-[0_10px_30px_rgba(0,0,0,0.8)]', 'bg-void/95');
                navbar.classList.remove('bg-void/85');
            } else {
                navbar.classList.remove('shadow-[0_10px_30px_rgba(0,0,0,0.8)]', 'bg-void/95');
                navbar.classList.add('bg-void/85');
            }
        });
    }

});
