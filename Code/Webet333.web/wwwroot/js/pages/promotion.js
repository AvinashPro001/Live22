//#region Onload
$(document).ready(function () {
    promotionList();
});
//#endregion

//#region promotionList
async function promotionList() {
    var x = screen.width
    var model = {
        ismobile: x < 600 ? true : false,
        ismain: false
    };
    
    var resPanel = await PostMethod(apiEndPoints.promotionsList, model);
    if (resPanel !== null && resPanel !== undefined) {
        var panelData = resPanel.data;
        var panel = document.getElementById('promotionList');
        var descriptionPanel = document.getElementById('promotiom_description_section');
        var height = "180px";
        if (x < 600)
            height = "150px";
        for (i = 0; i < panelData.length; i++) {
            panel.innerHTML += "<div class='col-sm-6'><div class='panel'> " +
                //"<a data-toggle='collapse' data-parent='#accordion' onclick='myFunction(" + i + ")' class='unchecked' id='panel" + i + "' href='#" + panelData[i].id + "'>" +
                "<a data-toggle='modal' data-target='#" + i + "' class='unchecked' id='panel" + i + "'>" +
                "<div class='row-flex' > " +
                "<figure><img class='full-img' style='height: " + height + ";'  src='" + panelData[i].banner + "' alt='pramotion-banner'></figure>" +
                "</div></a></div>" +
                "</div > ";
            
            descriptionPanel.innerHTML +=
                '<div class="form-login modal fade" id="'+i+'" role="dialog">'+
                '<div class="modal-dialog">' +
                '<div class="modal-content">' +
                '<div class="modal-header">' +
                '<button type="button" class="close" data-dismiss="modal">&times;</button>' +
                '<h4 class="modal-title"><span >' + panelData[i].title+'</span></h4>' +
                '</div>' +
                '<div class="modal-body">' +
                '<p>' + panelData[i].description+'</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>';
        }
    }
}
//#endregion

function myFunction(i) {
    var element = document.getElementById("panel" + i);
    if (element.classList.contains("checked")) {
        element.classList.remove('checked');
        element.classList.add('unchecked');
    }
    else if (element.classList.contains("unchecked")) {
        element.classList.add('checked');
        element.classList.remove('unchecked');
    }
    else
        element.classList.add('checked');
}