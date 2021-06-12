const getUnixToDate = unix => {
	const date = new Date(unix);
	const day = date.getDate();
	const month = date.getMonth();
	const year = date.getFullYear();
	const time = unixToHourMin(unix);

	date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	return `${getNumberToMonth(month)} ${day}, ${year} ${time}`;
};

const unixToHourMin = unix => {
	const date = new Date(unix);
	const hour = date.getHours();
	const seconds = date.getSeconds();
	let sec = seconds;
	if (seconds < 10) {
		sec = `0${sec}`;
	}
	const min =
		date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
	if (hour == 0) return '12:' + min + ':' + sec + ' AM';
	if (hour == 12) return '12:' + min + ':' + sec + ' PM';
	if (hour < 12) {
		if (hour < 10) return `0${hour}:${min}:${sec} AM`;
		else return `${hour}:${min}:${sec}  AM`;
	}
	if (hour > 12) {
		let hh = hour - 12;
		if (hh < 10) return `0${hh}:${min}:${sec}  PM`;
		else return `${hh}:${min}:${sec}  PM`;
	}
};

const getNumberToMonth = month => {
	switch (month.toString()) {
		case '0':
			return 'Jan';
		case '1':
			return 'Feb';
		case '2':
			return 'Mar';
		case '3':
			return 'Apr';
		case '4':
			return 'May';
		case '5':
			return 'Jun';
		case '6':
			return 'Jul';
		case '7':
			return 'Aug';
		case '8':
			return 'Sep';
		case '9':
			return 'Oct';
		case '10':
			return 'Nov';
		case '11':
			return 'Dec';
	}
};

export default getUnixToDate;
