$(document).ready(function () {
  let consulta = (id) => {
    $.ajax({
      dataType: "json",
      type: "GET",
      url: `https://www.superheroapi.com/api.php/10216218593416642/${id}`,
      success: (result) => {
        let resultado = `
                <h3 class="text-center">SuperHero Encontrado</h3>
                <div class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${result.image.url}" class="img-fluid rounded-start" alt="${result.name}">
                        </div>
                        <div class="col-md-8 text-start">
                            <div class="card-body">
                                <h5 class="card-title">Nombre: ${result.name}</h5>
                                <p class="card-text">${result.connections["group-affiliation"]}</p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">Publicado por: ${result.biography.publisher}</li>
                                    <li class="list-group-item">Ocupacion: ${result.work.occupation}</li>
                                    <li class="list-group-item">Primera Aparicion: ${result.biography["first-appearance"]}</li>
                                    <li class="list-group-item">Altura: ${result.appearance.height}</li>
                                    <li class="list-group-item">Peso: ${result.appearance.weight}</li>
                                    <li class="list-group-item">Alianza: ${result.biography.aliases}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                `;
        //Inyeccion del codigo dentro del html
        $("#resultado").append(resultado);

        //Inyeccion de graficos
        
        let dataPoints = [];

        //Recorre objeto y extrae su nombre y valor(segun datos de api)
        for (const key in result.powerstats) {
          dataPoints.push({
            label: key,
            y: parseInt(result.powerstats[key]),
          });
        }

        //Codugo de 
        var chart = new CanvasJS.Chart("chartContainer", {
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            exportEnabled: true,
            animationEnabled: true,
            title: {
                text: `${result.name}`
            },
            data: [{
                type: "pie",
                startAngle: 25,
                toolTipContent: "<b>{label}</b>: {y}%",
                showInLegend: "true",
                legendText: "{label}",
                indexLabelFontSize: 16,
                indexLabel: "{label} - {y}%",
                dataPoints: dataPoints,
            }]
        });
        chart.render();

      },
      error: (error) => {
        alert("Ha ocurrido un error en la consulta");
      },
      async: true,
    });
  };
  //Capturando el evento del formulario
  $("form").on("submit", (evento) => {
    //Previene evento del formulario
    evento.preventDefault();

    //Nos aseguramos que el espacio donde se inyecta este limpio para entregar resultados
    $("#resultado").html(" ");

    //Capturando el valor del input
    id = parseInt($("#idHero").val());
    consulta(id);
  });
});
