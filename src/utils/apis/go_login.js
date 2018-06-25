// Downloads the google api sdk which enables
// the google login functions to work
const go_login = () => {
	window.goAsyncInit = () => {
		window.gapi.load('auth2', function() {
			window.gapi.auth2.init({
				client_id: '935850256762-6u0e6mogttgjgvclrodb4cg6bubp2loh.apps.googleusercontent.com',
				scope: 'profile email',
			})
		})
	}

	(function(d, s, id, cb) {
		let js, fjs = d.getElementsByTagName(s)[0]
		if (d.getElementById(id)) return
		js = d.createElement(s)
		js.id = id
		js.src = '//apis.google.com/js/platform.js'
		js.onload = window.goAsyncInit
		fjs.parentNode.insertBefore(js, fjs)
	}(document, 'script', 'google-auth2-jssdk'))
	return
}

export default go_login
