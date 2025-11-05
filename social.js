
document.addEventListener('DOMContentLoaded', function () {
  
  var links = document.querySelectorAll('#footer .social-media a, footer .social-media a');
  if (!links.length) return;

  links.forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;


    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener noreferrer');

    
    a.addEventListener('click', function (e) {
      
      try {
        var host = (new URL(href, location.href)).host.replace('www.','');
        var counts = JSON.parse(localStorage.getItem('social_clicks') || '{}');
        counts[host] = (counts[host] || 0) + 1;
        localStorage.setItem('social_clicks', JSON.stringify(counts));
        console.log('Redirecionando para', href, '— cliques em', host, ':', counts[host]);
      } catch (err) {
        console.log('Redirecionando para', href);
      }

      
    });
  });
});