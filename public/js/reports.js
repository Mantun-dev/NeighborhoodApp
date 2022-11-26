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
          columns: [
            { data: 'arrivalDate' },
            { data: 'departureDate' },
            { data: 'fullName' },
            { data: 'name' },
            { data: 'residente' },
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

  console.log(initialDate, endDate);
  generarReporte(initialDate, endDate);
});
