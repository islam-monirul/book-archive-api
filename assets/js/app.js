/*-------------------- click search button and get value from input --------------------*/
const searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', () => {
     const searchArea = document.getElementById('bookName');
     const searchText = searchArea.value;

     // clearing result area on every new value insert | adding loading text initially on result count
     document.getElementById('result-container').textContent = '';
     document.getElementById('result-count').textContent = 'Loading...';

     // if no search text given
     if( searchText === ''){
          alert('Please type a book name that you want to search');
          // clearing previous results when no value given as input
          document.getElementById('result-container').textContent = '';
          document.getElementById('result-count').textContent = '';
     }
     // if ok then call the load function
     else{
          loadSearchData(searchText);
     }

     // resetting search value
     searchArea.value = '';
})


/*-------------------- search data loading function --------------------*/
const loadSearchData = async searchName => {
     // setting the url
     const url = `https://openlibrary.org/search.json?q=${searchName}`;

     // fetching the data | converting into json format | sending the fetch result to display function
     const res = await fetch(url);
     const data = await res.json();
     displaySearchResult(data);
}

/*-------------------- data displaying function --------------------*/
const displaySearchResult = data => {
     // saving data.docs to books | data.docs carries all the data
     const books = data.docs;
     // getting the total found results into a variable
     const totalSearchResult = data.numFound;

     // selecting result container of the document
     const mainContainer = document.getElementById('result-container');
     // clearing & reseting the result container before showing the new result
     mainContainer.textContent = '';
     
     // clearing and reseting previous search count results
     document.getElementById('result-count').textContent = '';

     /*---------- if no matched results found ----------*/
     if(books.length === 0){
          // creating div element to show 'no results found'
          const div = document.createElement('div');
          // adding a class to the div
          div.classList.add('w-100');

          // creating an paragraph element | adding text-center class to it | adding the text to show in it
          const notFound = document.createElement('p');
          notFound.classList.add('text-center');
          notFound.textContent = 'No results found';

          // appending the paragraph element into the div
          div.appendChild(notFound);
          // appending the div into the main container
          mainContainer.appendChild(div);
          
     }

     /*---------- if any matched results found ----------*/
     else{
          // setting an variable for counting the number of shown results and initializing as 0
          let count = 0;

          // slicing the array of data to show max 30 elements and using forEach on them
          books.slice(0,30).forEach( book => {
               // creating a div for the data | adding a class to it
               const col = document.createElement('div');
               col.classList.add('col');

               // creating another div named card to append the data into it | adding two class in it
               const card = document.createElement('div');
               card.classList.add('card','h-100');

               /*---------- creating an image type element and assigning appropriate value to it ----------*/
               let img = document.createElement('img');
               img.classList.add('card-img-top');

               /*---------- if else block for book image id (checking if value is found or not)----------*/
               // if found
               if(book.cover_i !== undefined){
                    // setting the image source if found
                    img.src = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
               }
               // if not found
               else{
                    // setting a default image source if not found
                    img.src = `assets/images/notfound.png`;
               }
               
               // appending the image in the card div
               card.appendChild(img);


               /*---------- card body creation for adding additional information in it ----------*/
               const cardBody = document.createElement('div');
               cardBody.classList.add('card-body');

               /*---------- card body element creation ----------*/
               // creating an h6 element for book title and adding a class
               const bookTitle = document.createElement('h6');
               bookTitle.classList.add('card-title');

               // creating a paragraph element for storing author names and adding a class
               const bookAuthor = document.createElement('p');
               bookAuthor.classList.add('card-text');

               // creating a paragraph element for storing first publish year and adding class
               const firstPublished = document.createElement('p');
               firstPublished.classList.add('card-text','text-primary');

               // creating a paragraph element for storing publisher names and adding class
               const bookPublisher = document.createElement('p');
               bookPublisher.classList.add('card-text','text-secondary');
               
               /*---------- if else block for book title (checking if value is found or not)----------*/
               // if found
               if(book.title !== undefined){
                    // setting the book title if found
                    bookTitle.textContent = `${book.title}`;
               }
               // if not found
               else{
                    // setting 'N/A' as book title if not found
                    bookTitle.textContent = `N/A`;
               }

               /*---------- if else block for book author names (checking if value is found or not)----------*/
               // if found
               if(book.author_name !== undefined){
                    // setting the author name if found
                    bookAuthor.textContent = `by ${book.author_name}`;
               }
               // if not found
               else{
                    // setting default value if not found
                    bookAuthor.textContent = `by Unknown author`;
               }

               

               /*---------- if else block for first publish year (checking if value is found or not)----------*/
               // if found
               if(book.first_publish_year !== undefined){
                    // setting the first publish year if found
                    firstPublished.textContent = `First published in ${book.first_publish_year}`;
               }
               // if not found
               else{
                    // setting default value if not found
                    firstPublished.textContent = `Publish year : Unknown`;
               }

               

               /*---------- if else block for publisher name (checking if value is found or not)----------*/
               // if found
               if(book.publisher !== undefined){
                    // setting the first publisher name if found
                    bookPublisher.textContent = `Published by : ${book.publisher}`;
               }
               // if not found
               else{
                    // setting default value if not found
                    bookPublisher.textContent = `Published by : Unknown`;
               }
               
               // appending the data into cardBody div 
               cardBody.appendChild(bookTitle);
               cardBody.appendChild(bookAuthor);
               cardBody.appendChild(firstPublished);
               cardBody.appendChild(bookPublisher);

               // appending cardBody div into card
               card.appendChild(cardBody);

               // appending card into col div
               col.appendChild(card);

               // finally appending the col div into mainContainer div
               mainContainer.appendChild(col);

               // increasing the count value of shown data
               count++;
          })

          // setting the value and showing the results count in DOM
          document.getElementById('result-count').textContent = `Showing ${count} of ${totalSearchResult} results`;
     }
}