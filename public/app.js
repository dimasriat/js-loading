const ImageLoading = function (sources, progress) {
	let imageObjects = [];
	let count = 0;
	return new Promise((resolve) => {
		const max = sources.length;
		sources.forEach((src) => {
			const newImage = new Image();
			newImage.src = src;
			newImage.addEventListener("load", function () {
				imageObjects.push(newImage);
				const width = `${(++count / max) * 100}%`;
				progress.style.width = width;
				if (count === max) {
					resolve(imageObjects);
				}
			});
		});
	});
};

const AudioLoading = function (sources) {
	let imageObjects = [];
	let count = 0;
	return new Promise((resolve) => {
		const max = sources.length;
		sources.forEach((src) => {
			const newImage = new Audio(src);
			newImage.addEventListener("canplaythrough", function () {
				count++;
				imageObjects.push(newImage);
				if (count === max) {
					resolve(imageObjects);
				}
			});
		});
	});
};

window.addEventListener("load", function () {
	document
		.getElementById("play")
		.addEventListener("click", async function () {
			document.getElementById("audios").innerText = 'ditunggu bang jago...'
			try {
				const audios = await AudioLoading(
					["I LIKE U - NIKI (Lyrics).mp3"],
				);
				audios.forEach((audio) => {
					audio.play();
					document.getElementById("audios").innerText = 'NIKI mas'
				});
			} catch (err) {
				console.error(err);
			}
		});
	document
		.getElementById("generate")
		.addEventListener("click", async function () {
			document.getElementById("generate").innerHTML = 'ditunggu bang jago...'
			try {
				const images = await ImageLoading(
					[
						"cloud.jpg",
						"hot.jpeg",
						"seger.jpg",
						"kalem.jpeg",
						"IMG_0747.JPG",
						"senyum.jpeg",
					],
					document.getElementById("progress")
				);
				console.log(images);
				document.getElementById("generate").innerHTML = 'siap bang jago!'
				images.forEach((img) => {
					document.getElementById("images").append(img);
				});
			} catch (err) {
				console.error(err);
			}
		});
});
