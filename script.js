<script>
// =================== Smooth Scrolling ===================
document.querySelectorAll('header nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        if(targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop - 80, // offset for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// =================== Fade-in on Scroll ===================
const sections = document.querySelectorAll('.dark-section, #home');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

sections.forEach(section => observer.observe(section));

// =================== Add fade-in CSS ===================
const style = document.createElement('style');
style.innerHTML = `
.fade-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
    transition: all 1s ease-out;
}
.dark-section, #home {
    opacity: 0;
    transform: translateY(50px);
}
`;
document.head.appendChild(style);

// =================== Member / Album Modals ===================
function createModal(title, content, imgSrc){
    // Create modal elements
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    overlay.style.cssText = `
        position: fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background: rgba(0,0,0,0.9);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:1000;
        cursor:pointer;
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        background:#111;
        padding:20px;
        border-radius:10px;
        max-width:600px;
        text-align:center;
        color:#fff;
        position:relative;
    `;

    const img = document.createElement('img');
    img.src = imgSrc || '';
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.marginBottom = '15px';
    modal.appendChild(img);

    const h = document.createElement('h2');
    h.textContent = title;
    h.style.marginBottom = '15px';
    modal.appendChild(h);

    const p = document.createElement('p');
    p.innerHTML = content;
    modal.appendChild(p);

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

// Attach modals to member cards
document.querySelectorAll('.member-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const content = card.querySelector('p').innerHTML;
        const imgSrc = card.querySelector('img').src;
        createModal(title, content, imgSrc);
    });
});

// Attach modals to album cards
document.querySelectorAll('.album-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('h3').textContent;
        const content = card.querySelector('ul').outerHTML;
        const imgSrc = card.querySelector('img').src;
        createModal(title, content, imgSrc);
    });
});

// =================== Optional: Scroll Indicator Bounce ===================
const scrollIndicator = document.querySelector('.scroll-indicator');
if(scrollIndicator){
    setInterval(() => {
        scrollIndicator.style.transform = 'translateY(-10px)';
        setTimeout(() => scrollIndicator.style.transform = 'translateY(0px)', 500);
    }, 1000);
}

</script>