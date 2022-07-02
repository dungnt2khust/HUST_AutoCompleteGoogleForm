var answers = [];
var errors = [];

// Bạn sửa lại nếu là pdf xám tự in - s4, nếu là của tailieuhust có màu thì là s8
var paragraphClass = "s8";

document.querySelectorAll("li").forEach((li) => {
	let p = li.querySelector("." + paragraphClass);
	if (p) {
		let imgs = li.querySelectorAll("img");
		let imgTrue;

		for (let i = 0; i < imgs.length; i++) {
			if (getAverageRGB(imgs[i]) && getAverageRGB(imgs[i]).r != 68) {
				imgTrue = imgs[i];
				average = getAverageRGB(imgs[i]);
				img = imgs[i];
				break;
			}
		}

		if (imgTrue) {
			let table =
				imgTrue.parentElement.parentElement.parentElement.parentElement;
			let answer;
			if (table.nextSibling) {
				answer = table.nextSibling;
			} else {
				answer = table.parentElement.nextSibling;
			}
			for (let i = 0; i < 10; i++) {
				if (!answer.textContent.trim()) {
					answer = answer.nextSibling;
				} else {
					break;
				}
			}
			answers.push({
				question: p.textContent
					.trim()
					.replace("\n\t\t\t\t\t*", "")
					.replaceAll("\n\t\t\t\t\t", " "),
				answer: answer.textContent
					.trim()
					.replace("\n\t\t\t\t\t*", "")
					.replaceAll("\n\t\t\t\t\t", " "),
			});
		} else {
			errors.push({
				question: p.textContent
					.trim()
					.replace("\n\t\t\t\t\t*", "")
					.replaceAll("\n\t\t\t\t\t", " "),
			});
		}
	}
});
// Console file lấy dữ liệu
console.log("%cĐây là đoạn script trả lời đáp án (By EddieOnTheCode)", "color: red; font-size: 40px; font-family: Arial, sans-serif; font-weight: bold");
console.log("%cDo trình convert trên trang web không được chính xác nên không thể copy toàn bộ đáp án mong bạn thông cảm", "color: #e70981; font-size: 18px; font-family: Arial");
console.log("%cMình có làm web bán hàng, blog, web tùy theo nghiệp vụ khách hàng và nhận hỗ trợ hoặc làm những đồ án đơn giản. Nếu bạn cần thì liên hệ với mình qua facebook https://www.facebook.com/dung.nguyentien.eddie/", "color: #e70981; font-size: 18px; font-family: Arial")
console.log("%c 1. Copy mảng dữ liệu dưới đây và thay thế vào vị trí ANSWER_ARRAY_HERE trong file AutoComplete.js", "color: yellow; font-family: Arial, sans-serif; font-size: 20px;");
console.log("%c  Nhấn chuột phải và chọn Copy Object", "color: green; font-family: Arial, sans-serif; font-size: 20px;");
console.log(answers);
console.log("%c 2. Copy toàn bộ file mà bạn vừa replace mảng dữ liệu và paste vào tab console của form mà bạn đang muốn trả lời", "color: yellow; font-family: Arial, sans-serif; font-size: 20px;");




function getAverageRGB(imgEl) {
	var blockSize = 5, // only visit every 5 pixels
		defaultRGB = { r: 0, g: 0, b: 0 }, // for non-supporting envs
		canvas = document.createElement("canvas"),
		context = canvas.getContext && canvas.getContext("2d"),
		data,
		width,
		height,
		i = -4,
		length,
		rgb = { r: 0, g: 0, b: 0 },
		count = 0;

	if (!context) {
		return defaultRGB;
	}

	height = canvas.height =
		imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
	width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

	context.drawImage(imgEl, 0, 0);

	try {
		data = context.getImageData(0, 0, width, height);
	} catch (e) {
		/* security error, img on diff domain */
		return defaultRGB;
	}

	length = data.data.length;

	while ((i += blockSize * 4) < length) {
		++count;
		rgb.r += data.data[i];
		rgb.g += data.data[i + 1];
		rgb.b += data.data[i + 2];
	}

	// ~~ used to floor values
	rgb.r = ~~(rgb.r / count);
	rgb.g = ~~(rgb.g / count);
	rgb.b = ~~(rgb.b / count);

	return rgb;
}