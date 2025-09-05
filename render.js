const startButton = document.getElementById('startButton');
const outputDiv = document.getElementById('output');

if (!('webkitSpeechRecognition' in window)) {
  outputDiv.innerHTML = "<p>Web Speech API is not supported in this environment.</p>";
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  let final_transcript = '';

  recognition.onstart = () => {
    outputDiv.innerHTML = "<p>Listening...</p>";
    final_transcript = '';
  };

  recognition.onresult = (event) => {
    let interim_transcript = '';
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
    }
    outputDiv.innerHTML = `<p><strong>${final_transcript}</strong> <em>${interim_transcript}</em></p>`;
  };

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error);
    outputDiv.innerHTML = "<p>Error. Please try again.</p>";
  };

  recognition.onend = () => {
    console.log('Speech recognition ended.');
  };

  startButton.onclick = () => {
    recognition.start();
  };
}