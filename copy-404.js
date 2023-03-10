const fs = require('fs');

fs.copyFile('dist/vue-app/index.html', 'dist/vue-app/404.html', (error) => {
    if (error) throw error;

    console.log('404 redirect is prepared');
});
