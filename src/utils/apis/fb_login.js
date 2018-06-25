// Downloads the facebook sdk which enables
// the facebook login functions to work
const fb_login = () => {
	window.fbAsyncInit = () => {
		window.FB.init({
			appId : '454885304955508',
			cookie     : true,  // enable cookies to allow the server to access
													// the session
			xfbml      : true,  // parse social plugins on this page
			version    : 'v2.8' // use graph api version 2.8
		})
	}

	(function(d, s, id) {
		let js, fjs = d.getElementsByTagName(s)[0]
		if (d.getElementById(id)) return
		js = d.createElement(s)
		js.id = id
		js.src = '//connect.facebook.net/en_US/sdk.js'
		fjs.parentNode.insertBefore(js, fjs)
	}(document, 'script', 'facebook-jssdk'))
	return
}

export default fb_login
