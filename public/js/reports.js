const generarReporte = async (initialDate, endDate) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/visitors/reports',
      data: {
        initialDate,
        endDate,
      },
    });

    if (res.data.status === 'ok') {
      Swal.fire({
        title: 'Generando Reporte',
        text: res.data.msg,
        icon: 'success',
      });

      $('#reports')
        .DataTable({
          data: res.data.visitors,
          dom: 'Bfrtip',
          buttons: [
            {
              extend: 'excel',
              text: '<i class="fa-sharp fa-solid fa-file-excel"></i> Exportar Excel',
              titleAttr: 'Exportar a Excel',
            },
            {
              extend: 'pdf',
              text: '<i class="fa-solid fa-file-pdf"></i> Exportar PDF',
              titleAttr: 'Exportar PDF',
            },
            {
              extend: 'print',
              text: '<i class="fa-solid fa-print"></i> Imprimir Reporte',
              titleAttr: 'Exportar PDF',
            },
          ],

          columns: [
            { data: 'entrada' },
            { data: 'horaEntrada' },
            { data: 'salida' },
            { data: 'horaSalida' },
            { data: 'fullName' },
            { data: 'name' },
            { data: 'residente' },
            { data: 'guardia' },
          ],
          bDestroy: true,
          responsive: true,
          paging: true,
        })
        .columns.adjust()
        .responsive.recalc();
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'error',
    });
  }
};

document.querySelector('#generateReporte').addEventListener('click', (e) => {
  e.preventDefault();
  const initialDate = document.getElementById('initalDate').value;
  const endDate = document.getElementById('endDate').value;

  generarReporte(initialDate, endDate);
});
