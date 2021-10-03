$(document).ready(function () {
  let consulta = (id) => {
    $.ajax({
      dataType: "json",
      type: "GET",
      url: `https://www.superheroapi.com/api.php/10216218593416642/${id}`,
      success: (result) => {
        let resultado = `
                <h4 class="text-center">SuperHero Encontrado</h4>
                <div id="card" class="card mb-3 ml-0" style="max-width: auto;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${result.image.url}" class="img-fluid rounded-center" width="500" height="auto" alt="${result.name}">
                        </div>
                        <div class="col-md-8 text-start">
                            <div class="card-body p-2">
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
          //
          if (result.powerstats[key] === "null") {
            dataPoints.push({
              label: key,
              y: 0,
            });
          }else{
            dataPoints.push({
              label: key,
              y: parseInt(result.powerstats[key]),
            }); 
          }
        }

        //Codugo de Grafico
        var chart = new CanvasJS.Chart("chartContainer", {
          theme: "light1", // "light1", "light2", "dark1", "dark2"
          exportEnabled: false,
          animationEnabled: true,
          title: {
            text: `Estadisticas de Poder para ${result.name}`,
          },
          data: [
            {
              type: "pie",
              startAngle: 25,
              toolTipContent: "<b>{label}</b>: {y}",
              showInLegend: "true",
              legendText: "{label}",
              indexLabelFontSize: 16,
              indexLabel: "{label} ({y})",
              dataPoints: dataPoints,
            },
          ],
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

    limpiarErrores();

    if (validar(id)) {
      consulta(id);
    };

    function limpiarErrores(){
      document.querySelector(".errorId").innerHTML = "";
    }
    
    function validar(idHero) {
      let validar = true;
    
      let validacionNumero = /[0-9]/gim;
      if (!validacionNumero.test(idHero)) {
        document.querySelector(".errorId").innerHTML = "Ingrese un id valido (solo numeros)"
        validar = false;
      }
    
      if (idHero < 1 || idHero > 732 ) {
        document.querySelector(".errorId").innerHTML = "Ingrese un id valido entre 1 y 732"
        validar = false;
      }
    
      return validar;
    }
  });
});



