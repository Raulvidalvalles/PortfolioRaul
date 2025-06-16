// El evento 'DOMContentLoaded' se asegura de que el script no se ejecute
// hasta que todo el contenido HTML de la página esté cargado.
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener el elemento donde se mostrará el texto
    const typingText = document.getElementById('typing-text');
    
    // Frases que se mostrarán en la animación
    const phrases = [
        "Estudiante de Desarrollo de Aplicaciones.",
        "Tecnólogo y entusiasta.",
        "Autodidacta y curioso."
    ];
    
    // Variables para controlar el estado de la animación
    let phraseIndex = 0; // Índice de la frase actual
    let charIndex = 0;   // Índice del carácter actual
    let isDeleting = false; // Estado para saber si estamos borrando o escribiendo

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Borrando el texto carácter por carácter
            typingText.textContent = currentPhrase.substring(0, charIndex--);
        } else {
            // Escribiendo el texto carácter por carácter
            typingText.textContent = currentPhrase.substring(0, charIndex++);
        }

        // Condición para cambiar de estado (de escribir a borrar)
        if (!isDeleting && charIndex === currentPhrase.length + 1) {
            isDeleting = true;
            // Pausar un tiempo después de terminar de escribir la frase
            setTimeout(type, 1500); 
        } 
        // Condición para cambiar de estado (de borrar a escribir la siguiente frase)
        else if (isDeleting && charIndex === -1) {
            isDeleting = false;
            // Pasar a la siguiente frase (y volver a la primera si es la última)
            phraseIndex = (phraseIndex + 1) % phrases.length;
            // Pausar un poco antes de empezar a escribir la nueva frase
            setTimeout(type, 500);
        } else {
            // Controlar la velocidad de escritura y borrado
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(type, typingSpeed);
        }
    }

    // Iniciar la animación
    type();

    // --- Smooth scroll con offset para el header fijo ---
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
                // Ajusta el offset para que la sección quede más arriba
                const extraOffset = -24; // Valor negativo para que suba más la sección
                window.scrollTo({
                    top: sectionTop - headerHeight + extraOffset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
