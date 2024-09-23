// Thư viện từ vựng theo chủ đề
const vocabularyLibrary = {
  "Jobs": [
    { "english": "doctor", "vietnamese": "bác sĩ" },
    { "english": "teacher", "vietnamese": "giáo viên" },
    { "english": "engineer", "vietnamese": "kỹ sư" }
  ],
  "Animals": [
    { "english": "cat", "vietnamese": "mèo" },
    { "english": "dog", "vietnamese": "chó" },
    { "english": "chicken", "vietnamese": "gà" },
    { "english": "elephant", "vietnamese": "voi" }
  ]
};

let currentTopic = "Jobs"; // Chủ đề mặc định
let currentIndex = 0; // Chỉ số từ hiện tại
let attempts = 0; // Số lần nhập sai
let forceRetry = false; // Biến để kiểm tra nếu người dùng phải nhập lại từ hiện tại

// Khởi tạo trang với các chủ đề và từ đầu tiên
window.onload = function () {
  loadTopics();
  loadWord();
};

// Load các chủ đề vào dropdown
function loadTopics() {
  const topicsDropdown = document.getElementById('topics');
  for (let topic in vocabularyLibrary) {
    let option = document.createElement('option');
    option.value = topic;
    option.textContent = topic;
    topicsDropdown.appendChild(option);
  }
  topicsDropdown.addEventListener('change', function () {
    currentTopic = this.value;
    currentIndex = 0;
    forceRetry = false;
    loadWord();
  });
}

// Hiển thị từ hiện tại
function loadWord() {
  const word = vocabularyLibrary[currentTopic][currentIndex];
  document.getElementById('vietnamese-word').textContent = word.vietnamese;
  document.getElementById('english-input').value = ''; // Xóa nội dung input
  document.getElementById('result-message').textContent = ''; // Xóa thông báo cũ
  attempts = 0;
  forceRetry = false; // Reset trạng thái cho từ mới
}

// Bắt sự kiện nhấn phím Enter để kiểm tra từ
document.getElementById('english-input').addEventListener('keydown', function (event) {
  if (event.key === "Enter") {
    checkWord();
  }
});

// Hàm kiểm tra từ và hiển thị kết quả dưới ô nhập liệu
function checkWord() {
  const userInput = document.getElementById('english-input').value.toLowerCase();
  const correctAnswer = vocabularyLibrary[currentTopic][currentIndex].english;
  const resultMessage = document.getElementById('result-message'); // Vùng để hiển thị kết quả

  if (userInput === correctAnswer) {
    resultMessage.style.color = 'green'; // Màu xanh nếu đúng
    resultMessage.textContent = "Correct! Moving to the next word.";
    currentIndex = (currentIndex + 1) % vocabularyLibrary[currentTopic].length;
    forceRetry = false; // Người dùng đã nhập đúng, không cần nhập lại từ này nữa
    loadWord();
  } else {
    attempts++;
    if (attempts >= 3) {
      // Hiển thị từ đúng và yêu cầu người dùng nhập lại
      resultMessage.style.color = 'red'; // Màu đỏ nếu sai quá 3 lần
      resultMessage.textContent = `Incorrect! The correct word is: "${correctAnswer}". Please try again.`;
      forceRetry = true; // Buộc người dùng phải nhập lại từ hiện tại
      attempts = 0; // Reset số lần thử cho từ đó
    } else {
    }
  }

  // Xóa nội dung ô nhập sau mỗi lần kiểm tra
  document.getElementById('english-input').value = ''; // Xóa nội dung input
}

// Hiển thị toàn bộ từ trong chủ đề hiện tại
document.getElementById('show-all-words').addEventListener('click', function () {
  const wordList = document.getElementById('word-list');
  wordList.innerHTML = ''; // Xóa danh sách cũ

  vocabularyLibrary[currentTopic].forEach(word => {
    let listItem = document.createElement('li');
    listItem.textContent = `${word.vietnamese}: ${word.english}`;
    wordList.appendChild(listItem);
  });
});
