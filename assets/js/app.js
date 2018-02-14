const $form = $('#search-form');
const $searchField = $('#search-keyword');
const $responseContainer = $('#response-container');
let searchedForText;

//Evento del formulario
$form.submit(function (e) {
  e.preventDefault();
  $responseContainer.html('');
  searchedForText = $searchField.val();
  getNews();
});


//Método jQuery para realizar peticiones asincronas
function getNews() {
  $.ajax({
    // url y bjeto de configuración, en este caso sólo url y dentro tiene el objeto, busqueda de texto indicado en el input
    url: `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=a0d7f5594d134b0c8483bf3df55bbbd3`
  }).done(addNews) // Encargado de la busqueda y controlador de response
  // Manejo de errores
  .fail(handleError);
}

// Función encargada de la respuesta
function addNews(news) {
  console.log(news);
  const articles = news.response.docs;

  articles.forEach(function(article) {
    const title = article.headline.main;
    const snippet = article.snippet;

    let $li = $('<li />').addClass('articleClass').text(title);

    $responseContainer.append($li);
  });
}

// Función de error
function handleError() {
  console.log('se ha presentado un error');
}