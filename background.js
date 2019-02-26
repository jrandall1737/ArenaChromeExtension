chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [
                new chrome.declarativeContent.PageStateMatcher(
                    {
                        pageUrl: {
                            hostEquals: 'www.mtggoldfish.com',
                            pathContains: 'deck'
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
                            hostEquals: 'www.mtggoldfish.com',
                            pathContains: 'archetype'
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

