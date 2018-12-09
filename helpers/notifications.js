$(document).on('ajaxStart', function () {
    $("#loadingBox").show()
});
$(document).on('ajaxStop', function () {
    $("#loadingBox").hide()
});

const notifications = function () {
    const showInfo = function (message) {
        $("#infoBox > span").text(message)
        $("#infoBox").show()
        setTimeout(function () {
            $("#infoBox").hide()
        }, 3000)
    }

    const attachBoxesEvents = function () {
        $('#errorBox').on('click', function () {
            $(this).hide()
        })
        $('#infoBox').on('click', function () {
            $(this).hide()
        })
    }

    const showError = function (message) {
        $("#errorBox > span").text(message)
        $("#errorBox").show()
        setTimeout(function () {
            $("#errorBox").hide()
        }, 3000)
    }

    return {
        showInfo,
        showError,
        attachBoxesEvents
    }
}();

$(() => {
    notifications.attachBoxesEvents();
})