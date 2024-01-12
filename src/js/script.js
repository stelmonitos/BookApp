// NIE ROZUMIEM: booksTemplate a nawiasy w handlebars.compile czemu zaznaczaja inne rzeczy kiedy prowadza do tego samego template-book ale w przypadku booksTemplate wyswietla wszystko wraz z script, id itd natomiast w generatedhtml nie wiem czy to przez innerHTML wyswietla ladnie tylko instancje li przed kompilacja
{
  'use strict';
  const select = {
    books: '#template-book',
    bookList: '.books-list'
  };
  function render() {
    // stworzylem petle dla bazy danych ksiazek tak aby miec dostep do kazdej w tablicy
    for (const book in dataSource.books) {
      const ratingBgc = determineRatingBgc(dataSource.books[book].rating);
      console.log(ratingBgc);
      const ratingWidth = dataSource.books[book].rating * 10;
      console.log(ratingWidth);
     
      const bookData = dataSource.books[book]; // stworzylem stala ktora jest rowna jednej instancji ksiazki np Lady in red
      bookData.ratingBgc = ratingBgc; // Add ratingBgc property to bookData
      bookData.ratingWidth = ratingWidth; // Add ratingWidth property to bookData
    

      // przypisalem stale do konkretnych miejsc w htmlu
      const booksTemplate = document.querySelector(select.books); //odnosnik do szablonu ksiazki w <script>
      const bookList = document.querySelector(select.bookList); // odnosnik do wnetrza ul

      const generatedHTML = Handlebars.compile(booksTemplate.innerHTML); // przypisuje funkcje compile do szablonu w htmlu
      bookData.element = utils.createDOMFromHTML(generatedHTML(bookData)); //wypelnia handlebars w szablonie i tworzy element dom juz na stronie 
      // pojedyncza ksiazka ronwa sie tworzeniu elementu dom z html za pomoca funkcji kompilacji calego li jednej ksiazki przy uzyciu argumentu zdefiniowanej jednej ksiazki jako ze to petla to postepuje tak z kazda ksiazka po kolei
      bookList.appendChild(bookData.element);// tworzy dziecko w ul skompilowanego elementu bookstemplate
    }
    initActions();
  }
  render();
  function initActions() {
    const links = document.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
    let favoriteBooks = [];
    const bookImages = document.querySelectorAll('.books-list a.book__image');
    for (let img of bookImages) {
      img.addEventListener('dblclick', function (event) {
        event.preventDefault();
        const bookId = img.getAttribute('data-id');
        const element = event.target;
        if (!element.offsetParent.classList.contains('favorite')) {
          element.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookId);
        } else {
          element.offsetParent.classList.remove('favorite');
          favoriteBooks = favoriteBooks.filter(id => id !== bookId);
        }
        console.log(favoriteBooks);
      });
    }

  }
  let filters = [];
  const filtersRef = document.querySelector('.filters');
  filtersRef.addEventListener('click', function (event) {
    const element = event.target;
    if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.name === 'filter') {
      if (element.checked === true) {
        filters.push(element.value);
      } else if (element.checked === false) {
        filters = filters.filter(value => value !== element.value);
      }
      filterBooks();
    }

  });
  function filterBooks() { // jak dziala ten kod bo ja nie wiem
    for (let book of dataSource.books) {
      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      let shouldBeHidden = false;
      for (let filter of filters) {        
        if(book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      if(bookImage) {
        if(shouldBeHidden) {
          bookImage.classList.add('hidden');
        } else {
          bookImage.classList.remove('hidden');
        }
      }
    }
  }
  function determineRatingBgc(rating) {
    let background = '';
    if (rating < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (rating > 6 && rating <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }
}
