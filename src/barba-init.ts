import barba from '@barba/core';

// Basic Barba.js initialization for smooth transitions
document.addEventListener('DOMContentLoaded', () => {
    barba.init({
        transitions: [
            {
                name: 'default-transition',
                leave(data) {
                    return new Promise((resolve) => {
                        data.current.container.classList.add('barba-leave');
                        setTimeout(resolve, 400); // adjust for your animation
                    });
                },
                enter(data) {
                    data.next.container.classList.add('barba-enter');
                    setTimeout(() => {
                        data.next.container.classList.remove('barba-enter');
                    }, 400);
                },
            },
        ],
    });
});

import './barba-transitions.css';
