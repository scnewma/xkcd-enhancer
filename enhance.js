(function() {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    const comicSubtextId = 'comicSubtext';

    function displayComicSubtext() {
        let subtext = retrieveComicSubtext();

        let subtextP = document.createElement('p');
        subtextP.innerHTML = subtext;

        let subtextDiv = document.createElement('div');
        subtextDiv.id = comicSubtextId;
        subtextDiv.style.width = '80%';
        subtextDiv.style.margin = 'auto';
        subtextDiv.appendChild(document.createElement('hr'));
        subtextDiv.appendChild(subtextP);
        subtextDiv.appendChild(document.createElement('hr'));

        retrieveComicDiv().appendChild(subtextDiv);
    }

    function retrieveComicSubtext() {
        let comicImg = retrieveComicImg();

        return comicImg.title;
    }

    function retrieveComicDiv() {
        return document.getElementById('comic');
    }

    function retrieveComicImg() {
        let comicDiv = retrieveComicDiv();

        return firstOf(comicDiv.getElementsByTagName('IMG'));
    }

    function firstOf(collection) {
        if (collection.length >= 1) {
            return collection[0];
        } else {
            return null;
        }
    }

    function handleKeyPress(e) {
        if (isModified(e)) {
            return;
        }

        let key = e.key;

        if (key === 'p') {
            navigateToPreviousPage();
        } else if (key === 'n') {
            navigateToNextPage();
        }
    }

    function isModified(e) {
        return e.metaKey || e.altKey || e.ctrlKey;
    }

    function navigateToPreviousPage() {
        let prevAnchor = retrieveNavLinkByRel('prev');
        location.assign(prevAnchor.href);
    }

    function navigateToNextPage() {
        let nextAnchor = retrieveNavLinkByRel('next');
        location.assign(nextAnchor.href);
    }

    function retrieveNavLinkByRel(rel) {
        return document.querySelector(`.comicNav a[rel=${rel}]`);
    }

    displayComicSubtext();
    window.addEventListener('keypress', handleKeyPress);
})();