function setActiveMenuItem() {
    var sidenav = $('#sidenav');
    //var url = '..' + window.location.pathname.split('?')[0].replace('/Website', '');
    var url = '..' + window.location.pathname + window.location.search;

    li = sidenav.find($('a[href="' + url + '"]')).parent();
    li.addClass("active-menu-item");
}

function strip(html) {
    var tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
}

Number.prototype.formatMoney = function (c, d, t) {
    var n = this,
                c = isNaN(c = Math.abs(c)) ? 2 : c,
                d = d == undefined ? "." : d,
                t = t == undefined ? "," : t,
                s = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function isDate(txtDate) {
    var dt = txtDate.split(/-|\//);
    var d = ("0" + dt[0]).slice(-2) + '-' + ("0" + dt[1]).slice(-2) + '-' + dt[2];
    var reg = /^(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])-(\d{4})$/;
    return reg.test(d);
}

function closeColorBox() {
    $.colorbox.close();
}

function removeMoneyFormat(data) {
    return Number(data.replace(/[^0-9\.-]+/g, ""));
}

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function sliceDataFromArray(data, current, pageSize) {
    var firstArray = [data[0]];
    var begin = ((current - 1) * pageSize);
    var end = begin + pageSize;
    return firstArray.concat(data.slice(begin+1, end));
}