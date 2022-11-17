const login = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/admin/login',
      data: {
        email,
        password,
      },
    });

    if (res.data.status === 'ok') {
      Swal.fire({
        title: 'Exito',
        text: res.data.msg,
        icon: 'success',
      });

      window.setTimeout(() => {
        location.assign('/admin');
      }, 1500);
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'error',
    });
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('pass').value;
  login(email, password);
});

const forgotPassword = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/admin/forgotpassword',
      data: {
        email,
      },
    });
    if (res.data.status === 'ok') {
      Swal.fire({
        title: 'Exito',
        text: res.data.msg,
        icon: 'success',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'error',
    });
  }
};

document.querySelector('#forgotPass').addEventListener('click', async () => {
  const { value: email } = await Swal.fire({
    title: 'Cambio de contraseña',
    input: 'email',
    inputPlaceholder: 'Introduzca su correo electrónico',
  });

  forgotPassword(email);
});

const selfRegistrationAlert = async (email) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/admin/selfregistration',
      data: {
        email,
      },
    });
    if (res.data.status === 'ok') {
      Swal.fire({
        title: 'Exito',
        text: res.data.msg,
        icon: 'success',
      });
    }
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'error',
    });
  }
};

document
  .querySelector('#selfRegistration')
  .addEventListener('click', async () => {
    const { value: email } = await Swal.fire({
      title: 'Completa tu registro',
      input: 'email',
      inputPlaceholder: 'Introduzca su correo electrónico',
    });

    selfRegistrationAlert(email);
  });
