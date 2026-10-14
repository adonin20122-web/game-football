const field = document.getElementById('field');
const ball = document.getElementById('ball');
const keeper = document.getElementById('keeper');
const zones = document.querySelectorAll('.zone');
const goalsEl = document.getElementById('goals');
const missesEl = document.getElementById('misses');
const restartBtn = document.getElementById('restart');

let goals = 0;
let misses = 0;
let busy = false;

const keeperPositions = [
    { left: 20, top: 20 },
    { left: 50, top: 20 },
    { left: 80, top: 20 },
    { left: 20, top: 45 },
    { left: 50, top: 45 },
    { left: 80, top: 45 }
];

function shoot(zoneX, zoneY) {
    if (busy) return;
    busy = true;

    ball.style.left = zoneX + '%';
    ball.style.bottom = (100 - zoneY) + '%';

    setTimeout(() => {
        const pos = keeperPositions[Math.floor(Math.random() * keeperPositions.length)];
        keeper.style.left = pos.left + '%';
        keeper.style.top = pos.top + '%';

        setTimeout(() => {
            const keeperX = parseFloat(keeper.style.left);
            const keeperY = parseFloat(keeper.style.top);

            const dx = Math.abs(keeperX - zoneX);
            const dy = Math.abs(keeperY - zoneY);

            if (dx < 20 && dy < 20) {
                misses++;
                missesEl.textContent = misses;
            } else {
                goals++;
                goalsEl.textContent = goals;
                field.classList.add('goal-scored');
                setTimeout(() => field.classList.remove('goal-scored'), 400);
            }

            setTimeout(() => {
                ball.style.left = '50%';
                ball.style.bottom = '12%';
                keeper.style.left = '50%';
                keeper.style.top = '12%';
                busy = false;
            }, 600);
        }, 400);
    }, 100);
}

zones.forEach(zone => {
    zone.addEventListener('click', () => {
        const x = parseFloat(zone.dataset.x);
        const y = parseFloat(zone.dataset.y);
        shoot(x, y);
    });
});

restartBtn.addEventListener('click', () => {
    goals = 0;
    misses = 0;
    goalsEl.textContent = 0;
    missesEl.textContent = 0;
});