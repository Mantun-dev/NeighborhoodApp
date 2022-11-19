const nuevaColonia = async (name, county, state) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/neighborhoods',
      data: {
        name,
        county,
        state,
      },
    });

    console.log(res);

    if (res.data.status === 'ok') {
      Swal.fire({
        title: res.data.msg,
        text: `Se ha agregado la colonia ${name} al registro`,
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

fetch(
  'https://raw.githubusercontent.com/MilanDroid/Honduras-ETA-JSON-structure/main/municipios.json'
)
  .then((res) => res.json())
  .then((response) => mostrarData(response))
  .catch((error) => console.log(error));

const mostrarData = async (data) => {
  let x = await Object.entries(data[0].departamentos);

  for (let i = 0; i < x.length; i++) {
    let nombreDepartamento = x[i][1].nombre;
    let idDepa = x[i][1].idDepartamento;
    let y = document.createElement('option');
    y.text = nombreDepartamento;
    y.value = idDepa;
    departamento.options.add(y);
  }
};

const countyName = (data, state) => {
  const x = Object.entries(data[0].departamentos);

  let z = x[state][1].municipios;
  console.log(z);
  municipio.innerHTML =
    '<option value="" disabled selected>- Seleccione un municipio</option>';
  for (let i = 0; i < z.length; i++) {
    const y = document.createElement('option');
    y.text = z[i].nombre || z[i].name;
    // y.value = idDepa;
    municipio.options.add(y);
  }
};

document.querySelector('.form').addEventListener('submit', (e) => {
  e.preventDefault();
  const departamento = document.getElementById('departamento').value;
  const municipio = document.getElementById('municipio').value;
  const nombre = document.getElementById('nombre').value;
  nuevaColonia(nombre, municipio, departamento);
});

document.querySelector('#departamento').addEventListener('change', (e) => {
  e.preventDefault();

  const departamento = document.getElementById('departamento').value;
  fetch(
    'https://raw.githubusercontent.com/MilanDroid/Honduras-ETA-JSON-structure/main/municipios.json'
  )
    .then((res) => res.json())
    .then((response) => countyName(response, departamento))
    .catch((error) => console.log(error));
});
