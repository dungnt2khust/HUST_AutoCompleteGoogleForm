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
