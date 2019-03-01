let page: HTMLElement | null = document.getElementById("buttonDiv");
const kButtonColors: string[] = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
function constructOptions(kButtonColors: string[]): void {
    for (let item of kButtonColors) {
        let button: HTMLButtonElement = document.createElement("button");
        button.style.backgroundColor = item;
        button.addEventListener("click", function (): void {
            chrome.storage.sync.set({ color: item }, function (): void {
                console.log("color is " + item);
            });
        });

        if (page) {
            page.appendChild(button);
        }
    }
}
constructOptions(kButtonColors);