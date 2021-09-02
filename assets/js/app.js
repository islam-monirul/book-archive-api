const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
     const searchArea = document.getElementById('bookName');
     const searchText = searchArea.value;

     // if no search text given
     if( searchText === ''){
          alert('Please type a book name that you want to search');
     }
     // if ok then call the load function
     else{
          loadSearchData(searchText);
     }

     searchArea.value = '';
})

// search data loading function
const loadSearchData = async searchName => {
     // console.log(bookName);
     const url = `https://openlibrary.org/search.json?q=${searchName}`;
     // console.log(url);
     const res = await fetch(url);
     const data = await res.json();
     displaySearchResult(data);
}

// data displaying function
const displaySearchResult = data => {
     const books = data.docs;
     const totalSearchResult = data.numFound;

     const mainContainer = document.getElementById('result-container');
     mainContainer.textContent = '';

     // if search result is 0
     if(books.length === 0){
          // creating div element to show 'no results found'
          const div = document.createElement('div');
          div.classList.add('w-100');

          // console.log('No data found');
          const notFound = document.createElement('p');
          notFound.classList.add('text-center');
          notFound.textContent = 'No results found';

          div.appendChild(notFound);
          mainContainer.appendChild(div);
          
     }

     // if search data found
     else{
          let count = 0;
          // filtering out first 30 results and using forEach on them
          books.slice(0,18).forEach( book => {
               const col = document.createElement('div');
               col.classList.add('col');

               const card = document.createElement('div');
               card.classList.add('card','h-100');
               col.appendChild(card);

               let img = document.createElement('img');
               img.classList.add('card-img-top');

               // if else block for book image id
               // if found
               if(book.cover_i !== undefined){
                    // console.log(book.cover_i); // undefined if not found
                    img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
               }
               // if not found
               else{
                    // console.log('N/A');
                    img.src = `assets/images/notfound.png`;
               }

               card.appendChild(img);

               // card body creation
               const cardBody = document.createElement('div');
               cardBody.classList.add('card-body');

               // card body element creation
               const bookTitle = document.createElement('h6');
               bookTitle.classList.add('card-title');

               const bookAuthor = document.createElement('p');
               bookAuthor.classList.add('card-text');

               const firstPublished = document.createElement('p');
               firstPublished.classList.add('card-text');

               const bookPublisher = document.createElement('p');
               bookPublisher.classList.add('card-text');
               
               // if else block for book title
               // if found
               if(book.title !== undefined){
                    // console.log(book.title);
                    bookTitle.textContent = `${book.title}`;
               }
               // if not found
               else{
                    // console.log('N/A');
                    bookTitle.textContent = `N/A`;
               }

               cardBody.appendChild(bookTitle);

               // if else block for book author name
               // if found
               if(book.author_name !== undefined){
                    // console.log(...(book.author_name));
                    bookAuthor.textContent = `by ${book.author_name}`;
               }
               // if not found
               else{
                    // console.log('N/A');
                    bookAuthor.textContent = `by Unknown author`;
               }

               cardBody.appendChild(bookAuthor);

               // if else block for book first publish year
               // if found
               if(book.first_publish_year !== undefined){
                    // console.log(book.first_publish_year);
                    firstPublished.textContent = `First published in ${book.first_publish_year}`;
               }
               // if not found
               else{
                    // console.log('N/A');
                    firstPublished.textContent = `Publish year: Unknown`;
               }

               cardBody.appendChild(firstPublished);

               // if else block for book publisher
               // if found
               if(book.publisher !== undefined){
                    // console.log(...(book.publisher));
                    bookPublisher.textContent = `Published by: ${book.publisher}`;
               }
               // if not found
               else{
                    // console.log('N/A');
                    bookPublisher.textContent = `Published by: Unknown`;
               }
               
               cardBody.appendChild(bookPublisher);

               card.appendChild(cardBody);

               mainContainer.appendChild(col);

               count++;
          })

          // console.log(count);
          document.getElementById('result-count').textContent = `Showing ${count} of ${totalSearchResult} results`;
     }

     
}