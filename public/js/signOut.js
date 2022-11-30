const signOut = async () => {
  try {
    Swal.fire({
      title: '¿Deseas cerrar sesión?',
      showDenyButton: true,
      confirmButtonText: 'Si',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axios({
          method: 'GET',
          url: 'http://localhost:3000/api/v1/admin/logout',
        });
        if (res.data.status === 'ok') {
          Swal.fire({
            title: 'Sesión Cerrada',
            text: 'Hasta la proxima',
            icon: 'success',
          });
          window.setTimeout(() => {
            location.reload(true);
          }, 1500);
        }
      }
    });
  } catch (error) {
    Swal.fire({
      title: 'Error',
      text: error.response.data.msg,
      icon: 'error',
    });
    console.log(error);
  }
};

document.querySelector('#signOut').addEventListener('click', async () => {
  signOut();
});
