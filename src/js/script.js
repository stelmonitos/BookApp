// NIE ROZUMIEM: booksTemplate a nawiasy w handlebars.compile czemu zaznaczaja inne rzeczy kiedy prowadza do tego samego template-book ale w przypadku booksTemplate wyswietla wszystko wraz z script, id itd natomiast w generatedhtml nie wiem czy to przez innerHTML wyswietla ladnie tylko instancje li przed kompilacja
{
  'use strict';
  const select = {
    books: '#template-book',
    bookList: '.books-list'
  };
  function render(){
    // stworzylem petle dla bazy danych ksiazek tak aby miec dostep do kazdej w tablicy
    for(let book in dataSource.books){

      // stworzylem stala ktora jest rowna jednej instancji ksiazki np Lady in red
      const bookData = dataSource.books[book];

      // przypisalem stale do konkretnych miejsc w htmlu
      const booksTemplate = document.querySelector(select.books); //odnosnik do szablonu ksiazki w <script>
      const bookList = document.querySelector(select.bookList); // odnosnik do wnetrza ul

      const generatedHTML = Handlebars.compile(booksTemplate.innerHTML); // przypisuje funkcje compile do szablonu w htmlu

      bookData.element = utils.createDOMFromHTML(generatedHTML(bookData)); //wypelnia handlebars w szablonie i tworzy element dom juz na stronie 
      // pojedyncza ksiazka ronwa sie tworzeniu elementu dom z html za pomoca funkcji kompilacji calego li jednej ksiazki przy uzyciu argumentu zdefiniowanej jednej ksiazki jako ze to petla to postepuje tak z kazda ksiazka po kolei
      bookList.appendChild(bookData.element);// tworzy dziecko w ul skompilowanego elementu bookstemplate

      // console.log('template:', booksTemplate);
      // console.log('bookList', bookList)
      // console.log('book', bookData);
    }
    initActions();
    }
   render();
  
  function initActions(){
    const favoriteBooks = [];
    const bookImages = document.querySelectorAll('.books-list a.book__image');
    for(let img of bookImages){
        img.addEventListener('click', function(event){
            event.preventDefault() // musialem dodac bo i tak wylapuje pojedycze klikniecie i przeladowuje strone 🤢
        });
        img.addEventListener('dblclick', function(event){
            event.preventDefault()
            img.classList.add('favorite');
            const bookId = img.getAttribute('data-id')
            favoriteBooks.push(bookId)
            console.log(favoriteBooks)
        });
    }
  }
 
  
}