interface ICardDetails {
    cardName: string;
    numberOwned: number;
    rarity: string;
    setNumber: number;
}

export default class CardCollection {
    private collection: ICardDetails[] = [];
    private collectionMap = new Map();

    constructor() {
        return this;
    }

    public getCollection(): ICardDetails[] {
        return this.collection;
    }

    public getCollectionMap(): Map<string, number> {
        return this.collectionMap;
    }

    public addCardLineToCollection(cardLine: string): void {
        this.collection.push(this.parseCardLine(cardLine));
    }

    public addCardDetailsToCollection(cardDetails: ICardDetails): void {
        this.collection.push(cardDetails);
    }

    public updateDictionary(): void {
        this.collectionMap.clear();

        this.collection.forEach(card => {
            if (this.collectionMap.has(card.cardName)) {
                // if we have duplicate card names, put them together
                let totalCards: number = this.collectionMap.get(card.cardName) + card.numberOwned;
                if (totalCards > 4) {
                    totalCards = 4;
                }
                this.collectionMap.set(card.cardName, totalCards);
            } else {
                this.collectionMap.set(card.cardName, card.numberOwned);
            }
        });
    }

    private parseCardLine(line: string): ICardDetails {
        let cardLineArray: string[] = line.split(",");
        let myNumberOwned: number = Number.parseInt(cardLineArray[1], 10);
        let mySetNumber: number = Number.parseInt(cardLineArray[1], 10);
        const cardDetails: ICardDetails = {
            cardName: cardLineArray[0],
            numberOwned:  myNumberOwned,
            rarity: cardLineArray[2],
            setNumber: mySetNumber
        };

        return cardDetails;
    }
}