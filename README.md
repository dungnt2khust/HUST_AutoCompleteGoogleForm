# HUST_AutoCompleteGoogleForm
>*Đây là những script giúp bạn trả lời nhanh các đáp án của Google Form dựa trên một file pdf đã có đáp án (Hiện tại mình chỉ làm cho form chứa radio input)*  

>Mình học `Bách Khoa` và thi thoảng có những phần form kiểm tra quy chế rất dài lên đến `130 câu` nên mình muốn làm script này để sử dụng và cũng như chia sẻ cho mọi người  
### **I. Chuyển đổi file pdf sang html**  
Bạn vào đường link https://pdf.online/convert-pdf-to-html để conver từ file pdf thành file html (Hiện tại mình chỉ làm theo trang web này - mỗi trang web sẽ có một kiểu format khác nhau nên sẽ không sử dụng được nếu bạn dùng trang web khác)
![](https://ik.imagekit.io/uvn3cxjawn6/default/pdf2html_SBftzH3SC.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656755204655)

### **II. Sau khi convert và tải file thành công**    
- Click đúp vào file html để nó hiển thị trên trình duyệt của bạn  
- Nhấn chuột phải chọn Kiểm tra/Inspect hoặc ấn F12 để mở Devtool của trình duyệt 
![](https://ik.imagekit.io/uvn3cxjawn6/default/inspect_810dBSYoH.png?ik-sdk-version=javascript-1.4.3&updatedAt=16567554652177)        

- Mở đến tab console
![](https://ik.imagekit.io/uvn3cxjawn6/default/devtool_N5N1pcl0F.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656755854042)

- Paste script trong file **GetAnswer.js** (Lưu ý nếu là bản pdf xám - bạn tự in thì bạn sửa lại thành s4 giúp mình còn nếu là pdf của tailieuhust thì bạn để mặc định là s8)
![](https://ik.imagekit.io/uvn3cxjawn6/default/runscript1_qSTiGTKK9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656755855239)
![](https://ik.imagekit.io/uvn3cxjawn6/default/editclass_slvYeW3AV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656758055134)

- Sau khi chạy xong bạn copy mảng đáp án và replace nó trong file **AutoComplete.js**
![](https://ik.imagekit.io/uvn3cxjawn6/default/copyobject_hQqp2cvV1.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656755854275)
![](https://ik.imagekit.io/uvn3cxjawn6/default/replacearr_ilk4uJsvc.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656756708032)

- Chuyển đến form đang muốn trả lời và paste vào console  
![](https://ik.imagekit.io/uvn3cxjawn6/default/runscript2_VzAot8MP6.png?ik-sdk-version=javascript-1.4.3&updatedAt=1656755855592)
- Sau khi chạy xong mình sẽ hiển thị số câu mà mình đã điền được và những câu chưa điền, bạn hãy kiểm tra lại và điền nốt nhé.

>Dưới đây là nội dung 2 file để sử dụng bạn có thể copy luôn hoặc vào file để copy

>Cảm ơn vì đã theo thử dùng đoạn script ngỡ ngẩn của mình :vvv

**GetAnswer.js**
```js
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
```


**AutoComplete.js**
```js
// Paste danh sách đáp án tại đây 
var answers = ARRAY_REPLACE_HERE

var errors = [];
document.querySelectorAll(".__question__").forEach((question) => {
	let title = question.querySelector(
		".office-form-question-title .text-format-content"
	);
	let choices = question.querySelectorAll(".office-form-question-choice");
	let answerTemplate = answers.find((answer) =>
		answer.question.includes(title.textContent)
	);
	let checked = false;
	if (answerTemplate) {
		choices.forEach((choice) => {
			let textChoice = choice.querySelector(
				".office-form-question-choice-text-span"
			).textContent;
			let input = choice.querySelector("input");
			if (answerTemplate.answer.includes(textChoice)) {
				input.click();
				checked = true;
			}
		});
	}
	if (!checked) {
		errors.push({question: title.textContent});
	}
});
// Console file tự động trả lời
console.log(
	"%cĐây là đoạn script trả lời đáp án (By EddieOnTheCode)",
	"color: red; font-size: 40px; font-family: Arial, sans-serif; font-weight: bold"
);
console.log(
	"%cDo trình convert trên trang web không được chính xác nên không thể copy toàn bộ đáp án mong bạn thông cảm",
	"color: #e70981; font-size: 18px; font-family: Arial"
);
console.log(
	"%cMình có làm web bán hàng, blog, web tùy theo nghiệp vụ khách hàng và nhận hỗ trợ hoặc làm những đồ án đơn giản. Nếu bạn cần thì liên hệ với mình qua facebook https://www.facebook.com/dung.nguyentien.eddie/",
	"color: #e70981; font-size: 18px; font-family: Arial"
);
console.log(
	"%cI. Số câu trả lời tôi đã điền giúp bạn là",
	"color: yellow; font-family: Arial, sans-serif; font-size: 20px;"
);
console.log(
	`%c${answers.length - errors.length}`,
	"color: green; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold"
);
console.log(
	"%cII. Số câu trả lời còn lại chưa trả lời được là",
	"color: yellow; font-family: Arial, sans-serif; font-size: 20px;"
);
console.log(
	`%c${errors.length}`,
	"color: green; font-family: Arial, sans-serif; font-size: 20px; font-weight: bold"
);
if (errors.length) {
	console.log(
		"%cBạn hãy tự điền số câu còn lại dưới đây nhé:",
		"color: yellow; font-family: Arial, sans-serif; font-size: 20px;"
	);
	errors.forEach(error => {
		console.log(
			`%c${error.question}`,
			"color: aqua;font-family: Arial, sans-serif; font-size: 16px"
		);
	});
}
```

 

 
