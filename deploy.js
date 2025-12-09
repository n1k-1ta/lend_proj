import { publish } from 'gh-pages';

const options = {
  branch: 'gh-pages',
  repo: 'https://github.com/n1k-1ta/lend_proj.git',
  dotfiles: true,
  message: 'Deploy to GitHub Pages'
};

console.log('🚀 Starting deploy...');

publish('dist', options, (err) => {
  if (err) {
    console.error('❌ Deploy failed:', err);
    process.exit(1);
  } else {
    console.log('✅ Deploy successful!');
    console.log('🌐 Your site: https://n1k-1ta.github.io/lend_proj/');
  }
});