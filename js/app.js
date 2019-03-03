var imported = document.createElement('script');
imported.src = '../json/data.js';
var timer;
var currentOrder = "asc";

create_table();

function create_table() {
    var col = [];
    for (var i = 0; i < TABLE_DATA.length; i++) {
      for (var key in TABLE_DATA[i]) {
        if (col.indexOf(key) === -1) {
            col.push(key);
        }
      }
    }
    var table = document.createElement("table");
    for (var i = 0; i < TABLE_DATA.length; i++) {
        tr = table.insertRow(-1);
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = TABLE_DATA[i][col[0]];
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = "<img class="+'"'+"thum"+'"'+" src="+'"'+TABLE_DATA[i][col[2]]+'"'+"/>";
        var tabCell = tr.insertCell(-1);
        if(!TABLE_DATA[i][col[1]].includes("<img")){
          tabCell.innerHTML = TABLE_DATA[i][col[1]];
        } else {
          tabCell.innerHTML = "unknown";
        }
        var tabCell = tr.insertCell(-1);
        tabCell.innerHTML = TABLE_DATA[i][col[3]];
    }
    var divContainer = document.getElementsByTagName("tbody")[0];
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
}

function start_timer() {
  timer = setInterval(function() {
    var num = generate_random(-1)
    var table = document.getElementsByTagName("tbody")[0].getElementsByTagName("tr");
    var src = table[num]
    num = generate_random(num)
    var dst = table[num]
    var dummy = src.innerHTML
    src.innerHTML = dst.innerHTML
    dst.innerHTML = dummy
  }, 1000);
}

function stop_timer() {
  clearInterval(timer);
}

function sort_table(index) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  var table = document.getElementsByTagName("tbody")[0].getElementsByTagName("tbody")[0];
  switching = true;
  var cells, array = new Array()
  rows = table.rows;
  var order = -1;
  for (i = 0; i < rows.length; i++) {
      cells = rows[i].cells;
      array[i] = new Array();
      for (j = 0; j < cells.length; j++) {
          array[i][j] = cells[j].innerHTML;
      }
  }
  array.sort(function (a, b) {
    if (Number.isInteger(a[index]) && Number.isInteger(b[index])) {
      if (parseInt(a[index]) == parseInt(b[index])) {
        // sort index by ascending order
        return parseInt(a[0])-parseInt(b[0])
      } else {
        if (currentOrder == "desc") {
          // descending order
          return parseInt(b[index]) - parseInt(a[index])
        } else {
          // ascending order
          return parseInt(a[index]) - parseInt(b[index])
        }
      }
    } else {
      if (a[index] == b[index]) {
        // sort index by ascending order
        return parseInt(a[0])-parseInt(b[0])
      } else {
        if (currentOrder == "desc") {
          // descending order
          var date1 = a[index].split('/').join('').split(':').join('');
          var date2 = b[index].split('/').join('').split(':').join('');
          return parseInt(date1) - parseInt(date2)
         } else {
          // ascending order
          var date1 = a[index].split('/').join('').split(':').join('');
          var date2 = b[index].split('/').join('').split(':').join('');
          return parseInt(date2) - parseInt(date1)
        }
        return 0;
      }
    }
  });
  for (i = 0; i < rows.length; i++) {
      rows[i].innerHTML = "<td>" + array[i].join("</td><td>") + "</td>";
  }
  if (currentOrder == "asc") {
    currentOrder = "desc";
  } else {
    currentOrder = "asc";
  }
}

function generate_random(excludedNum) {
  var num = Math.floor((Math.random() * TABLE_DATA.length-1) + 1);
  return (num === excludedNum) ? generate_random(excludedNum) : num;
}
