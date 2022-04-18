'use strict'

const switcher = document.querySelector('.btn');

switcher.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        switcher.textContent = 'Light';
    } else {
        switcher.textContent = 'Dark';
    }
    console.log('current class name: ' + className);

});