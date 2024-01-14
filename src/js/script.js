// NIE ROZUMIEM: booksTemplate a nawiasy w handlebars.compile czemu zaznaczaja inne rzeczy kiedy prowadza do tego samego template-book ale w przypadku booksTemplate wyswietla wszystko wraz z script, id itd natomiast w generatedhtml nie wiem czy to przez innerHTML wyswietla ladnie tylko instancje li przed kompilacja
{
  'use strict';
  class BooksList {
  constructor() {
    const thisBooksList = this;
    thisBooksList.initData();
    thisBooksList.getElements();
    thisBooksList.render();
    thisBooksList.initActions();
    thisBooksList.determineRatingBgc();
  //   thisBooksList.filterBooks();
  }

  initData() {
    this.data = dataSource.books;
  }
  render() {
    const thisBooksList = this;

    for (const book in thisBooksList.data) {
      const ratingBgc = thisBooksList.determineRatingBgc(thisBooksList.data[book].rating);
      const ratingWidth = thisBooksList.data[book].rating * 10;
     
      const bookData = thisBooksList.data[book]; // stworzylem stala ktora jest rowna jednej instancji ksiazki np Lady in red
      bookData.ratingBgc = ratingBgc; // Add ratingBgc property to bookData
      bookData.ratingWidth = ratingWidth; // Add ratingWidth property to bookData    

      // przypisalem stale do konkretnych miejsc w htmlu
      const booksTemplate = thisBooksList.booksTemplate; //odnosnik do szablonu ksiazki w <script>
      const bookList = thisBooksList.bookList; // odnosnik do wnetrza ul

      const generatedHTML = Handlebars.compile(booksTemplate.innerHTML); // przypisuje funkcje compile do szablonu w htmlu
      bookData.element = utils.createDOMFromHTML(generatedHTML(bookData)); //wypelnia handlebars w szablonie i tworzy element dom juz na stronie 
      // pojedyncza ksiazka ronwa sie tworzeniu elementu dom z html za pomoca funkcji kompilacji calego li jednej ksiazki przy uzyciu argumentu zdefiniowanej jednej ksiazki jako ze to petla to postepuje tak z kazda ksiazka po kolei
      bookList.appendChild(bookData.element);// tworzy dziecko w ul skompilowanego elementu bookstemplate
    }
  }
  getElements() {
    const thisBooksList = this;

    thisBooksList.booksTemplate = document.querySelector('#template-book');  
    thisBooksList.bookList = document.querySelector('.books-list');
    thisBooksList.filters = [];
  }

  initActions() {
    const thisBooksList = this;
    const links = document.querySelectorAll('a');
    for (const link of links) {
      link.addEventListener('click', function (event) {
        event.preventDefault();
      });
    }
    let favoriteBooks = [];
    const bookImages = document.querySelectorAll('.books-list a.book__image');
    for (const img of bookImages) {
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
    thisBooksList.filters = [];
      const filtersRef = document.querySelector('.filters');
      filtersRef.addEventListener('click', function (event) {
        const element = event.target;
        if (element.tagName === 'INPUT' && element.type === 'checkbox' && element.name === 'filter') {
          if (element.checked === true) {
            thisBooksList.filters.push(element.value);
          } else if (element.checked === false) {
            thisBooksList.filters = thisBooksList.filters.filter(value => value !== element.value);
          }
          thisBooksList.filterBooks();
        }
  });
}

  filterBooks() {
    const thisBooksList = this;
    for (let book of dataSource.books) {
      const bookImage = document.querySelector(`.book__image[data-id="${book.id}"]`);
      let shouldBeHidden = false;
      for (let filter of thisBooksList.filters) {        
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

  determineRatingBgc(render) {
    const thisBooksList = this;

    let background = '';
    if (render < 6) {
      background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    } else if (render > 6 && render <= 8) {
      background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (render > 8 && render <= 9) {
      background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (render > 9) {
      background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
    return background;
  }

}
const app = new BooksList();
}
