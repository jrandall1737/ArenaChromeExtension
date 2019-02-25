// click the arena tab
let element = document.querySelector('.type-switcher-tabs > li:nth-child(3) > a');
if (element) {
    console.log('clicking');
    element.click();
}

// Get the cards in the deck
setTimeout(() => {
    console.log('searching');
    let table = document.querySelector('#tab-arena > div > div > table[class="deck-view-deck-table"]')
    if (table) {
        let numbers = table.querySelectorAll('td[class="deck-col-qty"]');
        let cardNames = table.querySelectorAll('td[class="deck-col-card"] > a');
        let arenaCosts = table.querySelectorAll('td[class="deck-col-price"]');
        
        if (numbers && cardNames && arenaCosts) {
            for(i = 0; i < numbers.length; i++) {
                console.log(numbers[i].innerHTML + " " + cardNames[i].innerHTML + " " + arenaCosts[i].innerHTML);
            }
        }
    }
}, 1000);
