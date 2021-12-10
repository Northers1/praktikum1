
const baseUrl = 'https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=3qRVkfz0XnanZxKr0tPU4BcgcDproGSy';
const key = '3qRVkfz0XnanZxKr0tPU4BcgcDproGSy';
const baseImageUrl = 'https://covers.openlibrary.org/b/isbn/';
const defaultPic = 'https://www.iconpacks.net/icons/2/free-opened-book-icon-3169-thumb.png';

let view = 'list';
let books = [];


function getBooks(params = {}) {

         const data = {...params}
         const settings = 'best-sellers/history.json?';
         $.ajax({
            method: "GET",
             url: `${baseUrl}`,
             data,
         })
         .done(response => {
             books = response.results;
             renderBookList();
         })
         .fail(response => {
                 console.log(response);
              
         })
         .always(() => {
             console.log('here we go');
         })
     }

function renderBookList(){
    $bookList = $('#book-list');
    $bookList.empty();
    books.forEach(author => {
        const $template = getBookTemplate(author);
        $bookList.append($template);
    })
}

function getBookTemplate(author){
    const templateSelector = `#book-${view}-template`;
    const $template = $($(templateSelector).html());
    $template.find('.book-title').text(author.title);
    $template.find('.book-author').text("by" + " " + author.author);
    $template.find('.book-desc').text(author.description);
    let imageUrl = (Object.keys(author.isbns)[0]);
    const image = author.isbns ? `${baseImageUrl}${imageUrl}${'-L.jpg'}` : defaultPic;
    const image2 = defaultPic;
    $template.find('.book-pic').attr('src', image2);
    return $template;
} 

function getBookParams() {
    const price = [];
    $('.price-checkbox:checked').each((index, el) => {
        price.push(el.value);
    })
    const ageGroup = [];
    $('.age-checkbox:checked').each((index, el) => {
        ageGroup.push(el.value);
    })

    const sortBy = $('#filter-sort').val();
    const params = {price: price.join(), age_group: ageGroup.join(), sort_by: sortBy}
    return params;
}

$('#get-books').click(()=> {
    getBooks(this.getBookParams());
})

$('#grid-view').click(e => {
    view = 'grid';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#list-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderBookList();
})

$('#list-view').click(e => {
    view = 'list';
    $(e.currentTarget).addClass('btn-primary').removeClass('btn-outline-primary');
    $('#grid-view').addClass('btn-outline-primary').removeClass('btn-primary');
    renderBookList();
})


getBooks(this.getBookParams());






