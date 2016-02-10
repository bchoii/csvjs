'use strict';

function downloadCsv(data, headers) {
	function toCsv(items) {
		function getHeaders(item) {
			var headers = [];
			for (var key in item) {
				headers.push(key);
			}
			return headers;
		}
		if (!items) {
			return;
		}
		headers = headers || getHeaders(items[0]);
		var results = [];
		results.push(headers);
		items.map(item => {
			var row = headers.map(header => item[header] || '');
			results.push(row.join(','));
		});
		return results.join('\n');
	}

	// var blob = new Blob([csv], {type: "text/plain;charset=utf-8"});
	var blob = new Blob([toCsv(data)], {type: "application/csv;charset=utf-8"});

	var downloadLink = document.createElement('a');
	downloadLink.setAttribute('href', window.URL.createObjectURL(blob));
	downloadLink.setAttribute('download', 'download.csv');
	downloadLink.setAttribute('target', '_blank');

	document.body.appendChild(downloadLink);
	setTimeout(function () {
		downloadLink.click();
		downloadLink.remove();
	}, 0);
	// csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);
	// setAttribute('href': csvData)
}
