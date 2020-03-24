
function click(e) {
    // chrome.tabs.create({ url: e.target.href + '&extid=' + chrome.runtime.id});
	switch(e.target.id) {
		case 'goToSite':
			chrome.tabs.create({ url: 'https://meet.o2oevents.com/'});
			window.close();
			break;
		case 'goToIos':
			chrome.tabs.create({ url: 'https://apps.apple.com/tt/app/o2o-live/id1503259344'});
			window.close();
			break;
		case 'goToAndroid':
			chrome.tabs.create({ url: 'https://play.google.com/store/apps/details?id=com.o2oevents.digital'});
			window.close();
			break;
		default:
			window.close();
			break;
	}
}

function joinMeeting(e) {
    var selectElement = document.querySelector("input[id='meetingId']");
    var selectedValue = selectElement.value;
	if(selectedValue === '') {
		window.close();
	} else {
		chrome.tabs.create({ url: 'https://live.o2oevents.com/' + selectedValue});
		window.close();
	}
	
}

document.addEventListener('DOMContentLoaded', function () {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var current = tabs[0];
    var incognito = current.incognito;
	
	chrome.contentSettings.camera.set({
        'primaryPattern': "https://live.o2oevents.com/*",
        'setting': 'allow',
        'scope': (incognito ? 'incognito_session_only' : 'regular')
      });
	chrome.contentSettings.microphone.set({
        'primaryPattern': "https://live.o2oevents.com/*",
        'setting': 'allow',
        'scope': (incognito ? 'incognito_session_only' : 'regular')
      });
	});
    var anchorsImg = document.querySelectorAll('img');
    for (var i = 0; i < anchorsImg.length; i++) {
        anchorsImg[i].addEventListener('click', click);
    }	
    var anchorButton = document.querySelector("button#joinMeeting");
    anchorButton.addEventListener('click', joinMeeting);
});