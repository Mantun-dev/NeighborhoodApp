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
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'warning',
    });
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const dni = document.getElementById('dni').value;
  const address = document.getElementById('address').value;
  registro(fullName, dni, phone, email, 'holamundo', address, 'Guardia');
});
