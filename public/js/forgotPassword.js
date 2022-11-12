// const changePassword = async (pass) => {
//   try {
//     const res = await axios({
//       method: 'PATCH',
//       url: `http://localhost:3000/api/v1/admin/updatepass/`,
//       params: {
//         token: 1233,
//       },
//       data: {
//         pass,
//       },
//     });
//     console.log(res);

//     console.log(token);
//     // if (res.data.status === 'ok') {
//     //   Swal.fire({
//     //     title: 'Exito',
//     //     text: res.data.msg,
//     //     icon: 'success',
//     //   });
//     // }
//   } catch (error) {
//     Swal.fire({
//       title: 'Error',
//       text: error.response.data.msg,
//       icon: 'error',
//     });
//   }
// };

// const token = document.querySelector('.button').datase;
// document.querySelector('.form').addEventListener('submit', (e) => {
//   console.log(token);
//   e.preventDefault();
//   const password = document.getElementById('password').value;
//   console.log(password);
// });
