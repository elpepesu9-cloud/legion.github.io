document.addEventListener('DOMContentLoaded', function(){
    // Menú móvil
    const menuBtn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menuBtn && menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    // Newsletter
    const form = document.getElementById('newsletter');
    const success = document.getElementById('successMsg');
    form && form.addEventListener('submit', function(e){
        e.preventDefault();
        success.hidden = false;
        form.querySelector('input').value = '';
        setTimeout(()=> success.hidden = true, 5000);
    });

    // Discord links
    const discordUrl = 'https://discord.gg/TS58E5Zjtk';
    const discordBtns = document.querySelectorAll('#discordBtn, #discordJoin, #discordCard');
    discordBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            window.open(discordUrl, '_blank');
        });
    });

    /* --- Efecto de estrellitas en el cursor --- */
    const canvas = document.getElementById('star-canvas');
    if(canvas && canvas.getContext){
        const ctx = canvas.getContext('2d');
        let W, H;
        const stars = [];
        
        function resize(){ 
            W = canvas.width = window.innerWidth;
            H = canvas.height = window.innerHeight;
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.zIndex = '1';
            canvas.style.pointerEvents = 'none';
        }
        
        window.addEventListener('resize', resize);
        resize();

        function rand(min, max){ return Math.random()*(max-min)+min }

        function spawn(x, y, burst=false){
            const count = burst ? rand(8,15) : rand(1,3);
            for(let i=0; i<count; i++){
                const angle = rand(0, Math.PI * 2);
                const velocity = burst ? rand(2,4) : rand(0.8,1.6);
                stars.push({
                    x: x + rand(-4,4),
                    y: y + rand(-4,4),
                    vx: Math.cos(angle) * velocity,
                    vy: Math.sin(angle) * velocity,
                    r: rand(0.8,2.5),
                    life: rand(420,820),
                    age: 0,
                    hue: rand(250,285)
                });
            }
        }

        // Movimiento del ratón
        window.addEventListener('mousemove', (e) => {
            spawn(e.clientX, e.clientY);
        });

        // Clic del ratón (más partículas)
        window.addEventListener('click', (e) => {
            spawn(e.clientX, e.clientY, true);
            spawn(e.clientX, e.clientY, true); // Doble spawn para más efecto
        });

        function draw(){ 
            ctx.clearRect(0, 0, W, H);
            for(let i=stars.length-1; i>=0; i--){
                const s = stars[i];
                s.x += s.vx;
                s.y += s.vy;
                s.age += 16;
                s.vy += 0.02;
                
                const alpha = 1 - (s.age / s.life);
                if(alpha <= 0){ 
                    stars.splice(i,1);
                    continue;
                }
                
                ctx.beginPath();
                ctx.fillStyle = `hsla(${s.hue},80%,70%,${alpha})`;
                ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
                ctx.fill();
            }
            requestAnimationFrame(draw);
        }
        draw();
    }
});