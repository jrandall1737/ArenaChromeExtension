//click the arena tab
let element = document.querySelector('.type-switcher-tabs > li:nth-child(3) > a');
if (element) {
    console.log('clicking');
    element.click();
}
class CardDetails {
    constructor(cardLine) {
        let cardLineArray = cardLine.split(',');
        this.cardName = cardLineArray[0];
        this.numberOwned = cardLineArray[1];
        this.rarity = cardLineArray[2];
        this.cardNumber = cardLineArray[3];
    }
}

let _cardDetails = [];
let _dictionary = [];

function parseResults(response) {
    rows = response.split('\n');
    rows.forEach((row) => {
        _cardDetails.push(new CardDetails(row));
    });

    _cardDetails.forEach((detail) => {
        _dictionary[detail.cardName] = detail.numberOwned;
    });

    console.log(_dictionary);
}

const url = chrome.runtime.getURL('collection.csv');
fetch(url)
    .then(response => response.text())
    .then((text) => {
        parseResults(text);
    })
    .then(() => {
            console.log('searching');
            let table = document.querySelector('#tab-arena > div > div > table[class="deck-view-deck-table"]')
            if (table) {
                let numbers = table.querySelectorAll('td[class="deck-col-qty"]');
                let cardNames = table.querySelectorAll('td[class="deck-col-card"] > a');
                let arenaCosts = table.querySelectorAll('td[class="deck-col-price"]');

                if (numbers && cardNames && arenaCosts) {
                    for (i = 0; i < numbers.length; i++) {
                        //console.log(numbers[i].innerHTML + " " + cardNames[i].innerHTML + " " + arenaCosts[i].innerHTML);
                        let cardName = "\"" + cardNames[i].innerHTML + "\"";
                        console.log(cardName + " " + _dictionary[cardName]);

                        if (_dictionary[cardName]) {
                            let cost = arenaCosts[i].innerHTML;
                            let number = cost.trim()[0];
                            let newNumber = number - _dictionary[cardName];

                            if (newNumber > 0) {
                                console.log(cardName + " Replacing " + number[0] + " with " + newNumber);
                                arenaCosts[i].innerHTML = arenaCosts[i].innerHTML.replace(number, newNumber);
                            } else {
                                arenaCosts[i].innerHTML = "";
                            }
                        }
                    }
                }
            }
        });
