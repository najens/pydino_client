export const createUrlTitle = (title) => {
	const pTitle = title.toLowerCase()
	const titleArray = pTitle.split(' ')
	let url_title = ''
	for (let i = 0; i < titleArray.length - 1; i++) {
		url_title += `${titleArray[i]}-`
	}
	url_title += titleArray.pop()
	return url_title
}

export const isAdmin = (authedUser) => {
	if (authedUser.roles) {
		if (authedUser.roles.includes('admin')) {
			return true
		}
	}
}
