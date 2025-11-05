
window.onload = function () {

  function highlightActiveLink() {
    var links = document.querySelectorAll('header nav a');
    var page = location.pathname.split('/').pop();
    if (page === '') page = 'index.html';
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href === page) {
        links[i].className = links[i].className + ' active';
        links[i].style.color = '#044a52';
        links[i].style.fontWeight = '700';
      }
    }
  }

 
  function simpleNavToggle() {
    var btn = document.querySelector('.nav-toggle');
    if (!btn) return;
    btn.onclick = function () {
      var ul = document.querySelector('header nav ul');
      if (!ul) return;
     
      if (ul.style.display === 'block') ul.style.display = 'none';
      else ul.style.display = 'block';
    };
  }

 
  function revealOnScroll() {
    var items = document.querySelectorAll('.reveal');
    function check() {
      for (var i = 0; i < items.length; i++) {
        var rect = items[i].getBoundingClientRect();
        if (rect.top < window.innerHeight - 80) {
          if (items[i].className.indexOf('visible') === -1) {
            items[i].className = items[i].className + ' visible';
          }
        }
      }
    }
    window.onscroll = check;
   
    check();
  }


  function smoothAnchors() {
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].onclick = function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var id = href.slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        e.preventDefault();
     
        try {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } catch (err) {
         
          var top = target.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo(0, top);
        }
      };
    }
  }


  highlightActiveLink();
  simpleNavToggle();
  revealOnScroll();
  smoothAnchors();

  console.log('global.js (simples) carregado');
};