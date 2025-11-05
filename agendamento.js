window.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('form-agendamento');
  if (!form) return;
  var draftKey = 'agendamento-draft';

  
  try {
    var draft = JSON.parse(localStorage.getItem(draftKey) || '{}');
    if (draft && Object.keys(draft).length) {
      Object.keys(draft).forEach(function(k){
        var el = form.elements[k];
        if (el) el.value = draft[k];
      });
    }
  } catch (err) { }

 
  form.addEventListener('input', function () {
    var d = {};
    Array.from(form.elements).forEach(function(el){
      if (!el.name) return;
      d[el.name] = el.value;
    });
    localStorage.setItem(draftKey, JSON.stringify(d));
  });

 
  form.addEventListener('submit', function () {
    localStorage.removeItem(draftKey);
    
    window.dispatchEvent(new Event('storage'));
  });

  function showMessage(text, type) {
    msgBox.textContent = text;
    msgBox.className = 'ag-msg ' + (type || 'info');

    setTimeout(function () {
      msgBox.textContent = '';
      msgBox.className = 'ag-msg';
    }, 4000);
  }

  var msgBox = document.getElementById('agendamento-msg');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var data = {
      id: Date.now(),
      nome: form.nome.value.trim(),
      email: form.email.value.trim(),
      telefone: form.telefone.value.trim(),
      especialidade: form.especialidade.value,
      data: form.data.value,
      horario: form.horario.value
    };

    if (!data.nome || !data.email || !data.data || !data.horario) {
      showMessage('Preencha os campos obrigatórios.', 'error');
      return;
    }

    try {
      var lista = JSON.parse(localStorage.getItem('agendamentos') || '[]');
      lista.push(data);
      localStorage.setItem('agendamentos', JSON.stringify(lista));

      
      console.log('Agendamento salvo:', data);
      console.log('Lista atual de agendamentos:', lista);
      if (console.table) console.table(lista);

      showMessage('Agendamento salvo com sucesso!', 'success');
      form.reset();
    } catch (err) {
      console.error(err);
      showMessage('Erro ao salvar. Verifique o console.', 'error');
    }
  });

  (function prefillEspecialidadeFromURL() {
    var params = new URLSearchParams(location.search);
    var esp = params.get('especialidade');
    if (!esp) return;
    var sel = document.getElementById('especialidade');
    if (!sel) return;

    esp = decodeURIComponent(esp);
    var found = Array.from(sel.options).find(function (o) {
      return o.value === esp || o.text === esp;
    });

    if (found) {
      sel.value = found.value || found.text;
    } else {
      var opt = document.createElement('option');
      opt.value = esp;
      opt.text = esp;
      sel.appendChild(opt);
      sel.value = esp;
    }

    var alvo = document.getElementById('agendamento');
    if (alvo) alvo.scrollIntoView({ behavior: 'smooth', block: 'center' });
    var dataField = document.getElementById('data');
    if (dataField) dataField.focus();
  })();
});