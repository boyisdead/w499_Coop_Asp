$('.close').click(function () {
    $(this).parent().toggle();
});

var mydata;

function getOverallData(p) {

    var totals = {};
    totals.agd = 0;
    totals.aav = 0;
    totals.apr = 0;

    totals.pgd = 0;
    totals.pav = 0;
    totals.ppr = 0;

    var overallData = $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": "../WebServices/wsBuilding.asmx/GetOverallImpressions",
        "data": {
            BuildingID: "<%= BldgID %>",
            Period: p
        },
        async: false
        //                "success": function () { alert('ok'); },
        //                "failure": function () { alert('not ok'); }
    }).responseText;

    mydata = JSON.parse(overallData);

    for (var i = 0; i < mydata.length; i++) {
        switch (mydata[i][1]) {
            case '1': totals.agd++; break;
            case '2': totals.aav++; break;
            case '3': totals.apr++; break;
        };
        switch (mydata[i][2]) {
            case '1': totals.pgd++; break;
            case '2': totals.pav++; break;
            case '3': totals.ppr++; break;
        };
    };

    // GOOD
    $('#agd').text(totals.agd);
    $('#agd').on('click', function () {
        fillDetailTenant('1');
        $('#titleTenantDetail').text('Tenant Overall Impressions (Good)');
        $('#detailTenants').show();
    });
    if (totals.agd > totals.pgd) {
        $('#agd').css('color', 'green');
        $('#agd').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }
    else if (totals.agd < totals.pgd) {
        $('#agd').css('color', 'red');
        $('#agd').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }

    // AVERAGE
    $('#aav').text(totals.aav);
    $('#aav').on('click', function () {
        fillDetailTenant('2');
        $('#titleTenantDetail').text('Tenant Overall Impressions (Average)');
        $('#detailTenants').show();
    });
    if (totals.aav > totals.pav) {
        $('#aav').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }
    else if (totals.aav < totals.pav) {
        $('#aav').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }

    // POOR
    $('#apr').text(totals.apr);
    $('#apr').on('click', function () {
        fillDetailTenant('3');
        $('#titleTenantDetail').text('Tenant Overall Impressions (Poor)');
        $('#detailTenants').show();
    });
    if (totals.apr < totals.ppr) {
        $('#apr').css('color', 'green');
        $('#apr').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }
    else if (totals.apr > totals.ppr) {
        $('#apr').css('color', 'red');
        $('#apr').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }

    $('#pgd').text(totals.pgd);
    $('#pav').text(totals.pav);
    $('#ppr').text(totals.ppr);
}

function fillDetailTenant(metric) {
    //clear
    var tabBody = $('#tenantDetailInterview > tbody');
    tabBody.html('');

    //fill
    for (var i = 0; i < mydata.length; i++) {
        if (mydata[i][1] == metric) {
            tabBody.append('<tr><td>' + mydata[i][3] + '</td><td><a href="./TenantInterviews.aspx?BldgID=' + "<%= BldgID %>" + '&leasid=' + mydata[i][0] + '">' + mydata[i][4] + '</a></td></tr>');
        }
    }
}

var custCountData;

function getCustomersCount(p) {
    var customerCountJSON = $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": "../WebServices/wsBuilding.asmx/GetCustomersCount",
        "data": {
            BuildingID: "<%= BldgID %>",
            Period: p
        },
        async: false
    }).responseText;

    custCountData = JSON.parse(customerCountJSON);

    var totals = {};
    totals.ccc = 0;
    totals.pcc = 0;
    totals.up = 0;
    totals.down = 0;

    for (var i = 0; i < custCountData.length; i++) {
        var tmp1 = 0;
        var tmp2 = 0;

        switch (custCountData[i][2]) {
            case '1': tmp1 = custCountData[i][1] * 30; totals.ccc += tmp1; break;
            case '2': tmp1 = (custCountData[i][1] / 7) * 30; totals.ccc += tmp1; break;
            case '3': tmp1 = custCountData[i][1]; totals.ccc += tmp1; break;
        };
        switch (custCountData[i][4]) {
            case '1': tmp2 = custCountData[i][3] * 30; totals.pcc += tmp2; break;
            case '2': tmp2 = (custCountData[i][3] / 7) * 30; totals.pcc += tmp2; break;
            case '3': tmp2 = custCountData[i][3]; totals.pcc += tmp2; break;
        };

        if (tmp1 > tmp2) { totals.up++; }
        else if (tmp1 < tmp2) { totals.down++; }
    };

    $("#up").html(totals.up);
    $('#up').on('click', function () {
        $('#titleTenantCount').text('Tenants Detail Customer Count (Up)');
        fillDetailTenantCount("Up");
        $('#detailTenantsCount').show();
    });
    if (totals.up > 0) {
        $('#up').css('color', 'green');
        $('#up').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }
    else {
        $('#up').css('color', 'red');
        //$('#up').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }

    $("#down").html(totals.down);
    $('#down').on('click', function () {
        $('#titleTenantCount').text('Tenants Detail Customer Count (Down)');
        fillDetailTenantCount("Down");
        $('#detailTenantsCount').show();
    });
    if (totals.down > 0) {
        $('#down').css('color', 'red');
        $('#down').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }
    else {
        $('#down').css('color', 'green');
        //$('#up').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }

    $("#tot").html((totals.ccc - totals.pcc).toString().split(".")[0]);
    $('#tot').on('click', function () {
        $('#titleTenantCount').text('Tenants Detail Customer Count (All)');
        fillDetailTenantCount("All");
        $('#detailTenantsCount').show();
    });
    if ((totals.ccc - totals.pcc) > 0) {
        $('#tot').css('color', 'green');
        $('#tot').append('&nbsp; <i class="fa fa-arrow-circle-o-up"></i>');
    }
    else {
        $('#tot').css('color', 'red');
        $('#tot').append('&nbsp; <i class="fa fa-arrow-circle-o-down"></i>');
    }
}

function fillDetailTenantCount(info) {

    //clear
    var tabBody = $('#tenantDetailCount > tbody');
    tabBody.html('');

    //fill
    var whatIWantToAppend = '';
    var totalccc = 0;
    var totalpcc = 0;

    for (var i = 0; i < custCountData.length; i++) {
        whatIWantToAppend = '';

        whatIWantToAppend += '<tr>';
        whatIWantToAppend += '<td>' + custCountData[i][3] + '</td>';
        whatIWantToAppend += '<td><a href="./TenantInterviews.aspx?BldgID=' + "<%= BldgID %>" + '&leasid=' + custCountData[i][0] + '">' + custCountData[i][4] + '</a></td>';

        switch (custCountData[i][2]) {
            case '1': totalccc = custCountData[i][1] * 30; break;
            case '2': totalccc = (custCountData[i][1] / 7) * 30; break;
            case '3': totalccc = custCountData[i][1]; break;
        };
        var roundedCCC = totalccc.toString().split(".")[0];
        whatIWantToAppend += '<td>' + roundedCCC + '</td>';

        switch (custCountData[i][4]) {
            case '1': totalpcc = custCountData[i][3] * 30; break;
            case '2': totalpcc = (custCountData[i][3] / 7) * 30; break;
            case '3': totalpcc = custCountData[i][3]; break;
        };
        var roundedPCC = totalpcc.toString().split(".")[0];
        whatIWantToAppend += '<td>' + roundedPCC + '</td>';

        if (totalccc > totalpcc && (info == "Up" || info == "All")) {
            whatIWantToAppend += '<td style="color:green;"><i class="fa fa-arrow-circle-o-up"></i> (+' + (roundedCCC - roundedPCC) + ')</td>';
            whatIWantToAppend += '</tr>';
            tabBody.append(whatIWantToAppend);
        }
        else if (totalccc < totalpcc && (info == "Down" || info == "All")) {
            whatIWantToAppend += '<td style="color:red;"><i class="fa fa-arrow-circle-o-down"></i> (-' + (roundedCCC - roundedPCC) + ')</td>';
            whatIWantToAppend += '</tr>';
            tabBody.append(whatIWantToAppend);
        }
    }
}