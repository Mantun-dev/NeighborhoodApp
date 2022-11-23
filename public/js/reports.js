$(document).ready(function () {
  const url = 'http://localhost:3000/api/v1/visitors/reports/';

  $('#reports')
    .DataTable({
      ajax: {
        url: url,
        dataSrc: '',
      },
      columns: [
        { data: 'arrivalDate' },
        { data: 'createdAt' },
        { data: 'colID' },
      ],
      responsive: true,
    })
    .columns.adjust()
    .responsive.recalc();
});
