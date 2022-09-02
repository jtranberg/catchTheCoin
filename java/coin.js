
function isTouching(a, b) {
	const aRect = a.getBoundingClientRect();
	const bRect = b.getBoundingClientRect();
return !(
	aRect.top + aRect.height < bRect.top ||
	aRect.top > bRect.top + bRect.height ||
	aRect.left + aRect.width < bRect.left ||
	aRect.left > bRect.left + bRect.width
	);
}

const avatar = document.querySelector('#player');
const coin = document.querySelector('#coin');

window.addEventListener('keydown', function(e) {
	console.log(e.key);

//window.addEventListener('keyup', function(e) {
	// if (e.key === 'ArrowDown' || e.key === 'Down') {
	// 	moveAvatar('down');
	// } else if (e.key === 'ArrowUp' || e.key === 'Up') {
	// 	moveAvatar('up');
	// } else if (e.key === 'ArrowRight' || e.key === 'Right') {
	// 	moveAvatar('right');
	// } else if (e.key === 'ArrowLeft' || e.key === 'Left') {
	// 	moveAvatar('left');
	// }

	if (e.key.startsWith('Arrow')) {
		moveAvatar(e.key.slice(5).toLowerCase());
	}
	if (e.key in [ 'Down', 'Up', 'Right', 'Left' ]) {
	   moveAvatar(e.key.toLowerCase());
	}
    if (isTouching(avatar, coin)) moveCoin();
});

const extractPos = (pos) => {
	if (!pos) return 0;
	return parseInt(pos.slice(0, -2));
};

const moveCoin = () => {
	const y = Math.floor(window.innerHeight * Math.random());
	const x = Math.floor(window.innerWidth * Math.random());
	coin.style.top = `${y}px`;
	coin.style.left = `${x}px`;
};

const moveAvatar = (direction) => {
	const axis = direction === 'up' || direction === 'down' ? 'top' : 'left';
	const currLoc = extractPos(getComputedStyle(avatar)[axis]);
	const amount = direction === 'down' || direction === 'right' ? currLoc + 50 : currLoc - 50;
	avatar.style[axis] = `${amount}px`;

	if (direction === 'left') {
		avatar.style.transform = 'scale(-1,1)';
	} else if (direction === 'right') {
		avatar.style.transform = 'scale(1,1)';
	}
};
moveCoin();