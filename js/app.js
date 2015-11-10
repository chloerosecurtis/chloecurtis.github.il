$(document).ready(function(){
	var artist;
	var youTubeiframeIsLoaded = false;
	var instagramIsLoaded = false;
	var artinfoIsLoaded = false;
	var bingIsLoaded = false;

	$(".text-content").click(function(event){
		event.preventDefault();
		artist = $(this).text();
		$("#page-2").show();
		$("#page-1").hide();
		$("#name").empty().append(artist);
		$("#youtube-media").removeClass("hidden");
		if (youTubeiframeIsLoaded) {
			console.log("iframe already loaded");
		} else {
			var video = "<iframe src=http://www.youtube.com/embed?listType=search&list='" + artist + "'></iframe>"
			$("#youtube-media").append(video);
			youTubeiframeIsLoaded = true;
		}
	});

	$("#instagram-content").click(function(event){
		event.preventDefault(	);
		$("#artinfo-media").addClass("hidden");
		$("#bing-media").addClass("hidden");
		$("#youtube-media").addClass("hidden");
		$("#twitter-" + artist.toLowerCase()).addClass("hidden");
		$("#instagram-media").removeClass("hidden");
		if (instagramIsLoaded) {
			console.log("loaded");
		} else {
			$.ajax({
				url: "http://proxy.hackeryou.com/",
				dataType: 'json',
				method: 'GET',
				data: {
					reqUrl: 'https://api.instagram.com/v1/tags/' + artist + '/media/recent',
					params: {
						client_id: "ece9571300f54b3a90e8b46b8a7ca882",

					}
				}
			}).then(function(data){
				data.data.forEach(function(el){
					var src = el.images.standard_resolution.url;
					var imgTag = "<img src=" + src + ">";
					var link = el.link;
					var anchorTag = "<a href='" + link + "'>" + imgTag + "</a>"
					$("#instagram-media").append(anchorTag);
				});
				instagramIsLoaded = true;
			})
		}
	});



	$(".twitter-content").click(function(event){
		event.preventDefault();
		$("#instagram-media").addClass("hidden");
		$("#artinfo-media").addClass("hidden");
		$("#bing-media").addClass("hidden");
		$("#youtube-media").addClass("hidden");
		$("#twitter-" + artist.toLowerCase()).removeClass("hidden");
	})

	$("#artinfo-content").click(function(event){
		event.preventDefault();
		$("#twitter-" + artist.toLowerCase()).addClass("hidden");
		$("#instagram-media").addClass("hidden");
		$("#bing-media").addClass("hidden");
		$("#artinfo-media").removeClass("hidden");
		$("#youtube-media").addClass("hidden");
		if (artinfoIsLoaded) {
			console.log("loaded");
		} else {
			var auction = "<iframe src=http://artsalesindex.artinfo.com/asi/search.action></iframe>"
			$("#artinfo-media").append(auction);
			artinfoIsLoaded = true;
		}
	})

	$("#bing-content").click(function(event){
		event.preventDefault();
		$("#twitter-" + artist.toLowerCase()).addClass("hidden");
		$("#instagram-media").addClass("hidden");
		$("#artinfo-media").addClass("hidden");
		$("#bing-media").removeClass("hidden");
		$("#youtube-media").addClass("hidden");
		if (bingIsLoaded) {
			console.log ("loaded");
		} else {
			var news = "<iframe src=https://www.bing.com/news/></iframe>"
			$("#bing-media").append(news);
			bingIsLoaded = true;
		}
	})

	$("#youtube-content").click(function(event){
		event.preventDefault();
		$("#twitter-" + artist.toLowerCase()).addClass("hidden");
		$("#instagram-media").addClass("hidden");
		$("#artinfo-media").addClass("hidden");
		$("#bing-media").addClass("hidden");
		$("#youtube-media").removeClass("hidden");
		if (youTubeiframeIsLoaded) {
			console.log("iframe already loaded");
		} else {
			var video = "<iframe src=http://www.youtube.com/embed?listType=search&list='" + artist + "'></iframe>"
			$("#youtube-media").append(video);
			youTubeiframeIsLoaded = true;
		}
	})
		});

// https://jsonp.afeld.me/?url=https%3A%2F%2Fapi.instagram.com%2Fv1%2Ftags%2Fdancolen%2Fmedia%2Frecent%3Fclient_id%3Dece9571300f54b3a90e8b46b8a7ca882



// on click of an artist link with the classname of .artist
// 	prevent the default behavior
// 	get the value of the artists name using $.val()
// 	hide page 1 and show page 2
// 	make 5 $.ajax requests based on the artist
// 		- google
// 		- instagram
// 		- twittr
// 		- youtube
// 		- artinfo 

