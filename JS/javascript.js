//-----------------------------------------------------
//CURTAIN MENU
function openNav() {
	document.getElementById("curtain-nav").style.width = "50%";			
}

function closeNav() {
	document.getElementById("curtain-nav").style.width = "0%";			
}
//Data: assume we have a list of top 5 movies
let topMovies = [
	{id: 0, title: "Gigabyte GeForce RTX 3060 Gaming OC 2.0", description: "LHR 12GB GDDR6, PCIE 4.0, 3X Fan, Upto 1837MHz, 2.2 Slot, 2X Display Port, 2X HDMI, 282mm Length, Max 4 Display Out, 1X8 Pin Power, 550W Or Higher PSU Recommended",
	image_url: "https://www.pbtech.co.nz/imgprod/default/V/G/VGAGBV331611__3.webp?h=3060917852"},
	{id: 1, title: "GGPC RX 6600 Gaming PC", description: "AMD Ryzen 3 4100 4 Core, 16GB 3200Mhz RAM, 512GB SSD, AMD Radeon RX 6600 8GB Graphics, Wireless AC + Bluetooth, Windows 11 Home", image_url:
	"https://www.pbtech.co.nz/imgprod/W/K/WKSGGPC10123__1.jpg?h=1723949469"},
	{id: 2, title: "HP Deskjet 2330", description: "Inkjet MFP print/copy/scan 7WN43A - White", image_url:
	"https://www.pbtech.co.nz/imgprod/default/P/T/PTRHPD2330__1.webp?h=3003932794"},
	{id: 3, title: "70mai M300 Dashcam 1296P", description: "Full HD+ Recording, 3D-DNR, WDR, G-Sensor, Built-in Wi-Fi, (Navy)", image_url:
	"https://www.pbtech.co.nz/imgprod/C/A/CAR70M10301__1.jpg?h=398667974"},
	{id: 4, title: "Netsys NV-720D", description: "ADSL2+/VDSL2 Wi-Fi 11ac Modem Router", image_url:
	"https://www.pbtech.co.nz/imgprod/default/M/O/MODNTS0605__1.webp?h=935675109"},
];
//Slideshow: Manual
let slideIndex = 0;//Initial slide = 0
function nextSlide() {
//Change the slide_index
if (slideIndex < topMovies.length - 1) {
	slideIndex++;
} else {
	slideIndex = 0;
}
//Change the image source for the img
document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;
document.getElementById("manual-slide-description").innerHTML = topMovies[slideIndex].description;
}
function previousSlide() {
//Change the slide_index
if (slideIndex > 0) {
	slideIndex--;
} else {
	slideIndex = topMovies.length - 1;
}
//Change the image source for the img
document.getElementById("manual-slide-title").innerHTML = topMovies[slideIndex].title;
document.getElementById("manual-slide-image").src = topMovies[slideIndex].image_url;
document.getElementById("manual-slide-description").innerHTML = topMovies[slideIndex].description;
}
//------
//Slideshow: Automatic
let autoSlideIndex = 0;//Initial slide = 0
function autoSlideShow() {
//Change the slide_index
if (autoSlideIndex < topMovies.length - 1) {
autoSlideIndex++;
} else {
autoSlideIndex = 0;
}
//Change the image source for the img
document.getElementById("auto-slide-title").innerHTML = topMovies[autoSlideIndex].title;
document.getElementById("auto-slide-image").src = topMovies[autoSlideIndex].image_url;
document.getElementById("auto-slide-description").innerHTML = topMovies[autoSlideIndex].description;
//Wait 2 seconds
setTimeout(autoSlideShow, 2000);//Auto change slide every 2 seconds
}
autoSlideShow() // Call to run auto slideshow
function loadRSS() {
	//Use CORS API website as proxy
	let proxy = 'https://cors-anywhere.herokuapp.com/';

	//Declare the URL where we fetch RSS file
	let url = "http://rss.cnn.com/rss/edition.rss";
	//NASA RSS: https://www.nasa.gov/content/nasa-rss-feeds
	//     NASA education news: https://www.nasa.gov/rss/dyn/educationnews.rss
	//CNN RSS: https://edition.cnn.com/services/rss/
	//    CNN RSS top stories: http://rss.cnn.com/rss/edition.rss
	//BBC RSS: http://feeds.bbci.co.uk/news/rss.xml

	//Create an XMLHttpRequest Object to request XML file (data) through HTTP protocol
	let xhttp = new XMLHttpRequest();
	xhttp.open("GET", proxy + url, true);
	xhttp.send();

	//Process RSS file when it has been loaded successfully		
	xhttp.onreadystatechange = function() {
	if (this.readyState == 4 && this.status == 200) {
		//Load XML file as "XML" format and parse/process it by calling function parseRSS()
		let rss = this.responseXML;
		parseRSS(rss);	}
	};
}

function parseRSS(rss) {
	//Load all "items" inside the RSS document, each item is a news
	let items = rss.getElementsByTagName("item");			
	let rssContent = "";//varible "rssContent" is used to store rss content in HTML format

	//Loop through all "items" (news) and extract child node content: "title", "link", "description" and "pubdate"
	for (let i = 0; i< items.length; i++) {
	let nodes = items[i].children;
	//Extract "title", "link", "description" and "pubdate" of each "node"
	let title, pubdate, description, link;
	for (let j = 0; j < nodes.length; j++) {
		if (nodes[j].tagName == "title") {
		title = nodes[j].childNodes[0].nodeValue;
		} else if (nodes[j].tagName == "link") {
		link = nodes[j].childNodes[0].nodeValue;
		} else if (nodes[j].tagName == "description") {
		description = nodes[j].childNodes[0].nodeValue;
		} else if (nodes[j].tagName == "pubDate") {
		pubdate = nodes[j].childNodes[0].nodeValue;
		}
	}

	//Format the extracted information above in HTML format and append it to the "rssContent" variable
	//each item (news) is wrapped inside a <div>
	rssContent += `<div style="background-color: gray;" class="col-sm-12 col-md-6">																
													<h3>${title}</h3>
													<p style="font-style: italic;">${pubdate}</p>
													<p>${description}</p>
													<p><a href="${link}">Read more</a></p>
											</div>`;							
	}

	//Display the "rssContent" on the webpage
	document.getElementById("rssFeed").innerHTML = rssContent;
}
function changeColor(event)
		{
			var color = event.value;
			document.getElementsByTagName('BODY')[0].style.backgroundColor=color;
		}
function changeTextSize(event)
		{
			var textsize = event.value;
			document.body.style.fontSize=textsize;
		}
		let accounts = [{user: "admin", pass: "1234"},{username: "user", password: "pass"}];	

		function signUp() {
			//Get entered data
			let enteredUser = document.getElementById("signUpUser").value;
			let enteredPass = document.getElementById("signUpPass").value;
			
			//Loop through all users and check if this user exists or not?
			let existing = false;
			for (var i=0; i < accounts.length; i++) {
				if (enteredUser == accounts[i].username) {
					alert("User already exists with these credentials");			
					existing = true;
					break;//quit
				} 
			}
			//Until the end, no existing user
			if (existing == false) {
				//Add a new user
				accounts.push({username: enteredUser, password: enteredPass});	
				alert("Account created successfully");		
			}	
		}
		
		
		function login() {
			//Get entered data
			let enteredUser = document.getElementById("loginUser").value;
			let enteredPass = document.getElementById("loginPass").value;
			
			//Loop through all users and check if any matching?
			let valid = false;
			for (var i=0; i < accounts.length; i++) {
				if (enteredUser == accounts[i].username && enteredPass == accounts[i].password) {
					alert("Logged in succesfully");			
					valid = true;
					break;//quit
				} 
			}
			//Until the end, no user matching.
			if (valid == false) {
				alert("No account found matching credentials");	
			}	
		}	
		let currentVotes = {like: 0, dislike: 500};
		//Load the current votes to HTML page
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
		//Variables to track the clicking status
		6
		//RULE: Allow to vote only one: UP or DOWN
		let voteStatus = {like: false, dislike: false};
		//Click Like button
		function like() {
		//Check current status of "like" button (has been clicked or not)
		if (voteStatus.like == false) {
		//Increase a "Like": Increase the like number by 1
		document.getElementById("likeNumber").innerHTML = currentVotes.like + 1;
		//Change the background color of Like button to GREEN
		document.getElementById("likeButton").style.backgroundColor = "green";
		//Change the current status of "like" button: has been clicked
		voteStatus.like = true;//
		//Check "dislike" status - if dislike has been voted, down it by one & change status to False & change background color to white
		if (voteStatus.dislike == true) {
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
		voteStatus.dislike = false;//
		document.getElementById("dislikeButton").style.backgroundColor = "white";
		}
		} else {
		//Keep the current number of like
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		//Change the background color of Like button to WHITE
		document.getElementById("likeButton").style.backgroundColor = "white";
		//Change the current status of "like" button
		voteStatus.like = false;//has been clicked
		}
		}
		//Click Dislike button
		function dislike() {
		//Check current status of "dislike" button (has been clicked or not)
		if (voteStatus.dislike == false) {
		//Increase a "disLike" by 1
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike + 1;
		//Change the background color of Like button to GREEN
		document.getElementById("dislikeButton").style.backgroundColor = "green";
		//Change the current status of "dislike" button
		voteStatus.dislike = true;//has been clicked
		//Check "like" status - if like has been voted, down it by one & change status to False & change background color to white
		if (voteStatus.like == true) {
		document.getElementById("likeNumber").innerHTML = currentVotes.like;
		voteStatus.like = false;//
		document.getElementById("likeButton").style.backgroundColor = "white";
		}
		} else {
		//Keep the current number of of "dislike"
		document.getElementById("dislikeNumber").innerHTML = currentVotes.dislike;
		//Change the background color of disLike button to WHITE
		document.getElementById("dislikeButton").style.backgroundColor = "white";
		//Change the current status of "dislike" button
		voteStatus.dislike = false;//has been clicked
		}
		} 