const random = (max, min = 0) => Math.floor(Math.random() * (max - min + 1)) + min

const nameArray = [ 'Ayuu Lay', 'Ayuu Gyi', 'Aung Net' ]
const nameGenerator = () => nameArray[random(nameArray.length - 1)]

const directionArray = [ 'left', 'right' ]
const directionGenerator = () => directionArray[random(directionArray.length - 1)]

const contextArray = [
	'Hello',
	'Min Bar Kaung Lae',
	'Aye Kwar Beer Thauk Mal',
	'Ma Phit Naing Buu',
	'Htin Dl Ayuu',
	'Pyit Ko Ma Phit Naing Tar Kwar',
	'Ayuu Dway Pal D Mhar SHi Dal',
	'Ayan Lwan Dl Heeeheee',
	'Barrrr !!',
	'Loat Ko Loat Ya Mhar Pop',
	'Generate Message Tway Ma Loat Par Nae'
]
const contextGenerator = () => contextArray[random(contextArray.length - 1)]

const makeMessage = () => {
	return {
		name: nameGenerator(),
		type: 'message',
		direction: directionGenerator(),
		context: contextGenerator()
	}
}

module.exports.messageGenerator = () => {
	return [
		makeMessage(),
		makeMessage(),
		makeMessage(),
		makeMessage(),
		makeMessage(),
		makeMessage(),
		makeMessage(),
		makeMessage()
	]
}
