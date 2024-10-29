function checkPalindrome(str) {
    let myPalindrome = '';
    for (let i = str.length - 1; i >= 0; i--) {
        myPalindrome += str.charAt(i);
    }
    return myPalindrome
}

document.getElementById('checkButton').addEventListener('click', () => {
    const input = document.getElementById('palindromeInput').value;
    fetch('/check-palindrome', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `input=${encodeURIComponent(input)}`,
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('result').innerText = data.result;
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });