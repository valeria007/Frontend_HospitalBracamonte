const showSearchedItems = (searchInput, table) => {
  searchInput.addEventListener('keyup',(event) => {
    let searchString = event.target.value.toLowerCase();
    
    let trAll = [...[...table.children].find((el) => el.tagName.toLowerCase() === 'tbody').children];
    
    trAll.forEach((tr) => {
      if(tr.className !== 'header') {
        tr.hidden = ![...tr.children].some((td) => td.innerText.toLowerCase().includes(searchString))
      }
     });
  });
}

const input = document.querySelector('#searchInput');
const items = document.querySelector('#myTable');

showSearchedItems(input, items);