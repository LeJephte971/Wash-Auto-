
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.link');
    const page = document.getElementById('page');
  
    links.forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
  
        // Ajoute l'effet de fondu en sortie
        page.classList.add('fade-out');
  
        // Attends la fin de l'animation avant de rediriger
        setTimeout(() => {
          window.location.href = this.href;
        }, 700); // Correspond à la durée de la transition (0.5s)
      });
    });
  });