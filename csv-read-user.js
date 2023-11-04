const table = document.querySelector('table');

const reader = new FileReader();

reader.readAsText('f231017170313823.csv');

reader.onload = function() {
  const data = Papa.parse(reader.result);

  const tbody = table.querySelector('tbody');

  data.data.forEach((row) => {
    const tr = document.createElement('tr');

    row.forEach((cell) => {
      const td = document.createElement('td');

      td.textContent = cell;

      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });
};
