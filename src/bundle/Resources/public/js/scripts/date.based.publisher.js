(function (global, doc) {
    const flatpickrInput = doc.querySelector('.flatpickr-date-input');
    const updateValue = (dates) => {
        const isSelectedDate = !!dates[0];
        const selectedDate = isSelectedDate ? dates[0].getTime() / 1000 : '';
        const hiddenMethodName = isSelectedDate ? 'removeAttribute' : 'setAttribute';

        doc.querySelector('.dbp-publish-later__pick-input').setAttribute('data-time', selectedDate);
        doc.querySelector('.dbp-publish-later__actions')[hiddenMethodName]('hidden', 'hidden');
    };
    const submitForm = () => {
        // TODO
    };

    flatpickr(flatpickrInput, {
        enableTime: true,
        time_24hr: true,
        formatDate: (date) => (new Date(date)).toLocaleString(),
        minDate: Date.now(),
        onChange: updateValue,
    });

    doc.querySelector('.ez-btn--confirm-schedule').addEventListener('click', submitForm, false);

})(window, document);
