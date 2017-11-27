(function (global, doc) {
    const SELECTOR_USER_LIST = '.fw-send-for-review__user-list';
    const SELECTOR_USER_INPUT = '.fw-send-for-review__user-input';
    let getReviewersTimeout;
    const getReviewerList = (value) => {
        fetch(`/flexworkflow/reviewer/find?query=${value}`)
            .then(blob => blob.json())
            .then(response => showReviewersList(response));
    };
    const createReviewersListItem = reviewer => `<li data-id="${reviewer.id}" class="fw-send-for-review__user-item">${reviewer.name}</li>`;
    const selectReviewer = event => {
        const reviewer = doc.querySelector('.fw-send-for-review__user-name');

        reviewer.dataset.id = event.target.dataset.id;
        reviewer.innerHTML = event.target.innerHTML;

        doc.querySelector(SELECTOR_USER_LIST).classList.add('fw-send-for-review__user-list--hidden');

        toggleStep(false);
    };
    const showReviewersList = data => {
        const listContainer = doc.querySelector(SELECTOR_USER_LIST);
        const reviewersList = data.reviewers.reduce((total, reviewer) => total + createReviewersListItem(reviewer), '');

        listContainer.innerHTML = reviewersList;
        listContainer.classList.remove('fw-send-for-review__user-list--hidden');
    };
    const toggleStep = (firstStep) => {
        const messageMethodName = firstStep ? 'setAttribute' : 'removeAttribute';
        const inputMethodName = firstStep ? 'removeAttribute' : 'setAttribute';
        const input = doc.querySelector(SELECTOR_USER_INPUT);

        doc.querySelector('.fw-send-for-review__user')[messageMethodName]('hidden', 'hidden');
        doc.querySelector('.fw-send-for-review__message-wrapper')[messageMethodName]('hidden', 'hidden');
        doc.querySelector('.fw-send-for-review__actions')[messageMethodName]('hidden', 'hidden');

        input[inputMethodName]('hidden', 'hidden');
        input.value = '';
    }
    const handleTyping = event => {
        const value = event.target.value;

        window.clearTimeout(getReviewersTimeout);

        if (value.length > 2) {
            getReviewersTimeout = window.setTimeout(getReviewerList.bind(null, value), 200);
        }
    };
    const sendForReview = () => {
        //@TODO
    };

    doc.querySelector(SELECTOR_USER_INPUT).addEventListener('keyup', handleTyping, false);
    doc.querySelector(SELECTOR_USER_LIST).addEventListener('click', selectReviewer, false);
    doc.querySelector('.ez-icon--remove-reviewer').addEventListener('click', toggleStep.bind(null, true), false);
    doc.querySelector('.fw-btn--send-for-review').addEventListener('click', sendForReview, false);
})(window, document);
