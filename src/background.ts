chrome.runtime.onInstalled.addListener(function (): void {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function (): void {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            hostEquals: "www.mtggoldfish.com",
                            pathContains: "deck"
                        },
                    }
                )
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        },
        {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            hostEquals: "www.mtggoldfish.com",
                            pathContains: "archetype"
                        },
                    }
                )
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }
        ],
        );
    });
});

function polling(): any {
    console.log("polling");
    setTimeout(polling, 1000 * 30);
}

polling();