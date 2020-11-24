//#region Onload
$(document).ready(function () {
    getImage();
});
//#endregion

function getImage() {
    var slotImage = document.getElementById('slotImage');
    var slotDownImage = document.getElementById('slotDownImage');

    $.ajax({
        url: '../../resources/games.json',
        dataType: 'json',
        async: false,
        success: function (data) {
            json = data.game;
            for (i = 0; i < json.length; i++) {
                if (json[i].active === true && json[i].sequence < 9) {
                    if (slotImage !== null)
                        slotImage.innerHTML +=
                            '<div class="col-xs-6 col-md-3">' +
                            '<a href="/Information/SlotGame" target="_blank">' +
                            '<div class="info-card slotgames">' +
                            '<div class="front">' +
                            '<div style="background-image: url(http://images.webet333.com/all_918_games/' + json[i].front_image + ');" class="rolex-game hover"><a class="fancybox" href="http://images.webet333.com/all_918_games/' + json[i].front_image + '"><p class="white-text text-center big-text">' + json[i].name + '</p></a></div>' +
                            '</div>' +
                            '<div class="back">' +
                            '<img class="img-responsive" src="http://images.webet333.com/all_918_games/' + json[i].back_image + '">' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>';
                }
                else if (json[i].active === true && json[i].sequence > 8) {
                    if (slotDownImage !== null)
                        slotDownImage.innerHTML +=
                            '<div class="col-xs-6 col-md-3">' +
                            '<div class="info-card slotgames">' +
                            '<div class="front">' +
                            '<div style="background-image: url(http://images.webet333.com/all_918_games/' + json[i].front_image + ');" class="rolex-game hover"><a class="fancybox" href="http://images.webet333.com/all_918_games/' + json[i].front_image + '"><p class="white-text text-center big-text">' + json[i].name + '</p></a></div>' +
                            '</div>' +
                            '<div class="back">' +
                            '<img class="img-responsive" src="http://images.webet333.com/all_918_games/' + json[i].back_image + '">' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                }

            }
        }
    });
}
