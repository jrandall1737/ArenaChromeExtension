import { ICardDetails, CardCollection } from "./CardCollection";



// click the arena tab
let element: HTMLElement | null = document.querySelector(".type-switcher-tabs > li:nth-child(3) > a");
if (element) {
    console.log("clicking");
    element.click();
}

let cardCollection: CardCollection = new CardCollection();

// get our deck collection
const url: string = chrome.runtime.getURL("collection.csv");
fetch(url)
    .then(response => response.text())
    .then((text) => {
        let rows: string[] = text.split("\n");
        rows.forEach((row) => {
            cardCollection.addCardLineToCollection(row);
        });
        cardCollection.updateDictionary();
    })
    .then(() => {
        // update the web page
        console.log("searching");
        let table: Element | null = document.querySelector(`#tab-arena > div > div > table[class="deck-view-deck-table"]`);
        if (table) {
            let numbers: NodeListOf<Element> = table.querySelectorAll(`td[class="deck-col-qty"]`);
            let cardNames: NodeListOf<Element> = table.querySelectorAll(`td[class="deck-col-card"] > a`);
            let arenaCosts: NodeListOf<Element> = table.querySelectorAll(`td[class="deck-col-price"]`);

            if (numbers && cardNames && arenaCosts) {
                let i: number = 0;
                for (i = 0; i < numbers.length; i++) {
                    let cardName: string = "\"" + cardNames[i].innerHTML + "\"";

                    if (cardCollection.getCollectionMap().has(cardName)) {
                        let cost: string = arenaCosts[i].innerHTML;
                        let numberInDeck: string = cost.trim()[0];
                        let numberOwned: number | undefined = cardCollection.getCollectionMap().get(cardName);
                        let netNumber: number = 0;

                        if (numberOwned) {
                            netNumber = +numberInDeck - numberOwned;
                        }

                        if (netNumber > 0) {
                            console.log(cardName + " Replacing " + numberInDeck[0] + " with " + netNumber);
                            arenaCosts[i].innerHTML = arenaCosts[i].innerHTML.replace(numberInDeck, netNumber.toString());
                        } else {
                            arenaCosts[i].innerHTML = "";
                        }
                    }
                }
            }
        }
    });
