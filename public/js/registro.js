const registro = async (
  fullName,
  dni,
  phone,
  email,
  password,
  address,
  rol
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/admin',
      data: {
        fullName,
        dni,
        phone,
        email,
        password,
        address,
        rol,
      },
    });

    if (res.data.status === 'ok') {
      Swal.fire({
        title: res.data.msg,
        text: 'Se ha enviado un correo para confirmar la cuenta del usuario',
        icon: 'success',
      });
    }
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'warning',
    });
  }
};

document.querySelector('#coco').addEventListener('click', (e) => {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const dni = document.getElementById('dni').value;
  const address = document.getElementById('address').value;
  registro(fullName, dni, phone, email, 'holamundo', address, 'Guardia');
});

$(document).ready(function () {
  const url = 'http://localhost:3000/api/v1/admin/';

  $('#users')
    .DataTable({
      ajax: {
        url: url,
        dataSrc: '',
      },
      columns: [
        { data: 'id' },
        { data: 'fullName' },
        { data: 'phone' },
        {
          defaultContent:
            "<div class='flex justify-center gap-3'><button  type='button' class='editar bg-indigo-400 hover:bg-indigo-600 rounded-md py-2 px-4 mb-2 text-md text-white font-bold text-center inline-block w-full md:w-auto'><i class='fa-regular fa-pen-to-square'></i></button>  <button type='button' class='eliminar bg-red-400 hover:bg-red-600  rounded-md py-2 px-4 mb-2 text-md text-white font-bold text-center inline-block w-full md:w-auto'><i class='fa-solid fa-trash-can'></i></button></div>",
        },
      ],
      responsive: true,
      bDestroy: true,
      stateSave: true,

      paging: true,
    })
    .columns.adjust()
    .responsive.recalc();
});

$(document).on('click', '.eliminar', function () {
  fila = $(this);
  id = parseInt($(this).closest('tr').find('td:eq(0)').text());

  Swal.fire({
    title: '¿Está seguro que desea eliminar este usuario?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, quiero borrarlo',
  }).then((result) => {
    if (result.isConfirmed) {
      const url = 'http://localhost:3000/api/v1/admin/';
      $.ajax({
        url: url + id,
        type: 'delete',
        data: { id: id },
        success: function () {
          users.row(fila.parents('tr').remove().draw());
        },
      });

      Swal.fire('Registro Eliminado!', '', 'success');
    }
  });
});
