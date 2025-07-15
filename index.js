document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('nav').offsetHeight;

    const observerOptions = {
        root: null, // relative to document viewport
        rootMargin: `-${navHeight}px 0px -${window.innerHeight - navHeight - 100}px 0px`, // Adjust top/bottom margin to trigger slightly earlier/later
        threshold: 0 // Trigger as soon as any part enters/leaves margin
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            const id = entry.target.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-link[href="#${id}"]`);

            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                // Add active class to the current link
                if (correspondingNavLink) {
                    correspondingNavLink.classList.add('active');
                }
            }
            // Optional: If you want to remove active class when scrolling out completely
            // else {
            //     if (correspondingNavLink) {
            //          correspondingNavLink.classList.remove('active');
            //     }
            // }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll for internal links & update URL hash without jump
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault(); // Prevent default anchor jump
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });

                    // Optionally update URL hash without triggering scroll jump again
                    // history.pushState(null, null, targetId);
                }
            }
        });
    });

});