document.querySelectorAll('.cloud').forEach(cloud => {
  resetCloud(cloud);
  cloud.addEventListener('animationiteration', () => resetCloud(cloud));
});

function resetCloud(cloud) {
  const top = Math.random() * 70 + 10; // random vertical position
  cloud.style.top = top + '%';
}
