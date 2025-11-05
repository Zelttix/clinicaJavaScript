
document.addEventListener('DOMContentLoaded', function () {
  var cards = document.querySelectorAll('.especialidade-card');
  cards.forEach(function (card) {
    card.style.cursor = 'pointer';
    card.addEventListener('click', function () {
      var service = card.getAttribute('data-service') ||
                    (card.querySelector('h2') && card.querySelector('h2').innerText) ||
                    card.textContent.trim().split('\n')[0];
      if (!service) return;
      var url = 'agendamento.html?especialidade=' + encodeURIComponent(service) + '#agendamento';
      window.location.href = url;
    });
  });
});