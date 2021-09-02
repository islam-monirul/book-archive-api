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
     books = data.docs;

     // if search result is 0
     if(books.length === 0){
          console.log('No data found');
     }

     // if search data found
     else{
          books.forEach( book => {
               // if else block for book image id
               // if found
               if(book.cover_i !== undefined){
                    console.log(book.cover_i); // undefined if not found
               }
               // if not found
               else{
                    console.log('N/A');
               }

               // if else block for book title
               // if found
               if(book.title !== undefined){
                    console.log(book.title);
               }
               // if not found
               else{
                    console.log('N/A');
               }

               // if else block for book publisher
               // if found
               if(book.publisher !== undefined){
                    console.log(...(book.publisher));
               }
               // if not found
               else{
                    console.log('N/A');
               }
               
               // if else block for book first publish year
               // if found
               if(book.first_publish_year !== undefined){
                    console.log(book.first_publish_year);
               }
               // if not found
               else{
                    console.log('N/A');
               }

               // if else block for book author name
               // if found
               if(book.author_name !== undefined){
                    console.log(...(book.author_name));
               }
               // if not found
               else{
                    console.log('N/A');
               }
          })
     }
}